import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-ver-adopcion',
  templateUrl: './modal-ver-adopcion.component.html',
  styleUrl: './modal-ver-adopcion.component.scss'
})
export class ModalVerAdopcionComponent {
  
  @Output() close = new EventEmitter<void>();
  closemodaladopcion(){
    this.close.emit();
  }
}
