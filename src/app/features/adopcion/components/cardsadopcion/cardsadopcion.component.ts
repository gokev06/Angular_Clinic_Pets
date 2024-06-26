import { Component, OnInit } from '@angular/core';
import {  SolicitudAdopcionService } from '../../services/solicitud-adopcion.service';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-cardsadopcion',
  templateUrl: './cardsadopcion.component.html',
  styleUrl: './cardsadopcion.component.scss'
})
export class CardsadopcionComponent  implements OnInit {

  adopcion: any;

  constructor(private SolicitudAdopcionService:SolicitudAdopcionService){}

  ngOnInit() {
    this.SolicitudAdopcionService. getAdopciones()
    .subscribe(res=>{
      this.adopcion = res
})
}

//filtros

FilterNombre: Boolean = false
FilterEspecie: Boolean=false
FilterEdad: boolean = false
FilterSexo: boolean=false

FiltroNombre(){
  if (this.FilterNombre) {
    this.FilterNombre= false
  }else{
    this.FilterNombre= true
  }
}

FiltroEspecie(){
  if (this.FilterEspecie) {
    this.FilterEspecie= false
  }else{
    this.FilterEspecie= true
  }
}

FiltroEdad(){
  if (this.FilterEdad) {
    this.FilterEdad= false
  }else{
    this.FilterEdad= true
  }
}

FiltroSexo(){
  if (this.FilterSexo) {
    this.FilterSexo= false
  }else{
    this.FilterSexo= true
  }
}






sexo : string=""
FiltroHembra(){
  this.sexo= "hembra"
  this.SolicitudAdopcionService.getAdopciones().pipe(
    map(adopciones => adopciones.filter(adopcion => adopcion.sexo.toLowerCase() === this.sexo.toLowerCase()))
  ).subscribe(filteredAdopciones => {
    this.adopcion = filteredAdopciones;
  });
}

FiltroMacho(){
  this.sexo= "Macho"
  this.SolicitudAdopcionService.getAdopciones().pipe(
    map(adopciones => adopciones.filter(adopcion => adopcion.sexo.toLowerCase() === this.sexo.toLowerCase()))
  ).subscribe(filteredAdopciones => {
    this.adopcion = filteredAdopciones;
  });
}


sortAsc() {
  this.adopcion.sort((a: any, b: any) => a.nombre.localeCompare(b.nombre));
}

sortDesc() {
  this.adopcion.sort((a: any, b: any) => b.nombre.localeCompare(a.nombre));
}

especie : string = ""
filterGatos() {
  this.especie= "gato"
  this.SolicitudAdopcionService.getAdopciones().pipe(
    map(adopciones => adopciones.filter(adopcion => adopcion.especie.toLowerCase() === this.especie.toLowerCase()))
  ).subscribe(filteredAdopciones => {
    this.adopcion = filteredAdopciones;
  });
}

filterPerro(){
  this.especie= "perro"
  this.SolicitudAdopcionService.getAdopciones().pipe(
    map(adopciones => adopciones.filter(adopcion => adopcion.especie.toLowerCase() === this.especie.toLowerCase()))
  ).subscribe(filteredAdopciones => {
    this.adopcion = filteredAdopciones;
  });
}

  clearFilter() {
    this.ngOnInit()
  }

  sortAdopcionesByAge(order: 'asc' | 'desc'): void {
    this.adopcion.sort((a : any , b : any) => {
      const ageA = parseInt(a.edad);
      const ageB = parseInt(b.edad);
      if (order === 'asc') {
        return ageA - ageB;
      } else {
        return ageB - ageA;
      }
    });
  }

}
