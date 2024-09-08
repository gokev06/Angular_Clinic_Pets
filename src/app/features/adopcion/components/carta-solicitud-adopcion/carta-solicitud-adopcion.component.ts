import { Component, Input, OnInit } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-carta-solicitud-adopcion',
  templateUrl: './carta-solicitud-adopcion.component.html',
  styleUrl: './carta-solicitud-adopcion.component.scss'
})
export class CartaSolicitudAdopcionComponent implements OnInit {
  @Input() datos = {
    correo: 'juano@gmail.com',
    nombre: 'COCO',
  };
  nombre: any;

  constructor() {}

  ngOnInit() {}

  AlertaAceptar() {
    Swal.fire({
      title: 'Solicitud de Adopción',
      html: `Correo: ${this.datos.correo}<br>Nombre: ${this.datos.nombre}`,
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
        Swal.fire('¡Aceptado!', 'Has hecho clic en Aceptar.', 'success');
      } 
    });
  }
}
