import { Component , OnInit, Input, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import { UserServiceService } from '../../../../user-service/user-service.service';
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
export class PerfilComponent implements OnInit, OnDestroy {
  user: any = {
    nombre: "Kevin",
    rol: "Usuario",
    imagenPerfil: "../../../../../assets/images/imgcitas/Pdefecto.jpg"
  };
  isModalOpen = false;
  loading = false;
  private userSubscription: Subscription | undefined;
  private loadingSubscription: Subscription | undefined;

  constructor(private userService: UserServiceService) {}

  ngOnInit(): void {
    this.userSubscription = this.userService.user.subscribe(user => {
      if (user) {
        this.user = {
          nombre: user.nombreUsuario,
          rol: user.rol,
          imagenPerfil: user.imagenPerfil
        };
      }
    });

    this.loadingSubscription = this.userService.loading.subscribe(loading => {
      console.log('Estado de carga:', loading); // Para depuración
      this.loading = loading;
    });

    this.loadUserData();
  }

  loadUserData(): void {
    this.userService.loadUserData().subscribe(
      () => {},
      error => console.error('Error al cargar datos del usuario:', error)
    );
  }

  ngOnDestroy(): void {
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
    if (this.loadingSubscription) {
      this.loadingSubscription.unsubscribe();
    }
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }

  closeModal() {
    this.isModalOpen = false;
    this.loadUserData(); // Recargar datos al cerrar el modal
  }
}
