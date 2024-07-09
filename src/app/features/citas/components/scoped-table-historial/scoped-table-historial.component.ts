import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoped-table-historial',
  templateUrl: './scoped-table-historial.component.html',
  styleUrl: './scoped-table-historial.component.scss'
})
export class ScopedTableHistorialComponent implements OnInit{
@Input() cita = {
  id: '',
  fecha: '',
  hora: '',
  nombre: '',
  tipo: '',
  estado: '',
  costo:'',
}

constructor(){}

ngOnInit() {
    
}

}
