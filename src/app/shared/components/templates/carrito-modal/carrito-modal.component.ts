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

  eliminarProducto(): void {
    Swal.fire({
      title: '¿Está seguro?',
      text: "Esta acción vaciará todo su carrito de compras.",
      imageUrl: '../../../../../assets/icons/mascotaamor-tras.gif', // Imagen de advertencia
      imageWidth: 200,
      imageHeight: 200,
      showCancelButton: true,
      confirmButtonColor: '#7DFF82', // Color del botón de confirmación
      cancelButtonColor: '#F57171',  // Color del botón de cancelación
      confirmButtonText: 'Sí, vaciar carrito',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        this.productoService.deleteProductCart().pipe(
          catchError(error => {
            console.error('Error en el servidor al eliminar el producto', error);
            Swal.fire({
              title: 'Error en el servidor',
              text: 'Hubo un error al eliminar los productos del carrito.',
              imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de error
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonColor: '#F57171', // Color del botón en caso de error
              confirmButtonText: 'OK'
            });
            return of(null);
          })
        ).subscribe(response => {
          if (response && response.delete) {
            console.log('Carrito vaciado con éxito', response);
            Swal.fire({
              title: '¡Su carrito ha sido vaciado con éxito!',
              imageUrl: '../../../../../assets/images/imgcitas/confirmar.png', // Imagen de éxito
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonColor: '#7DFF82',
              confirmButtonText: 'OK'
            }).then(() => {
              this.closemodal();
            });
          } else if (response) {
            console.log('Hubo un error al vaciar el carrito', response);
            Swal.fire({
              title: 'Error',
              text: response.message || 'Hubo un error al vaciar el carrito.',
              imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de error
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonColor: '#F57171',
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
