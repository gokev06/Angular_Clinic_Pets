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

  openWhatsApp() {
    window.open('https://wa.me/+573127544092?text=¡Hola!%20Estoy%20interesado%20en%20recibir%20más%20información%20sobre%20el%20proceso%20de%20adopción.%20¿Podrías%20ayudarme%20con%20eso,%20por%20favor?%20¡Gracias!', '_blank');
  }
  
}
