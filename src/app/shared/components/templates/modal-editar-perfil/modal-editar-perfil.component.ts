  import { Component , OnInit} from '@angular/core';
  import { FormGroup, FormBuilder, Validators } from '@angular/forms';
  import {  EventEmitter, Output } from '@angular/core';
  import { HttpClient, HttpHeaders } from '@angular/common/http';
  import { firstValueFrom } from 'rxjs';
  import { ImageUploadService } from '../../../../images-services/image-upload.service';
  import { Router } from '@angular/router';
  import Swal from 'sweetalert2';
  import { UserServiceService } from '../../../../user-service/user-service.service';

  // Definición del componente Angular
  @Component({
    selector: 'app-modal-editar-perfil',
    templateUrl: './modal-editar-perfil.component.html',
    styleUrl: './modal-editar-perfil.component.scss'
  })
  export class ModalEditarPerfilComponent  implements OnInit{
    @Output() perfil = new EventEmitter<any>();

    estilos = "border:none; border-radius:10px ;height: 30px; margin-top: 10px; padding: 0px 8px; width: 90%; margin-bottom: 10px; background: #f0f0f0 ; border: 2px solid  rgb(158, 131, 194)";

      // Evento para cerrar el modal de edición
    @Output() closeedit = new EventEmitter<void>();

    callDataUser!: FormGroup;
    selectedImage: string | ArrayBuffer | null = '';
    imageFile: File | null = null;
    loading = false;

    // Constructor del componente
    constructor(private fb: FormBuilder, private http: HttpClient,  private imageUploadService: ImageUploadService, private router: Router, private userService: UserServiceService){


    }



    onFileChange(event: Event): void {
      const input = event.target as HTMLInputElement;
      const file = input.files?.[0];
      if (file) {
      this.imageFile =file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.perfil.emit({
          ...this.callDataUser.value,
          imagen: this.selectedImage
        });
      };
      reader.readAsDataURL(file);
      }
    }

    // Método que se ejecuta al inicializar el componente
    ngOnInit(): void {
      this.initForm()
      this.loadUserData();

    }


    // Inicialización del formulario con validaciones
    initForm(): void {
      this.callDataUser = this.fb.group({
        nombreUsuario: ['', Validators.required],
        apellidoUsuario: ['', Validators.required],
        //numeroDeDocumento: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
        telefonoUsuario: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern('^[0-9]*$')]],
        correoUsuario: ['', [Validators.required, Validators.email]]
      // contrasenia: ['', [Validators.required, Validators.minLength(5), Validators.maxLength(20)]],
      });


      this.callDataUser.valueChanges.subscribe(valor => {
        this.perfil.emit({
          ...valor,
          imagen: this.selectedImage
        });
      });
    }


      // Carga los datos del usuario desde el servidor
    loadUserData(): void {
      this.userService.user.subscribe(user => {
        if (user) {
          this.callDataUser.patchValue({
            nombreUsuario: user.nombreUsuario,
            apellidoUsuario: user.apellidoUsuario,
            telefonoUsuario: user.telefonoUsuario,
            correoUsuario: user.correoUsuario
          });
          this.selectedImage = user.imagenPerfil;
        }
      });
    }

      // Método para emitir el evento de cierre del modal
      closemodaledit(): void {
        this.closeedit.emit();
      }

    // Método para enviar el formulario actualizado
    async onSubmit() {
      if (this.callDataUser.valid) {
        Swal.fire({
          title: '¿Confirmar actualización?',
          text: '¿Estás seguro de que quieres actualizar tu perfil?',
          showCancelButton: true,
          confirmButtonColor: '#7DFF82',
          cancelButtonColor: '#F57171',
          confirmButtonText: 'Sí, actualizar',
          imageUrl: '../../../../../assets/images/imgcitas/huellas.png',
          imageWidth: 200,
          imageHeight: 200
        }).then(async (result) => {
          if (result.isConfirmed) {
            // Prepara los datos del formulario para enviar
            const formData = this.callDataUser.value;
            const updateData = {
              nombre: formData.nombreUsuario,
              apellido: formData.apellidoUsuario,
              numeroDeTelefono: formData.telefonoUsuario,
              email: formData.correoUsuario,
              imagenPerfil: formData.imagen
            };

            try {
            // console.log('this.imageFile', this.imageFile);
            // console.log('this.selectedImage', this.selectedImage);
              if (this.imageFile ) {
                console.log('funciona');

                const imageResponse = await firstValueFrom(this.imageUploadService.uploadImage(this.imageFile));
                console.log('imageResponse', imageResponse.url);


                updateData.imagenPerfil =  imageResponse.url
            } else {
              updateData.imagenPerfil = this.selectedImage;
            }

            console.log('updateData:', updateData);
            this.loading = true; // Establecer loading a true antes de la actualización
            this.userService.updateUserProfile(updateData).subscribe(
              response => {
                console.log('Perfil actualizado:', response);
                Swal.fire({
                  title: '¡Perfil actualizado!',
                  text: 'Tu perfil ha sido actualizado exitosamente.',
                  imageUrl: '../../../../../assets/images/imgcitas/confirmar.png',
                  imageWidth: 200,
                  imageHeight: 200,
                  confirmButtonColor: '#7DFF82',
                });
                this.closemodaledit();
              },
              error => {
                console.error('Error al actualizar el perfil:', error);
                Swal.fire({
                  title: '¡Error!',
                  text: 'Ocurrió un error al actualizar el perfil.',
                  icon: 'error',
                  confirmButtonColor: '#F57171',
                });
              },
              () => {
                this.loading = false; // Establecer loading a false cuando se complete la actualización

              }
            );

            } catch (error) {
              console.error('Error al actualizar el perfil:', error);
              Swal.fire({
                title: '¡Error!',
                text: 'Ocurrió un error al actualizar el perfil.',
                icon: 'error',
                confirmButtonColor: '#F57171',
              });
              this.loading = false;
            }
          }
        });
      } else {
        Swal.fire({
          title: '¡Hubo un problema!',
          text: 'Parece que no llenaste correctamente el formulario',
          imageUrl: '../../../../../assets/images/imgcitas/huellas.png',
          imageWidth: 200,
          imageHeight: 200,
          confirmButtonColor: 'rgba(209, 0, 0, 0.47)',
          customClass: {
            title: 'mi-titulo',
            confirmButton: 'botonC',
          }
        });

        // Marca todos los campos del formulario como tocados para mostrar errores de validación
        Object.values(this.callDataUser.controls).forEach(control => {
          control.markAsTouched();
        });
      }
    }

    recargarPagina() {
      window.location.reload();
    }

  }
