import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatChipsModule } from '@angular/material/chips';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatIconModule } from '@angular/material/icon';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { MasterService } from '../Service/MasterService';

@Component({
  selector: 'resq-frontend-chips-autocomplete',
  imports: [
    CommonModule,
    FormsModule,
    MatChipsModule,
    MatFormFieldModule,
    MatAutocompleteModule,
    MatIconModule],
  templateUrl: './chips-autocomplete.component.html',
  styleUrl: './chips-autocomplete.component.scss'
})


export class ChipsAutocompleteComponent {

  @Input() label: string = 'Hospital Resources';
  @Input() apiEndpoint: string = '';
  @Output() selectionChange = new EventEmitter<string[]>();

  separatorKeysCodes: number[] = [ENTER, COMMA];
  resourceCtrl = new FormControl('');
  filteredResources: Observable<string[]>;
  selectedResources: string[] = [];
  allResources: string[] = [];
  currentResource: string = '';
  isLoading: boolean = false;
  error: string | null = null;

  constructor(private masterService: MasterService) {
    this.filteredResources = this.resourceCtrl.valueChanges.pipe(
      startWith(''),
      map((resource: string | null) => this._filter(resource || ''))
    );
  }

  ngOnInit(): void {
    if (this.apiEndpoint) {
      this.isLoading = true;
      this.masterService.getResourcesOptions().subscribe({
        next: (resources: any) => {
          console.log(resources)
          this.allResources = ['apple', 'orange'];
          this.selectedResources = [];
          this.isLoading = false;
        },
        error: (error:any) => {
          this.error = `Failed to load ${this.label} options`;
          this.isLoading = false;
          console.error(`Error fetching ${this.apiEndpoint}:`, error);
        }
      });
    }
  }

  add(event: MatChipInputEvent): void {
    const value = (event.value || '').trim();
    if (value && this.allResources.includes(value) && !this.selectedResources.includes(value)) {
      this.selectedResources.push(value);
      this.selectionChange.emit(this.selectedResources);
    }
    event.chipInput!.clear();
    this.resourceCtrl.setValue('');
    this.currentResource = '';
  }

  remove(resource: string): void {
    const index = this.selectedResources.indexOf(resource);
    if (index >= 0) {
      this.selectedResources.splice(index, 1);
      this.selectionChange.emit(this.selectedResources);
    }
  }

  selected(event: MatAutocompleteSelectedEvent): void {
    const value = event.option.value;
    if (!this.selectedResources.includes(value)) {
      this.selectedResources.push(value);
      this.selectionChange.emit(this.selectedResources);
    }
    this.currentResource = '';
    this.resourceCtrl.setValue('');
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.allResources.filter(resource => 
      resource.toLowerCase().includes(filterValue) && 
      !this.selectedResources.includes(resource)
    );
  }
}

