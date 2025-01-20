import { Component, Directive, EventEmitter, Input, Output, QueryList, ViewChildren } from '@angular/core';
import { DecimalPipe } from '@angular/common';

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

const PATIENTS: Patient[] = [
  {
      "id": 1,
      "patient_name": "Amara Perera",
      "age": 45,
      "gender": "Female",
      "address": "No. 10, Colombo Road, Colombo 3",
      "contact_information": "+94771234567",
      "emergency_contact_name": "Nimal Perera",
      "emergency_contact_number": "+94771267890",
      "admission_status": "Bed Assigned",
      "bed_number": "B12",
      "disease": "Hypertension",
      "allergies": "Penicillin",
      "doctor_name": "Dr. Kamal Silva",
      "criticality": 2,
      "resource1": "Wheelchair",
      "resource2": "Oxygen Cylinder",
      "resouece3": "ECG Machine"
    },
    {
      "id": 2,
      "patient_name": "Saman Fernando",
      "age": 62,
      "gender": "Male",
      "address": "No. 25, Kandy Road, Kandy",
      "contact_information": "+94774567890",
      "emergency_contact_name": "Ranjani Fernando",
      "emergency_contact_number": "+94776543210",
      "admission_status": "Admitted",
      "bed_number": " ",
      "disease": "Diabetes",
      "allergies": "None",
      "doctor_name": "Dr. Anusha Wijeratne",
      "criticality": 3,
      "resource1": "Insulin Pump",
      "resource2": "Blood Glucose Monitor",
      "resouece3": " "
    },
    {
      "id": 3,
      "patient_name": "Mihindu Weerasinghe",
      "age": 30,
      "gender": "Male",
      "address": "No. 15, Galle Road, Galle",
      "contact_information": "+94781234567",
      "emergency_contact_name": "Chathura Weerasinghe",
      "emergency_contact_number": "+94784321098",
      "admission_status": "Discharged",
      "bed_number": "A14",
      "disease": "Fractured Leg",
      "allergies": "Latex",
      "doctor_name": "Dr. Dilrukshi Jayawardena",
      "criticality": 1,
      "resource1": "Crutches",
      "resource2": " ",
      "resouece3": " "
    },
    {
      "id": 4,
      "patient_name": "Anula Ratnayake",
      "age": 54,
      "gender": "Female",
      "address": "No. 30, Matara Road, Matara",
      "contact_information": "+94771230987",
      "emergency_contact_name": "Suranjan Ratnayake",
      "emergency_contact_number": "+94776543219",
      "admission_status": "Bed Assigned",
      "bed_number": "D18",
      "disease": "Pneumonia",
      "allergies": "Sulfa Drugs",
      "doctor_name": "Dr. Mahesh Samarasinghe",
      "criticality": 4,
      "resource1": "Ventilator",
      "resource2": "Nebulizer",
      "resouece3": "IV Fluids"
    },
    {
      "id": 5,
      "patient_name": "Kumari Jayasinghe",
      "age": 38,
      "gender": "Female",
      "address": "No. 42, Jaffna Road, Jaffna",
      "contact_information": "+94791234567",
      "emergency_contact_name": "Suresh Jayasinghe",
      "emergency_contact_number": "+94792345678",
      "admission_status": "Bed Assigned",
      "bed_number": "E10",
      "disease": "Kidney Stones",
      "allergies": "None",
      "doctor_name": "Dr. Nuwan Ekanayake",
      "criticality": 2,
      "resource1": "Ultrasound",
      "resource2": "Catheter",
      "resouece3": " "
    },
    {
      "id": 6,
      "patient_name": "Gayan Senanayake",
      "age": 29,
      "gender": "Male",
      "address": "No. 8, Negombo Road, Negombo",
      "contact_information": "+94783456789",
      "emergency_contact_name": "Ruwan Senanayake",
      "emergency_contact_number": "+94785678901",
      "admission_status": "Admitted",
      "bed_number": " ",
      "disease": "Appendicitis",
      "allergies": "None",
      "doctor_name": "Dr. Shanika Wickramasinghe",
      "criticality": 3,
      "resource1": "Ultrasound",
      "resource2": "IV Fluids",
      "resouece3": " "
    },
    {
      "id": 7,
      "patient_name": "Priyanka Rajapaksha",
      "age": 50,
      "gender": "Female",
      "address": "No. 5, Kurunegala Road, Kurunegala",
      "contact_information": "+94776543210",
      "emergency_contact_name": "Janaka Rajapaksha",
      "emergency_contact_number": "+94774321098",
      "admission_status": "Bed Assigned",
      "bed_number": "C16",
      "disease": "Arthritis",
      "allergies": "None",
      "doctor_name": "Dr. Thilini Perera",
      "criticality": 2,
      "resource1": " ",
      "resource2": " ",
      "resouece3": " "
    },
    {
      "id": 8,
      "patient_name": "Chandana Liyanage",
      "age": 48,
      "gender": "Male",
      "address": "No. 22, Anuradhapura Road, Anuradhapura",
      "contact_information": "+94782345678",
      "emergency_contact_name": "Kumudu Liyanage",
      "emergency_contact_number": "+94787654321",
      "admission_status": "Bed Assigned",
      "bed_number": "A20",
      "disease": "Heart Attack",
      "allergies": "Aspirin",
      "doctor_name": "Dr. Kanchana Jayasuriya",
      "criticality": 5,
      "resource1": "Defibrillator",
      "resource2": "ECG Machine",
      "resouece3": "Oxygen Cylinder"
    },
    {
      "id": 9,
      "patient_name": "Ananda Gunasekara",
      "age": 36,
      "gender": "Male",
      "address": "No. 12, Kalutara Road, Kalutara",
      "contact_information": "+94781230987",
      "emergency_contact_name": "Malani Gunasekara",
      "emergency_contact_number": "+94784321076",
      "admission_status": "Discharged",
      "bed_number": "B15",
      "disease": "Asthma",
      "allergies": "None",
      "doctor_name": "Dr. Isuru Ratnayake",
      "criticality": 1,
      "resource1": "Inhaler",
      "resource2": "Nebulizer",
      "resouece3": "Oxygen Cylinder"
    },
    {
      "id": 10,
      "patient_name": "Sunil Abeysekara",
      "age": 41,
      "gender": "Male",
      "address": "No. 18, Badulla Road, Badulla",
      "contact_information": "+94772345678",
      "emergency_contact_name": "Nadeesha Abeysekara",
      "emergency_contact_number": "+94774321234",
      "admission_status": "Admitted",
      "bed_number": "E12",
      "disease": "Dengue",
      "allergies": "None",
      "doctor_name": "Dr. Amali Wickremasinghe",
      "criticality": 4,
      "resource1": "Platelet Monitor",
      "resource2": "IV Fluids",
      "resouece3": " "
    }
];

export type SortColumn = keyof Patient | '';
export type SortDirection = 'asc' | 'desc' | '';
const rotate: { [key: string]: SortDirection } = { asc: 'desc', desc: '', '': 'asc' };

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

export interface SortEvent {
	column: SortColumn;
	direction: SortDirection;
}

@Directive({
	selector: 'th[sortable]',
	standalone: true,
	host: {
		'[class.asc]': 'direction === "asc"',
		'[class.desc]': 'direction === "desc"',
		'(click)': 'rotate()',
	},
})
export class NgbdSortableHeader {
	@Input() sortable: SortColumn = '';
	@Input() direction: SortDirection = '';
	@Output() sort = new EventEmitter<SortEvent>();

	rotate() {
		this.direction = rotate[this.direction];
		this.sort.emit({ column: this.sortable, direction: this.direction });
	}
}

@Component({
  selector: 'resq-frontend-table',
  imports: [DecimalPipe, NgbdSortableHeader],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  patients = PATIENTS;

  @ViewChildren(NgbdSortableHeader) headers!: QueryList<NgbdSortableHeader>;

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		for (const header of this.headers) {
			if (header.sortable !== column) {
				header.direction = '';
			}
		}

		// sorting countries
		if (direction === '' || column === '') {
			this.patients = PATIENTS;
		} else {
			this.patients = [...PATIENTS].sort((a, b) => {
				const res = compare(a[column], b[column]);
				return direction === 'asc' ? res : -res;
			});
		}
	}
}
