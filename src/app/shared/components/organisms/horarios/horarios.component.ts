import { Component, Inject, OnInit } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit {
  horarios: string[] = [];
  selectedHorario: string | null = null;

  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit(): void {
    this.generateHorarios();
  }

  generateHorarios(): void {
    const isSaturday = this.data.date === 'sábado'; 
    const allHorarios = ['09:00', '10:00', '11:00', '12:00', '13:00', '14:00'];
    this.horarios = isSaturday ? allHorarios.slice(0, 3) : allHorarios;
  }

  selectHorario(horario: string): void {
    this.selectedHorario = this.selectedHorario === horario ? null : horario;
  }
}
