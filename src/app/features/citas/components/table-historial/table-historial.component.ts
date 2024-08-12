import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-table-historial',
  templateUrl: './table-historial.component.html',
  styleUrls: ['./table-historial.component.scss']
})
export class TableHistorialComponent implements OnInit {
  @Input() citas: any[] = [];
  @Output() citaEliminada = new EventEmitter<string>();

  mostrarCalendario: boolean = false;
  citaAReagendar: any = null;
  horaSeleccionada: string | null = null;
  fechaSeleccionada: Date | null = null;
  idCita: string | null = null;

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {}

  deleteAppointment(idCita: string): void {
    console.log('Identificador de la cita:', idCita); 

    this.appointmentService.deleteAppointment(idCita).subscribe({
      next: (res) => {
        console.log('Cita eliminada con éxito:', res);
        this.citaEliminada.emit(idCita);

        // Actualiza la lista de citas 
        this.citas = this.citas.filter(cita => cita.id !== idCita);
      },
      error: (error) => {
        console.error('Error al eliminar la cita:', error);
      }
    });
  }

  onChangeEstado(cita: any, event: any): void {
    const nuevoEstado = event.target.value;

    if (nuevoEstado === 'Reagendar') {
      this.mostrarCalendario = true;
      this.citaAReagendar = cita;
      this.idCita = cita.id;  // Guardar idCita
    } else if (nuevoEstado === 'Cancelar') {
      this.cancelAppointment(cita.id);
      cita.estado = 'Cancelado';  // Actualizar el estado a 'Cancelado'
    }
  }

  onFechaSeleccionada(fecha: Date): void {
    this.fechaSeleccionada = fecha;
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  }

  onTimeSeleccionada(time: string): void {
    this.horaSeleccionada = time;
    console.log('Hora seleccionada:', this.horaSeleccionada);
  }

  guardarCita(): void {
    if (this.fechaSeleccionada && this.horaSeleccionada && this.idCita) {
      const nuevaCita = {
        fecha: this.fechaSeleccionada.toISOString().split('T')[0], // Formatear fecha
        hora: this.horaSeleccionada,
        estado: 'Agendada'
      };

      console.log('Datos para actualizar:', nuevaCita);

      this.appointmentService.updateAppointment(this.idCita, nuevaCita).subscribe({
        next: (res: any) => {
          console.log('Cita actualizada con éxito:', res);
          this.cerrarModal();
          // Actualiza la lista de citas o maneja la respuesta según sea necesario
        },
        error: (error: any) => {
          console.error('Error al actualizar la cita:', error);
        }
      });
    } else {
      console.error('Fecha, hora, y idCita deben ser seleccionadas antes de guardar.');
    }
  }

  cerrarModal(): void {
    this.mostrarCalendario = false;
    this.citaAReagendar = null;
    this.fechaSeleccionada = null;
    this.horaSeleccionada = null;
    this.idCita = null;
  }

  cancelAppointment(idCita: string): void {
    const estadoCancelado = 'Cancelado';

    this.appointmentService.updateAppointmentStatus(idCita, estadoCancelado).subscribe({
      next: (res: any) => {
        console.log('Cita cancelada con éxito:', res);
        // this.fetchAppointments(); // Refrescar la lista de citas
      },
      error: (error: any) => {
        console.error('Error al cancelar la cita:', error);
      }
    });
  }
}




    /**
     * 
     * 
     * .pipe(
      tap( res => {
        console.log('escucha el pipe: ');
        
        console.log('Cita eliminada con exito:', res);
        this.citaEliminada.emit(idCita);
      }),
      catchError(error => {
        console.error('Error al eliminar la cita:', error);
        return of(null);
      })
    ).subscribe();
     */