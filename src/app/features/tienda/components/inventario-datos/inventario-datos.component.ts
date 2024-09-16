import { Component, Input, ViewChild, ElementRef } from '@angular/core';
import { } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-inventario-datos',
  templateUrl: './inventario-datos.component.html',
  styleUrls: ['./inventario-datos.component.scss']
})
export class InventarioDatosComponent {
 // @Input() productos: productos[] = []; // Recibir productos filtrados desde el componente padre

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>; // Referencia al campo de entrada de archivo

 // productoEditado: productos | null = null; // Producto que se está editando
/*
  editarProducto(producto: productos) {
    this.productoEditado = producto;
  }

  guardarCambios() {
    // Aquí podrías agregar lógica para guardar los cambios a un servidor
    this.productoEditado = null;
  }

  cancelarEdicion() {
    this.productoEditado = null;
  }

  eliminarProducto(producto: productos) {
    const index = this.productos.indexOf(producto);
    if (index !== -1) {
      this.productos.splice(index, 1);
    }
  }

  onImageChange(event: Event, producto: productos) {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e: ProgressEvent<FileReader>) => {
        producto.imagenPreview = e.target?.result as string; // Guarda la vista previa de la imagen
      };
      reader.readAsDataURL(file);
    }
  }

  triggerFileInputClick() {
    this.fileInput.nativeElement.click(); // Usa `nativeElement` para acceder al método `click`
  }
    */
}
