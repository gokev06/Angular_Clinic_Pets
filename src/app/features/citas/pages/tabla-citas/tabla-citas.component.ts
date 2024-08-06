import { Component, Input, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-tabla-citas',
  templateUrl: './tabla-citas.component.html',
  styleUrl: './tabla-citas.component.scss'
})
export class TablaCitasComponent implements OnInit {

 
  citas: any[] = [];

  constructor(private appointmentService: AppointmentService) {}
  
  ngOnInit(): void {
    this.appointmentService.getAppointments().subscribe(res => {
      this.citas = res;
      console.log(this.citas); 
    });  
  }

  fetchAppointments(): void {
    this.appointmentService.getAppointments()
      .subscribe(res => {
        this.citas = res.map(cita => ({
          ...cita,
          fecha: new Date(cita.fecha.toString()).toLocaleDateString('es-ES'), // Convierte a string primitivo
          hora: cita.hora ? cita.hora : '' 
        }));
      });
  }


  @Input() cita = {
    fecha: '11/02/2024',
    hora: '1:00 PM',
    nombre: 'peppa',
    tipo: 'control general',
    especie: 'perro',
    costo:'50.00',
    descarga: '../../../../../assets/icons/descargas (5) 3.png'
  }
  
 
  
  }
  

