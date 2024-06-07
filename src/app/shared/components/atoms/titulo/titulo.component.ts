import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss'
})
export class TituloComponent {
 @Input() title: string = "";
 @Input() ruta: string=""
 @Input() estilo: string=""

  constructor() {}

}
