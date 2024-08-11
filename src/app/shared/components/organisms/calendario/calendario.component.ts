import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  viewData: Date = new Date();
  daysInMonth: Date[] = [];
  selectedDay: Date | null = null;
  dayNames: string[] = ['Dom', 'Lun', 'Mar', 'Mié', 'Jue', 'Vie', 'Sáb'];
  today: Date = new Date(); // Añadido para comparar fechas

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() timeSelected = new EventEmitter<string>(); 

  constructor() {}
  
  ngOnInit(): void {
    this.generateDaysInMonth(this.viewData);
  }

  generateDaysInMonth(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDayOfMonth = new Date(year, month, 1);
    const startingDay = firstDayOfMonth.getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    this.daysInMonth = [];

    for (let i = 0; i < startingDay; i++) {
      this.daysInMonth.push(new Date(1970, 0, i + 1));
    }

    for (let day = 1; day <= daysInMonth; day++) {
      this.daysInMonth.push(new Date(year, month, day));
    }
  }

  selectDay(day: Date): void {
    //console.log('date selected', this.dateSelected);
    //console.log('day', day);
    
    if (this.isDateInPast(day)) {
      return;
    }
  
    if (!this.isOutsideMonth(day) && !this.isBeforeFirstDay(day) && !this.isSunday(day)) {
      // Ajustar la fecha para eliminar la información de tiempo
      this.selectedDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      //console.log('Selected Day:', this.selectedDay);
  
      // Emitir la fecha en formato 'YYYY-MM-DD'
      const formattedDate = this.selectedDay.toISOString().split('T')[0];
      this.dateSelected.emit(this.selectedDay); // Emitir la fecha como Date
    }
  }
  

  isDateInPast(day: Date): boolean {
    const today = new Date(); // Crear una nueva instancia para evitar modificar `this.today`
    today.setHours(0, 0, 0, 0); // Establecer la hora a medianoche
    return day.getTime() < today.getTime(); // Comparar los valores de tiempo
  }

  isSunday(day: Date): boolean {
    return day.getDay() === 0;
  }

  nextMonth(): void {
    this.viewData = new Date(this.viewData.getFullYear(), this.viewData.getMonth() + 1, 1);
    this.generateDaysInMonth(this.viewData);
    this.selectedDay = null;
  }

  previousMonth(): void {
    this.viewData = new Date(this.viewData.getFullYear(), this.viewData.getMonth() - 1, 1);
    this.generateDaysInMonth(this.viewData);
    this.selectedDay = null;
  }

  isOutsideMonth(day: Date): boolean {
    return day.getMonth() !== this.viewData.getMonth();
  }

  isBeforeFirstDay(day: Date): boolean {
    return day.getFullYear() === 1970;
  }

  onTimeSelected(time: string): void { 
    this.timeSelected.emit(time);
  }
}
