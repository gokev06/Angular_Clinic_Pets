import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

// Definición del componente Angular
@Component({
  selector: 'app-modal-editar-perfil',
  templateUrl: './modal-editar-perfil.component.html',
  styleUrl: './modal-editar-perfil.component.scss'
})
export class ModalEditarPerfilComponent  implements OnInit{
  @Output() perfil = new EventEmitter<any>();

  estilos = "border:none; border-radius:10px ;height: 30px; margin-top: 10px; padding: 0px 8px; width: 90%; margin-bottom: 10px; background: rgba(204, 196, 255, 1)";

    // Evento para cerrar el modal de edición
  @Output() closeedit = new EventEmitter<void>();


      // Método para emitir el evento de cierre del modal
  closemodaledit(): void {
    this.closeedit.emit();
  }

    // Evento para cerrar el modal de edición
  callDataUser!: FormGroup;

  // Constructor del componente
  constructor(private fb: FormBuilder, private http: HttpClient){
    

  }
  selectedImage: string | ArrayBuffer | null = '';

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const reader = new FileReader();

    if (file) {
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
      telefonoUsuario: ['', [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      correoUsuario: ['', [Validators.required, Validators.email]],
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

  // Obtiene el token de autenticación del almacenamiento local

    const token = localStorage.getItem('userToken')
    if (!token) {
      console.error('No se encontro el token');
      return

    }

    console.log('Token recuperado de localStorage:', token);

    // Configura los headers para la petición HTTP
    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    // Realiza una petición GET para obtener los datos del usuario
    this.http.get<any>('http://localhost:10101/callData', { headers }).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);  // Agregar este log

        // Si la respuesta es exitosa, actualiza el formulario con los datos del usuario
        if (response.status === 'success' && response.data) {
          this.callDataUser.patchValue({
            nombreUsuario: response.data.nombreUsuario,
            apellidoUsuario: response.data.apellidoUsuario,
            telefonoUsuario: response.data.telefonoUsuario,
            correoUsuario: response.data.correoUsuario

          })
        }
      },
      error: (error) => {
        console.error('Error al cargar los datos del usuario', error);
        if (error.error && error.error.messege) {
          console.error('Mensaje de error del servidor:', error.error.messege);
        }
      },
      complete: () => {
        console.log('La solicitud se completó');
      }
    });
  }

// Método vacío (posiblemente para uso futuro)
  closemodal(): void {

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
          // Obtiene el token de autenticación
          const token = localStorage.getItem('userToken');
          if (!token) {
            console.error('No se encontró el token');
            return;
          }
  
          // Configura los headers para la petición HTTP
          const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);
  
          // Prepara los datos del formulario para enviar
          const formData = this.callDataUser.value;
  
          const updateData = {
            nombre: formData.nombreUsuario,
            apellido: formData.apellidoUsuario,
            numeroDeTelefono: formData.telefonoUsuario,
            email: formData.correoUsuario
          };
  
          try {
            // Realiza una petición PUT para actualizar el perfil del usuario
            const response = await firstValueFrom(
              this.http.put('http://localhost:10101/editar-perfil', updateData, { headers })
            );
  
            console.log('Perfil actualizado:', response);
  
            Swal.fire({
              title: '¡Perfil actualizado!',
              text: 'Tu perfil ha sido actualizado exitosamente.',
              imageUrl: '../../../../../assets/images/imgcitas/confirmar.png',
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonColor: '#7DFF82',
            });
  
            // Cierra el modal después de actualizar exitosamente
            this.closemodaledit();
  
          } catch (error) {
            console.error('Error al actualizar el perfil:', error);
            Swal.fire({
              title: '¡Error!',
              text: 'Ocurrió un error al actualizar el perfil.',
              icon: 'error',
              confirmButtonColor: '#F57171',
            });
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
  
}
