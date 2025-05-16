import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, FormArray, Validators, ReactiveFormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCardModule } from '@angular/material/card';
import { MatDividerModule } from '@angular/material/divider';

import { MasterService } from '../../Service/MasterService';

@Component({
  selector: 'resq-frontend-patient-admission',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatDividerModule,
  ],
  templateUrl: './patient-admission.component.html',
  styleUrls: ['./patient-admission.component.scss'],
})
export class PatientAdmissionComponent implements OnInit {
  patientForm!: FormGroup;
  showForm: boolean = false;

  doctorsOptions: any[] = [];
  resourceOptions: any[] = [];

  criticalityOptions = ['Critical', 'Medium', 'Low'];
  genderOptions = ['Male', 'Female'];
  wardNumberOptions = [1,2,3,4];
  statusOptions = [
    { value: true, label: 'Admitted' },
    { value: false, label: 'Discharged' },
  ];

  @Output() patientAdded = new EventEmitter<any>();
  @Output() closeClicked = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private masterService: MasterService) { }

  ngOnInit(): void {
    this.patientForm = this.fb.group({
      nic: [null, Validators.required],
      firstName: ['', Validators.required],
      lastName: ['', Validators.required],
      age: [null, [Validators.required, Validators.min(0)]],
      address: ['', Validators.required],
      contactNo: ['', Validators.required],
      criticality: ['', Validators.required],
      gender: ['', Validators.required],
      wardNumber: [null, Validators.required],
      admissionStatus: ['', Validators.required],
      assignedDoctor: ['', Validators.required],
      resources: this.fb.array([]),
    });

    this.fetchDoctors();
    this.fetchResources();
  }

  get resources(): FormArray {
    return this.patientForm.get('resources') as FormArray;
  }

  addResource(): void {
    const resourceGroup = this.fb.group({
      resourceId: ['', Validators.required],
      allocatedUnits: [1, [Validators.required, Validators.min(1)]],
    });
    this.resources.push(resourceGroup);
  }

  removeResource(index: number): void {
    this.resources.removeAt(index);
  }

  fetchDoctors(): void {
    this.masterService.getDoctorsOptions().subscribe({
      next: (res) => {
        this.doctorsOptions = res.data;
      },
      error: (err) => console.error('Error fetching doctors:', err),
    });
  }

  fetchResources(): void {
    this.masterService.getResourcesOptions().subscribe({
      next: (res) => {
        this.resourceOptions = res.data.map((item: any) => ({
          value: item.resource_id,
          display: item.category,
        }));
      },
      error: (err) => console.error('Error fetching resources:', err),
    });
  }

  onSubmit(): void {
    if (this.patientForm.invalid) {
      this.patientForm.markAllAsTouched();
      return;
    }

    const formValue = this.patientForm.value;

    const payload = {
      national_id: formValue.nic,
      first_name: formValue.firstName,
      last_name: formValue.lastName,
      age: formValue.age,
      address: formValue.address,
      contact_number: formValue.contactNo,
      criticality: formValue.criticality.toLowerCase(),
      gender: formValue.gender,
      ward_number: formValue.wardNumber,
      admission_status: formValue.admissionStatus,
      assigned_doctor: formValue.assignedDoctor,
      resources: formValue.resources.map((resource: any) => ({
        resourceId: resource.resourceId,
        allocatedUnits: resource.allocatedUnits,
      })),
    };

    console.log('Form Data:', payload);
    this.patientAdded.emit(payload);

    this.masterService.addPatient(payload).subscribe({
      next: (response) => {
        console.log('Patient successfully added:', response);
        this.patientAdded.emit(response); // optionally emit response
      },
      error: (error) => {
        console.error('Error submitting patient data:', error);
      }
    });

  }

  onClose() {
      this.closeClicked.emit();
    }
}
