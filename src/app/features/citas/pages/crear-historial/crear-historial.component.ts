import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AppointmentService } from '../../services/appointment.service';
import { catchError } from 'rxjs';
import { of } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-crear-historial',
  templateUrl: './crear-historial.component.html',
  styleUrls: ['./crear-historial.component.scss']
})
export class CrearHistorialComponent implements OnInit {

  Formhistorial: FormGroup;
  idCita: string = '';

  estilos: string = "border:none ; border-bottom:2px solid #B5EBF6; margin-top: 16px; height: 30px; width: 300px; padding: 0 8px";
  style: string = "border:none ; border-bottom:2px solid #CCC4FF; margin-top: 16px; height: 30px; width: 300px; padding: 0 8px";

  constructor(
    private formBuilder: FormBuilder,
    private appointmentService: AppointmentService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.Formhistorial = this.formBuilder.group({});
  }

  ngOnInit(): void {
    // Extraer el idCita de los parámetros de consulta
    this.route.queryParams.subscribe(params => {
      this.idCita = params['idCita'] || ''; // Obtener el idCita de los parámetros de consulta
      this.initializeForm();
    });
  }

  initializeForm(): void {
    this.Formhistorial = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombreMascota: ['', Validators.required],
      edad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      estadovacunacion: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      tipocita: ['', Validators.required],
      nombreveterinario: ['', Validators.required],
      especialidad: ['', Validators.required],
      especialidadmedica: ['', Validators.required],
      telefonovet: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailvet: ['', [Validators.required, Validators.email]],
      motivoconsulta: ['', Validators.required],
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      examen: ['', Validators.required],
      idCita: [this.idCita], // Establecer el valor de idCita en el formulario
    });
  }

  onSubmit() {
    if (this.Formhistorial.valid) {
      Swal.fire({
        title: '¿Crear historial médico?',
        text: '¿Estás seguro de que deseas crear este historial médico?',
        showCancelButton: true,
        confirmButtonColor: '#7DFF82',
        cancelButtonColor: '#F57171',
        confirmButtonText: 'Sí, crear',
        cancelButtonText: 'No, cancelar',
        imageUrl: '../../../../../assets/images/imgcitas/huellas.png',
        imageWidth: 200,
        imageHeight: 200
      }).then((result) => {
        if (result.isConfirmed) {
          const token = localStorage.getItem('userToken');
          this.appointmentService.createHistoryMedic(this.Formhistorial.value, token)
            .pipe(
              catchError(error => {
                console.error('Error al crear el historial:', error);
                Swal.fire({
                  title: '¡Error!',
                  text: 'Ocurrió un error al crear el historial médico.',
                  icon: 'error',
                  confirmButtonColor: '#F57171',
                });
                return of(null);
              })
            )
            .subscribe(response => {
              if (response) {
                Swal.fire({
                  title: '¡Historial médico creado!',
                  text: 'El historial médico ha sido creado exitosamente.',
                  icon: 'success',
                  confirmButtonColor: '#7DFF82',
                });
                console.log('Historial creado con éxito:', response);
                this.router.navigate(['/home-vet']);
              }
            });
        }
      });
    } else {
      Swal.fire({
        title: '¡Hubo un problema!',
        text: 'Debes completar correctamente el formulario antes de enviar.',
        icon: 'warning',
        confirmButtonColor: '#F57171',
      });
      console.log('error: ', this.Formhistorial.errors);
    }
  }
}
