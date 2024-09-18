import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header-inventario',
  templateUrl: './header-inventario.component.html',
  styleUrl: './header-inventario.component.scss'
})
export class HeaderInventarioComponent {
  busqueda: string = '';

  @Output() buscar = new EventEmitter<string>();
  constructor(private router: Router){}

  buscarProductos(): void {
    this.buscar.emit(this.busqueda.trim()); // Emitir el término de búsqueda
  }
  crearProducto() {
    let editarProducto = 'false'
    sessionStorage.setItem('EditProduct', editarProducto );
    sessionStorage.setItem('adminInventario', 'true')
    this.router.navigate(['/subir-producto'])
  }
}
