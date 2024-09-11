import { Component , OnInit, Input} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  EventEmitter, Output } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { firstValueFrom } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent implements OnInit {
  username: string = "kevin Mamaguevo"
  isModalOpen = false;

  @Input() user : any = {
    nombre: "Kevin",
    rol: "Usuario"
  }

  constructor(private http: HttpClient){}

  ngOnInit(): void {
    this.loadUserData();
  }


  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
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
          next: (response: any) => {
            console.log('Respuesta recibida:', response);  // Agregar este log

            // Si la respuesta es exitosa, actualiza el formulario con los datos del usuario
            if (response.status === 'success' && response.data) {
              this.user.nombre = response.data.nombreUsuario
              this.user.rol = response.data.rol
            }
          },
          error: (error: any) => {
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
}
