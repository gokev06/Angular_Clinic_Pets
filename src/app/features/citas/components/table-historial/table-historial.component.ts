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
    console.log('Identificador de la cita:',idCita); 
    
    this.appointmentService.deleteAppointment(idCita).subscribe({
      next: (res) => {
        console.log('cita eliminada con exito:', res);
        this.citaEliminada.emit(idCita);

        //Actualiza la lista de citas 
        this.citas = this.citas.filter(cita => cita.id !== idCita);
        
      },

      error: (error) => {
        console.error('Error al eliminar  la cita: ', error);
        
      }
    });


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
     * 
     */
  }
}
