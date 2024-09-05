import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';

@Component({
  selector: 'app-pages-historial',
  templateUrl: './pages-historial.component.html',
  styleUrls: ['./pages-historial.component.scss']
})
export class PagesHistorialComponent implements OnInit {
  citas: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    const token = localStorage.getItem('userToken');

    this.appointmentService.getUserAppointments(token).pipe(
      map((res: any) => {
        if (res.status === 'success' && res.data) {
          return Array.isArray(res.data) ? res.data : [res.data];
        } else {
          console.error('Error al obtener las citas:', res);
          return [];
        }
      }),
      map(citas => citas.map((cita: any) => ({
        id: cita.IdCita,
        fecha: new Date(cita.fecha).toLocaleDateString('es-ES'),
        hora: cita.hora || '',
        nombre: cita.nombreUsuario || '',
        tipo: cita.tipoCita || '',
        estado: cita.estado || '',
        precio: cita.precio || '',
      }))),
      catchError(error => {
        console.error('Error al obtener las citas:', error);
        return of([]);
      })
    ).subscribe(citasFormateadas => {
      this.citas = citasFormateadas;
    });
  }

  onCitaEliminada(idCita: string): void {
    this.fetchAppointments(); 
  }

  onCitaActualizada(): void {
    this.fetchAppointments();  // Refresca la lista de citas
  }
}
