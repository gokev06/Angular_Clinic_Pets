import { Component , OnInit} from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-crear-historial',
  templateUrl: './crear-historial.component.html',
  styleUrl: './crear-historial.component.scss'
})
export class CrearHistorialComponent  implements OnInit{
  Formhistorial: FormGroup;

  estilos: string = "border:none ; border-bottom:2px solid #B5EBF6; margin-top: 16px; height: 30px; width: 300px; padding: 0 8px";
  style: string = "border:none ; border-bottom:2px solid #CCC4FF; margin-top: 16px; height: 30px; width: 300px; padding: 0 8px";


  constructor(   private formBuilder: FormBuilder,){
    this.Formhistorial = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.Formhistorial = this.formBuilder.group({
      nombre: ['', [Validators.required]],
      telefono: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      direccion: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      nombreMascota: ['', Validators.required],
      edad: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      estadovacunacion: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      tipocita: ['', Validators.required],
      nombreveterinario: ['', Validators.required],
      especialidad: ['', Validators.required],
      especialidadmedica: ['', Validators.required],
      telefonovet: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      emailvet: ['', [Validators.required,  Validators.email]],
      motivoconsulta: ['', Validators.required],
      diagnostico: ['', Validators.required],
      tratamiento: ['', Validators.required],
      examen: ['', Validators.required],
    });
}

onSubmit() {
  if (this.Formhistorial.valid) {
    console.log('Formulario:', this.Formhistorial.value);
  }else{
    console.log('error: ', this.Formhistorial.errors);
    
  }


}

}
