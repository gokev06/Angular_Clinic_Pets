import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit, OnChanges {
  @Input() data!: { date: string };
  horarios: string[] = [];
  selectedHorario: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.generateHorarios();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.generateHorarios(); // Regenerate horarios when input data changes
    }
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
