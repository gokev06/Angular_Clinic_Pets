import { Component, EventEmitter, Output } from '@angular/core';
import { productos, ProductoService } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-header-tienda',
  templateUrl: './header-tienda.component.html',
  styleUrl: './header-tienda.component.scss'
})
export class HeaderTiendaComponent {
  busqueda: string = '';
  productos: productos[] = [];

  @Output() buscar = new EventEmitter<string>();
  constructor(private productosService: ProductoService) {}

  ngOnInit(): void {
    this.productosService.getProductos().subscribe(data => {
      this.productos = data;
      console.log('Datos cargados:', this.productos);
    });
  }
  buscarProductos(): void {
    this.buscar.emit(this.busqueda.trim()); // Emitir el término de búsqueda
  }

  isModalOpen = false;

  showmodal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }
  
}
