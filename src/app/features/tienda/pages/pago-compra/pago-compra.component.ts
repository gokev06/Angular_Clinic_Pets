import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ProductoService, DataProduct } from '../../../../features/tienda/services/producto-tienda.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-compra',
  templateUrl: './pago-compra.component.html',
  styleUrls: ['./pago-compra.component.scss']
})
export class PagoCompraComponent implements OnInit {
  productos: DataProduct[] = [];
  precioTotal: number = 0;
  isPaymentOpen: boolean = false; // Variable para controlar la visibilidad del contenedor de pago

  constructor(
    private productoService: ProductoService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.productos = this.productoService.getCarrito(); // Recuperar el carrito del servicio
    console.log('Productos en carrito:', this.productos); // Verificar datos en la consola
    this.calcularTotal();
  }

  calcularTotal(): void {
    this.precioTotal = this.productos.reduce((total, producto) => total + (producto.precioUnitario * producto.cantidad), 0);
  }

  openPayment(): void {
    this.isPaymentOpen = true; // Muestra el contenedor de pago
  }

  closePayment(): void {
    this.isPaymentOpen = false; // Oculta el contenedor de pago
  }

  handlePayment(): void {
    // Simulación del proceso de pago
    Swal.fire({
      title: 'Pago Exitoso',
      text: `Tu pago de ${this.precioTotal} ha sido realizado con éxito.`,
      imageUrl: '../../../../../assets/images/imgcitas/confirmar.png', // Imagen de confirmación personalizada
      imageWidth: 200,
      imageHeight: 200,
      confirmButtonColor: '#7DFF82', // Color de confirmación personalizado
      confirmButtonText: 'Aceptar'
    }).then(() => {
      this.closePayment(); // Cierra el modal o finaliza el proceso de pago
      // Opcional: Redirigir o limpiar el carrito
      this.router.navigate(['/tienda']); // Redirige a la página de inicio o a donde desees
    });
  }
  
}
