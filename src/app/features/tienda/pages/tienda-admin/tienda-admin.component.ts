import { Component } from '@angular/core';
import { productos, ProductoService } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-tienda-admin',
  templateUrl: './tienda-admin.component.html',
  styleUrl: './tienda-admin.component.scss'
})
export class TiendaAdminComponent {
  productos: productos[] = [];
  productosFiltrados: productos[] = [];
  busqueda: string = '';
  categoriaSeleccionada: string = 'Todos'; // Inicialmente, muestra todos los productos

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
  }

  private cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data: productos[]) => {
        this.productos = data;
        this.filtrarProductos(); // Filtra los productos inicialmente
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }

  onCategoriaSeleccionada(categoria: string): void {
    this.categoriaSeleccionada = categoria;
    this.filtrarProductos(); // Filtra los productos según la categoría seleccionada
  }

  onBuscar(busqueda: string): void {
    this.busqueda = busqueda;
    this.filtrarProductos(); // Filtra los productos según la búsqueda
  }

  private filtrarProductos(): void {
    this.productosFiltrados = this.productos
      .filter(producto => {
        // Filtra por categoría
        const coincideCategoria = this.categoriaSeleccionada === 'Todos' ||
                                  producto.categoria.toLowerCase() === this.categoriaSeleccionada.toLowerCase();
        // Filtra por búsqueda
        const coincideBusqueda = producto.nombre.toLowerCase().includes(this.busqueda.toLowerCase());
        
        // Devuelve verdadero si coincide con la categoría y la búsqueda
        return coincideCategoria && coincideBusqueda;
      });
  }
}