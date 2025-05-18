import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatListModule } from '@angular/material/list';
import { MatTableModule } from '@angular/material/table';
import { MatSortModule } from '@angular/material/sort';
import { MatIconModule } from '@angular/material/icon';
import { CommonModule } from '@angular/common';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration, ChartData } from 'chart.js'

interface Admission {
  name: string;
  ward: string;
  criticality: string;
  doctor: string;
}

interface Resource {
  name: string;
  count: number;
  icon: string;
}

interface Patient2 {
  name: string;
  ward: string;
  criticality: string;
  doctor: string;
}

@Component({
  selector: 'resq-frontend-mydashboard',
  templateUrl: './mydashboard.component.html',
  styleUrl: './mydashboard.component.scss',
  imports: [
    CommonModule,
    MatCardModule,
    MatGridListModule,
    MatListModule,
    MatTableModule,
    MatSortModule,
    MatIconModule,
    BaseChartDirective
  ],
})

export class MydashboardComponent implements OnInit { 
  totalPatients = 128;
  totalStaff = 42;
  resources: Resource[] = [
    { name: 'Beds', count: 23, icon: 'hotel' },
    { name: 'Ventilators', count: 7, icon: 'local_pharmacy' },
    { name: 'ICU Units', count: 5, icon: 'local_hospital' },
    { name: 'Oxygen Cylinders', count: 10, icon: 'dock' }
  ];
  onDutyStaff = ['Dr. Kumar', 'Nurse Priya', 'Dr. Aftab', 'Dr. Roy'];

  displayedColumns: string[] = ['name', 'ward', 'criticality', 'doctor'];
  dataSource = new MatTableDataSource<Patient2>([
    { name: 'Rajesh Sharma', ward: '12A', criticality: 'High', doctor: 'Dr. Kumar' },
    { name: 'Anita Verma', ward: '7C', criticality: 'Medium', doctor: 'Dr. Aftab' },
    { name: 'Mohit Singh', ward: '4B', criticality: 'Low', doctor: 'Dr. Roy' }
  ]);

  @ViewChild(MatSort) sort!: MatSort;

  ngOnInit() {
    this.dataSource.sort = this.sort;
  }

  // Bar Chart: Patient Admissions (Last 7 Days)
  barChartData: ChartData<'bar'> = {
    labels: ['May 11', 'May 12', 'May 13', 'May 14', 'May 15', 'May 16', 'May 17'],
    datasets: [
      {
        data: [15, 20, 18, 25, 22, 30, 28],
        label: 'Admissions',
        backgroundColor: ['#00b8a9', '#588d9c', '#155263', '#f1d18a', '#ff9a3c', '#ef5a5a', '#ffc93c'],
        hoverBackgroundColor: ['#2d4f55', '#48737d', '#5e909e', '#e0c077', '#f4ce74', '#842f2f', '#e0d0a7']
      }
    ]
  };

  barChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: { backgroundColor: '#3f51b5' }
    },
    scales: {
      y: {
        type: 'linear',
        beginAtZero: true,
        title: { display: true, text: 'Number of Admissions', color: '#3f51b5' }
      },
      x: {
        type: 'category',
        title: { display: true, text: 'Date', color: '#3f51b5' }
      }
    },
  };

  // Pie Chart: Patients by Disease
  pieChartData: ChartData<'pie'> = {
    labels: ['COVID-19', 'Flu', 'Cardiac', 'Other'],
    datasets: [
      {
        data: [15, 75, 11, 27],
        backgroundColor: ['#620808', '#a53f3f', '#f4ce74', '#ffe9c1'],
        hoverBackgroundColor: ['#4d0606', '#842f2f', '#d6b15a', '#e0d0a7'],
        hoverOffset: 20 // Pop out segment on hover
      }
    ]
  };

  pieChartOptions: ChartConfiguration['options'] = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { position: 'bottom', labels: { color: '#3f51b5' } },
      tooltip: { backgroundColor: '#3f51b5' }
    }
  };
}


