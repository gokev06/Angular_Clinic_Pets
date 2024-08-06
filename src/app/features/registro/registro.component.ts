import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { passwordValidator } from '../../validators/contraseña-validator';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})

export class RegistroComponent implements OnInit{
  estilos = "border-top: none; border-right: none; border-bottom: 2px solid rgb(181, 235, 246); border-left: none; border-image: initial; height: 30px; margin-top: 16px; padding: 0px 8px; width: 200px; margin-bottom: 10px";




  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient, private router:Router){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      numeroDeDocumento: ["", [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      numeroDeTelefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ["", [Validators.required,Validators.minLength(8), Validators.maxLength(15), passwordValidator()]],
      confirmarContrasenia: ["", [Validators.required,Validators.minLength(8), Validators.maxLength(15)]]
    });
  }

  /**
   * Maneja el envío del formulario de registro.
   * Envía los datos del usuario al servidor y procesa la respuesta.
   *
   */

  errorMessages: string[] = [];

  async onSubmit(){
    this.errorMessages = [];
    if(this.registerForm.valid){
      const userData = this.registerForm.value;

      try {
              // Envía la solicitud POST al servidor
        const response = await fetch('http://localhost:10101/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(userData)
        });

        if(! response.ok){
        // Intentamos obtener el cuerpo de la respuesta como texto
        // Maneja respuestas no exitosas
        const errorBody = await response.json();
        // Construye un mensaje de error detallado
        console.error('Error details', errorBody);

        if (errorBody.errors && Array.isArray(errorBody.errors)) {
            //Mostrar errores de validacion
            errorBody.errors.forEach((error: any) => {
                 console.error(`${error.path}: ${error.msg}`);
                 //Mostrar tambien los errores en la UI
            });
        }else{
          throw new Error('Error desconocido en el servidor')
        }

       } else{
         // imprime la respuesta exitosa

        const data =  await response.json();
        console.log('Registro exitoso:', data);

        // ruta para ir al login una vez el usuario este registrado

        this.router.navigate(['login'])

       }

      /*
        const data = await response.json();
        console.log('Success:', data);
        console.log('Registro exitoso: ' + JSON.stringify(data));
      */



      } catch (error: any) {
        console.error('Error object:', error);
        console.error('Error name:', error.name);
        console.error('Error message', error.message);
        console.error('Error stack', error.stack);

          // Manejo detallado de errores

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
