import { Router, ActivatedRoute } from '@angular/router';
import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { TiendaService} from '../../services/tienda.service';
import { ProductoService } from '../../services/producto-tienda.service';
import { ImageUploadService } from '../../../../images-services/image-upload.service';
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

  viewElement: boolean = false;
  productoForm: FormGroup;
  selectedImage: string | ArrayBuffer | null = '';
  tempImageFile: File | null = null;  // Nueva variable para almacenar temporalmente el archivo de imagen
  imageUrl: string | null = null;
  isEditMode: boolean = false;
  productId: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private tiendaService: TiendaService,
    private router: Router,
    private imageService: ImageUploadService,
    private productoService: ProductoService,
    private route: ActivatedRoute,
  )
    {

    this.productoForm = this.formBuilder.group({});
  }

  ngOnInit(): void {
      this.viewBtn();
      this.initForm();
      this.checkEditMode();
  }

  initForm(): void{
    this.productoForm = this.formBuilder.group({
      nombre: ['', Validators.required],
      precio: ['', [Validators.required,]],
      cantidad: ['', [Validators.required, Validators.minLength(1)]],
      categoria: ['', [Validators.required]],
      descripcion: ['', [Validators.required, Validators.maxLength(600)]],
      informacion: ['', [Validators.required, Validators.maxLength(600)]],
      seleccionTallaPresentacion: ['', [Validators.required]]
    });

    this.productoForm.valueChanges.subscribe(valor => {
      console.log(valor); // Añade este log para ver los valores del formulario en la consola
      this.datosProductoFormulario.emit({
        ...valor,
        imagen: this.selectedImage
      });
    });
  }

  // Validadores personalizados
  precioValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && (isNaN(control.value) || control.value <= 0)) {
      return { invalidPrice: true };
    }
    return null;
  }

  cantidadValidator(control: AbstractControl): { [key: string]: boolean } | null {
    if (control.value !== null && (isNaN(control.value) || control.value <= 0 || !Number.isInteger(control.value))) {
      return { invalidQuantity: true };
    }
    return null;
  }

  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    const file = input.files?.[0];

    if (file) {
      this.tempImageFile = file;
      const reader = new FileReader();
      reader.onload = () => {
        this.selectedImage = reader.result; // Previsualización de la imagen seleccionada
      };
      reader.readAsDataURL(file);
    }
  }

  uploadImage(): Promise <string> {
    return new Promise((resolve, reject) => {
      if (!this.tempImageFile) {
        reject('No image file selected');
        return;
      }

      this.imageService.uploadImage(this.tempImageFile).subscribe(
        response => {
          if( response && response.url){
            this.imageUrl = response.url;
            resolve(response.url);
          } else{
            reject('La respuesta no contiene una URL de imagen');
          }
        },
        error => {
          console.error('Error al subir la imagen', error);
          reject('Hubo un error al subir la imagen');
        }
      );
    });
  }

  private mostrarError(mensaje: string): void {
    Swal.fire({
      title: 'Error',
      text: mensaje,
      icon: 'error',
      confirmButtonText: 'Aceptar'
    });
  }




  onSubmit(): void {
    this.productoForm.markAllAsTouched();
    if (this.productoForm.valid) {
      Swal.fire({
        title: this.isEditMode ? '¿Estás seguro de actualizar este producto?' : '¿Estás seguro de agregar este producto?',
        imageUrl: 'assets/images/imgcitas/huellas.png',
        imageWidth: 300,
        imageHeight: 200,
        confirmButtonText: 'Aceptar',
        cancelButtonText: 'Cancelar',
        showCancelButton: true,
        cancelButtonColor: 'rgba(209, 0, 0, 0.47)',
        confirmButtonColor: 'rgba(55, 163, 59, 0.47)'
      }).then((result) => {
        if (result.isConfirmed) {
          this.uploadImage().then(imageUrl => {
            const formData = {
              ...this.productoForm.value,
              imagen: imageUrl
            };

            const token = localStorage.getItem('userToken');
            const observable = this.isEditMode
              ? this.tiendaService.updateProduct(this.productId!, formData, token)
              : this.tiendaService.createProducts(formData, token);

            observable.pipe(
              catchError(error => {
                console.error('Error al procesar el producto', error);
                Swal.fire({
                  title: 'Error',
                  text: `Hubo un error al ${this.isEditMode ? 'actualizar' : 'publicar'} el producto.`,
                  icon: 'error',
                  confirmButtonText: 'Aceptar'
                });
                return of(null);
              })
            ).subscribe(response => {
              if (response) {
                console.log(`Producto ${this.isEditMode ? 'actualizado' : 'creado'} con éxito:`, response);
                Swal.fire({
                  title: `¡Producto ${this.isEditMode ? 'actualizado' : 'agregado'}!`,
                  imageUrl: 'assets/images/imgcitas/confirmar.png',
                  imageWidth: 100,
                  imageHeight: 100,
                  imageAlt: 'Descripción de la imagen'
                }).then(() => {
                  this.router.navigate(['/home-admin']);
                });
              }
            });
          }).catch(error => {
            this.mostrarError(error);
          });
        }
      });
    }
  }

  onCancel(): void {
    this.router.navigate(['/tienda-admin']);
  }


   viewBtn():void{
       let editBtn = sessionStorage.getItem('EditProduct');
       if (editBtn == 'true') {
         this.viewElement = true;
       }else{
        this.viewElement = false;
       }
   }

   checkEditMode(): void {
    this.productId = this.route.snapshot.paramMap.get('id');
    if (this.productId) {
      this.isEditMode = true;
      this.loadProductData(this.productId);
    }
  }


   loadProductData(productId: string): void {
    this.productoService.getDataProductIdInfo(productId).subscribe({
      next: (response) => {
        if (response && response.length > 0) {
          const product = response[0];
          this.productoForm.patchValue({
            nombre: product.nombreProducto,
            precio: product.precio,
            cantidad: product.stock,
            categoria: product.categoria,
            descripcion: product.descripcion,
            informacion: product.informacion,
            seleccionTallaPresentacion: product.seleccionTallaPresentacion
          });
          this.selectedImage = product.imagen;
          this.imageUrl = product.imagen;
        }
      },
      error: (error) => {
        console.error('Error loading product data', error);
        this.mostrarError('Error al cargar los datos del producto');
      }
    });
  }


}
