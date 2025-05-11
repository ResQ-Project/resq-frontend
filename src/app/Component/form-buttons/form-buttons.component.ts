import { Component,EventEmitter, Output } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'resq-frontend-form-buttons',
  imports: [CommonModule, MatButtonModule],
  templateUrl: './form-buttons.component.html',
  styleUrl: './form-buttons.component.scss'
})
export class FormButtonsComponent {
  @Output() submitClicked = new EventEmitter<void>();
  @Output() closeClicked = new EventEmitter<void>();

  onSubmitClick() {
    this.submitClicked.emit();
  }

  onCloseClick() {
    this.closeClicked.emit();
  }
}
