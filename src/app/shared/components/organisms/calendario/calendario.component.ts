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
  //monthNames: string[] = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']

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
    if (!this.isOutsideMonth(day) && !this.isBeforeFirstDay(day) && !this.isSunday(day)) {
      this.selectedDay = day;
      this.dateSelected.emit(day);
    }
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
