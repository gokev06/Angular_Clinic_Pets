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
    private appointmentService: AppointmentService // Inyecta el servicio
  ) {
    this.loginForm = this.formBuilder.group({}); // Inicialización para evitar el error TS2564
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      correo: ['', [Validators.required, Validators.email]],
      direccion: ['', Validators.required],
      sintomas: ['', Validators.required],
      nombreMascota: ['', Validators.required],
      CantidadVacunas: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      edad: ['', Validators.required],
      especie: ['', Validators.required],
      estadovacunacion: ['', Validators.required],
      raza: ['', Validators.required],
      hora: [''] // Agrega el campo de hora al formulario
    });
  }

  seleccionarHora(hora: string): void {
    this.loginForm?.get('hora')?.setValue(hora);
    this.isButtonActive = !this.isButtonActive;
    this.closeModal();
  }

  @ViewChildren('myDiv') myDivs!: QueryList<ElementRef>;

  ngAfterViewInit() {
    // Inicialización adicional si es necesaria
  }

  onSubmit() {
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
          this.appointmentService.createAppointment(this.loginForm.value).subscribe(response => {
            Swal.fire({
              title: '¡Cita confirmada!',
              text: 'La cita ha sido confirmada exitosamente.',
              imageUrl: '../../../../../assets/images/imgcitas/confirmar.png',
              imageWidth: 200,
              imageHeight: 200,
              confirmButtonColor: '#7DFF82',
            });
            this.router.navigate(['']);
          }, error => {
            Swal.fire({
              title: '¡Error!',
              text: 'Ocurrió un error al confirmar la cita.',
              icon: 'error',
              confirmButtonColor: '#F57171',
            });
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

  showModal: boolean = false;

  openModal() {
    this.showModal = true;
  }

  closeModal() {
    this.showModal = false;
  }
}
