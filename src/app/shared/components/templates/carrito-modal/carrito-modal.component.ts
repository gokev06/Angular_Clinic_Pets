import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoService, DataResponse } from '../../../../features/tienda/services/producto-tienda.service';

@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.scss'] // Cambié de styleUrl a styleUrls
})
export class CarritoModalComponent  implements OnInit{

  @Input() allData: DataResponse[] = [];
  productosFiltrados: DataResponse[] = []; // Ahora es solo una propiedad local

  constructor() {
    this.carrito = []; // Aquí podrías cargar los datos del carrito
  }

  ngOnInit(): void {
    this.productosFiltrados = this.allData.filter(producto => producto.IdProducto == "4");
    console.log('Productos Filtrados:', this.productosFiltrados);
  }

  @Output() close = new EventEmitter<void>(); 

  closemodal(): void {
    this.close.emit();
  }
  quantity: number = 0;

  increaseQuantity(producto: DataResponse): void {
    producto.stock++;
  }

  decreaseQuantity(producto: DataResponse): void {
    if (producto.stock > 1) {
      producto.stock--;
    }
  }
  get totalPrice(): number {
    return this.allData.reduce((total, producto) => total + (producto.precio * producto.stock), 0);
  }
    // Simulación de un carrito de compras
    carrito: any[] = []; // Puedes reemplazar any[] con el tipo adecuado


    vaciarCarrito() {
      this.carrito = [];
      // Aquí puedes agregar lógica adicional para manejar el vaciado del carrito,
      // como mostrar un mensaje de confirmación o actualizar el backend.
      console.log('Carrito vacío');
    }

    finalizarCompra() {
      if (this.carrito.length === 0) {
        console.log('El carrito está vacío. No se puede finalizar la compra.');
        return;
      }

      // Aquí puedes agregar lógica para finalizar la compra,
      // como enviar los datos del carrito al servidor.
      console.log('Compra finalizada');
      this.carrito = []; // Opcional: vaciar el carrito después de finalizar la compra
    }
}
