import { Component, OnInit } from '@angular/core';
import { SolicitudAdopcionService, adopcion, Adopciones } from '../../services/solicitud-adopcion.service';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';


@Component({
  selector: 'app-cardsadopcion',
  templateUrl: './cardsadopcion.component.html',
  styleUrls: ['./cardsadopcion.component.scss']
})
export class CardsadopcionComponent implements OnInit {

  adopciones: Adopciones[] = [];
  filteredAdopciones: Adopciones[] = [];
  currentSlide: number = 0;
  slideWidth: number = 300; // Ancho de cada tarjeta (ajústalo según tus necesidades)

  sexo: string = "";
  especie: string = "";

  FilterNombre: Boolean = false;
  FilterEspecie: Boolean = false;
  FilterEdad: boolean = false;
  FilterSexo: boolean = false;

  constructor(private SolicitudAdopcionService: SolicitudAdopcionService, private router: Router) {}

  ngOnInit() {
    this.SolicitudAdopcionService.getPetsData().subscribe(
      (data: any) => {
        console.log("Datos recibidos de la API:", data);
        if (data && data.Result && Array.isArray(data.Result)) {
          this.adopciones = data.Result;
          this.filteredAdopciones = data.Result;
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

  ruta(){
    this.router.navigate(['info-adopcion'])
  }


  /* Carrusel - Obtener el estilo de transformación para desplazar las tarjetas
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
  }*/

  // Filtros
  /*
  applyFilter(searchTerm: string) {
    if (!searchTerm) {
      this.filteredAdopciones = this.adopciones;
    } else {
      searchTerm = searchTerm.toLowerCase();
      this.filteredAdopciones = this.adopciones.filter(adopcion =>
        adopcion.nombreMascota.toLowerCase().includes(searchTerm) ||
        adopcion.razaMascota.toLowerCase().includes(searchTerm) ||
        adopcion.ubicacion.toLowerCase().includes(searchTerm)
      );
    }
  }

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
    this.SolicitudAdopcionService.getPetsData().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.sexo.toLowerCase() === this.sexo.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  } */

  /*
  FiltroMacho() {
    this.sexo = "Macho";
    this.SolicitudAdopcionService.getPetsData().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.sexo.toLowerCase() === this.sexo.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  }
    */

  /*
  sortAsc() {
    this.filteredAdopciones.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
  } */

  /*
  sortDesc() {
    this.filteredAdopciones.sort((a: any, b: any) => b.nombre.localeCompare(a.nombre));
  }
    */

   /*
  filterGatos() {
    this.especie = "gato";
    this.SolicitudAdopcionService.getPetsData().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.especieMascota.toLowerCase() === this.especie.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  } */

  /*
  filterPerro() {
    this.especie = "perro";
    this.SolicitudAdopcionService.getPetsData().pipe(
      map(adopciones => adopciones.filter(adopcion => adopcion.especieMascota.toLowerCase() === this.especie.toLowerCase()))
    ).subscribe(filteredAdopciones => {
      this.filteredAdopciones = filteredAdopciones;
    });
  } */

  /*
  clearFilter() {
    this.ngOnInit();
  } */

  /*

  sortAdopcionesByAge(order: 'asc' | 'desc'): void {
    this.filteredAdopciones.sort((a: any, b: any) => {
      const ageA = parseInt(a.edad);
      const ageB = parseInt(b.edad);
      if (order === 'asc') {
        return ageA - ageB;
      } else {
        return ageB - ageA;
      }
    });
  }
  */
}
