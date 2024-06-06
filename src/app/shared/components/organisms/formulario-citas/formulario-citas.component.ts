import { Component, OnInit ,  ViewChildren, ElementRef,QueryList, AfterViewInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';


@Component({
  selector: 'app-formulario-citas',
  templateUrl: './formulario-citas.component.html',
  styleUrl: './formulario-citas.component.scss'
})

export class FormularioCitasComponent implements OnInit , AfterViewInit {
  loginForm: FormGroup
  isButtonActive: boolean = false;

  estilos :string= "width: 450px; height: 40px;   background-color: #E0DBFF; border: none;border-radius: 10px; padding-left: 10px;"
  
  constructor(private formBuilder: FormBuilder  , private router: Router) {
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
    this.closeModal()
  }

  @ViewChildren('myDiv') myDivs!: QueryList<ElementRef>;


  ngAfterViewInit() {
    // Inicialización adicional si es necesaria
  }

  onSubmit() {

    if (this.loginForm.valid) {
      Swal.fire({
        title: '¿Confirmar cita?',
        text: '¿Estás seguro de que quieres confirmar esta cita?',
        showCancelButton: true,
        confirmButtonColor: '#7DFF82',
        cancelButtonColor: '#F57171',
        confirmButtonText: 'Sí,confirmar',
        imageUrl: '../../../../../assets/images/gato.png', // URL de la imagen que deseas mostrar
        imageWidth: 200, // Ancho de la imagen
        imageHeight: 200
      }).then((result) => {
        if (result.isConfirmed) {
          // Aquí puedes agregar la lógica para confirmar la cita
          Swal.fire({
            title:'¡Cita confirmada!',
            text:'La cita ha sido confirmada exitosamente.',
            imageUrl: '../../../../../assets/images/perroalert.png', // URL de la imagen que deseas mostrar
            imageWidth: 200, // Ancho de la imagen
            imageHeight: 200,
            confirmButtonColor: '#7DFF82',
  
            }
          );
          this.router.navigate(['']);
        }
      });
      console.log(this.loginForm.value);
    } else {
      Swal.fire({
        title:'¡Hubo un problema!',
        text:'pararece que no llenaste correctamente el formulario',
        imageUrl: '../../../../../assets/images/file 1.png', // URL de la imagen que deseas mostrar
        imageWidth: 200, // Ancho de la imagen
        imageHeight: 200,
        confirmButtonColor: '#F57171'
      }
    )


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
  
