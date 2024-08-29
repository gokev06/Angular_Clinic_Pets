import { Component } from '@angular/core';

@Component({
  selector: 'app-tienda-producto',
  templateUrl: './tienda-producto.component.html',
  styleUrls: ['./tienda-producto.component.scss']
})
export class TiendaProductoComponent {
  // Variables para el zoom de la imagen
  posX: number = 0;
  posY: number = 0;
  zoomActivo: boolean = false;

  // Variables para manejar la selección de kilogramos y precios
  kilogramos: number[] = [1.5, 4, 8]; // Opciones de kilogramos
  textoKilogramos: string = `1.5 kg.`; // Texto inicial para kilogramos
  textoPrecio: string = `Precio: $15.00`; // Texto inicial para precio
  
  // Precio base por kilogramo
  precioPorKilogramo: number = 10; // Ejemplo: $10 por kilogramo

  // Nueva variable para manejar la cantidad
  cantidad: number = 1;

  // Variable para el botón seleccionado
  kilogramaSeleccionado: number | null = null;

  // Métodos para manejar el zoom de la imagen
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

  total: number = 0;  // Total acumulado
  progreso: number = 0;  // Porcentaje de la barra
  mostrarMensaje: boolean = false;  // Controla la visualización del mensaje
  mensaje: string = '';

  // Método para agregar al carrito y actualizar el medidor
  agregarAlCarrito() {
    const precioProducto = 10000;  // Ejemplo: cada producto cuesta $10.000
    this.total += precioProducto;
    
    this.actualizarProgreso();
    
    if (this.total >= 100000) {
      this.mensaje = '¡Felicidades, tu envío es gratis!';
      this.mostrarMensaje = true;
    }
  }

  // Método para actualizar el progreso de la barra
  actualizarProgreso() {
    this.progreso = (this.total / 100000) * 100;
    
    if (this.progreso > 100) {
      this.progreso = 100;  // Limitar el progreso a 100%
    }
  }
  
  selectedTab: string = 'info'; // Pestaña seleccionada por defecto

  // Método para seleccionar una pestaña
  selectTab(tab: string) {
    this.selectedTab = tab;
  }
}
