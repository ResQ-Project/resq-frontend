import { Component } from '@angular/core';
import { MenubarComponent } from './menubar/menubar.component';


@Component({
  selector: 'resq-frontend-root',
  imports: [MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  showMenubar = true;
}
