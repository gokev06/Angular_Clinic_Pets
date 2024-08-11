import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppointmentService } from '../../../../features/citas/services/appointment.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit, OnChanges {
  @Input() data!: { date: string };
  @Output() timeSelected = new EventEmitter<string>();
  horarios: string[] = [];
  selectedHorario: string | null = null;
  occupiedHorarios: string[] = []; // Array para almacenar los horarios ocupados

  selectedDateFormatted: string = ''; // Variable para almacenar la fecha formateada

  constructor(private appointmentService: AppointmentService) {}

  ngOnInit(): void {
    this.generateHorarios();
    this.loadOccupiedHorarios();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.generateHorarios();
      this.loadOccupiedHorarios(); // Cargar los horarios ocupados cuando cambie la fecha
      this.formatSelectedDate(); // Formatear la fecha cuando cambie
    }
  }

  generateHorarios(): void {
    //const allHorarios = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
    const allHorarios = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '13:00 PM', '14:00 PM', '15:00 PM'];

    this.horarios = this.data.date.toLowerCase() === 'sábado' ? allHorarios.slice(0, 3) : allHorarios;
  }

  loadOccupiedHorarios(): void {
    const token = localStorage.getItem('userToken');
    
    // Crear una nueva instancia de Date con la fecha pasada desde @Input(), ajustada a medianoche en la zona horaria local
    const localDate = new Date(this.data.date);
  
    // Obtener la fecha en formato 'YYYY-MM-DD' sin alterar la fecha original
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0'); // Mes es 0-based
    const day = String(localDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
  
    //console.log('Formatted Date:', formattedDate);
  
    this.appointmentService.getAppointmentsByDate(formattedDate, token).subscribe(
      (appointments: any[]) => {
        //console.log('Appointments:', appointments);
  
        this.occupiedHorarios = appointments.map(app => this.formatTime(app.hora));
        //console.log('Occupied Horarios:', this.occupiedHorarios);
      },
      error => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  formatTime(time: string): string {
    const [hours, minutes] = time.split(':');
    const hour = parseInt(hours, 10);
    const period = hour >= 12 ? 'PM' : 'AM';
    const formattedHour = (hour % 12 || 12).toString().padStart(2, '0');
    return `${formattedHour}:${minutes} ${period}`;
  }

  formatSelectedDate(): void {
    const date = new Date(this.data.date);
    const options: Intl.DateTimeFormatOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    this.selectedDateFormatted = date.toLocaleDateString('es-ES', options);
  }

  selectHorario(horario: string): void {
    if (this.isHorarioOccupied(horario)) {
      return; 
    }
    this.selectedHorario = this.selectedHorario === horario ? null : horario;
    if (this.selectedHorario) {
      this.timeSelected.emit(this.selectedHorario);
    }
  }

  isHorarioOccupied(horario: string): boolean {
    return this.occupiedHorarios.includes(horario.trim());
  }
}
