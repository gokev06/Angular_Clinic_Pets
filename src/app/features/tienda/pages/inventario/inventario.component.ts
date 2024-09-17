import { Component } from '@angular/core';
import { ProductoService, DataResponse } from '../../services/producto-tienda.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.component.html',
  styleUrl: './inventario.component.scss'
})
export class InventarioComponent {
  productos: DataResponse[] = [];
  productosFiltrados: DataResponse [] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = 'Todos'; // Inicialmente, muestra todos los productos

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
   this.cargarProductos();
  }


  private cargarProductos(): void {
   this.productoService.getDataProducts().pipe(
    tap(data => console.log('Productos cargados:', data))
   ).subscribe({
    next: (data: DataResponse[]) =>{
      this.productos = data;
      this.filtrarProductos();
    },
    error: (err) => {
      console.error('Error al obtener productos', err);

    }
   })
  }


  onCategoriaSeleccionada(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.filtrarProductos();
  }

  onBuscar(busqueda: string): void {
    this.busqueda = busqueda;
    this.filtrarProductos();
  }



  private filtrarProductos(): void {
    this.productosFiltrados = this.productos
     .filter( producto => {
      const coincideCategoria = this.categoriaSeleccionada === 'Todos' ||
                                producto.categoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase();
      const coincideBusqueda =  producto.nombreProducto.toLowerCase().includes(this.busqueda.toLowerCase());
      return coincideCategoria && coincideBusqueda;
     })
  }



}
