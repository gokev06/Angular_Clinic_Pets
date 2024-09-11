import { Component, Input, OnInit, ViewChild } from '@angular/core';
import Swal from 'sweetalert2';
import { ModalVerAdopcionComponent } from '../../../../shared/components/templates/modal-ver-adopcion/modal-ver-adopcion.component';

@Component({
  selector: 'app-carta-solicitud-adopcion',
  templateUrl: './carta-solicitud-adopcion.component.html',
  styleUrls: ['./carta-solicitud-adopcion.component.scss']
})
export class CartaSolicitudAdopcionComponent implements OnInit {
  modalVerAdopcion : boolean = false

  openModal() {
    this.modalVerAdopcion= true;
  }


  
  Closemodalveradopcion(){
this.modalVerAdopcion= false
}



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
        Swal.fire({
          title: '¡ Solicitud Aceptada!',
          imageUrl: 'assets/images/imgcitas/confirmar.png',  // Reemplaza con la ruta de tu imagen
          imageWidth: 100,  // Ajusta el ancho de la imagen
          imageHeight: 100,  // Ajusta la altura de la imagen
          imageAlt: 'Descripción de la imagen'  // Descripción alternativa de la imagen
        });
      }
    });
  }
}
