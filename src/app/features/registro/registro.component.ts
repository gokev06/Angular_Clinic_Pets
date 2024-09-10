import { Component, OnInit } from '@angular/core';
import { FormGroup, NonNullableFormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AppointmentRegisterService } from './service/appointment-register.service';
import { passwordValidator } from '../../validators/contraseña-validator';
import { matchPasswordValidator } from '../../validators/confirmar-contraseña';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {
  estilos = "border-top: none; border-right: none; border-bottom: 2px solid rgb(181, 235, 246); border-left: none; border-image: initial; height: 30px; margin-top: 8px; padding: 0px 8px; width: 200px; margin-bottom: 10px";
  registerForm!: FormGroup;
  hasAttemptedSubmit = false;
  errorMessage: string = '';

  constructor(
    private fb: NonNullableFormBuilder,
    private http: HttpClient,
    private router: Router,
    private appointmentRegisterService: AppointmentRegisterService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
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
        this.router.navigate(['login']);
      }
    } catch (error: any) {
      console.error('Error en el registro:', error.message || 'Error desconocido');
    }
  }
}
