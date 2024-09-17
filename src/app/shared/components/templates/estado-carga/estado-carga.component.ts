import { Component } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-estado-carga',
  templateUrl: './estado-carga.component.html',
  styleUrl: './estado-carga.component.scss'
})
export class EstadoCargaComponent {private modalStatus = new Subject<boolean>();
  
}