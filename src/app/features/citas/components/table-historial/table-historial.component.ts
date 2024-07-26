import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-table-historial',
  templateUrl: './table-historial.component.html',
  styleUrls: ['./table-historial.component.scss']
})
export class TableHistorialComponent implements OnInit {
 @Input() citas: any[] = [];

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
