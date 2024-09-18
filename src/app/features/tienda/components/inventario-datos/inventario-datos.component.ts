import { TiendaService } from './../../services/tienda.service';
import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { ProductoService, DataResponse} from '../../services/producto-tienda.service';
import { ImageUploadService } from '../../../../images-services/image-upload.service';
import { finalize } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario-datos',
  templateUrl: './inventario-datos.component.html',
  styleUrls: ['./inventario-datos.component.scss']
})
export class InventarioDatosComponent {
  @Input() productos: DataResponse[] = []; // Recibir productos filtrados desde el componente padre

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Referencia al campo de entrada de archivo

  productoEditado: DataResponse| null = null; // Producto que se está editando
  cargandoImagen: boolean = false;

  constructor(private productoService: TiendaService, private tiendaService: ProductoService,  private imageUploadService: ImageUploadService, private router: Router){}


  editarProducto(producto: DataResponse) {
    this.productoEditado = {...producto};
  }

  redirectToEditProduct(productoId: string) {
    sessionStorage.setItem('adminInventario', 'true')
    this.router.navigate(['/editar-producto', productoId]);
  }

  guardarCambios() {
    if (this.productoEditado) {
      this.productoService.updateProduct(this.productoEditado.IdProducto, this.productoEditado, localStorage.getItem('userToken'))
        .subscribe({
          next: (response) => {
            console.log('Producto actualizado:', response);
            const index = this.productos.findIndex(p => p.IdProducto === this.productoEditado!.IdProducto);
            if (index !== -1) {
              this.productos[index] = { ...this.productoEditado! };
            }
            this.productoEditado = null;
          },
          error: (err) => {
            console.error('Error al actualizar el producto', err);
          }
        });
    }
  }

  cancelarEdicion() {
    this.productoEditado = null;
  }

  eliminarProducto(producto:DataResponse) {
    this.tiendaService.deleteProduct(producto.IdProducto).subscribe({
      next: () => {
        this.productos = this.productos.filter(p => p.IdProducto !== producto.IdProducto);
      },
      error: (err) => {
        console.error('Error al eliminar el producto', err);
      }
    });
  }

  onImageChange(event: Event) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file && this.productoEditado) {
      this.cargandoImagen = true;
      this.imageUploadService.uploadImage(file).pipe(
        finalize(() => this.cargandoImagen = false)
      ).subscribe({
        next: (response) => {
          console.log('Imagen cargada:', response);
          if (this.productoEditado) {
            this.productoEditado.imagen = response.url; // Asumiendo que la respuesta contiene la URL de la imagen
          }
        },
        error: (err) => {
          console.error('Error al cargar la imagen', err);
        }
      });
    }
  }

  triggerFileInputClick() {
    this.fileInput.nativeElement.click();
  }

}
