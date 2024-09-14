import { Component, OnInit, Input } from '@angular/core';
import { AppointmentService } from '../../../../features/citas/services/appointment.service';

@Component({
  selector: 'app-download-historial',
  templateUrl: './download-historial.component.html',
  styleUrls: ['./download-historial.component.scss']
})
export class DownloadHistorialComponent implements OnInit {
  @Input() idCita: string = '';
  historial: any; // Para almacenar los datos del historial

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    if (this.idCita) {
      this.downloadHistorial(this.idCita);
    }
  }

  downloadHistorial(idCita: string): void {
    console.log('Llamada a downloadHistorial con ID:', idCita);
    this.appointmentService.downloadHistorial(idCita).subscribe(
      response => {
        this.historial = response;
        console.log('Historial descargado con éxito:', this.historial);
      },
      error => {
        console.error('Error al descargar el historial:', error);
      }
    );
  }
}
