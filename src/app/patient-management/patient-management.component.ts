import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { TableComponent } from '../Component/table/table.component';
import { MatSortModule } from '@angular/material/sort';
import { ColumnDefinition } from '../Model/ColumnDefinition';
import { Patient } from '../Model/Patient';
import { MasterService } from '../Service/MasterService';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../Component/button/button.component';
import { FormComponent } from '../Component/form/form.component';
import { FormFieldComponent } from '../Component/form-field/form-field.component';
import { HalfFormFieldComponent } from '../Component/half-form-field/half-form-field.component';

@Component({
  selector: 'resq-frontend-patient-management',
  imports: [MatPaginatorModule,MatSortModule,TableComponent,CommonModule,ButtonComponent, FormComponent, FormFieldComponent, HalfFormFieldComponent],
  templateUrl: './patient-management.component.html',
  styleUrl: './patient-management.component.scss'
})
export class PatientManagementComponent {

  patientlist !: Patient[];
  columns: ColumnDefinition[] = [
    { columnDef: 'national_id', header: 'NIC', cell: (element: Patient) => `${element.national_id}` },
    { columnDef: 'first_name', header: 'First Name', cell: (element: Patient) => `${element.first_name}` },
    { columnDef: 'last_name', header: 'Last Name', cell: (element: Patient) => `${element.last_name}` },
    { columnDef: 'age', header: 'Age', cell: (element: Patient) => `${element.age}` },
    { columnDef: 'address', header: 'Address', cell: (element: Patient) => `${element.address}` },
    { columnDef: 'contact_number', header: 'Contact No.', cell: (element: Patient) => `${element.contact_number}` },
    { columnDef: 'ward_number', header: 'Ward No.', cell: (element: Patient) => `${element.ward_number}` },
    { columnDef: 'criticality', header: 'Criticality', cell: (element: Patient) => `${element.criticality}` },
    { columnDef: 'admission_status', header: 'Admission Status', cell: (element: Patient) => `${element.admission_status}` },
    { columnDef: 'assigned_doctor', header: 'Assigned Doctor', cell: (element: Patient) => `${element.assigned_doctor}` },
    { columnDef: 'resourceId', header: 'Resource ID', cell: (element: Patient) => `${element.resourceId}` },
    { columnDef: 'allocatedUnits', header: 'Resource Count', cell: (element: Patient) => `${element.allocatedUnits}` },
    { columnDef: 'actions', header: 'Actions', cell: () => '' },
  ]

  constructor(private service:MasterService){
    this.service.GetPatient().subscribe(res=>{
      this.patientlist = res;
    })
   }

}
