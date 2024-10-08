import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder,Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-errores-validaciones',
  templateUrl: './errores-validaciones.component.html',
  styleUrl: './errores-validaciones.component.scss'
})
export class ErroresValidacionesComponent implements OnInit{

  registerForm!: FormGroup;

  constructor(private fb: FormBuilder, private http: HttpClient){}

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ["", [Validators.required, Validators.minLength(1)]],
      apellido: ["", [Validators.required, Validators.minLength(1)]],
      numeroDeDocumento: ["", [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      numeroDeTelefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ["", [Validators.required,Validators.minLength(5), Validators.maxLength(20)]],
      //confirmarContrasenia: ["", Validators.required]
    });
  }

  async onSubmit(){
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
        const errorBody = await response.text();
        // Construye un mensaje de error detallado
        let errorMessege =  `HTTP error! status: ${response.status}`;
        let errorDetails: any  = {};

        try {
          //detalles de los errores
           errorDetails = JSON.parse(errorBody);
           // sin informacion adicional de los errores
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
        
         // Procesa la respuesta exitosa

        const data = await response.json();
        console.log('Success:', data);
        console.log('Registro exitoso: ' + JSON.stringify(data));
        

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
