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
  selector: 'resq-frontend-resource-add',
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
  templateUrl: './resource-add.component.html',
  styleUrls: ['./resource-add.component.scss'],
})
export class ResourceAddComponent implements OnInit {
  resourceForm!: FormGroup;
 
  @Output() resourceAdded = new EventEmitter<any>();
  @Output() closeClicked = new EventEmitter<void>();

  constructor(private fb: FormBuilder, private masterService: MasterService) { }

  ngOnInit(): void {
    this.resourceForm = this.fb.group({
      resource_id: [null, Validators.required],
      category: ['', Validators.required],
      fullCount: [null, Validators.required],
      availableUnits: [null, Validators.required],
    });

  }

  onSubmit(): void {
    if (this.resourceForm.invalid) {
      this.resourceForm.markAllAsTouched();
      return;
    }

    const formValue = this.resourceForm.value;

    const payload = {
      resource_id: formValue.resource_id,
      category: formValue.category,
      fullCount: formValue.fullCount,
      availableUnits: formValue.availableUnits
    };

    console.log('Form Data:', payload);
    this.resourceAdded.emit(payload);

    this.masterService.addResource(payload).subscribe({
      next: (response) => {
        console.log('Resource successfully added:', response);
        this.resourceAdded.emit(response); // optionally emit response
      },
      error: (error) => {
        console.error('Error submitting Resource data:', error);
      }
    });

  }

  onClose(): void {
    this.closeClicked.emit();
  }
}
