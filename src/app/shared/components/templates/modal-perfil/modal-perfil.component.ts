import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrl: './modal-perfil.component.scss'
})
export class ModalPerfilComponent {

  isModalOpen = false;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

  editProfile() {
    
    }
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  closeModalOnOutsideClick(event: Event) {
    this.isModalOpen = false;
  }
}
