import { Component ,Input, Output, EventEmitter, forwardRef } from '@angular/core';
import { NG_VALUE_ACCESSOR,ReactiveFormsModule, FormControl } from '@angular/forms';
import { RadioOption } from '../../Model/RadioOption';
import { CommonModule } from '@angular/common';
import { MatRadioModule } from '@angular/material/radio';
import {MatCardModule} from '@angular/material/card';


@Component({
  selector: 'resq-frontend-radio-button',
  imports: [CommonModule, ReactiveFormsModule, MatRadioModule, MatCardModule],
  templateUrl: './radio-button.component.html',
  styleUrl: './radio-button.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RadioButtonComponent),
      multi: true,
    },
  ],
})
export class RadioButtonComponent {

  @Input() label: string = '';
  @Input() options: RadioOption[] = [];
  @Input() name: string = 'radioGroup';
  @Output() selectionChange = new EventEmitter<string>();

  radioControl = new FormControl('');

  private innerValue: string = '';
  private onChange: (value: string) => void = () => {};
  private onTouched: () => void = () => {};

  get value(): string {
    return this.innerValue;
  }

  set value(val: string) {
    if (val !== this.innerValue) {
      this.innerValue = val;
      this.radioControl.setValue(val, { emitEvent: false });
      this.onChange(val);
      this.onTouched();
      this.selectionChange.emit(val);
    }
  }

  writeValue(value: string): void {
    this.innerValue = value;
    this.radioControl.setValue(value, { emitEvent: false });
  }

  registerOnChange(fn: (value: string) => void): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: () => void): void {
    this.onTouched = fn;
  }

  onSelectionChange(value: string): void {
    this.value = value;
  }

}
