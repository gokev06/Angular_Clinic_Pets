import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalVerAdopcionComponent } from '../../../../shared/components/templates/modal-ver-adopcion/modal-ver-adopcion.component';
import { AdopcionesVerify, SolicitudAdopcionService,  } from '../../services/solicitud-adopcion.service';
import { Router } from '@angular/router';
import { catchError, throwError } from 'rxjs';

@Component({
  selector: 'app-carta-solicitud-adopcion',
  templateUrl: './carta-solicitud-adopcion.component.html',
  styleUrls: ['./carta-solicitud-adopcion.component.scss']
})
export class CartaSolicitudAdopcionComponent implements OnInit {
  modalVerAdopcion : boolean = false

  @Input() datos!: AdopcionesVerify;



  constructor(private SolicitudAdopcionService: SolicitudAdopcionService, private router: Router) {}

  ngOnInit() {}


  Closemodalveradopcion(){
 this.modalVerAdopcion= false
}

openModal() {
  this.modalVerAdopcion= true;
}


  AlertaAceptar() {
    Swal.fire({
      title: 'Solicitud de Adopción',
      html: `Nombre: ${this.datos.nombreMascota}<br>Especie: ${this.datos.especieMascota}`,
      imageUrl: 'assets/images/imgcitas/deciscion.png',
      imageWidth: 300,
      imageHeight: 200,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true,
      cancelButtonColor: 'rgba(209, 0, 0, 0.47)',
      confirmButtonColor:'rgba(55, 163, 59, 0.47)'

    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡ Solicitud Aceptada!',
          imageUrl: 'assets/images/imgcitas/confirmar.png',  // Reemplaza con la ruta de tu imagen
          imageWidth: 100,  // Ajusta el ancho de la imagen
          imageHeight: 100,  // Ajusta la altura de la imagen
          imageAlt: 'Confirmación de solicitud'  // Descripción alternativa de la imagen
        });
      }
    });
  }

  updatePetVerify(IdAdopcionMascota: number ): void {
    let idPet = IdAdopcionMascota.toString();
    console.log(idPet);


  // Mostrar alerta de confirmación antes de proceder con la confirmacion
   Swal.fire({
    title: '¿Estás seguro?',
    text: "No podrás revertir esta acción",
    icon: 'warning',
    showCancelButton: true,
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    confirmButtonText: 'Sí, validar',
    cancelButtonText: 'Cancelar'
   }).then((result) => {
    if (result.isConfirmed) {
       // Si el usuario confirma, proceder con la eliminación
       this.SolicitudAdopcionService.updatePetVerify(idPet).pipe(
        catchError((error) => {
          // Alerta de error si hay un fallo en la eliminación
          Swal.fire({
            title: 'Error',
            text: error.message || 'Ocurrió un error al intentar validar la mascota',
            icon: 'error',
            confirmButtonText: 'Aceptar'
          });
          console.error('Error al validar la mascota', error);
          return throwError(() => new Error('Error en la petición HTTP'));
        })
       ).subscribe({
        next: (response) => {
           // Alerta de confirmación de éxito si la mascota se elimina correctamente
           Swal.fire({
            title: 'Validado',
            text: 'La solicitud ha sido validada para adopcion',
            icon: 'success',
            confirmButtonText: 'Aceptar'
           });
           console.log('Mascota validada', response);
           // Emitir un evento para que el componente padre actualice la vista si es necesario
          this.router.navigate(['admin-adopciones'])
        },
        error: (err) => {
          console.error('Error final', err);

        },
       });
    }
   });

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
       this.SolicitudAdopcionService.deletePetVerify(idPet).pipe(
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
            text: 'La solicitud ha sido eliminada correctamente',
            icon: 'success',
            confirmButtonText: 'Aceptar'
           });
           console.log('Mascota eliminada', response);
           // Emitir un evento para que el componente padre actualice la vista si es necesario
          this.router.navigate(['admin-adopciones'])
        },
        error: (err) => {
          console.error('Error final', err);

        },
       });
    }
   });

  }
}
