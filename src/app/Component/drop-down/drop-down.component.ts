import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MasterService } from '../../Service/MasterService';
import { DropdownOption } from '../../Model/DropDownOption';
import { FormsModule } from '@angular/forms';


@Component({
  selector: 'resq-frontend-drop-down',
  imports: [MatFormFieldModule, MatInputModule, MatSelectModule, FormsModule, CommonModule],
  templateUrl: './drop-down.component.html',
  styleUrl: './drop-down.component.scss'
})

export class DropDownComponent implements OnInit {
  @Input() label: string = "Select an Option";
  @Input() apiEndpoint : string = '';
  @Output() selectionChange = new EventEmitter<string>();

  options: DropdownOption[] = [];
  selectedValue: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private apiService: MasterService) {}

  ngOnInit() {
    this.options = []; // Ensure options is initialized
    if (this.apiEndpoint) {
      this.isLoading = true;
      this.apiService.getDropdownOptions(this.apiEndpoint).subscribe({
        next: (data: DropdownOption[]) => {
          this.options = data || []; // Ensure options is always an array
          this.isLoading = false;
          console.log(`${this.apiEndpoint} options:`, this.options);
        },
        error: (error) => {
          this.error = `Failed to load ${this.label} options`;
          this.isLoading = false;
          console.error(`Error fetching ${this.apiEndpoint}:`, error);
        }
      });
    }
  }

  onSelectionChange(event: any) {
    this.selectedValue = event.value;
    this.selectionChange.emit(this.selectedValue);
  }

}
