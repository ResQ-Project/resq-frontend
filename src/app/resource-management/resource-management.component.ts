import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from '../Component/table/table.component';
import { ColumnDefinition } from '../Model/ColumnDefinition';
import { Resource } from '../Model/Resource';
import { MasterService } from '../Service/MasterService';
import { ButtonComponent } from '../Component/button/button.component';

@Component({
  selector: 'resq-frontend-resource-management',
  imports: [MatPaginatorModule,MatSortModule,TableComponent,ButtonComponent],
  templateUrl: './resource-management.component.html',
  styleUrl: './resource-management.component.scss'
})
export class ResourceManagementComponent {
    resourcelist !: any[];
    columns: any[] = [
      { columnDef: 'resource_id', header: 'Resource ID', cell: (element: Resource) => `${element.resource_id}` },
          { columnDef: 'category', header: 'Category', cell: (element: Resource) => `${element.category}` },
          { columnDef: 'fullCount', header: 'Total Count', cell: (element: Resource) => `${element.fullCount}` },
          { columnDef: 'availableUnits', header: 'Available Count', cell: (element: Resource) => `${element.availableUnits}` },
          { columnDef: 'actions', header: 'Actions', cell: () => '' },
    ]

    constructor(private service:MasterService){
        this.service.GetResource().subscribe(res=>{
          this.resourcelist = res.data;
        })
       }
}
