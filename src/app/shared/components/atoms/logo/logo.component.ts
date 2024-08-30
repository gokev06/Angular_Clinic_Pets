import { Component } from '@angular/core';

@Component({
  selector: 'app-logo',
  templateUrl: './logo.component.html',
  styleUrls: ['./logo.component.scss']
})
export class LogoComponent {

  userRol: string | null = null;
  rolSeleccionado: string | null = '';

  constructor(){

  }

  ngOnInit(){
  // Recuperar el rol del usuario del sessionStorage
    this.userRol = sessionStorage.getItem('userRole');
    switch (this.userRol) {
      case 'usuario':
         this.rolSeleccionado = '/home';
        break;
      case 'veterinario':
         this.rolSeleccionado = '/home-vet';
      break;
      case 'administrador':
         this.rolSeleccionado = '/home-admin';
      break;
      default:
        this.rolSeleccionado = '';
        break;
    }
  }



}
