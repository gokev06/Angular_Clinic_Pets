import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TiendaService } from '../../services/tienda.service';
import { ImageUploadService } from '../../../../images-services/image-upload.service';
import { catchError, of } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  @Output() datosProductoFormulario = new EventEmitter<any>();

  estilos = 'padding: 8px; background-color: #CCC4FF; border-radius: 5px; width: 100%; height:35px; font-size: 15px; border: none; margin-bottom: 5px; color: black';

  productoForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = '';
  tempImageFile: File | null = null;  // Nueva variable para almacenar temporalmente el archivo de imagen
  imageUrl: string | null = null;

  constructor(private formBuilder: FormBuilder, private tiendaService: TiendaService, private router: Router, private imageService: ImageUploadService) {
    this.productoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required,]],
      cantidad: ['', [Validators.required, Validators.minLength(1)]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(600)]],
      informacion: ['', [Validators.required, Validators.maxLength(600)]],
      seleccionTallaPresentacion: ['', [Validators.required]]
    });

    this.productoForm.valueChanges.subscribe(valor => {
      console.log(valor); // Añade este log para ver los valores del formulario en la consola
      this.datosProductoFormulario.emit({
        ...valor,
        imagen: this.selectedImage
      });
    });
  }

  // Validadores personalizados
  precioValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && (isNaN(control.value) || control.value <= 0)) {
      return { invalidPrice: true };
    }
    return null;
  }

  cantidadValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && (isNaN(control.value) || control.value <= 0 || !Number.isInteger(control.value))) {
      return { invalidQuantity: true };
    }
    return null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.tempImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Previsualización de la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): Promise <string> {
    return new Promise((resolve, reject) => {
      if (!this.tempImageFile) {
        reject('No image file selected');
        return;
      }

      this.imageService.uploadImage(this.tempImageFile).subscribe(
        response => {
          if( response && response.url){
            this.imageUrl = response.url;
            resolve(response.url);
          } else{
            reject('La respuesta no contiene una URL de imagen');
          }
        },
        error => {
          console.error('Error al subir la imagen', error);
          reject('Hubo un error al subir la imagen');
        }
      );
    });
  }

  private mostrarError(mensaje: string): void {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }


  onSubmit(): void {
    this.productoForm.markAllAsTouched();
    if (this.productoForm.valid) {
      console.log('el formulario es valido ');
      Swal.fire({
        title: '¿Estas seguro de agregar este producto?',
        imageUrl: 'assets/images/imgcitas/huellas.png',
        imageWidth: 300,
        imageHeight: 200,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        cancelButtonColor: 'rgba(209, 0, 0, 0.47)',
        confirmButtonColor: 'rgba(55, 163, 59, 0.47)'
      }).then((result) => {
        if (result.isConfirmed) {
            this.uploadImage().then( imageUrl => {
              const formData = {
                ...this.productoForm.value,
                imagen: imageUrl
              };

              const token = localStorage.getItem('userToken');
              this.tiendaService.createProducts(formData, token)
               .pipe(
                 catchError(error => {
                  console.error('Error al crear producto', error);
                  Swal.fire({
                    title: 'Error',
                    text: 'Hubo un error al publicar el producto.',
                    icon: 'error',
                    confirmButtonText: 'Aceptar'
                  });
                   return of (null);
                 })
               )
               .subscribe( response => {
                 if (response) {
                  console.log('Producto creado con éxito:', response);
                  Swal.fire({
                    title: '¡Producto agregado!',
                    imageUrl: 'assets/images/imgcitas/confirmar.png',
                    imageWidth: 100,
                    imageHeight: 100,
                    imageAlt: 'Descripción de la imagen'
                  }).then( () => {
                    this.router.navigate(['/home-admin']);
                  });

                 };
               });

            }).catch( error => {
              this.mostrarError(error);
            });
        }
      });
      return;
     }


  }

  onCancel(): void {
    this.router.navigate(['/tienda-admin']);
  }

}
