import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from '../../Component/table/table.component';
import { ColumnDefinition } from '../../Model/ColumnDefinition';
import { Staff } from '../../Model/Staff';
import { MasterService } from '../../Service/MasterService';
import { ButtonComponent } from '../../Component/button/button.component';

@Component({
  selector: 'resq-frontend-staff-management',
  imports: [MatPaginatorModule,MatSortModule,TableComponent, ButtonComponent],
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.scss'
})
export class StaffManagementComponent {
  stafflist !: any[];
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

      constructor(private service:MasterService){
          this.service.GetStaff().subscribe(res=>{
            this.stafflist = res.data;
          })
         }

}
