import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

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
    this.appointmentService.getAppointments().subscribe(res => {
      this.citas = res.map(cita => ({
        ...cita,
        fecha: new Date(cita.fecha).toLocaleDateString('es-ES'),
        hora: cita.hora ? cita.hora : ''
      }));
    });
  }
}
