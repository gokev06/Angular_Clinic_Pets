import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-agenda',
  templateUrl: './agenda.component.html',
  styleUrls: ['./agenda.component.scss']
})
export class AgendaComponent implements OnInit {
  viewData: Date = new Date();
  daysInMonth: Date[] = [];
  horas: string[] = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  citas: any[] = [];
  citasMap: Map<string, Map<string, string>> = new Map();

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    this.generateDaysOfWeek(this.viewData);
    this.loadAppointments();
  }

  generateDaysOfWeek(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfWeek = date.getDay(); // Día de la semana actual

    // Calcula el primer día de la semana actual (Domingo)
    const startOfWeek = new Date(year, month, date.getDate() - dayOfWeek);

    // Genera los 7 días de la semana
    this.daysInMonth = [];
    for (let i = 0; i < 7; i++) {
      this.daysInMonth.push(new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
    }
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments2().subscribe(
      (data) => {
        console.log('Datos recibidos en AgendaComponent:', data); // Verifica los datos recibidos
        this.citas = data[0]; // Asigna las citas recibidas al atributo citas
        this.initializeCitasMap(); // Llama a initializeCitasMap después de cargar las citas
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  initializeCitasMap(): void {
    this.citasMap.clear();
    console.log('Citas recibidas:', this.citas); // Verifica los datos recibidos
    
    this.citas.forEach(cita => {
      if (!cita.fecha || !cita.hora) {
        console.error('Fecha o hora no definida para cita:', cita);
        return;
      }
  
      try {
        const fechaLocal = new Date(cita.fecha);
        const year = fechaLocal.getFullYear();
        const month = String(fechaLocal.getMonth() + 1).padStart(2, '0');
        const day = String(fechaLocal.getDate()).padStart(2, '0');
        const formattedFecha = `${year}-${month}-${day}`;
  
        const [hours, minutes] = cita.hora.split(':');
        let hour = parseInt(hours, 10);
        const period = hour >= 12 ? 'PM' : 'AM';
        hour = hour % 12 || 12;
        const formattedHour = `${hour}:${minutes} ${period}`;
  
        const nombreUsuario = cita.nombreUsuario;
  
        console.log('Fecha formateada:', formattedFecha);
        console.log('Hora formateada:', formattedHour);
        console.log('Nombre de usuario:', nombreUsuario);
  
        if (!this.citasMap.has(formattedFecha)) {
          this.citasMap.set(formattedFecha, new Map());
        }
        
        // Guarda tanto el nombre de usuario como el IdCita
        const citaDetalles: any = {
          nombreUsuario: nombreUsuario,
          idCita: cita.IdCita // Usa 'IdCita' en lugar de 'idCita'
        };
  
        this.citasMap.get(formattedFecha)?.set(formattedHour, citaDetalles);
  
      } catch (error) {
        console.error('Error al procesar la fecha:', error);
      }
    });
  
    // Verifica el contenido de citasMap
    console.log('CitasMap:', this.citasMap);
  }
  
  
  getCitaForDayAndHour(day: Date, hora: string): any | null {
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(day.getDate()).padStart(2, '0');
    const formattedFecha = `${year}-${month}-${dayOfMonth}`;
    
    const citaDetalles = this.citasMap.get(formattedFecha)?.get(hora) || null;
    console.log('Cita para', formattedFecha, hora, ':', citaDetalles);
    return citaDetalles;
  }
  
  
  
  
  nextMonth(): void {
    this.viewData = new Date(this.viewData.getFullYear(), this.viewData.getMonth() + 1, this.viewData.getDate());
    this.generateDaysOfWeek(this.viewData);
  }

  previousMonth(): void {
    this.viewData = new Date(this.viewData.getFullYear(), this.viewData.getMonth() - 1, this.viewData.getDate());
    this.generateDaysOfWeek(this.viewData);
  }

  nextday(): void {
    const newDate = new Date(this.viewData);
    newDate.setDate(this.viewData.getDate() + 7);
    this.viewData = newDate;
    this.generateDaysOfWeek(this.viewData);
  }

  previousday(): void {
    const newDate = new Date(this.viewData);
    newDate.setDate(this.viewData.getDate() - 7);
    this.viewData = newDate;
    this.generateDaysOfWeek(this.viewData);
  }

  isCurrentDay(day: Date): boolean {
    const today = new Date();
    return day.toDateString() === today.toDateString();
  }

  isAlternateColor(day: Date): boolean {
    const today = new Date();
    const dayDifference = (day.getTime() - today.getTime()) / (1000 * 3600 * 24);
    return (dayDifference % 2 === 0) && !this.isCurrentDay(day);
  }

  navigateToHistorial(IdCita: string): void {
    console.log('Id cita:', IdCita); // Verifica aquí el valor de IdCita
    if (IdCita) {
      this.router.navigate(['crear-historial'], { queryParams: { idCita: IdCita } });
    } else {
      console.error('El IdCita es undefined o null');
    }
  }
  
}
