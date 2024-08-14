import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-cardformulario',
  templateUrl: './cardformulario.component.html',
  styleUrls: ['./cardformulario.component.scss']
})
export class CardformularioComponent {
  @Input() datosFormulario: any = {};

  // Si necesitas manipular los datos, puedes hacerlo aquí.
}

