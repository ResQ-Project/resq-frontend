import { Component, OnInit,Output, EventEmitter } from '@angular/core';
import { FormComponent } from '../Component/form/form.component';
import { FormFieldComponent } from '../Component/form-field/form-field.component';
import { DropDownComponent } from '../Component/drop-down/drop-down.component';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MasterService } from '../Service/MasterService';
import { DropdownOption } from '../Model/DropDownOption';
import { Patient } from '../Model/Patient';
import { MatButtonModule } from '@angular/material/button';
import { SelectOptionsComponent } from '../Component/select-options/select-options.component';
import { RadioButtonComponent } from '../Component/radio-button/radio-button.component';
import { RadioOption } from '../Model/RadioOption';
import { FormButtonsComponent } from '../Component/form-buttons/form-buttons.component';
import { ChipsAutocompleteComponent } from '../chips-autocomplete/chips-autocomplete.component';

@Component({
  selector: 'resq-frontend-patient-admission',
  imports: [
    FormComponent, 
    FormFieldComponent,  
    DropDownComponent, 
    ReactiveFormsModule,
    CommonModule,
    MatButtonModule,
    SelectOptionsComponent,
    RadioButtonComponent,
    FormButtonsComponent,
    ChipsAutocompleteComponent
  ],
  templateUrl: './patient-admission.component.html',
  styleUrl: './patient-admission.component.scss'
})

export class PatientAdmissionComponent implements OnInit {
  patientForm: FormGroup;

  doctorsOptions: DropdownOption[] = [];

  criticallityOptions = [
    { "value": "low", "display": "Low" },
    { "value": "medium", "display": "Medium" },
    { "value": "high", "display": "High" }
  ]

  genderOptions = ['Male', 'Female' ]

  wardNumberOptions = ['1A', '1B', '2A', '2B']

  criticalityOptions = ['High', 'Medium', 'Low']

  statusOptions: RadioOption[] = [
    { value: 'admitted', label: 'Admitted' },
    { value: 'discharged', label: 'Discharged' },
  ];

  selectedStatus: string = this.statusOptions[0].value;


  @Output() patientAdded = new EventEmitter<Patient>();
  @Output() closeClicked = new EventEmitter<void>();

  constructor(private fb: FormBuilder , private masterService: MasterService) {
    this.patientForm = this.fb.group({
      nic: ['', Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: ['', [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      contactNo: ['', Validators.required],
      criticality: ['', Validators.required],
      gender: ['', Validators.required],
      wardNumber: ['', Validators.required],
      admissionStatus: ['', Validators.required],
      assignedDoctor: ['', Validators.required],
      resourceId: ['', Validators.required],
      allocatedUnits: [0, [Validators.required, Validators.min(0)]]
    });
  }

  ngOnInit() {
    this.masterService.getDropdownOptions('assignedDoctor').subscribe({
      next: (options) => {
        this.doctorsOptions = options;
      },
      error: (error) => {
        console.error('Error fetching doctor options:', error);
      }
    });
  }

  onCriticalityChange(value: string) {
    this.patientForm.get('criticality')?.setValue(value);
  }

  onGenderChange(value: string) {
    this.patientForm.get('gender')?.setValue(value);
  }
  
  onAdmissionStatusChange(value: string) {
    this.patientForm.get('admissionStatus')?.setValue(value);
  }
  
  onAssignedDoctorChange(value: string) {
    this.patientForm.get('assignedDoctor')?.setValue(value);
  }

  onStatusChange(value: string) {
    this.patientForm.get('admissionStatus')?.setValue(value);
  }

  onResourcesChange(value: any) {
    this.patientForm.get('resourceId')?.setValue(value);
  }

  onSubmit() {
    if (this.patientForm.valid) {
      const patient: Patient = {
        national_id: this.patientForm.get('nic')?.value,
        first_name: this.patientForm.get('firstName')?.value,
        last_name: this.patientForm.get('lastName')?.value,
        age: this.patientForm.get('age')?.value,
        address: this.patientForm.get('address')?.value,
        contact_number: this.patientForm.get('contactNo')?.value,
        criticality: this.patientForm.get('criticality')?.value,
        gender: this.patientForm.get('gender')?.value,
        ward_number: this.patientForm.get('wardNumber')?.value,
        admission_status: this.patientForm.get('admissionStatus')?.value,
        assigned_doctor: this.patientForm.get('assignedDoctor')?.value,
        resourceId: this.patientForm.get('resourceId')?.value,
        allocatedUnits: this.patientForm.get('allocatedUnits')?.value
      };
      this.masterService.addPatient(patient).subscribe({
        next: (response) => {
          this.patientAdded.emit(response); // Emit the new patient
          this.patientForm.reset(); // Reset form
        },
        error: (error) => {
          console.error('Error adding patient:', error);
        }
      });
    }
  }

  onClose() {
    this.closeClicked.emit();
  }

}
