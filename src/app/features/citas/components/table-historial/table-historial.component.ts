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
export class TableHistorialComponent  {
 @Input() citas: any[] = [];
 @Output() citaEliminada = new EventEmitter<string>();

  constructor(private appointmentService: AppointmentService, private router: Router) {}


  deleteAppointment(idCita: string): void{
    this.appointmentService.deleteAppointment(idCita).pipe(
      tap( res => {
        console.log('Cita eliminada con exito:', res);
        this.citaEliminada.emit(idCita);
      }),
      catchError(error => {
        console.error('Error al eliminar la cita:', error);
        return of(null);
      })
    ).subscribe();
  }
}
