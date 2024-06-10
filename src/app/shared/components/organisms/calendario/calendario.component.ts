import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { HorariosComponent } from '../horarios/horarios.component';

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

  constructor(public dialog: MatDialog) {}

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

      const dialogRef = this.dialog.open(HorariosComponent, {
        data: { date: this.selectedDay.toLocaleDateString('es-ES', { weekday: 'long' }) },
        position: { top: '0', left: '400px' },
        disableClose: true
      });

      dialogRef.afterClosed().subscribe(() => {
        // No necesitas hacer nada aquí si no deseas realizar alguna acción específica al cerrar el diálogo
      });
    }
  }

  isSunday(day: Date): boolean {
    return day.getDay() === 0;
  }

  nextMonth(): void {
    this.viewData = new Date(this.viewData.getFullYear(), this.viewData.getMonth() + 1, 1);
    this.generateDaysInMonth(this.viewData);
  }

  previousMonth(): void {
    this.viewData = new Date(this.viewData.getFullYear(), this.viewData.getMonth() - 1, 1);
    this.generateDaysInMonth(this.viewData);
  }

  isOutsideMonth(day: Date): boolean {
    return day.getMonth() !== this.viewData.getMonth();
  }

  isBeforeFirstDay(day: Date): boolean {
    return day.getFullYear() === 1970;
  }
}
