import { Component, OnInit } from '@angular/core';
import { AppointmentService } from '../../services/appointment.service';

@Component({
  selector: 'app-pages-historial',
  templateUrl: './pages-historial.component.html',
  styleUrl: './pages-historial.component.scss'
})
export class PagesHistorialComponent implements OnInit {


  citas: any

  constructor(private AppointmentService:AppointmentService){}
  
  ngOnInit() {
      this.AppointmentService. getAppointments()
      .subscribe(res=>{
        this.citas = res
     
})
  }
}
