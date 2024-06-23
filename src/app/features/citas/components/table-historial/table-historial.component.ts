import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-table-historial',
  templateUrl: './table-historial.component.html',
  styleUrl: './table-historial.component.scss'
})
export class TableHistorialComponent implements OnInit {

  citas: any

  constructor(private AppointmentService:AppointmentService){}
  
  ngOnInit() {
      this.AppointmentService. getAppointments()
      .subscribe(res=>{
        this.citas = res
     
})
  }
}
