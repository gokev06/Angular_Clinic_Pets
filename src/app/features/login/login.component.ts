import { Component, Renderer2, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.srvices'; // Ajusta la ruta del servicio si es necesario
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'] // Asegúrate de que sea styleUrls en lugar de styleUrl
})
export class LoginComponent implements OnInit {

  estilos = "border-top: none; border-right: none; border-bottom: 2px solid rgb(181, 235, 246); border-left: none; border-image: initial; height: 30px; margin-top: 16px; padding: 0px 8px; width: 200px; margin-bottom: 20px;";

  loginForm!:FormGroup;

  constructor(private renderer: Renderer2, private authService: AuthService, private fb: FormBuilder, private http: HttpClient , private router:Router) {}

  ngOnInit(): void {
    this.loadGoogleScript();

    this.loginForm = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ["", [Validators.required,Validators.minLength(5), Validators.maxLength(20)]]
    })
  }

   /**
   * Maneja el envío del formulario de login.
   * Envía los datos del usuario al servidor y procesa la respuesta.
   * 
   */

  async onSubmit(){
    if (this.loginForm.valid) {
      const userData = this.loginForm.value;

      try {
        // Envía la solicitud POST al servidor
        const response = await fetch('http://localhost:10101/auth', {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if (! response.ok) {
        // Intentamos obtener el cuerpo de la respuesta como texto
        // Maneja respuestas no exitosas
        const errorBody = await response.text();
        // Construye un mensaje de error detallado
        let errorMessege =  `HTTP error! status: ${response.status}`;
        let errorDetails: any  = {};

        try {
        //detalles de los errores           
        errorDetails = JSON.parse(errorBody);
        // sin informacion adicional de los erroresnumeroDeDocumento,
        errorMessege += ` - ${errorDetails.message || 'No additional error message' }`

        } catch (e) {
        // Si no es JSON, usamos el texto sin procesar
        errorMessege += ` - ${errorBody || 'No error body'}` 

        }
        // detalles de los errores
        console.error('Error details:', {
          status: response.status,
          statusText: response.statusText,
          errorBody: errorDetails
     });
     
       throw new Error(errorMessege);

        }

       // imprime la respuesta exitosa
       const data = await response.json();
       console.log('Success:', data);
       console.log('Ingreso exitoso: ' + JSON.stringify(data));
       this.router.navigate([''])
       
      } catch (error: any) {
        console.error('Error object:', error);
        console.error('Error name:', error.name);
        console.error('Error message', error.message);
        console.error('Error stack', error.stack);

        if (error instanceof TypeError) {
          console.error('Network error: Posiblemente el servidor no está accesible');
        }
  
        // Para errores de CORS
        if (error instanceof DOMException && error.name === 'NetworkError') {
          console.error('CORS error: Posiblemente un problema de permisos de origen cruzado');
        }
  
        // Para errores de registro
        const errorMessage = error.message || 'Error desconocido';
        console.log('Error en el registro: ' + errorMessage);
      }

      
    }
   }

  loadGoogleScript() {
    const script = this.renderer.createElement('script');
    script.src = 'https://apis.google.com/js/platform.js';
    script.async = true;
    script.defer = true;
    script.onload = () => {
      // Lógica adicional si es necesario después de cargar el script
    };
    this.renderer.appendChild(document.body, script);
  }

  loginWithGoogle() {
    this.authService.loginWithGoogle().subscribe(
      (response) => {
        console.log('Inicio de sesión exitoso con Google:', response);
        // Maneja la respuesta o redirige a otra página después del inicio de sesión exitoso
      },
      (error) => {
        console.error('Error al iniciar sesión con Google:', error);
        // Maneja el error si es necesario
      }
    );
  }
}