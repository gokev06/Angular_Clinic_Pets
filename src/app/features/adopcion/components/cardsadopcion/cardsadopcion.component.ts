import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { SolicitudAdopcionService, adopcion, Adopciones } from '../../services/solicitud-adopcion.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cardsadopcion',
  templateUrl: './cardsadopcion.component.html',
  styleUrls: ['./cardsadopcion.component.scss']
})
export class CardsadopcionComponent implements OnInit {

  searchTerm: string = '';
  adopciones: Adopciones[] = [];
  filteredAdopciones: Adopciones[] = [];


  currentSlide: number = 0;
  slideWidth: number = 300; // Ancho de cada tarjeta (ajústalo según tus necesidades)

  currentSort: 'az' | 'za' | '' = '';
  currentSpecies: 'perro' | 'gato' | 'todos' = 'todos';

  constructor(private SolicitudAdopcionService: SolicitudAdopcionService, private router: Router) {}

  ngOnInit() {
    this.loadAdopciones();

  }

  loadAdopciones() {
    this.SolicitudAdopcionService.getPetsData().subscribe(
      (data: any) => {
        console.log("Datos recibidos de la API:", data);
        if (data && data.Result && Array.isArray(data.Result)) {
          this.adopciones = data.Result;
           //this.filteredAdopciones = data.Result;
           this.applyFilters();
          console.log("Número de adopciones:", this.adopciones.length);
        } else {
          console.error("La respuesta de la API no tiene el formato esperado");
          this.adopciones = [];
          this.filteredAdopciones = [];
        }
      },
      (error) => {
        console.error("Error al obtener datos:", error);
      }
    );
  }

  ruta(IdAdopcionMascota: number ){
    let idPet = IdAdopcionMascota.toString();
    console.log(idPet);


    sessionStorage.setItem('IdPet', idPet)
    this.router.navigate(['info-adopcion'])
  }

  onSearch(term: string) {
    this.searchTerm = term;
    this.applyFilters();
  }

  /*
  onSearch(term: string) {
    this.searchTerm = term;
    this.filterAdopciones();
  } */


  /*
  filterAdopciones() {
    if (!this.searchTerm) {
      this.filteredAdopciones = this.adopciones;
    } else {
      this.filteredAdopciones = this.adopciones.filter(adopcion =>
        adopcion.nombreMascota.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
        adopcion.ubicacion.toLowerCase().includes(this.searchTerm.toLowerCase())
      );
    }
  } */

  sortName(order: 'az' | 'za') {
    this.currentSort = order;
    this.applyFilters();
  }

  filterSpecies(species: 'perro' | 'gato' | 'todos') {
    this.currentSpecies = species;
    this.applyFilters();
  }


   // Carrusel - Obtener el estilo de transformación para desplazar las tarjetas
  getTransformStyle(): string {
    return `translateX(-${this.currentSlide * (this.slideWidth + 20)}px)`; // 20 es el margen derecho en el CSS
  }

   // Carrusel - Desplazar a la tarjeta anterior
   prevSlide(): void {
    if (this.currentSlide > 0) {
      this.currentSlide--;
    }
  }

    // Carrusel - Desplazar a la siguiente tarjeta
    nextSlide(): void {
      if (this.currentSlide < this.filteredAdopciones.length - 1) {
        this.currentSlide++;
      }
    }

    clearFilters() {
      this.searchTerm = '';
      this.currentSort = '';
      this.currentSpecies = 'todos';
      this.applyFilters();
    }


    applyFilters() {
      let result = this.adopciones;

      // Aplicar búsqueda
      if (this.searchTerm) {
        result = result.filter(adopcion =>
          adopcion.nombreMascota.toLowerCase().includes(this.searchTerm.toLowerCase()) ||
          adopcion.ubicacion.toLowerCase().includes(this.searchTerm.toLowerCase())
        );
      }

      // Aplicar filtro de especie
      if (this.currentSpecies !== 'todos') {
        result = result.filter(adopcion =>
          adopcion.especieMascota.toLowerCase() === this.currentSpecies
        );
      }

      // Aplicar ordenamiento
      if (this.currentSort === 'az') {
        result.sort((a, b) => a.nombreMascota.localeCompare(b.nombreMascota));
      } else if (this.currentSort === 'za') {
        result.sort((a, b) => b.nombreMascota.localeCompare(a.nombreMascota));
      }

      this.filteredAdopciones = result;
    }

  }







