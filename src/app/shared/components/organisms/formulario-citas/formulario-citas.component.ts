import { Component, OnInit, AfterViewInit, ViewChildren, ElementRef, QueryList } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { AppointmentService } from '../../../../features/citas/services/appointment.service';
import { catchError, map, tap, of } from 'rxjs';

@Component({
  selector: 'app-formulario-citas',
  templateUrl: './formulario-citas.component.html',
  styleUrls: ['./formulario-citas.component.scss']
})
export class FormularioCitasComponent implements OnInit, AfterViewInit {
  loginForm!: FormGroup;
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

    this.callDateTutor();
  }

  @ViewChildren('myDiv') myDivs!: QueryList<ElementRef>;

  callDateTutor(): void {
    const token = localStorage.getItem('userToken');

    this.appointmentService.getCallTutorData(token).pipe(
      map((res: any) => {
        if (res.status === 'success' && res.querySuccess) {
          const dataUser: string[] = [res.Nombre, res.Telefono, res.Correo];
          return dataUser;
        } else {
          console.error('Error al obtener las citas:', res);

          const dataUser: string[] = [];
          return dataUser;
        }
      }),
      tap(
        (dataUser: string []) => {
          if (dataUser.length > 0) {

            this.loginForm.patchValue({
              nombre: dataUser[0] || '',
              correo: dataUser[2] || '',
              telefono: dataUser[1] || ''
            });
          }
      }
    ),
      catchError( error => {
        console.error('Error al procesar la solicitud:', error);
        return of([]); // Devuelve un observable con un array vacío en caso de error
      })
    ).subscribe();
  }

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
      Swal.fire({
        title: '¿Confirmar cita?',
        text: '¿Estás seguro de que quieres confirmar esta cita?',
        showCancelButton: true,
        confirmButtonColor: '#7DFF82',
        cancelButtonColor: '#F57171',
        confirmButtonText: 'Sí, confirmar',
        imageUrl: '../../../../../assets/images/imgcitas/huellas.png',
        imageWidth: 200,
        imageHeight: 200
      }).then((result) => {
        if (result.isConfirmed) {
          this.appointmentService.createAppointment(this.loginForm.value, token).subscribe(response => {
            Swal.fire({
              title: '¡Cita confirmada!',
              text: 'La cita ha sido confirmada exitosamente.',
              imageUrl: '../../../../../assets/images/imgcitas/confirmar.png',
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonColor: '#7DFF82',
            });

            this.router.navigate(['/historial']);
          }, 
          error => {
            console.error('Error al confirmar la cita:', error);
            Swal.fire({
              title: '¡Error!',
              text: 'Ocurrió un error al confirmar la cita.',
              icon: 'error',
              confirmButtonColor: '#F57171',
            });
            console.log();
            
          });
        }
      });
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
