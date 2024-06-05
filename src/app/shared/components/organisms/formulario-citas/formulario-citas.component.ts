import { Component, OnInit ,  ViewChildren, ElementRef,QueryList, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';


@Component({
  selector: 'app-formulario-citas',
  templateUrl: './formulario-citas.component.html',
  styleUrl: './formulario-citas.component.scss'
})

export class FormularioCitasComponent implements OnInit , AfterViewInit {
  loginForm: FormGroup
  isButtonActive: boolean = false;

  estilos :string= "width: 450px; height: 40px;   background-color: #E0DBFF; border: none;border-radius: 10px; padding-left: 10px;"
  
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
    this.isButtonActive = !this.isButtonActive;

  }

  @ViewChildren('myDiv') myDivs!: QueryList<ElementRef>;


  ngAfterViewInit() {
    // Inicialización adicional si es necesaria
  }

  onSubmit() {

    if (this.loginForm.valid) {
      // Lógica para autenticar al usuario
      console.log(this.loginForm.value);
    } else {
      this.myDivs.forEach(div => {
        if (div && div.nativeElement) {
          div.nativeElement.style.visibility = 'visible';
        }
      }); 
      // Manejar errores de validación
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
  
