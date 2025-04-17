import pandas as pd
import numpy as np
import torch
from transformers import AutoTokenizer, AutoModelForSequenceClassification
from sentence_transformers import SentenceTransformer
from gensim.models import Word2Vec
from sklearn.metrics.pairwise import cosine_similarity
import tensorflow as tf
import joblib
import requests
import string
from bs4 import BeautifulSoup
from nltk.corpus import stopwords
from nltk.tokenize import word_tokenize
from nltk.stem import WordNetLemmatizer
import nltk
import os
import json

# Download necessary NLTK resources
nltk.download('punkt')
nltk.download('stopwords')
nltk.download('wordnet')
nltk.download('punkt_tab')

# Load saved models and components
with open('models/best_model_name.txt', 'r') as f:
    best_model_name = f.read().strip()

best_traditional_model = tf.keras.models.load_model('models/best_traditional_model.h5')
meta_model = joblib.load('models/meta_model.joblib')
scaler = joblib.load('models/scaler.joblib')
tfidf_title = joblib.load('models/tfidf_title.joblib')
tfidf_body = joblib.load('models/tfidf_body.joblib')
w2v_title = Word2Vec.load('models/w2v_title.model')
w2v_body = Word2Vec.load('models/w2v_body.model')
sbert_model = SentenceTransformer('all-MiniLM-L6-v2')
tokenizer = AutoTokenizer.from_pretrained('microsoft/codebert-base')
codebert_model = AutoModelForSequenceClassification.from_pretrained('models/fine_tuned_codebert_model')

# Preprocessing functions
stop_words = set(stopwords.words('english'))
lemmatizer = WordNetLemmatizer()

def full_preprocess(text):
    text = str(text).lower().translate(str.maketrans('', '', string.punctuation))
    tokens = word_tokenize(text)
    tokens = [lemmatizer.lemmatize(token) for token in tokens if token not in stop_words]
    return ' '.join(tokens)

def minimal_preprocess(text):
    return BeautifulSoup(str(text), 'html.parser').get_text()

# Read issue data from GitHub Actions event
with open(os.environ['GITHUB_EVENT_PATH'], 'r') as f:
    event_data = json.load(f)

new_title = event_data['issue']['title']
new_body = event_data['issue']['body'] if event_data['issue']['body'] else ""

# Preprocess the new issue
new_title_clean = full_preprocess(new_title)
new_body_clean = full_preprocess(new_body)
new_title_raw = minimal_preprocess(new_title)
new_body_raw = minimal_preprocess(new_body)

# Fetch 10 issues from the repository
repo = os.environ['GITHUB_REPOSITORY']
url = f"https://api.github.com/repos/{repo}/issues"
params = {"state": "all", "per_page": 10}
headers = {'Authorization': f'token {os.environ["GITHUB_TOKEN"]}'}
response = requests.get(url, headers=headers, params=params)
if response.status_code != 200:
    raise Exception(f"Failed to fetch issues: {response.status_code} - {response.text}")
issues = response.json()

# Function to compute features for a pair
def compute_features(pair_df):
    features = []
    for _, row in pair_df.iterrows():
        tfidf_t1 = tfidf_title.transform([row['Original Issue Title_clean']]).toarray()
        tfidf_t2 = tfidf_title.transform([row['Duplicate Issue Title_clean']]).toarray()
        tfidf_b1 = tfidf_body.transform([row['Original Issue Body_clean']]).toarray()
        tfidf_b2 = tfidf_body.transform([row['Original Issue Body_clean']]).toarray()
        tfidf_title_sim = cosine_similarity(tfidf_t1, tfidf_t2)[0][0]
        tfidf_body_sim = cosine_similarity(tfidf_b1, tfidf_b2)[0][0]

        w2v_t1 = get_w2v_embedding(row['Original Issue Title_clean'].split(), w2v_title)
        w2v_t2 = get_w2v_embedding(row['Duplicate Issue Title_clean'].split(), w2v_title)
        w2v_b1 = get_w2v_embedding(row['Original Issue Body_clean'].split(), w2v_body)
        w2v_b2 = get_w2v_embedding(row['Duplicate Issue Body_clean'].split(), w2v_body)
        w2v_title_sim = cosine_similarity([w2v_t1], [w2v_t2])[0][0] if np.any(w2v_t1) and np.any(w2v_t2) else 0
        w2v_body_sim = cosine_similarity([w2v_b1], [w2v_b2])[0][0] if np.any(w2v_b1) and np.any(w2v_b2) else 0

        sbert_t1 = sbert_model.encode(row['Original Issue Title_clean'])
        sbert_t2 = sbert_model.encode(row['Duplicate Issue Title_clean'])
        sbert_b1 = sbert_model.encode(row['Original Issue Body_clean'])
        sbert_b2 = sbert_model.encode(row['Duplicate Issue Body_clean'])
        sbert_title_sim = cosine_similarity([sbert_t1], [sbert_t2])[0][0]
        sbert_body_sim = cosine_similarity([sbert_b1], [sbert_b2])[0][0]

        t1_tokens = set(row['Original Issue Title_clean'].split())
        t2_tokens = set(row['Duplicate Issue Title_clean'].split())
        b1_tokens = set(row['Original Issue Body_clean'].split())
        b2_tokens = set(row['Duplicate Issue Body_clean'].split())
        title_overlap = len(t1_tokens & t2_tokens) / len(t1_tokens | t2_tokens) if t1_tokens or t2_tokens else 0
        body_overlap = len(b1_tokens & b2_tokens) / len(b1_tokens | b2_tokens) if b1_tokens or b2_tokens else 0

        features.append([tfidf_title_sim, tfidf_body_sim, w2v_title_sim, w2v_body_sim,
                         sbert_title_sim, sbert_body_sim, title_overlap, body_overlap])
    return np.array(features)

def get_w2v_embedding(tokens, model):
    vectors = [model.wv[token] for token in tokens if token in model.wv]
    return np.mean(vectors, axis=0) if vectors else np.zeros(100)

# Process each fetched issue
results = []
for issue in issues:
    fetched_title = issue.get('title', '')
    fetched_body = issue.get('body', '') if issue.get('body') else ''
    issue_number = issue.get('number', '')
    fetched_title_clean = full_preprocess(fetched_title)
    fetched_body_clean = full_preprocess(fetched_body)
    fetched_title_raw = minimal_preprocess(fetched_title)
    fetched_body_raw = minimal_preprocess(fetched_body)

    # Create pair DataFrame
    pair_df = pd.DataFrame({
        'Original Issue Title_clean': [new_title_clean],
        'Original Issue Body_clean': [new_body_clean],
        'Duplicate Issue Title_clean': [fetched_title_clean],
        'Duplicate Issue Body_clean': [fetched_body_clean],
        'Original Issue Title_raw': [new_title_raw],
        'Original Issue Body_raw': [new_body_raw],
        'Duplicate Issue Title_raw': [fetched_title_raw],
        'Duplicate Issue Body_raw': [fetched_body_raw]
    })

    # Compute features
    pair_features = compute_features(pair_df)
    pair_features_scaled = scaler.transform(pair_features)

    # Predict with best traditional model
    if best_model_name == 'ANN':
        traditional_pred_prob = best_traditional_model.predict(pair_features_scaled, verbose=0).flatten()[0]
    elif best_model_name in ['LSTM', 'RNN']:
        pair_features_3d = pair_features_scaled.reshape(1, 1, pair_features_scaled.shape[1])
        traditional_pred_prob = best_traditional_model.predict(pair_features_3d, verbose=0).flatten()[0]
    elif best_model_name == 'CNN':
        pair_features_3d = pair_features_scaled.reshape(1, pair_features_scaled.shape[1], 1)
        traditional_pred_prob = best_traditional_model.predict(pair_features_3d, verbose=0).flatten()[0]
    else:
        raise ValueError(f"Unsupported model: {best_model_name}")

    # Predict with CodeBERT
    text = f"[CLS] {new_title_raw} [SEP] {new_body_raw} [SEP] {fetched_title_raw} [SEP] {fetched_body_raw}"
    inputs = tokenizer(text, padding='max_length', truncation=True, max_length=512, return_tensors='pt')
    with torch.no_grad():
        outputs = codebert_model(**inputs)
        logits = outputs.logits
        pair_codebert_pred_prob = torch.softmax(logits, dim=1)[0, 1].item()

    # Combine predictions with meta-model
    hybrid_features = np.array([[traditional_pred_prob, pair_codebert_pred_prob]])
    hybrid_pred_prob = meta_model.predict_proba(hybrid_features)[:, 1][0]

    # Store result with issue number
    results.append({
        'issue_number': issue_number,
        'fetched_title': fetched_title,
        'fetched_body': fetched_body,
        'traditional_prob': traditional_pred_prob,
        'codebert_prob': pair_codebert_pred_prob,
        'hybrid_prob': hybrid_pred_prob
    })

# Rank the results based on hybrid probability
results_df = pd.DataFrame(results)
results_df = results_df.sort_values(by='hybrid_prob', ascending=False)

# Print top 5 potential duplicates with issue number
print("New Issue:")
print(f"Title: {new_title}")
print(f"Body: {new_body}\n")
print("Top 5 potential duplicates (ranked by hybrid probability):")
print(results_df.head(5)[['issue_number', 'fetched_title', 'traditional_prob', 'codebert_prob', 'hybrid_prob']])

# Save full ranking to CSV
results_df.to_csv('duplicate_ranking.csv', index=False)
print("\nFull ranking saved to 'duplicate_ranking.csv'")