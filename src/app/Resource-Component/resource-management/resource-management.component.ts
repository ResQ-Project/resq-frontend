import { Component } from '@angular/core';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { TableComponent } from '../../Component/table/table.component';
import { ColumnDefinition } from '../../Model/ColumnDefinition';
import { Resource } from '../../Model/Resource';
import { MasterService } from '../../Service/MasterService';
import { CommonModule } from '@angular/common';
import { ButtonComponent } from '../../Component/button/button.component';
import { ResourceAddComponent } from "../resource-add-form/resource-add.component";

@Component({
  selector: 'resq-frontend-resource-management',
  imports: [MatPaginatorModule, MatSortModule, TableComponent, CommonModule, ButtonComponent, ResourceAddComponent],
  templateUrl: './resource-management.component.html',
  styleUrl: './resource-management.component.scss'
})
export class ResourceManagementComponent {
  resourcelist !: any[];
  showForm: boolean = false;

  columns: any[] = [
    { columnDef: 'resource_id', header: 'Resource ID', cell: (element: Resource) => `${element.resource_id}` },
    { columnDef: 'category', header: 'Category', cell: (element: Resource) => `${element.category}` },
    { columnDef: 'fullCount', header: 'Total Count', cell: (element: Resource) => `${element.fullCount}` },
    { columnDef: 'availableUnits', header: 'Available Count', cell: (element: Resource) => `${element.availableUnits}` },
    { columnDef: 'actions', header: 'Actions', cell: () => '' },
  ]

  constructor(private service: MasterService) {
    this.service.GetResource().subscribe(res => {
      this.resourcelist = res.data;
    })
  }

  showAdmissionForm() {
    this.showForm = !this.showForm;
  }

  onResourcesAdd(resource: Resource) {
    this.resourcelist = [...this.resourcelist, resource];
    this.showForm = false; // Hide form after submission
  }

  onClose() {
    this.showForm = false;
  }

}
