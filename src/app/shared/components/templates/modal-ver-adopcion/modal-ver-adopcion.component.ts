import { Component, EventEmitter, Output, Input } from '@angular/core';
import { AdopcionesVerify } from '../../../../features/adopcion/services/solicitud-adopcion.service';

@Component({
  selector: 'app-modal-ver-adopcion',
  templateUrl: './modal-ver-adopcion.component.html',
  styleUrl: './modal-ver-adopcion.component.scss'
})
export class ModalVerAdopcionComponent {
@Input() datos!: AdopcionesVerify;
@Output() close = new EventEmitter<void>();

  closemodaladopcion(){
    this.close.emit();
  }
}
