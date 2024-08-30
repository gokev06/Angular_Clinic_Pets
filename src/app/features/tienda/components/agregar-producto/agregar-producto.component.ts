import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from '../../services/tienda.service';
import { catchError, of } from 'rxjs';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  @Output() datosProductoFormulario = new EventEmitter<any>();

  estilos = 'padding: 8px; background-color: #CCC4FF; border-radius: 5px; width: 100%; height:35px; font-size: 15px; border: none; margin-bottom: 5px; color: black';
  
  productoForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder, private tiendaService: TiendaService, private router: Router) {
    this.productoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      cantidad: ['', [Validators.required, Validators.min(1)]],
      categoria:['', Validators.required],
      //categoria: ['', [Validators.required, Validators.min(1)]],
      //descripcion: ['', [Validators.required, Validators.maxLength(600)]]
    
  });

    this.productoForm.valueChanges.subscribe(valor => {
      this.datosProductoFormulario.emit({
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
        this.datosProductoFormulario.emit({
          ...this.productoForm.value,
          imagen: this.selectedImage
        });
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.productoForm.valid) {
     const token = localStorage.getItem('userToken');
     this.tiendaService.createProducts(this.productoForm.value, token)
      .pipe(
        catchError(error => {
          console.error('Error al crear el producto:', error);
          return of (null);
        })
      )
      .subscribe( response => {
        if (response) {
          console.log('Producto creado con exito:', response);
          alert('producto creado');
          this.router.navigate(['/home-admin']);
        };
      });
    } else {
      console.log('Formulario invalido: ', this.productoForm.errors);
      console.log(this.productoForm.value);
    }
  }

  AlertaAceptar() {
    Swal.fire({
      title: '¿Estas seguro de agregar este producto?',
      imageUrl: 'assets/images/imgcitas/deciscion.png', 
      imageWidth: 300,
      imageHeight: 200,
      confirmButtonText: 'Aceptar',
      cancelButtonText: 'Cancelar',
      showCancelButton: true, 
      cancelButtonColor: 'rgba(209, 0, 0, 0.47)', 
      confirmButtonColor: 'rgba(55, 163, 59, 0.47)'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: '¡Producto agregado!',
          imageUrl: 'assets/images/imgcitas/confirmar.png',
          imageWidth: 100,
          imageHeight: 100,
          imageAlt: 'Descripción de la imagen'
        });
      }
    });
  }
  
}
