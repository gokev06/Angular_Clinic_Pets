import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-titulo',
  templateUrl: './titulo.component.html',
  styleUrl: './titulo.component.scss'
})
export class TituloComponent {
 @Input() title: string = "Agendar citas";
 @Input() ruta: string="/citas"
 @Input() estilo: string=""

  constructor() {}

}
