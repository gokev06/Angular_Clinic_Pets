import { Component } from '@angular/core';

@Component({
  selector: 'app-pages-nuevaadopcion',
  templateUrl: './pages-nuevaadopcion.component.html',
  styleUrls: ['./pages-nuevaadopcion.component.scss']
})
export class PagesNuevaadopcionComponent {
  datosFormulario: any = {};

  recibirDatos(datos: any) {
    this.datosFormulario = datos;
  }
}

