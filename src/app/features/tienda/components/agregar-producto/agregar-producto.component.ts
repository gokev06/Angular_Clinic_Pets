import { Router } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { TiendaService } from '../../services/tienda.service';
import { catchError, of } from 'rxjs';


@Component({
  selector: 'app-agregar-producto',
  templateUrl: './agregar-producto.component.html',
  styleUrls: ['./agregar-producto.component.scss']
})
export class AgregarProductoComponent implements OnInit {
  @Output() datosProductoFormulario = new EventEmitter<any>();

  estilos = {
    padding: '10px',
    backgroundColor: '#CCC4FF',
    borderRadius: '5px',
    width: '100%',
    height: '40px',
    fontSize: '15px',
    border: 'none',
    marginBottom: '10px',
    color: 'black'
  };

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
      categoria: ['', [Validators.required, Validators.min(1)]],
      descripcion: ['', [Validators.required, Validators.maxLength(600)]]
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

    };

  };
}
