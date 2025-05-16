import { Component, ViewChild } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule, MatIconButton } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { RouterLink, RouterLinkActive, RouterModule, RouterOutlet } from '@angular/router';
import { SharedService } from '../Service/shared.service';
import { MatSidenav } from '@angular/material/sidenav';

@Component({
  selector: 'resq-frontend-menubar',
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconButton,
    MatIconModule,
    MatSidenavModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    RouterOutlet,
    RouterModule,
    MatMenuModule,
  ],
  templateUrl: './menubar.component.html',
  styleUrls: ['./menubar.component.scss']
})
export class MenubarComponent {
  @ViewChild('drawer') drawer!: MatSidenav; // Reference to the drawer

  constructor(private sharedService: SharedService) {}

  ngAfterViewInit() {
    this.sharedService.setDrawer(this.drawer); // Set drawer in service
  }

  toggleMenu() {
    this.sharedService.toggleMenu(); // Use service to toggle menu and drawer
  }
}