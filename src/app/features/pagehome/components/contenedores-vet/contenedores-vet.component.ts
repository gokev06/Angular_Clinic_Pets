import { Component } from '@angular/core';

@Component({
  selector: 'app-contenedores-vet',
  templateUrl: './contenedores-vet.component.html',
  styleUrl: './contenedores-vet.component.scss'
})
export class ContenedoresVetComponent {

  public drawerOpen: boolean = false;

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}
