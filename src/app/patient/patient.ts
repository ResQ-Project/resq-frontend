export interface Patient {
	id: number;
	patient_name: string;
    age: number;
    gender: string;
    address: string;
    contact_information: string;
    emergency_contact_name: string;
    emergency_contact_number: string;
    admission_status: string; //should be a radio button
    bed_number : string;
    disease: string;
    allergies: string;
    doctor_name: string; //should retrieve from doctor details
	criticality: number;
    resource1: string; //dropdown to select
    resource2: string;
    resouece3: string;
}