import { Component, OnInit } from '@angular/core';
import { SolicitudAdopcionService, AdopcionesVerify } from '../../services/solicitud-adopcion.service';

@Component({
  selector: 'app-solicitud-adopcion',
  templateUrl: './solicitud-adopcion.component.html',
  styleUrl: './solicitud-adopcion.component.scss'
})
export class SolicitudAdopcionComponent implements OnInit{
    adopciones: AdopcionesVerify [] = [];

    constructor(private solicitudAdopcionService: SolicitudAdopcionService){}

    ngOnInit(): void {
       this.cargarAdopciones();
       console.log('funciona???');

    }

    cargarAdopciones() {
      this.solicitudAdopcionService.callPetsVerify().subscribe(
        (data: AdopcionesVerify[]) => {
          if (Array.isArray(data)) {
            this.adopciones = data;
            console.log('Adopciones cargadas:', this.adopciones);
          } else {
            console.error('Los datos recibidos no son un array:', data);
            this.adopciones = [];
          }
        },
        (error) => {
          console.error('Error al cargar las adopciones:', error);
          this.adopciones = [];
        }
      );
    }
}
