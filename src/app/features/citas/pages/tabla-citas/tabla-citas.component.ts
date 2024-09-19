import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';
import { saveAs } from 'file-saver';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrls: ['./tabla-citas.component.scss']
})
export class TablaCitasComponent implements OnInit {
  citas: any[] = [];

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.fetchAppointments();
  }

  fetchAppointments(): void {
    this.appointmentService.getAllUserDates().subscribe(
      (res: any) => {
        if (res && res.result) {
          this.citas = res.result.map((cita: any) => ({
            ...cita,
            fecha: new Date(cita.fecha).toLocaleDateString('es-ES'),
            hora: cita.hora || ''
          }));
        } else {
          console.error('La respuesta no tiene el formato esperado:', res);
        }
      },
      error => {
        console.error('Error al obtener las citas:', error);
      }
    );
  }

  onDownloadCita(idCita: string): void {
    this.appointmentService.downloadHistorial(idCita).subscribe(
      (response: Blob) => {
        if (response instanceof Blob) {
          saveAs(response, `cita_${idCita}.pdf`); // Cambia la extensión según el tipo de archivo
        } else {
          console.error('La respuesta no es un Blob');
        }
      },
      error => {
        console.error('Error al descargar la cita:', error);
      }
    );
  }
}
