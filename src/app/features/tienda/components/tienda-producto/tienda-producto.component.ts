import { Component, OnInit } from '@angular/core';
import { ProductoService } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-tienda-producto',
  templateUrl: './tienda-producto.component.html',
  styleUrls: ['./tienda-producto.component.scss']
})
export class TiendaProductoComponent implements OnInit {
  // Variables para el zoom de la imagen
  posX: number = 0;
  posY: number = 0;
  zoomActivo: boolean = false;

  // Variables para manejar la selección de kilogramos y precios
  kilogramos: number[] = [1.5, 4, 8]; // Opciones de kilogramos
  textoKilogramos: string = ''; // Texto inicial para kilogramos
  textoPrecio: string = ''; // Texto inicial para precio
  
  // Precio base por kilogramo
  precioPorKilogramo: number = 10; // Ejemplo: $10 por kilogramo

  // Nueva variable para manejar la cantidad
  cantidad: number = 1;

  // Variable para el botón seleccionado
  kilogramaSeleccionado: number | null = null;

  // Método para manejar el zoom de la imagen
  activarZoom() {
    this.zoomActivo = true;
  }

  desactivarZoom() {
    this.zoomActivo = false;
    this.posX = 0;
    this.posY = 0;
  }

  moverImagen(event: MouseEvent) {
    if (this.zoomActivo) {
      const contenedor = event.currentTarget as HTMLElement;
      const { left, top, width, height } = contenedor.getBoundingClientRect();

      // Calcular la posición del mouse dentro del contenedor
      const x = event.clientX - left;
      const y = event.clientY - top;

      // Calcular la posición de la imagen basada en el mouse
      this.posX = ((x / width) * 100) - 50;
      this.posY = ((y / height) * 100) - 50;
    }
  }

  // Método para actualizar el texto y precio al seleccionar un kilogramo
  seleccionarKilogramos(kg: number) {
    this.textoKilogramos = `${kg} kg.`; 
    this.textoPrecio = `Precio: $${kg * this.precioPorKilogramo}.00`;
    this.kilogramaSeleccionado = kg; // Establecer el botón seleccionado
  }

  // Método para cambiar la cantidad
  cambiarCantidad(cambio: number) {
    this.cantidad += cambio;
    if (this.cantidad < 1) {
      this.cantidad = 1;
    }
  }

  selectedTab: string = 'info'; // Pestaña seleccionada por defecto

  // Método para seleccionar una pestaña
  selectTab(tab: string) {
    this.selectedTab = tab;
  }

  items: any[] = []; // Lista de ítems para el carrusel
  currentIndex: number = 0;

  constructor(private productoService: ProductoService) {}

  ngOnInit(): void {
    this.cargarProductos();
    setInterval(() => this.showSlide(this.currentIndex + 1), 5000); // Auto-slide functionality

    // Seleccionar el primer kilogramo al iniciar
    this.kilogramaSeleccionado = this.kilogramos[0];
    this.seleccionarKilogramos(this.kilogramaSeleccionado);
  }

  private cargarProductos(): void {
    this.productoService.getProductos().subscribe({
      next: (data: any[]) => {
        this.items = data; // Asegúrate de que `data` tenga el formato adecuado
      },
      error: (err) => {
        console.error('Error al obtener productos', err);
      }
    });
  }

  showSlide(index: number) {
    const items = document.querySelectorAll('.carousel-item') as NodeListOf<HTMLElement>;
    const innerCarousel = document.querySelector('.carousel-inner') as HTMLElement;

    if (items.length === 0) return;

    // Asegúrate de que el índice esté dentro del rango
    const totalVisibleItems = 3;
    const totalItems = items.length;
    const maxIndex = totalItems - totalVisibleItems;

    if (index > maxIndex) {
      this.currentIndex = 0; // Volver al inicio si se supera el límite
    } else if (index < 0) {
      this.currentIndex = maxIndex; // Ir al final si es menor que 0
    } else {
      this.currentIndex = index;
    }

    innerCarousel.style.transform = `translateX(-${this.currentIndex * (100 / totalVisibleItems)}%)`;
  }

  prevSlide() {
    this.showSlide(this.currentIndex - 1);
  }

  nextSlide() {
    this.showSlide(this.currentIndex + 1);
  }}