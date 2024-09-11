import { Component, Input, OnInit } from '@angular/core';
import { adopcion, SolicitudAdopcionService, AdopcionesInfo } from '../../services/solicitud-adopcion.service';

@Component({
  selector: 'app-info-adopcion',
  templateUrl: './info-adopcion.component.html',
  styleUrls: ['./info-adopcion.component.scss']
})
export class InfoAdopcionComponent implements OnInit{
  dataPets: AdopcionesInfo | null = null;



  mostrarInfo: boolean = true;  // Mostrar información por defecto

  constructor(private solicitudAdopciones: SolicitudAdopcionService) {}

  ngOnInit(): void {
    this.callPetId();
  }

  callPetId():void{
    const IdAdopcionMascota: string | null = sessionStorage.getItem('IdPet');
    console.log("idAdopcionMascota",IdAdopcionMascota);

    if (IdAdopcionMascota) {
      this.solicitudAdopciones.getPetIdInfo(IdAdopcionMascota).subscribe(
        (data) => {
          if (data && data.length > 0) {
             this.dataPets = data[0];
             console.log(this.dataPets);

             console.log('imagen',this.dataPets.imagenMascota);

          }else{
            console.error('No se encontraron datos para la mascota');
          }
        },
        (error) => {
          console.error('Error al obtener los datos de la mascota', error);
        }
      );
    } else {
      console.error('No se encontró el ID de la mascota en sessionStorage');

    }
  }

  mostrarInformacion() {
    this.mostrarInfo = true;
  }

  mostrarHistoria() {
    this.mostrarInfo = false;
  }

  openWhatsApp() {
    window.open('https://wa.me/+573127544092?text=¡Hola!%20Estoy%20interesado%20en%20recibir%20más%20información%20sobre%20el%20proceso%20de%20adopción.%20¿Podrías%20ayudarme%20con%20eso,%20por%20favor?%20¡Gracias!', '_blank');
  }

}
