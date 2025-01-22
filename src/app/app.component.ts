import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenubarComponent } from './menubar/menubar.component';

@Component({
  selector: 'resq-frontend-root',
  imports: [RouterOutlet,MenubarComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  
}
