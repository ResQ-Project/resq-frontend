import { Component } from '@angular/core';
import { TableComponent } from './reusable/table/table.component';
import { PATIENTS } from './patient/patient_details';



@Component({
  selector: 'resq-frontend-root',
  imports: [TableComponent ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  patients = PATIENTS;
}
