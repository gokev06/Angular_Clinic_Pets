import { Component, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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

  signOff(){
    localStorage.clear();
    this.router.navigate([''])
  }


  stopPropagation(event: Event) {
    event.stopPropagation();
  }
  closeModalOnOutsideClick(event: Event) {
    this.isModalOpen = false;
  }
}
