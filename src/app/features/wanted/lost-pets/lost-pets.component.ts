import { Component, OnInit } from '@angular/core';
import { LostPetsService } from '../service/lost-pets.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-lost-pets',
  templateUrl: './lost-pets.component.html',
  styleUrls: ['./lost-pets.component.scss']
})
export class LostPetsComponent implements OnInit {
  mascotas: any[] = [];
  comentarios: { [key: number]: any[] } = {}; // Objeto para almacenar los comentarios por IdBuscarMascota
  nuevoComentario: { [key: number]: string } = {};
  viewuser: boolean = false;
  viewvet: boolean = false;
  viewadmin: boolean = false;
  userRol: string | null = null;

  IdUsuario: any | string = '1091202566'; // ID del usuario actual
selectedImage: any;



  constructor(private lostPetsService: LostPetsService, private router: Router, private authService: AuthService) {}

  ngOnInit(): void {
    this.IdUsuario = localStorage.getItem('userToken') || '';
    console.log('IdUsuario 2', this.IdUsuario);

    this.loadIdUsuario();
    this.loadMascotas();
    this.rolSeleccionado();
  }




  async rolSeleccionado(): Promise<void>{
    console.log('hola funciono');

   await this.verifyRoleAndRedirect();
    const rolVerificado = this.userRol
    console.log('rolverificado', rolVerificado);


    if (this.userRol == 'usuario') {
      console.log('funciona usuario');

       this.viewuser= true

    }if (this.userRol == 'veterinario') {
      console.log('funciona veterinario');

      this.viewvet= true

   }if (this.userRol == 'administrador') {
    console.log('funciona administrador');

    this.viewadmin= true
  }
  console.log('rol identificado',this.userRol);

  }

  loadIdUsuario(): void {
    this.lostPetsService.obtenerIdUsuario().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos del backend:', data); // Para depuración
        if (data.select && data.Result && data.Result.length > 0) {
          this.IdUsuario = data.Result[0].id; // Asigna el ID recibido
          console.log('IdUsuario recibido del backend:', this.IdUsuario);
        } else {
          console.error('IdUsuario no recibido o incorrecto:', data);
        }
      },
      error: (err) => {
        console.error('Error al obtener IdUsuario:', err);
      }
    });
  }

  private verifyRoleAndRedirect():Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.authService.verifyRole().subscribe(
        role => {
          if (!role) {
            console.log('error al obtener el rol');
            return reject();
          }
          console.log('Role verificado:', role);
          this.userRol = role;
          console.log('rol en la variable userRol', this.userRol);
          resolve();
        },
        error => {
          console.error('Error al verificar el rol:', error);
          reject();
        }
      );
    });
  }


  loadMascotas(): void {
    this.lostPetsService.obtenerMascotas().subscribe({
      next: (data: any) => {
        console.log('Datos recibidos:', data);
        if (data && data.Result && Array.isArray(data.Result)) {
          this.mascotas = data.Result;
        } else {
          console.error('La propiedad Result no es un array o no está presente:', data);
        }
      },
      error: (err) => {
        console.error('Error al cargar las mascotas:', err);
      }
    });
  }

  navigateToUpload(): void {
    console.log('Navegando a subir-lost-pets con IdUsuario:', this.IdUsuario); // Verifica aquí
    if (this.IdUsuario) {
      this.router.navigate(['/subir-lost-pets', this.IdUsuario]);
    } else {
      console.error('IdUsuario no está definido');
    }
  }



  comentar(IdBuscarMascota: number): void {
    const comentario = this.nuevoComentario[IdBuscarMascota];
    
    if (comentario) {
      this.lostPetsService.enviarComentario(this.IdUsuario, IdBuscarMascota, comentario).subscribe({
        next: (response) => {
          console.log('Comentario enviado:', response);
          // Limpiar el campo de comentario
          this.nuevoComentario[IdBuscarMascota] = '';
  
          Swal.fire({
            title: 'Comentario enviado',
            text: 'Tu comentario ha sido enviado con éxito.',
            imageUrl: '../../../../../assets/images/imgcitas/confirmar.png', // Imagen de confirmación personalizada
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonColor: '#7DFF82', // Color de confirmación personalizado
            confirmButtonText: 'Aceptar'
          });
        },
        error: (err) => {
          console.error('Error al enviar comentario:', err);
          Swal.fire({
            title: 'Error',
            text: 'Hubo un problema al enviar tu comentario.',
            imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de error personalizada
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonColor: '#F57171', // Color de confirmación para errores
            confirmButtonText: 'Aceptar'
          });
        }
      });
    } else {
      console.error('El comentario está vacío');
      Swal.fire({
        title: 'Comentario vacío',
        text: 'No puedes enviar un comentario vacío.',
        imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de advertencia
        imageWidth: 200,
        imageHeight: 200,
        confirmButtonColor: '#F57171', // Color de confirmación para advertencias
        confirmButtonText: 'Aceptar'
      });
    }
  }
  

  verComentarios(IdBuscarMascota: number): void {
    console.log('Id de la publicacion:', IdBuscarMascota);

    this.lostPetsService.obtenerComentarios(IdBuscarMascota).subscribe({
      next: (data: any) => {
        console.log('Comentarios recibidos:', data);
        if (data && data.Result && Array.isArray(data.Result)) {
          this.comentarios[IdBuscarMascota] = data.Result;
          this.showModal(IdBuscarMascota);
        } else {
          console.error('Los comentarios no son un array o no están presentes:', data);
        }
      },
      error: (err) => {
        console.error('Error al cargar los comentarios:', err);
      }
    });
  }

  showModal(IdBuscarMascota: number): void {
    const modal = document.getElementById(`modal-${IdBuscarMascota}`);
    if (modal) {
      modal.style.display = 'block';
    } else {
      console.error('Modal no encontrado');
    }
  }

  closeModal(IdBuscarMascota: number): void {
    const modal = document.getElementById(`modal-${IdBuscarMascota}`);
    if (modal) {
      modal.style.display = 'none';
    }
  }
}
