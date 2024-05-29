
import { Component, OnInit ,  ViewChild, ElementRef, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-scoped-formulario',
  templateUrl: './scoped-formulario.component.html',
  styleUrl: './scoped-formulario.component.scss'
})
export class ScopedFormularioComponent implements OnInit {
  loginForm: FormGroup

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({}); // Inicialización para evitar el error TS2564
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]], // Asumiendo que los números de teléfono deben ser numéricos
      correo: ['', [Validators.required, Validators.email]], // Validador de correo electrónico
      direccion: ['', Validators.required],
      sintomas: ['', Validators.required],
      fecha: ['', Validators.required ],
      hora: ['', Validators.required ],
      nombreMascota: ['', Validators.required ],
      CantidadVacunas: ['', [Validators.required, Validators.pattern('^[0-9]*$')] ],
      edad: ['', Validators.required ],
      especie: ['', Validators.required ],
      estadovacunacion: ['', Validators.required ],
      raza: ['', Validators.required ],
    });
  }

  seleccionarHora(hora: string): void {
    // Asignar la hora seleccionada al control de formulario correspondiente
    this.loginForm?.get('hora')?.setValue(hora);
  }

  @ViewChild('myDiv') myDiv: ElementRef = null!;



  onSubmit() {
      this.myDiv.nativeElement.style.visibility = 'visible';
    if (this.loginForm.valid) {
      // Lógica para autenticar al usuario
      console.log(this.loginForm.value);
    } else {
      // Manejar errores de validación
    }    
  }

}