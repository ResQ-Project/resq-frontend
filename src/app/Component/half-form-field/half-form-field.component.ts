import { Component, Input } from '@angular/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';


@Component({
  selector: 'resq-frontend-half-form-field',
  imports: [MatFormFieldModule, MatInputModule],
  templateUrl: './half-form-field.component.html',
  styleUrl: './half-form-field.component.scss'
})

export class HalfFormFieldComponent {
 @Input() label: string = "Default Label";
}
