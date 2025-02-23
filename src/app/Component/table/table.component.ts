import { Component, Input, SimpleChanges, ViewChild } from '@angular/core';
import {MatTableDataSource, MatTableModule} from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import {ColumnDefinition} from '../../Model/ColumnDefinition';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule, MatLabel } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'resq-frontend-table',
  imports: [
    MatTableModule, 
    MatPaginatorModule,
    MatSortModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatLabel],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})

export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() columns: ColumnDefinition[] = [];

  tableDataSource = new MatTableDataSource<any>();
  @ViewChild(MatPaginator) paginator !:MatPaginator;

  get displayedColumns(): string[] {
    return this.columns.map(c => c.columnDef);
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['dataSource']) {
      // Update the MatTableDataSource data when the input changes.
      this.tableDataSource.data = this.dataSource;
    }
  }

  ngAfterViewInit(): void {
    // Link the paginator after the view initializes.
    this.tableDataSource.paginator = this.paginator;
  }

  applyFilter(event: KeyboardEvent): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.tableDataSource.filter = filterValue.trim().toLowerCase();
    if (this.tableDataSource.paginator) {
      this.tableDataSource.paginator.firstPage();
    }
  }

}
