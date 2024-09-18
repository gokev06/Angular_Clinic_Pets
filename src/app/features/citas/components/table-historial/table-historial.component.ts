import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { Router } from '@angular/router';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-table-historial',
  templateUrl: './table-historial.component.html',
  styleUrls: ['./table-historial.component.scss']
})
export class TableHistorialComponent implements OnInit {
  @Input() citas: any[] = [];
  @Output() citaEliminada = new EventEmitter<string>();
  @Output() citaActualizada = new EventEmitter<void>();
  @Output() descargarHistorial = new EventEmitter<string>();

  mostrarCalendario: boolean = false;
  citaAReagendar: any = null;
  horaSeleccionada: string | null = null;
  fechaSeleccionada: Date | null = null;
  idCita: string | null = null;

  constructor(private appointmentService: AppointmentService, private router: Router) {}

  ngOnInit(): void {
    console.log(this.citas);
    
  }

  downloadHistorial(idCita: string): void {
    this.descargarHistorial.emit(idCita);
    console.log('idCita de table', idCita);
  }

  onFechaSeleccionada(fecha: Date): void {
    this.fechaSeleccionada = fecha;
    console.log('Fecha seleccionada:', this.fechaSeleccionada);
  }

  onTimeSeleccionada(time: string): void {
    this.horaSeleccionada = time;
    console.log('Hora seleccionada:', this.horaSeleccionada);
  }

  deleteAppointment(idCita: string): void {
    this.appointmentService.deleteAppointment(idCita).subscribe({
      next: (res) => {
        this.citaEliminada.emit(idCita);
        this.citas = this.citas.filter(cita => cita.id !== idCita);
        this.citaActualizada.emit();  // Emitir evento después de eliminar la cita
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
      this.idCita = cita.id;
    } else if (nuevoEstado === 'Cancelar') {
      this.cancelAppointment(cita.id);
      cita.estado = 'Cancelada';
      this.citaActualizada.emit();  // Emitir evento después de cancelar la cita
    }
  }

  guardarCita(): void {
    if (this.fechaSeleccionada && this.horaSeleccionada && this.idCita) {
      // Obtener la cita original
      const citaOriginal = this.citas.find(cita => cita.id === this.idCita);
      if (!citaOriginal) {
        Swal.fire({
          title: '¡Error!',
          text: 'No se encontró la cita original.',
          icon: 'error',
          confirmButtonColor: '#F57171',
        });
        return;
      }
  
      const fechaOriginal = new Date(citaOriginal.fecha);
      const fechaSeleccionada = new Date(this.fechaSeleccionada);
      const hoy = new Date();
      const esHoy = fechaOriginal.toDateString() === hoy.toDateString();
  
      if (esHoy) {
        Swal.fire({
          title: '¡Error!',
          text: 'No se puede reagendar una cita agendada para hoy a otro día.',
          icon: 'error',
          confirmButtonColor: '#F57171',
        });
        return;
      }
  
      // Validar si la nueva fecha es válida (hasta un día antes de la fecha original)
      const diferenciaDias = Math.ceil((fechaOriginal.getTime() - fechaSeleccionada.getTime()) / (1000 * 60 * 60 * 24));
      if (diferenciaDias < 1) {
        Swal.fire({
          title: '¡Error!',
          text: 'Solo puedes reagendar la cita hasta un día antes de la fecha original.',
          icon: 'error',
          confirmButtonColor: '#F57171',
        });
        return;
      }
  
      Swal.fire({
        title: '¿Reagendar cita?',
        text: '¿Estás seguro de que deseas reagendar esta cita?',
        showCancelButton: true,
        confirmButtonColor: '#7DFF82',
        cancelButtonColor: '#F57171',
        confirmButtonText: 'Sí, reagendar',
        cancelButtonText: 'No, cancelar',
        imageUrl: '../../../../../assets/images/imgcitas/huellas.png',
        imageWidth: 200,
        imageHeight: 200
      }).then((result) => {
        if (result.isConfirmed) {
          const nuevaCita = {
            fecha: this.fechaSeleccionada ? this.formatDate(this.fechaSeleccionada) : '',
            hora: this.horaSeleccionada || '',
            estado: 'Agendada'
          };
  
          if (this.idCita) {
            this.appointmentService.updateAppointment(this.idCita, nuevaCita).subscribe({
              next: (res: any) => {
                console.log('Cita actualizada con éxito:', res);
                Swal.fire({
                  title: '¡Cita reagendada!',
                  text: 'La cita ha sido reagendada exitosamente.',
                  imageUrl: '../../../../../assets/images/imgcitas/confirmar.png',
                  imageWidth: 200,
                  imageHeight: 200,
                  confirmButtonColor: '#7DFF82',
                });
                this.cerrarModal();
                this.citaActualizada.emit();  // Emitir evento después de reagendar la cita
              },
              error: (error: any) => {
                console.error('Error al actualizar la cita:', error);
                Swal.fire({
                  title: '¡Error!',
                  text: 'Ocurrió un error al intentar reagendar la cita.',
                  icon: 'error',
                  confirmButtonColor: '#F57171',
                });
              }
            });
          }
        } else if (result.dismiss === Swal.DismissReason.cancel) {
          Swal.fire({
            title: 'Cancelado',
            text: 'La cita no fue reagendada.',
            icon: 'info',
            confirmButtonColor: '#7DFF82',
          });
        }
      });
    } else {
      Swal.fire({
        title: '¡Hubo un problema!',
        text: 'Debes seleccionar la fecha, hora, y el ID de la cita antes de guardar.',
        icon: 'warning',
        confirmButtonColor: 'rgba(209, 0, 0, 0.47)',
      });
      console.error('Fecha, hora, y idCita deben ser seleccionadas antes de guardar.');
    }
  }
  
  formatDate(date: Date): string {
    const offset = date.getTimezoneOffset();
    const adjustedDate = new Date(date.getTime() - (offset * 60 * 1000));
    return adjustedDate.toISOString().split('T')[0];
  }
  
  cerrarModal(): void {
    this.mostrarCalendario = false;
    this.citaAReagendar = null;
    this.fechaSeleccionada = null;
    this.horaSeleccionada = null;
    this.idCita = null;
  }
  

  cancelAppointment(idCita: string): void {
    const estadoCancelado = 'Cancelada';

    this.appointmentService.updateAppointmentStatus(idCita, estadoCancelado).subscribe({
      next: (res: any) => {
        console.log('Cita cancelada con éxito:', res);
        this.citaActualizada.emit();  // Emitir evento después de cancelar la cita
      },
      error: (error: any) => {
        console.error('Error al cancelar la cita:', error);
      }
    });
  }
}
