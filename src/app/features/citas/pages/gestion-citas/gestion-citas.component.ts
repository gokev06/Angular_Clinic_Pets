import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-gestion-citas',
  templateUrl: './gestion-citas.component.html',
  styleUrls: ['./gestion-citas.component.scss']
})
export class GestionCitasComponent implements OnInit {
  viewData: Date = new Date();
  daysInMonth: Date[] = [];
  horas: string[] = ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM', '5:00 PM'];
  citas: any[] = [];
  citasMap: Map<string, Map<string, any>> = new Map();
  mostrarCalendario: boolean = false;
  citaAReagendar: any = null;
  horaSeleccionada: string | null = null;
  fechaSeleccionada: Date | null = null;

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.generateDaysOfWeek(this.viewData);
    this.loadAppointments();
  }

  generateDaysOfWeek(date: Date): void {
    const year = date.getFullYear();
    const month = date.getMonth();
    const dayOfWeek = date.getDay();

    const startOfWeek = new Date(year, month, date.getDate() - dayOfWeek);

    this.daysInMonth = [];
    for (let i = 0; i < 7; i++) {
      this.daysInMonth.push(new Date(startOfWeek.getFullYear(), startOfWeek.getMonth(), startOfWeek.getDate() + i));
    }
  }

  loadAppointments(): void {
    this.appointmentService.getAppointments2().subscribe(
      (data) => {
        console.log('Datos recibidos:', data); // Agrega esta línea para depurar
        this.citas = data[0];
        this.initializeCitasMap();
      },
      (error) => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  initializeCitasMap(): void {
    this.citasMap.clear();
    console.log('Citas recibidas:', this.citas);

    this.citas.forEach(cita => {
      if (!cita.fecha || !cita.hora || !cita.IdCita) {
        console.error('Fecha, hora o ID no definido para cita:', cita);
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

        if (!this.citasMap.has(formattedFecha)) {
          this.citasMap.set(formattedFecha, new Map());
        }
        this.citasMap.get(formattedFecha)?.set(formattedHour, cita);
      } catch (error) {
        console.error('Error al procesar la fecha:', error);
      }
    });
  }

  getCitaForDayAndHour(day: Date, hora: string): any | null {
    const year = day.getFullYear();
    const month = String(day.getMonth() + 1).padStart(2, '0');
    const dayOfMonth = String(day.getDate()).padStart(2, '0');
    const formattedFecha = `${year}-${month}-${dayOfMonth}`;

    return this.citasMap.get(formattedFecha)?.get(hora) || null;
  }

  onUserNameClick(day: Date, hora: string): void {
    const cita = this.getCitaForDayAndHour(day, hora);
    if (cita) {
      Swal.fire({
        title: 'Acciones disponibles',
        text: '¿Qué deseas hacer?',
        showCancelButton: true,
        confirmButtonText: 'Reagendar',
        cancelButtonText: 'Cancelar',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
          this.reagendarCita(cita);
        } else if (result.isDismissed) {
          this.cancelarCita(Number(cita.IdCita)); // Convertir a number
        }
      });
    }
  }

  reagendarCita(cita: any): void {
    this.citaAReagendar = cita;
    this.mostrarCalendario = true;
  }

  guardarCita(): void {
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
    console.log('Hora seleccionada:', this.horaSeleccionada);
    console.log('Cita a reagendar:', this.citaAReagendar);

    if (this.fechaSeleccionada && this.horaSeleccionada && this.citaAReagendar) {
      const nuevaCita = {
        fecha: this.formatDate(this.fechaSeleccionada),
        hora: this.horaSeleccionada,
        estado: 'Agendada'
      };

      this.appointmentService.updateAppointment(this.citaAReagendar.IdCita.toString(), nuevaCita).subscribe({
        next: (response) => {
          console.log('Respuesta del servidor:', response);
          Swal.fire('Cita reagendada', '', 'success');
          this.loadAppointments();
          this.cerrarModal();
        },
        error: (error) => {
          console.error('Error al reagendar:', error);
          Swal.fire('Error al reagendar', '', 'error');
        }
      });
    } else {
      Swal.fire('¡Hubo un problema!', 'Debes seleccionar la fecha y hora antes de guardar.', 'warning');
    }
  }

  cerrarModal(): void {
    this.mostrarCalendario = false;
    this.citaAReagendar = null;
    this.fechaSeleccionada = null;
    this.horaSeleccionada = null;
  }

  formatDate(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
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

  cancelarCita(idCita: number): void {
    console.log('id:', idCita);

    this.appointmentService.updateAppointmentStatus(idCita.toString(), 'Cancelada').subscribe({

      next: () => {
        Swal.fire('Cita cancelada', '', 'success');
        this.loadAppointments();
      },
      error: () => {
        Swal.fire('Error al cancelar la cita', '', 'error');
      }
    });
  }
}
