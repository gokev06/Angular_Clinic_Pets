import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
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
  estilos1 = 'padding:10px 10px 150px 10px; background-color: #CCC4FF; border-radius: 5px; width: 300px; height: 180px; font-size: 15px; border: none; margin-bottom: 30px; color: black; line-height: 1;';

  loginForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = '';
  tempImageFile: File | null = null;  // Nueva variable para almacenar temporalmente el archivo de imagen
  imageUrl: string | null = null;  

  constructor(private formBuilder: FormBuilder, private router: Router, private solicitudService: SolicitudAdopcionService) {
    this.loginForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', [Validators.required, this.edadValidator]],
      especie: ['', Validators.required],
      raza: ['', [Validators.required, this.razaValidator]],
      sexo: ['', Validators.required],
      Esterilizacion: ['', Validators.required],
      estadovacunacion: ['', Validators.required],
      telefono: ['', [Validators.required, this.telefonoValidator]],
      ubicacion: ['', Validators.required],
      historia: ['', [Validators.required, Validators.maxLength(200)]]
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

      this.solicitudService.uploadImage(this.tempImageFile).subscribe(
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
    if (this.loginForm.invalid || !this.tempImageFile) {
      this.loginForm.markAllAsTouched();
      return;
    }

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
          this.uploadImage().then(imageUrl => {
            const formData = {
              ...this.loginForm.value,
              imagen: imageUrl
            };

            const token = localStorage.getItem('userToken');
            this.solicitudService.createPets(formData, token)
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
            .subscribe( response => {
              if (response) {
                 console.log('Adopción creada con éxito:', response);
                 Swal.fire({
                  title: '¡Adopción creada!',
                  text: 'La adopción está en espera para publicar.',
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

              }
            });
          }).catch(error => {
            this.mostrarError(error);
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
      imageElement.setAttribute('style', 'display: flex; justify-content: center; width: 150px; height: 150px;');
    }

    if (confirmButton) {
      confirmButton.setAttribute('style', 'margin-right: 10px; color: black; background-color: rgba(87, 250, 60, 0.47);');
    }
  }

  // Validación para el campo edad
  edadValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const valid = /^[0-9]+( mes| meses)?$/.test(value);
    return valid ? null : { 'edadInvalid': true };
  }

  // Validación para el campo raza
  razaValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const valid = /^[a-zA-Z\s]+$/.test(value);
    return valid ? null : { 'razaInvalid': true };
  }

  // Validación para el campo teléfono
  telefonoValidator(control: AbstractControl): { [key: string]: boolean } | null {
    const value = control.value;
    const valid = /^[0-9]+$/.test(value);
    return valid ? null : { 'telefonoInvalid': true };
  }
  
}
