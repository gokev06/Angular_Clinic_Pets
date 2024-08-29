import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SolicitudAdopcionService } from '../../services/solicitud-adopcion.service';
import { catchError, of } from 'rxjs';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.scss']
})
export class FormularioAdopcionComponent implements OnInit {


  @Output() datosAdopcionFormulario = new EventEmitter<any>();
  estilos = 'padding:0 10px; background-color: #CCC4FF; border-radius: 5px; width: 300px; height: 40px; font-size: 15px; border: none; margin-bottom: 30px; color: black;';
  estilos1 = 'padding:10px 10px 150px 10px; background-color: #CCC4FF; border-radius: 5px; width: 300px; height: 180px; font-size: 15px; border: none; margin-bottom: 30px; color: black; line-height: 1; ';

  loginForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder, private router: Router, private solicitudService: SolicitudAdopcionService) {
    this.loginForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      Esterilizacion: ['', Validators.required],
      estadovacunacion: ['', Validators.required],
      telefono: ['', Validators.required],
      ubicacion: ['', Validators.required],
      historia: ['', Validators.required]
    });

    this.loginForm.valueChanges.subscribe(valor => {
      this.datosAdopcionFormulario.emit({
        ...valor,
        imagen: this.selectedImage
      });
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.solicitudService.uploadImage(file).subscribe(
        response => {
          if (response && response.url) {
            this.selectedImage = response.url;
            console.log('Imagen subida exitosamente:', this.selectedImage);

            this.datosAdopcionFormulario.emit({
              ...this.loginForm.value,
              imagen: this.selectedImage
            });
          } else {
            console.error('La respuesta no contiene una URL de imagen');
            this.mostrarError('La respuesta del servidor no es válida');
          }
        },
        error => {
          console.error('Error al subir la imagen', error);
          this.mostrarError('Hubo un error al subir la imagen');
        }
      );
    }
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
    // Verificación inicial del formulario y la imagen seleccionada
    if (this.loginForm.invalid || !this.selectedImage) {
      this.loginForm.markAllAsTouched();
      return;
    }

    // Mostrar alerta de confirmación antes de proceder
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de publicar la adopción?',
      imageUrl: '../../../../../assets/icons/mascotaamor-tras.gif',
      showCancelButton: true,
      confirmButtonColor: 'rgba(87, 250, 60, 0.47)',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Publicar',
      cancelButtonText: 'Cancelar',
      customClass: {
        title: 'swal2-title',
        image: 'swal2-image',
        popup: 'my-swal-popup',
        confirmButton: 'my-confirm-button',
        cancelButton: 'my-cancel-button'
      },
      didRender: () => {
        this.applyCustomStyles();
      }
    }).then((result) => {
      if (result.isConfirmed) {
        // Si el usuario confirma, procede a crear la adopción
        const token = localStorage.getItem('userToken');
        this.solicitudService.createPets(this.loginForm.value, token)
          .pipe(
            catchError(error => {
              console.error('Error al crear adopción', error);
              Swal.fire({
                title: 'Error',
                text: 'Hubo un error al publicar la adopción.',
                icon: 'error',
                confirmButtonText: 'Aceptar'
              });
              return of(null);
            })
          )
          .subscribe(response => {
            if (response) {
              console.log('Adopción creada con éxito:', response);
              Swal.fire({
                title: '¡Adopcion creada!',
                text: 'La adopcion esta en espera para publicar.',
                imageUrl: '../../../../../assets/icons/exito.png',
                showConfirmButton: true,
                confirmButtonText: 'Aceptar',
                customClass: {
                  title: 'swal2-title',
                  image: 'swal2-image',
                  popup: 'my-swal-popup',
                  confirmButton: 'my-confirm-button'
                },
                didRender: () => {
                  this.applyCustomStylesToPublishedAlert();
                }
              }).then(() => {
                this.router.navigate(['/home']);
              });
            } else {
              console.log('Formulario inválido: ', this.loginForm.errors);
            }
          });
      }
    });
  }

  onCancel(): void {
    this.router.navigate(['/adopcion']);
  }

  private applyCustomStyles(): void {
    const titleElement = document.querySelector('.swal2-title');
    const imageElement = document.querySelector('.swal2-image');
    const popupElement = document.querySelector('.my-swal-popup');
    const confirmButton = document.querySelector('.my-confirm-button');
    const cancelButton = document.querySelector('.my-cancel-button');

    if (titleElement) {
      titleElement.setAttribute('style', 'margin-top: -55px;');
    }

    if (popupElement) {
      popupElement.setAttribute('style', 'border: 3px solid #A6A0F0; border-radius: 10px;');
    }

    if (imageElement) {
      imageElement.setAttribute('style', 'margin-top: 20px; display: flex; justify-content: center; width: 200px; height: 200px;');
    }
    if (confirmButton) {
      confirmButton.setAttribute('style', 'margin-right: 10px; color: black; background-color: rgba(87, 250, 60, 0.47);'); // Estilos del botón de confirmación
    }

    if (cancelButton) {
      cancelButton.setAttribute('style', 'color: black; background-color: rgba(250, 60, 60, 0.47);'); // Estilos del botón de cancelar
    }
  }

  private applyCustomStylesToPublishedAlert(): void {
    const titleElement = document.querySelector('.swal2-title');
    const imageElement = document.querySelector('.swal2-image');
    const popupElement = document.querySelector('.my-swal-popup');
    const confirmButton = document.querySelector('.my-confirm-button');

    if (titleElement) {
      titleElement.setAttribute('style', 'margin-top: -20px;');
    }

    if (popupElement) {
      popupElement.setAttribute('style', 'border: 3px solid #A6A0F0; border-radius: 10px;');
    }

    if (imageElement) {
      imageElement.setAttribute('style', ' display: flex; justify-content: center; width: 150px; height: 150px;');
    }

    if (confirmButton) {
      confirmButton.setAttribute('style', 'margin-right: 10px; color: black; background-color: rgba(87, 250, 60, 0.47);');
    }
  }
}
