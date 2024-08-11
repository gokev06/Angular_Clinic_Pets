import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import Swal from 'sweetalert2';  // Asegúrate de que esta línea esté correcta

@Component({
  selector: 'app-formulario-adopcion',
  templateUrl: './formulario-adopcion.component.html',
  styleUrls: ['./formulario-adopcion.component.scss']
})
export class FormularioAdopcionComponent implements OnInit {
  @Output() datosAdopcionFormulario = new EventEmitter<any>();

  estilos = 'padding:0 10px; background-color: #CCC4FF; border-radius: 15px; width: 300px; height: 30px; font-size: 15px; border: none; margin-bottom: 10px; color: black;';

  loginForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder) {
    this.loginForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.loginForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      edad: ['', Validators.required],
      especie: ['', Validators.required],
      raza: ['', Validators.required],
      sexo: ['', Validators.required],
      Esterilizacion: ['', Validators.required],
      estadovacunacion: ['', Validators.required],
      telefono: ['', Validators.required],
      ubicacion: ['', Validators.required],
    });

    this.loginForm.valueChanges.subscribe(valor => {
      this.datosAdopcionFormulario.emit({
        ...valor,
        imagen: this.selectedImage
      });
    });
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];
    const reader = new FileReader();

    if (file) {
      reader.onload = () => {
        this.selectedImage = reader.result;
        this.datosAdopcionFormulario.emit({
          ...this.loginForm.value,
          imagen: this.selectedImage
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    Swal.fire({
      title: 'Confirmación',
      text: '¿Está seguro de que desea publicar la adopción?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Publicar',
      cancelButtonText: 'Cancelar'
    }).then((result) => {
      if (result.isConfirmed) {
        // Lógica para manejar la confirmación
        this.datosAdopcionFormulario.emit({
          ...this.loginForm.value,
          imagen: this.selectedImage
        });
        Swal.fire(
          '¡Publicado!',
          'La adopción ha sido publicada.',
          'success'
        );
      }
    });
  }
}
