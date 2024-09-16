import { Component, EventEmitter, Output } from '@angular/core';
@Component({
  selector: 'app-header-inventario',
  templateUrl: './header-inventario.component.html',
  styleUrl: './header-inventario.component.scss'
})
export class HeaderInventarioComponent {
  busqueda: string = '';

  @Output() buscar = new EventEmitter<string>();

  buscarProductos(): void {
    this.buscar.emit(this.busqueda.trim()); // Emitir el término de búsqueda
  }
  crearProducto() {
    // Lógica para crear un nuevo producto
  }
}
