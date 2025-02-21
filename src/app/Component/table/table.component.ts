import { Component, Input } from '@angular/core';
import {MatTableModule} from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { CommonModule } from '@angular/common';
import {ColumnDefinition} from '../../Model/ColumnDefinition';
import {MatCardModule} from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'resq-frontend-table',
  imports: [MatTableModule, MatPaginatorModule,MatSortModule,CommonModule,MatCardModule,MatIconModule,MatButtonModule],
  templateUrl: './table.component.html',
  styleUrl: './table.component.scss'
})
export class TableComponent {
  @Input() dataSource: any[] = [];
  @Input() columns: ColumnDefinition[] = [];

  get displayedColumns(): string[] {
    return this.columns.map(c => c.columnDef);
  }
}
