import { Component } from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  isModalOpen = false;

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  editProfile() {
    console.log('Editar perfil');
  }

  closeModal() {
    this.isModalOpen = false;
  }

  closeModalOnOutsideClick(event: Event) {
    this.isModalOpen = false;
  }

  stopPropagation(event: Event) {
    event.stopPropagation();
  }
}
