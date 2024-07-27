import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { firstValueFrom } from 'rxjs';

// Definición del componente Angular
@Component({
  selector: 'app-modal-editar-perfil',
  templateUrl: './modal-editar-perfil.component.html',
  styleUrl: './modal-editar-perfil.component.scss'
})
export class ModalEditarPerfilComponent  implements OnInit{

    // Estilos CSS inline para los elementos del formulario
  estilos = "border:none; border-radius:10px ;height: 30px; margin-top: 10px; padding: 0px 8px; width: 300px; margin-bottom: 10px;";

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
  async onSubmit(){
     if(this.callDataUser.valid){
        // Obtiene el token de autenticación
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('No se encontro el token');
        return; 
      }

      // Configura los headers para la petición HTTP
      const headers= new HttpHeaders().set('Authorization',`Bearer ${token}`);

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
          this.http.put('http://localhost:10101/editar-perfil', updateData, {headers})
        );

        console.log('perfil actualizado:', response);

      // Cierra el modal después de actualizar exitosamente
        this.closemodaledit();
        
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);

      }
     }else{
      console.log('Formulario invalido');

    // Marca todos los campos del formulario como tocados para mostrar errores de validación
      Object.values(this.callDataUser.controls).forEach(control => {
         control.markAsTouched();
      });
      
     }
  }
}
