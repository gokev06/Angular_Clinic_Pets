import { Component, OnInit } from '@angular/core';
import { SolicitudAdopcionService, adopcion } from '../../services/solicitud-adopcion.service';

@Component({
  selector: 'app-cardsadopcion',
  templateUrl: './cardsadopcion.component.html',
  styleUrls: ['./cardsadopcion.component.scss']
})
export class CardsadopcionComponent implements OnInit {
  adopciones: adopcion[] = [];
  filteredAdopciones: adopcion[] = [];

  constructor(private solicitudAdopcionService: SolicitudAdopcionService) {}

  ngOnInit() {
    this.solicitudAdopcionService.getAdopciones().subscribe(data => {
      this.adopciones = data;
      this.filteredAdopciones = data;
    });
  }

  applyFilter(searchTerm: string) {
    if (!searchTerm) {
      this.filteredAdopciones = this.adopciones;
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.filteredAdopciones = this.adopciones.filter(adopcion =>
        adopcion.nombre.toLowerCase().includes(searchTerm) ||
        adopcion.raza.toLowerCase().includes(searchTerm) ||
        adopcion.ciudad.toLowerCase().includes(searchTerm)
      );
    }
  }

  FilterNombre: Boolean = false

FiltroNombre(){
  if (this.FilterNombre) {
    this.FilterNombre= false
  }else{
    this.FilterNombre= true
  }
}


sortAsc() {
  this.filteredAdopciones.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
}

sortDesc() {
  this.filteredAdopciones.sort((a: any, b: any) => b.nombre.localeCompare(a.nombre));
}
}
