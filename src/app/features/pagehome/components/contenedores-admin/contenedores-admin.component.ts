import { Component } from '@angular/core';

@Component({
  selector: 'app-contenedores-admin',
  templateUrl: './contenedores-admin.component.html',
  styleUrl: './contenedores-admin.component.scss'
})
export class ContenedoresAdminComponent {
  public drawerOpen: boolean = false;

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}
