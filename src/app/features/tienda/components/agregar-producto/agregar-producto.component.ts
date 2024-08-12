import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

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
    width: '50%',
    height: '40px',
    fontSize: '15px',
    border: 'none',
    marginBottom: '10px',
    color: 'black'
  };
  
  productoForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = '';

  constructor(private formBuilder: FormBuilder) {
    this.productoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required, Validators.min(1)]],
      cantidad: ['', [Validators.required, Validators.min(1)]]
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
      console.log(this.productoForm.value);
    }
  }
}
