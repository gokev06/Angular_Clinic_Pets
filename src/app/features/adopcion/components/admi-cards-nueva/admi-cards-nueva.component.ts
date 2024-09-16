import { Component, Input, OnInit, EventEmitter, Output } from '@angular/core';
import { adopcion, Adopciones,SolicitudAdopcionService } from '../../services/solicitud-adopcion.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

import Swal from 'sweetalert2';


@Component({
  selector: 'app-admi-cards-nueva',
  templateUrl: './admi-cards-nueva.component.html',
  styleUrls: ['./admi-cards-nueva.component.scss'] // Asegúrate de usar styleUrls
})
export class AdmiCardsNuevaComponent implements OnInit {
  @Input() adopcion!: Adopciones;

  @Output() eliminar = new EventEmitter<void>();

  constructor(private router: Router, private solicitudAdopcion: SolicitudAdopcionService) {}

  ngOnInit() {}

  ruta(IdAdopcionMascota: number ){
    let idPet = IdAdopcionMascota.toString();
    console.log(idPet);


    sessionStorage.setItem('IdPet', idPet)
    this.router.navigate(['info-adopcion'])
  }

  deletePet(IdAdopcionMascota: number ): void {
    let idPet = IdAdopcionMascota.toString();
    console.log(idPet);


  // Mostrar alerta de confirmación antes de proceder con la eliminación
   Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, eliminar',
    cancelButtonText: 'Cancelar'
   }).then((result) => {
    if (result.isConfirmed) {
       // Si el usuario confirma, proceder con la eliminación
       this.solicitudAdopcion.deletePet(idPet).pipe(
        catchError((error) => {
          // Alerta de error si hay un fallo en la eliminación
          Swal.fire({
            title: 'Error',
            text: error.message || 'Ocurrió un error al intentar eliminar la mascota',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al eliminar la mascota', error);
          return throwError(() => new Error('Error en la petición HTTP'));
        })
       ).subscribe({
        next: (response) => {
           // Alerta de confirmación de éxito si la mascota se elimina correctamente
           Swal.fire({
            title: 'Eliminado',
            text: 'La adopción ha sido eliminada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
           });
           console.log('Mascota eliminada', response);
           // Emitir un evento para que el componente padre actualice la vista si es necesario
           this.eliminar.emit();
        },
        error: (err) => {
          console.error('Error final', err);

        },
       });
    }
   });

  }


}
