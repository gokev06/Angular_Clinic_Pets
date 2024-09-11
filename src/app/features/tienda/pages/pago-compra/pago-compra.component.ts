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

  comprar(): void {
    Swal.fire({
      title: 'Confirmar Compra',
      text: `¿Deseas confirmar el pago de ${this.precioTotal}?`,
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, comprar',
      cancelButtonText: 'Cancelar'
    }).then(result => {
      if (result.isConfirmed) {
        // Aquí puedes realizar la lógica real para procesar el pago
        Swal.fire(
          'Compra Confirmada',
          'Tu compra ha sido realizada con éxito.',
          'success'
        ).then(() => {
          this.router.navigate(['/']); // Redirige al usuario a la página principal o al destino deseado
        });
      }
    });
  }
}
