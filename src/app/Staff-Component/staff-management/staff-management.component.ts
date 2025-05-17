import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from '../../Component/table/table.component';
import { ColumnDefinition } from '../../Model/ColumnDefinition';
import { Staff } from '../../Model/Staff';
import { MasterService } from '../../Service/MasterService';
import { ButtonComponent } from '../../Component/button/button.component';
import { CommonModule } from '@angular/common';
import { StaffAddComponent } from '../staff-add-form/staff-add.component';
import { SharedService } from '../../Service/shared.service';


@Component({
  selector: 'resq-frontend-staff-management',
  imports: [MatPaginatorModule, MatSortModule, TableComponent, CommonModule, ButtonComponent, StaffAddComponent],
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.scss'
})
export class StaffManagementComponent {
  stafflist !: any[];
  showForm: boolean = false;

  columns: any[] = [
    { columnDef: 'staff_id', header: 'Staff ID', cell: (element: Staff) => `${element.staff_id}` },
    { columnDef: 'national_id', header: 'NIC', cell: (element: Staff) => `${element.national_id}` },
    { columnDef: 'first_name', header: 'First Name', cell: (element: Staff) => `${element.first_name}` },
    { columnDef: 'last_name', header: 'Last Name', cell: (element: Staff) => `${element.last_name}` },
    { columnDef: 'age', header: 'Age', cell: (element: Staff) => `${element.age}` },
    { columnDef: 'occupation', header: 'Occupation', cell: (element: Staff) => `${element.occupation}` },
    { columnDef: 'speciality', header: 'Speciality', cell: (element: Staff) => `${element.speciality}` },
    { columnDef: 'actions', header: 'Actions', cell: () => '' },
  ]

  constructor(private service: MasterService, private sharedService: SharedService) {
    this.service.GetStaff().subscribe(res => {
      this.stafflist = res.data;
    })
  }


  showAdmissionForm() {
    this.showForm = !this.showForm;
    this.sharedService.setMenuState(false);
  }

  onStaffAdd(staffMember: Staff) {
    this.stafflist = [...this.stafflist, staffMember];
    this.showForm = false; // Hide form after submission
    this.sharedService.setMenuState(false); // Keep menu closed after submission
  }

  onFormClose() {
    this.showForm = false;
    this.sharedService.setMenuState(true); // Open menu and drawer
  }

}
