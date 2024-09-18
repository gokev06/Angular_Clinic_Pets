import { Component, OnInit } from '@angular/core';
import { LostPetsService } from '../service/lost-pets.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-lost-pets',
  templateUrl: './lost-pets.component.html',
  styleUrls: ['./lost-pets.component.scss']
})
export class LostPetsComponent implements OnInit {
  mascotas: any[] = [];
  comentarios: { [key: number]: any[] } = {}; // Objeto para almacenar los comentarios por IdBuscarMascota
  nuevoComentario: { [key: number]: string } = {};

  IdUsuario: any = '1091202566'; // ID del usuario actual
selectedImage: any;

  constructor(private lostPetsService: LostPetsService, private router: Router) {}

  ngOnInit(): void {
    //this.IdUsuario = localStorage.getItem('userToken');
    this.IdUsuario = '1091202566';

    console.log('IdUsuario' , this.IdUsuario);
    
    this.loadMascotas();  
    this.rolSeleccionado();
  }

  
  viewuser: boolean = false;
  viewvet: boolean = false;
  viewadmin: boolean = false;
  userRol: string | null = null;

  rolSeleccionado(): void{
    this.userRol = sessionStorage.getItem('userRole');
    if (this.userRol == 'usuario') {
       this.viewuser= true

    }if (this.userRol == 'veterinario') {
      this.viewvet= true

   }if (this.userRol == 'administrador') {
    this.viewadmin= true

 }
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
    this.router.navigate(['/subir-lost-pets'], { state: { IdUsuario: this.IdUsuario } });
  }

  comentar(IdBuscarMascota: number): void {
    const comentario = this.nuevoComentario[IdBuscarMascota];
    if (comentario) { // Verifica que el comentario no esté vacío
      this.lostPetsService.enviarComentario(this.IdUsuario, IdBuscarMascota, comentario).subscribe({
        next: (response) => {
          console.log('Comentario enviado:', response);
          // Limpiar el campo de comentario
          this.nuevoComentario[IdBuscarMascota] = '';
        },
        error: (err) => {
          console.error('Error al enviar comentario:', err);
        }
      });
    } else {
      console.error('El comentario está vacío');
    }
  }
  
  

  verComentarios(IdBuscarMascota: number): void {
    this.lostPetsService.obtenerComentarios(IdBuscarMascota).subscribe({
      next: (data: any) => {
        console.log('Comentarios recibidos:', data);
        if (data && data.Result && Array.isArray(data.Result)) {
          this.comentarios[IdBuscarMascota] = data.Result;
          const modal = document.getElementById(`modal-${IdBuscarMascota}`);
          if (modal) {
            modal.style.display = 'block';
          } else {
            console.error('Modal no encontrado');
          }
        } else {
          console.error('Los comentarios no son un array o no están presentes:', data);
        }
      },
      error: (err) => {
        console.error('Error al cargar los comentarios:', err);
      }
    });
  }
  
  closeModal(IdBuscarMascota: number): void {
    const modal = document.getElementById(`modal-${IdBuscarMascota}`);
    if (modal) {
      modal.style.display = 'none';
    }
  }
  
}
