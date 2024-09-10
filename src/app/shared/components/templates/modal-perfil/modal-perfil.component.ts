import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrl: './modal-perfil.component.scss'
})
export class ModalPerfilComponent {

  constructor(private router:Router){

  }

  isModalOpen = false;
  @Output() close = new EventEmitter<void>();
  modaledit :boolean = false

  closeModal(): void {
    this.close.emit();
  }

  closeModaledit(){
    this.modaledit= false
  }

  editProfile() {
    this.modaledit= true
    }

    signOff(): void {
      Swal.fire({
        title: '¿Cerrar sesión?',
        text: '¿Estás seguro de que quieres cerrar tu sesión?',
        showCancelButton: true,
        confirmButtonColor: '#7DFF82',
        cancelButtonColor: '#F57171',
        confirmButtonText: 'Sí, cerrar sesión',
        cancelButtonText: 'No, cancelar',
        imageUrl: '../../../../../assets/images/imgcitas/huellas.png',
        imageWidth: 200,
        imageHeight: 200
      }).then((result) => {
        if (result.isConfirmed) {
          // Limpia el localStorage y navega a la página de inicio
          localStorage.clear();
          this.router.navigate(['']);
    
          Swal.fire({
            title: '¡Sesión cerrada!',
            text: 'Has cerrado sesión exitosamente.',
            imageUrl: '../../../../../assets/images/imgcitas/confirmar.png',
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonColor: '#7DFF82',
          });
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          // Opción cancelada, muestra una alerta informativa
          Swal.fire({
            title: 'Cancelado',
            text: 'Tu sesión sigue activa.',
            icon: 'info',
            confirmButtonColor: '#7DFF82',
          });
        }
      });
    }
    


  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  closeModalOnOutsideClick(event: Event) {
    this.isModalOpen = false;
  }
}
