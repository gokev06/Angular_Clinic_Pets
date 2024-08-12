import { Component, OnInit  } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrl: './agenda.component.scss'
})
export class AgendaComponent implements OnInit{

  viewData : Date = new Date();
  daysInMonth: Date[] = [];
  selectedDay: Date | null = null;
  dayNames: string[] = ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sábado'];
  horas : String[] = ['9:00 AM','10:00 AM' ,'11:00 AM','12:00 PM' ,'1:00 PM','2:00 PM' ,'3:00 PM','4:00 PM', '5:00 PM']

  constructor(private router:Router){}

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

  previousday(){

  }

  nextday(){


  }
  abrirhistorial(){
    this.router.navigate(['crear-historial'])
  }


}

