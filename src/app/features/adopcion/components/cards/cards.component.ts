import { Component, Input } from '@angular/core';
import { adopcion } from '../../services/solicitud-adopcion.service'; 

@Component({
  selector: 'app-cards',
  templateUrl: './cards.component.html',
  styleUrls: ['./cards.component.scss']
})
export class CardsComponent {
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

  constructor() {}
}
