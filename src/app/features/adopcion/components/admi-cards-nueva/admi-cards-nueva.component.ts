import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { adopcion, Adopciones } from '../../services/solicitud-adopcion.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admi-cards-nueva',
  templateUrl: './admi-cards-nueva.component.html',
  styleUrls: ['./admi-cards-nueva.component.scss'] // Asegúrate de usar styleUrls
})
export class AdmiCardsNuevaComponent implements OnInit {
  @Input() adopcion!: Adopciones;

  @Output() eliminar = new EventEmitter<adopcion>();

  constructor(private router: Router) {}

  ngOnInit() {}

  ruta() {
    this.router.navigate(['info-adopcion']);
  }

  /*
  eliminarElemento(event: MouseEvent) {
    event.stopPropagation(); // Evita que el clic propague al routerLink

    this.eliminar.emit(this.adopcion); // Emite el evento para que el componente padre maneje la eliminación
  }
    */
}
