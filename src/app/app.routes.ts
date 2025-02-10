import { Routes } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';
import { DashboardComponent } from './dashboard/dashboard.component';
import { ResourceManagementComponent } from './resource-management/resource-management.component';
import { PatientManagementComponent } from './patient-management/patient-management.component';
import { StaffManagementComponent } from './staff-management/staff-management.component';

export const routes: Routes = [
    {path: 'menubar', component:MenubarComponent},
    {path: 'patient-management', component:PatientManagementComponent},
    {path: 'resource-management', component:ResourceManagementComponent},
    {path: 'staff-management', component:StaffManagementComponent},
    {path: '', component:DashboardComponent},

];
