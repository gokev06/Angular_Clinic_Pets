import { Component, OnInit } from '@angular/core';
import { UsersManagementService } from '../../services/users-management.service';
import { AppointmentRegisterService } from '../../../registro/service/appointment-register.service';
import Swal from 'sweetalert2';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { matchPasswordValidator } from '../../../../validators/confirmar-contraseña';
import { passwordValidator } from '../../../../validators/contraseña-validator';

@Component({
  selector: 'app-gestion-veterinarios',
  templateUrl: './gestion-veterinarios.component.html',
  styleUrls: ['./gestion-veterinarios.component.scss']
})
export class GestionVeterinariosComponent implements OnInit {
  citas: any[] = [];
  isModalOpen = false;
  registerForm!: FormGroup;
  hasAttemptedSubmit = false;
  errorMessage: string = '';
  estilos = "border-top: none; border-right: none; border-bottom: 2px solid rgb(181, 235, 246); border-left: none; border-image: initial; height: 30px; margin-top: 8px; padding: 0px 8px; width: 200px; margin-bottom: 10px";
  

  constructor(
    private usersManagementService: UsersManagementService,
    private appointmentRegisterService: AppointmentRegisterService,
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private router: Router,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.usersManagementService.getVeterinarios().subscribe(res => {
      this.citas = res.map(cita => ({
        IdVeterinario: cita.IdVeterinario,
        nombreVeterinario: cita.nombreVeterinario,
        estadoVet: cita.estadoVet || 'No especificado'
      }));
    }, error => {
      console.error('Error fetching data:', error);
    });
    this.registerForm = this.fb.group({
      numeroDeDocumento: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10), Validators.pattern(/^\d+$/)]],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      numeroDeTelefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(15), Validators.pattern(/^\d+$/)]],
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), passwordValidator()]],
      confirmarContrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    }, {
      validators: matchPasswordValidator('contrasenia', 'confirmarContrasenia')
    });
  }

  showSuccess(): void {
    this.toastr.success('Registro exitoso', 'Exito');
    toastClass: 'toast toast-success' // Aplica una clase personalizada
  }
  async onSubmit() {
    this.hasAttemptedSubmit = true;

    if (this.registerForm.invalid) {
      this.errorMessage = 'Todos los campos son obligatorios';
      return;
    }

    this.errorMessage = '';

    const userData = this.registerForm.value;
    const registerUrl = this.appointmentRegisterService.getRegistroUrl(); // Obtener URL desde el servicio

    try {
      const response = await fetch(registerUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(userData)
      });

      if (!response.ok) {
        const errorBody = await response.json();
        console.error('Error details', errorBody);

        if (errorBody.errors && Array.isArray(errorBody.errors)) {
          errorBody.errors.forEach((error: any) => {
            console.error(`${error.path}: ${error.msg}`);
          });
        } else {
          throw new Error('Error desconocido en el servidor');
        }
      } else {
        const data = await response.json();
        console.log('Registro exitoso:', data);
        this.showSuccess()
        this.closeModal()

      }
    } catch (error: any) {
      console.error('Error en el registro:', error.message || 'Error desconocido');
    }
  }

  toggleStatus(id: string, currentStatus: string): void {
    const newStatus = currentStatus === 'Activo' ? 'Inactivo' : 'Activo';
  
    Swal.fire({
      title: `¿Cambiar estado a ${newStatus}?`,
      text: `Estás a punto de cambiar el estado del veterinario a ${newStatus}. ¿Estás seguro?`,
      showCancelButton: true,
      confirmButtonColor: '#7DFF82',
      cancelButtonColor: '#F57171',
      confirmButtonText: 'Sí, cambiar',
      cancelButtonText: 'No, cancelar',
      imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de confirmación
      imageWidth: 100,
      imageHeight: 100
    }).then((result) => {
      if (result.isConfirmed) {
        this.usersManagementService.changeVeterinaryStatus(id, newStatus).subscribe(
          () => {
            Swal.fire({
              title: '¡Estado cambiado!',
              text: `El estado del veterinario ha sido cambiado a ${newStatus}.`,
              imageUrl: '../../../../../assets/images/imgcitas/confirmar.png', // Imagen de éxito
              imageWidth: 100,
              imageHeight: 100,
              confirmButtonColor: '#7DFF82'
            });
  
            // Actualiza el estado en las citas después del cambio
            this.citas = this.citas.map(cita => 
              cita.IdVeterinario === id ? { ...cita, estadoVet: newStatus } : cita
            );
          },
          error => {
            console.error('Error updating status:', error);
            Swal.fire({
              title: '¡Error!',
              text: 'Ocurrió un error al intentar cambiar el estado del veterinario.',
              imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de error
              imageWidth: 100,
              imageHeight: 100,
              icon: 'error',
              confirmButtonColor: '#F57171'
            });
          }
        );
      } else {
        Swal.fire({
          title: 'Cancelado',
          text: 'El estado del veterinario no fue cambiado.',
          imageUrl: '../../../../../assets/images/imgcitas/huellas.png', // Imagen de cancelación
          imageWidth: 100,
          imageHeight: 100,
          icon: 'info',
          confirmButtonColor: '#7DFF82'
        });
      }
    });
  }
  
  

  openModal(): void {
    this.isModalOpen = true;
    this.appointmentRegisterService.setRegistroType('veterinarian'); // Establecer tipo de registro
  }

  closeModal(): void {
    this.isModalOpen = false;
  }
}
