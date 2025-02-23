import { Component } from '@angular/core';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule, MatIconButton} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { RouterModule, RouterOutlet } from '@angular/router';

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
  styleUrl: './menubar.component.scss'
})
export class MenubarComponent {

}
