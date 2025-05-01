import { Component,Input, forwardRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'resq-frontend-select-options',
  imports: [ CommonModule, MatFormFieldModule, MatSelectModule, ReactiveFormsModule ],
  templateUrl: './select-options.component.html',
  styleUrl: './select-options.component.scss'
})
export class SelectOptionsComponent {
  @Input() label: string = 'Select an option';
  @Input() options: string[] = []; // List of dropdown options

  value: string = '';
  disabled: boolean = false;
  onChange: (value: string) => void = () => {};
  onTouched: () => void = () => {};

  writeValue(value: string): void {
    this.value = value;
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  onSelectionChange(event: any): void {
    const value = event.value;
    this.value = value;
    this.onChange(value);
  }
}
