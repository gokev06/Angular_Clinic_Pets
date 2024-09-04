import { Component, Renderer2, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
//import { ToastrService } from 'ngx-toastr'; // Importa ToastrService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  estilos = "border-top: none; border-right: none; border-bottom: 2px solid rgb(181, 235, 246); border-left: none; border-image: initial; height: 30px; margin-top: 16px; padding: 0px 8px; width: 200px; margin-bottom: 20px;";
  loginForm!: FormGroup;
  showErrorMessage: boolean = false;
  errorMessage: string = '';
  showValidationError: boolean = false; // Nueva variable para mostrar el mensaje de error de validación

  constructor(private renderer: Renderer2, private authService: AuthService, private fb: FormBuilder, private http: HttpClient, private router: Router, /* private toastr: ToastrService*/) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ["", [Validators.required, Validators.minLength(5), Validators.maxLength(20)]]
    });
  }

  /*
  showSuccess(): void {
    this.toastr.success('Inicio de sesión exitoso', 'Bienvenido');
    toastClass: 'toast toast-success ngx-toastr' // Aplica una clase personalizada
  }


  showError(): void {
    this.toastr.error('Error en el inicio de sesión', 'Error');
  }*/

  async onSubmit() {

    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched(); // Marca todos los campos como tocados
      this.showValidationError = true;
      this.errorMessage = 'Todos los campos son obligatorios y deben ser válidos.';
      return;
    }

    this.showValidationError = false; // Ocultar el mensaje de error de validación
    this.showErrorMessage = false; // Ocultar el mensaje de error general
    this.errorMessage = ''; // Limpiar el mensaje de error

    const userData = this.loginForm.value;
    console.log('Datos enviados:', userData);

      try {
        const response = await fetch('http://localhost:10101/auth', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(userData)
        });

      if (!response.ok) {
        // Manejo de errores HTTP
        const errorBody = await response.text();
        let errorMessage = `HTTP error! status: ${response.status}`;
        let errorDetails: any = {};

        try {
          errorDetails = JSON.parse(errorBody);
          errorMessage += ` - ${errorDetails.message || 'No additional error message'}`;
        } catch (e) {
          errorMessage += ` - ${errorBody || 'No error body'}`;
        }

        console.error('Error details:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorDetails
        });

          this.showErrorMessage = true;
          if (response.status === 401) {
            this.errorMessage = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
          } else {
            this.errorMessage = 'Error desconocido. Por favor, intenta nuevamente más tarde.';
          }
          return; // Terminar ejecución si hay error
        }

      const data = await response.json();
      console.log('Success:', data);

        if (data.token) {
          this.authService.setToken(data.token).subscribe(
            () => {
              console.log('Token guardado en localStorage');
              setTimeout(() => this.verifyRoleAndRedirect(), 100);
            },
            error => {
              console.error('Error al guardar el token:', error);
              this.showErrorMessage = true;
              this.errorMessage = 'Error al guardar el token. Intenta nuevamente.';
            }
          );
        } else {
          this.showErrorMessage = true;
          this.errorMessage = 'Correo o contraseña incorrectos. Por favor, inténtalo de nuevo.';
        }
      } catch (error: any) {
        console.error('Error object:', error);
        console.error('Error name:', error.name);
        console.error('Error message', error.message);
        console.error('Error stack', error.stack);

      this.showErrorMessage = true;
      if (error instanceof TypeError) {
        this.errorMessage = 'Problema de red: Verifica tu conexión a internet.';
      } else if (error instanceof DOMException && error.name === 'NetworkError') {
        this.errorMessage = 'Error de red: Problemas de conexión con el servidor.';
      } else {
        this.errorMessage = 'Error desconocido: Intenta nuevamente más tarde.';
      }
    }
  }

  private verifyRoleAndRedirect() {
    this.authService.verifyRole().subscribe(
      role => {
        console.log('Role verificado:', role);
        if (!role) {
          this.showErrorMessage = true;
          this.errorMessage = 'Error al verificar el rol. Por favor, inténtalo de nuevo.';
          return;
        }
        this.redirectBasedOnRole(role);
      },
      error => {
        console.error('Error al verificar el rol:', error);
        this.router.navigate(['/unauthorized']);
      }
    );
  }

  private redirectBasedOnRole(role: string) {
    switch (role) {
      case 'usuario':
        this.router.navigate(['/home']);
        break;
      case 'administrador':
        this.router.navigate(['/home-admin']);
        break;
      case 'veterinario':
        this.router.navigate(['/home-vet']);
        break;
      default:
        console.error('Rol desconocido:', role);
        this.router.navigate(['/unauthorized']);
    }
  }
}
