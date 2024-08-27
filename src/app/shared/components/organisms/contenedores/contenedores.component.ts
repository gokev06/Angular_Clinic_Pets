import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.component.html',
  styleUrls: ['./contenedores.component.scss']
})
export class ContenedoresComponent {
  @Input() title: string = "Agendar citas";
  @Input() ruta: string = "/citas";
  @Input() estilo: string = "";

  public drawerOpen: boolean = false;

  toggleDrawer() {
    this.drawerOpen = !this.drawerOpen;
  }
}