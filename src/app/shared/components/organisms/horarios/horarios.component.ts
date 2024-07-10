import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit, OnChanges {
  @Input() data!: { date: string };
  @Output() timeSelected = new EventEmitter<string>();
  horarios: string[] = [];
  selectedHorario: string | null = null;

  constructor() {}

  ngOnInit(): void {
    this.generateHorarios();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.generateHorarios(); 
    }
  }

  generateHorarios(): void {
    const isSaturday = this.data.date === 'sábado';
    const allHorarios = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM','3:00 PM'];
    this.horarios = isSaturday ? allHorarios.slice(0, 3) : allHorarios;
  }

  selectHorario(horario: string): void {
    this.selectedHorario = this.selectedHorario === horario ? null : horario;
    if (this.selectedHorario) {
      this.timeSelected.emit(this.selectedHorario);
    }
  }
}
  