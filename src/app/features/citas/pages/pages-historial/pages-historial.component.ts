import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { catchError, map } from 'rxjs/operators';
import { of } from 'rxjs';
import { saveAs } from 'file-saver';

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

  onDownloadHistorial(idCita: string): void {
    console.log('Descargar historial', idCita);
    
    this.appointmentService.downloadHistorial(idCita).subscribe(
      (response: Blob) => {
        // Verifica si la respuesta es un Blob
        if (response instanceof Blob) {
          saveAs(response, `downloadHistorial${idCita}.pdf`);
        } else {
          console.error('La respuesta no es un Blob');
        }
      },
      error => {
        console.error('Error al descargar el historial:', error);
      }
    );
  }
}
