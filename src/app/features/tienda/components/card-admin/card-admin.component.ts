import { Component, Input } from '@angular/core';
import { productos } from '../../services/producto-tienda.service';

@Component({
  selector: 'app-card-admin',
  templateUrl: './card-admin.component.html',
  styleUrl: './card-admin.component.scss'
})
export class CardAdminComponent {
  
  @Input() productos: productos[] = []; // Recibir productos filtrados desde el componente padre

  constructor() {}

  ngOnInit(): void {
    // Inicialización adicional si es necesario
  }


}
