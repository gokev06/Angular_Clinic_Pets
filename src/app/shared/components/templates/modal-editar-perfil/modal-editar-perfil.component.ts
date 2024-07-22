import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http'; 
import { firstValueFrom } from 'rxjs';

@Component({
  selector: 'app-modal-editar-perfil',
  templateUrl: './modal-editar-perfil.component.html',
  styleUrl: './modal-editar-perfil.component.scss'
})
export class ModalEditarPerfilComponent  implements OnInit{

  estilos = "border:none; border-radius:10px ;height: 30px; margin-top: 16px; padding: 0px 8px; width: 300px; margin-bottom: 10px";

  @Output() closeedit = new EventEmitter<void>();

  closemodaledit(): void {
    this.closeedit.emit();
  }
  callDataUser!: FormGroup;
  constructor(private fb: FormBuilder, private http: HttpClient){

  }

  ngOnInit(): void {
    this.initForm()
    this.loadUserData();

  }

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

  loadUserData(): void {
    const token = localStorage.getItem('userToken')
    if (!token) {
      console.error('No se encontro el token');
      return
      
    }

    console.log('Token recuperado de localStorage:', token);


    const headers = new HttpHeaders().set('Authorization', `Bearer ${token}`);

    this.http.get<any>('http://localhost:10101/callData', { headers }).subscribe({
      next: (response) => {
        console.log('Respuesta recibida:', response);  // Agregar este log

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

  closemodal(): void {
    
  }

  async onSubmit(){
     if(this.callDataUser.valid){
      const token = localStorage.getItem('userToken');
      if (!token) {
        console.error('No se encontro el token');
        return; 
      }

      const headers= new HttpHeaders().set('Authorization',`Bearer ${token}`);

      const formData = this.callDataUser.value;

      const updateData = {
        nombre: formData.nombreUsuario,
        apellido: formData.apellidoUsuario,
        numeroDeTelefono: formData.telefonoUsuario,
        email: formData.correoUsuario
      };

      try {
        
        const response = await firstValueFrom(
          this.http.put('http://localhost:10101/editar-perfil', updateData, {headers})
        );

        console.log('perfil actualizado:', response);

        this.closemodaledit();
        
      } catch (error) {
        console.error('Error al actualizar el perfil:', error);

      }
     }else{
      console.log('Formulario invalido');

      Object.values(this.callDataUser.controls).forEach(control => {
         control.markAsTouched();
      });
      
     }
  }
}
