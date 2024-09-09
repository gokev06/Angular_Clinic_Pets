import { Component, OnInit } from '@angular/core';
import { SolicitudAdopcionService, adopcion } from '../../services/solicitud-adopcion.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-admin-cards',
  templateUrl: './admin-cards.component.html',
  styleUrls: ['./admin-cards.component.scss']
})
export class AdminCardsComponent implements OnInit {
  adopciones: adopcion[] = [];
  filteredAdopciones: adopcion[] = [];
  currentSlide: number = 0;
  slideWidth: number = 300; // Ancho de cada tarjeta (ajústalo según tus necesidades)

  sexo: string = "";
  especie: string = "";

  FilterNombre: Boolean = false;
  FilterEspecie: Boolean = false;
  FilterEdad: boolean = false;
  FilterSexo: boolean = false;

  constructor(private SolicitudAdopcionService: SolicitudAdopcionService) {}

  ngOnInit() {
    this.SolicitudAdopcionService.getAdopciones().subscribe(data => {
      this.adopciones = data;
      this.filteredAdopciones = data;
    });
  }

  // Aplicar filtro de búsqueda
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

  // Manejar eliminación de adopción
  handleEliminar(adopcion: adopcion) {
    this.filteredAdopciones = this.filteredAdopciones.filter(a => a.id !== adopcion.id);
    this.adopciones = this.adopciones.filter(a => a.id !== adopcion.id);
  }

  // Métodos de filtro
  FiltroNombre() {
    this.FilterNombre = !this.FilterNombre;
  }

  FiltroEspecie() {
    this.FilterEspecie = !this.FilterEspecie;
  }

  FiltroEdad() {
    this.FilterEdad = !this.FilterEdad;
  }

  FiltroSexo() {
    this.FilterSexo = !this.FilterSexo;
  }

  FiltroHembra() {
    this.sexo = "hembra";
    this.SolicitudAdopcionService.getAdopciones().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.sexo.toLowerCase() === this.sexo.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  }

  FiltroMacho() {
    this.sexo = "macho";
    this.SolicitudAdopcionService.getAdopciones().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.sexo.toLowerCase() === this.sexo.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  }

  sortAsc() {
    this.filteredAdopciones.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
  }

  sortDesc() {
    this.filteredAdopciones.sort((a: any, b: any) => b.nombre.localeCompare(a.nombre));
  }

  filterGatos() {
    this.especie = "gato";
    this.SolicitudAdopcionService.getAdopciones().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.especie.toLowerCase() === this.especie.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  }

  filterPerro() {
    this.especie = "perro";
    this.SolicitudAdopcionService.getAdopciones().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.especie.toLowerCase() === this.especie.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  }

  clearFilter() {
    this.ngOnInit();
  }

  sortAdopcionesByAge(order: 'asc' | 'desc'): void {
    this.filteredAdopciones.sort((a: any, b: any) => {
      const ageA = parseInt(a.edad);
      const ageB = parseInt(b.edad);
      return order === 'asc' ? ageA - ageB : ageB - ageA;
    });
  }
}
