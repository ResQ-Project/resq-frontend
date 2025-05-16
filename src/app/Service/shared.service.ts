import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { MatSidenav } from '@angular/material/sidenav';

@Injectable({
  providedIn: 'root'
})
export class SharedService {
  private showMenuSubject = new BehaviorSubject<boolean>(false);
  showMenu$: Observable<boolean> = this.showMenuSubject.asObservable();
  private drawer: MatSidenav | null = null;

  // Set the drawer instance
  setDrawer(drawer: MatSidenav) {
    this.drawer = drawer;
  }

  // Toggle menu and drawer
  toggleMenu() {
    this.showMenuSubject.next(!this.showMenuSubject.value);
    if (this.drawer) {
      this.drawer.toggle();
    }
  }

  // Set menu state and sync drawer
  setMenuState(state: boolean) {
    this.showMenuSubject.next(state);
    if (this.drawer) {
      state ? this.drawer.open() : this.drawer.close();
    }
  }

  // Get current menu state
  getMenuState(): boolean {
    return this.showMenuSubject.value;
  }
}