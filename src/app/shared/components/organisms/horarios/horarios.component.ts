import { Component, Input, Output, EventEmitter, OnInit, OnChanges, SimpleChanges } from '@angular/core';
import { AppointmentService } from '../../../../features/citas/services/appointment.service';
import { DisabledHorariosService } from '../calendario/service/disabled-horarios.service';

@Component({
  selector: 'app-horarios',
  templateUrl: './horarios.component.html',
  styleUrls: ['./horarios.component.scss']
})
export class HorariosComponent implements OnInit, OnChanges {
  @Input() data!: { date: string };
  @Input() showDeactivateButton: boolean = false;
  @Output() timeSelected = new EventEmitter<string>();
  horarios: string[] = [];
  selectedHorario: string | null = null;
  occupiedHorarios: string[] = [];
  selectedDateFormatted: string = '';

  constructor(private appointmentService: AppointmentService, public disabledHorariosService: DisabledHorariosService) {}

  ngOnInit(): void {
    this.generateHorarios();
    this.loadOccupiedHorarios();
    this.updateDisabledHorarios();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.generateHorarios();
      this.loadOccupiedHorarios();
      this.formatSelectedDate();
      this.updateDisabledHorarios();
    }
  }

  generateHorarios(): void {
    const allHorarios = ['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '01:00 PM', '02:00 PM', '03:00 PM'];
    this.horarios = this.data.date.toLowerCase() === 'sábado' ? allHorarios.slice(0, 3) : allHorarios;
  }

  loadOccupiedHorarios(): void {
    const token = localStorage.getItem('userToken');
    const localDate = new Date(this.data.date);
    const year = localDate.getFullYear();
    const month = String(localDate.getMonth() + 1).padStart(2, '0');
    const day = String(localDate.getDate()).padStart(2, '0');
    const formattedDate = `${year}-${month}-${day}`;
  
    this.appointmentService.getAppointmentsByDate(formattedDate, token).subscribe(
      (appointments: any[]) => {
        this.occupiedHorarios = appointments.map(app => this.formatTime(app.hora));
      },
      error => {
        console.error('Error fetching appointments:', error);
      }
    );
  }

  updateDisabledHorarios(): void {
    this.disabledHorariosService.loadDisabledHorarios();
    this.disabledHorariosService.loadDisabledDays();

    if (this.disabledHorariosService.getDisabledDaysLocal().has(this.data.date)) {
      this.horarios = []; // Ocultar horarios si el día está desactivado
    } else {
      this.horarios = this.horarios.map(horario => {
        if (this.disabledHorariosService.getDisabledHorarios().has(horario.trim())) {
          return `${horario} (Desactivado)`;
        }
        return horario;
      });
    }
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
    if (this.isHorarioOccupied(horario) || this.isHorarioDisabled(horario) || this.horarios.length === 0) {
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

  isHorarioDisabled(horario: string): boolean {
    return this.disabledHorariosService.getDisabledHorarios().has(horario.trim());
  }

  toggleDisableDay(): void {
    if (!this.showDeactivateButton) return;

    const date = this.data.date;

    if (this.disabledHorariosService.getDisabledDaysLocal().has(date)) {
        // Activar el día
        this.disabledHorariosService.removeDisabledDay(date).subscribe(() => {
            this.horarios.forEach(horario => this.disabledHorariosService.removeDisabledHorario(horario));
            this.updateDisabledHorarios();
        }, error => {
            console.error('Error al activar el día:', error);
        });
    } else {
        // Desactivar el día
        this.disabledHorariosService.addDisabledDay(date).subscribe(() => {
            this.horarios.forEach(horario => {
                if (!this.isHorarioOccupied(horario)) {
                    this.disabledHorariosService.addDisabledHorario(horario);
                }
            });
            this.updateDisabledHorarios();
        }, error => {
            console.error('Error al desactivar el día:', error);
        });
    }
}

}  