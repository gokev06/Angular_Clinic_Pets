import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { DisabledHorariosService } from '../calendario/service/disabled-horarios.service';

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
  today: Date = new Date();

  @Output() dateSelected = new EventEmitter<Date>();
  @Output() timeSelected = new EventEmitter<string>();
  @Input() showDeactivateButton: boolean = false;

  constructor(private disabledHorariosService: DisabledHorariosService) {}
  
  ngOnInit(): void {
    this.generateDaysInMonth(this.viewData);
    this.disabledHorariosService.loadDisabledHorarios();
    this.disabledHorariosService.loadDisabledDays();
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
    if (this.isDateInPast(day)) {
      return;
    }
  
    if (!this.isOutsideMonth(day) && !this.isBeforeFirstDay(day) && !this.isSunday(day)) {
      this.selectedDay = new Date(day.getFullYear(), day.getMonth(), day.getDate());
      const formattedDate = this.selectedDay.toISOString().split('T')[0]; // Formato adecuado yyyy-MM-dd
      this.dateSelected.emit(this.selectedDay);
    }
  }
  

  isDateInPast(day: Date): boolean {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    return day.getTime() < today.getTime();
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
