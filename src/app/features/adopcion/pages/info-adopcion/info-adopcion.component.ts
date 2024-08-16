import { Component, Input } from '@angular/core';
import { adopcion } from '../../services/solicitud-adopcion.service';

@Component({
  selector: 'app-info-adopcion',
  templateUrl: './info-adopcion.component.html',
  styleUrls: ['./info-adopcion.component.scss']
})
export class InfoAdopcionComponent {
 
  @Input() adopcion: adopcion = {
    id: 0,
    nombre: '',
    edad: '',
    especie: '',
    raza: '',
    sexo: '',
    estirilizacion: '',
    vacunacion: '',
    telefono: '',
    municipio: '',
    ciudad: '',
    image: ''
  };
  
  mostrarInfo: boolean = true;  // Mostrar información por defecto

  constructor() {}

  mostrarInformacion() {
    this.mostrarInfo = true;
  }

  mostrarHistoria() {
    this.mostrarInfo = false;
  }
}
