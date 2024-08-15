import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NonNullableFormBuilder } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { passwordValidator } from '../../validators/contraseña-validator';
import { matchPasswordValidator } from '../../validators/confirmar-contraseña';
/**
 * Componente de registro de usuario.
 * Este componente maneja el formulario de registro de usuarios y su envío al servidor.
 */

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit{
  // Estilos aplicados a los campos de entrada del formulario.
  estilos = "border-top: none; border-right: none; border-bottom: 2px solid rgb(181, 235, 246); border-left: none; border-image: initial; height: 30px; margin-top: 16px; padding: 0px 8px; width: 200px; margin-bottom: 10px";



  // Formulario de registro, con validaciones incluidas.
  registerForm!: FormGroup;

  /**
   *
   * Constructor del componente.
   * @param fb fb Constructor de formularios utilizado para inicializar el formulario de registro.
   * @param http liente HTTP utilizado para enviar datos al servidor.
   * @param router Navegador de rutas de Angular utilizado para redirigir al usuario después de un registro exitoso.
   */

  constructor(private fb: NonNullableFormBuilder, private http: HttpClient, private router:Router){}

  /**
   * Método de inicialización del componente.
   * Configura el formulario de registro con los campos requeridos y sus respectivas validaciones.
   */

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      numeroDeDocumento: ["", [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      numeroDeTelefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(15)]],
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15), passwordValidator()]],
      confirmarContrasenia: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(15)]]
    },  {
      validators: matchPasswordValidator('contrasenia', 'confirmarContrasenia')
    });

    // Comentado: Suscripción a cambios en el formulario para depuración.
    /*
    this.registerForm.valueChanges.subscribe(() => {
      console.log('Form validity:', this.registerForm.valid);
      console.log('Password errors:', this.registerForm.get('contrasenia')?.errors);
      console.log('Form errors:', this.registerForm.errors);
    });
    */
  }

  /**
   * Maneja el envío del formulario de registro.
   * Envía los datos del usuario al servidor y procesa la respuesta.
   */

  //errorMessages: string[] = [];

  async onSubmit(){
    //this.errorMessages = [];
    // Verifica si el formulario es válido antes de proceder con el envío.
    if(this.registerForm.valid){
      const userData = this.registerForm.value; // Obtiene los datos del formulario.

      try {
        // Envía la solicitud POST al servidor con los datos del usuario.
        const response = await fetch('http://localhost:10101/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        // Manejo de respuestas no exitosas del servidor.
        if(! response.ok){
        const errorBody = await response.json(); // Intenta obtener el cuerpo de la respuesta como JSON.
        console.error('Error details', errorBody);

         // Muestra errores de validación si existen.
        if (errorBody.errors && Array.isArray(errorBody.errors)) {
            //Mostrar errores de validacion
            errorBody.errors.forEach((error: any) => {
                 console.error(`${error.path}: ${error.msg}`);
              // Aquí podrías mostrar los errores también en la interfaz de usuario.
            });
        }else{
          throw new Error('Error desconocido en el servidor')
        }

       } else{
          // Registro exitoso, redirige al usuario a la página de inicio de sesión.
        const data =  await response.json();
        console.log('Registro exitoso:', data);

        // ruta para ir al login una vez el usuario este registrado

        this.router.navigate(['login'])

       }
      } catch (error: any) {
        // Manejo detallado de errores.
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

}
