import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-modal-perfil',
  templateUrl: './modal-perfil.component.html',
  styleUrl: './modal-perfil.component.scss'
})
export class ModalPerfilComponent {

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
  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  closeModalOnOutsideClick(event: Event) {
    this.isModalOpen = false;
  }
}
