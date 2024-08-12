import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../../features/citas/services/appointment.service';

@Component({
  selector: 'app-formulario-citas',
  templateUrl: './formulario-citas.component.html',
  styleUrls: ['./formulario-citas.component.scss']
})
export class FormularioCitasComponent implements OnInit, AfterViewInit {
  loginForm: FormGroup;
  isButtonActive: boolean = false;
  estilos: string = "border:none ; border-bottom:2px solid #B5EBF6; margin-top: 16px; height: 30px; width: 200px; padding: 0 8px";
  style: string = "border:none ; border-bottom:2px solid #CCC4FF; margin-top: 16px; height: 30px; width: 200px; padding: 0 8px";

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private appointmentService: AppointmentService
  ) {
    this.loginForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      sintomas: ['', Validators.required],
      nombreMascota: ['', Validators.required],
      tipoDeCita: ['', Validators.required],
      edad: ['', Validators.required],
      especie: ['', Validators.required],
      estadovacunacion: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      fecha: ['', Validators.required],
      hora: ['', Validators.required],
    });
  }

  @ViewChildren('myDiv') myDivs!: QueryList<ElementRef>;

  ngAfterViewInit() {}

  onDateSelected(date: Date): void {
    const formattedDate = new Date(Date.UTC(date.getFullYear(), date.getMonth(), date.getDate())).toISOString().split('T')[0];
    this.loginForm.get('fecha')?.setValue(formattedDate);
    console.log('Fecha seleccionada:', formattedDate);
  }

  onTimeSelected(time: string): void {
    this.loginForm.get('hora')?.setValue(time);
    console.log('Hora seleccionada:', time);
  }

  onSubmit() {
    console.log('Formulario:', this.loginForm.value);
    console.log('¿Formulario válido?:', this.loginForm.valid);

    const token = localStorage.getItem('userToken');

    if (this.loginForm.valid) {
      this.appointmentService.createAppointment(this.loginForm.value, token).subscribe(
        response => {
          Swal.fire({
            title: '¡Cita confirmada!',
            text: 'La cita ha sido confirmada exitosamente.',
            imageUrl: '../../../../../assets/images/imgcitas/confirmar.png',
            imageWidth: 200,
            imageHeight: 200,
            confirmButtonColor: '#7DFF82',
          });
          this.router.navigate(['']);
        },
        error => {
          Swal.fire({
            title: '¡Error!',
            text: 'Ocurrió un error al confirmar la cita.',
            icon: 'error',
            confirmButtonColor: '#F57171',
          });
        }
      );
    } else {
      Swal.fire({
        title: '¡Hubo un problema!',
        text: 'Parece que no llenaste correctamente el formulario',
        imageUrl: '../../../../../assets/images/imgcitas/huellas.png',
        imageWidth: 200,
        imageHeight: 200,
        confirmButtonColor: 'rgba(209, 0, 0, 0.47)',
        customClass: {
          title: 'mi-titulo',
          confirmButton: 'botonC',
        }
      });

      this.myDivs.forEach(div => {
        if (div && div.nativeElement) {
          div.nativeElement.style.visibility = 'visible';
        }
      });
    }
  }

  changeState(state: 'Reagendada' | 'Cancelada'): void {
    if (state === 'Reagendada') {
      // Handle reschedule logic
    } else if (state === 'Cancelada') {
      this.loginForm.patchValue({estado: 'Cancelada'});
      this.onSubmit();
    }
  }

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
