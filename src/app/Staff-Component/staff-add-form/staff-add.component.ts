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
  selector: 'resq-frontend-staff-add',
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
  templateUrl: './staff-add.component.html',
  styleUrls: ['./staff-add.component.scss'],
})
export class StaffAddComponent implements OnInit {
  staffForm!: FormGroup;
  showForm: boolean = false;
 
  @Output() staffAdded = new EventEmitter<any>();
  @Output() closeClicked = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private masterService: MasterService) { }

  ngOnInit(): void {
    this.staffForm = this.fb.group({
      staff_id: [null, Validators.required],
      national_id: ['', Validators.required],
      first_name: ['', Validators.required],
      last_name: ['', Validators.required],
      age: [null, Validators.required],
      occupation: ['', Validators.required],
      speciality: ['', Validators.required],
    });

  }

  onSubmit(): void {
    if (this.staffForm.invalid) {
      this.staffForm.markAllAsTouched();
      return;
    }

    const formValue = this.staffForm.value;

    const payload = {
      staff_id: formValue.staff_id,
      national_id: formValue.national_id,
      first_name: formValue.first_name,
      last_name: formValue.last_name,
      age: formValue.age,
      occupation: formValue.occupation,
      speciality: formValue.speciality
    };

    console.log('Form Data:', payload);
    this.staffAdded.emit(payload);

    this.masterService.addStaffMember(payload).subscribe({
      next: (response) => {
        console.log('Staff Member successfully added:', response);
        this.staffAdded.emit(response); // optionally emit response
      },
      error: (error) => {
        console.error('Error submitting Staff Member data:', error);
      }
    });

  }

  onClose(): void {
    this.closeClicked.emit();
  }
}
