import { Router } from '@angular/router';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ProductoService, DataResponse, DataProduct } from '../../../../features/tienda/services/producto-tienda.service';
import { catchError, of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carrito-modal',
  templateUrl: './carrito-modal.component.html',
  styleUrls: ['./carrito-modal.component.scss'] // Cambié de styleUrl a styleUrls
})
export class CarritoModalComponent  implements OnInit{

  allData: DataProduct[] = [];
  allDataTotal: DataResponse[] = [];
  soldOut: boolean = false
  @Output() close = new EventEmitter<void>();

  constructor(private productoService: ProductoService, private router: Router) {}

  ngOnInit(): void {
  this.callProduct();
  this.callTotalProduct();
  }

  callTotalProduct(): void{
    this.productoService.getDataProducts().subscribe( (data) => {
      this.allDataTotal = data;
    })
  }


  callProduct(): void{
    this.productoService.getDataProductCart().subscribe((data) => {
       this.allData = data;
       console.log(this.allData);

    })
  }

  closemodal(): void {
    this.close.emit();
  }



  aumentarCantidad(producto: DataProduct): void {
    console.log('Aumentando cantidad para:', producto);
    const stockDisponible = this.obtenerStockDisponible(producto.IdProducto);
    console.log('Stock disponible:', stockDisponible);
    if (producto.cantidad < stockDisponible) {
      this.actualizarCantidadProducto(producto, producto.cantidad + 1);
      this.callProduct();
    } else {
      console.log('No se puede aumentar más. Stock máximo alcanzado.');
    }
  }

  finalizarCompra(): void {
    this.productoService.getDataProductCart().subscribe(data => {
      this.productoService.setCarrito(data); // Guardar los datos del carrito en el servicio
      this.router.navigate(['/pago-compra']); // Redirigir a la página de pago
    });
  }

   disminuirCantidad(producto: DataProduct): void {
    console.log('Disminuyendo cantidad para:', producto);
    if (producto.cantidad > 1) {
      this.actualizarCantidadProducto(producto, producto.cantidad - 1);
      this.callProduct();
    } else {
      console.log('No se puede disminuir más. Cantidad mínima alcanzada.');
    }
  }


  private actualizarCantidadProducto(producto: DataProduct, nuevaCantidad: number): void {
    console.log('Actualizando cantidad:', producto.IdUsuarioProducto, nuevaCantidad);
    this.productoService.actualizarCantidadProductoCarrito(producto.IdUsuarioProducto, nuevaCantidad).subscribe(
      (productoActualizado) => {
        console.log('Producto actualizado:', productoActualizado);
        this.callProduct(); // Refrescar los productos una vez que la actualización fue exitosa
        this.callTotalProduct();
      },
      (error) => {
        console.error('Error al actualizar la cantidad del producto:', error);
      }
    );
  }

  get precioTotal(): number {
    return this.allData.length > 0 ? this.allData.reduce((total, producto) => total + (producto.precioUnitario * producto.cantidad), 0) : 0;
  }

  eliminarProducto():void{
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción vaciará todo su carrito de compras.",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
         this.productoService.deleteProductCart().pipe(
          catchError(error => {
            console.error('Error en el servidor al eliminar el producto', error);
            Swal.fire({
              title: 'Error en Servidor',
              text: 'Hubo un error al eliminar los productos del carrito.',
              icon: 'error',
              confirmButtonText: 'OK'
            });
            return of(null);
          })
         ).subscribe( response => {
          if (response && response.delete) {
            console.log('Carrito vaciado con exito', response);
            Swal.fire({
              title: ' Su carrito de compras ha sido vaciado con exito ',
              icon: 'success',
              confirmButtonText: "OK"
            }).then(() => {
               this.closemodal();
            });
          }else  if (response) {
            console.log('Hubo un error al vaciar el carrito', response);
            Swal.fire({
              title:'Error',
              text: response.message || 'Hubo un error al vaciar el carrito',
              icon: 'error',
              confirmButtonText: 'OK'
            });
          }
         });
      }
    });
  };



  private obtenerStockDisponible(idProducto: string): number {
    const producto = this.allDataTotal.find(p => p.IdProducto === idProducto);
    return producto ? producto.stock : 0;
  }



}
