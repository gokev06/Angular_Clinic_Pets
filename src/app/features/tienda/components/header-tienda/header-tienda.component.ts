import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrl: './header-tienda.component.scss'
})
export class HeaderTiendaComponent {
  busqueda: string = '';

  @Output() buscar = new EventEmitter<string>();

  buscarProductos(): void {
    this.buscar.emit(this.busqueda.trim()); // Emitir el término de búsqueda
  }
}
