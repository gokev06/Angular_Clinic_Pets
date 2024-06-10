import { Component,Input } from '@angular/core';

@Component({
  selector: 'app-contenedores',
  templateUrl: './contenedores.component.html',
  styleUrl: './contenedores.component.scss'
})
export class ContenedoresComponent {
  @Input() title: string = "Agendar citas";
  @Input() ruta: string="/citas"
  @Input() estilo: string=""
 
   constructor() {}
}
