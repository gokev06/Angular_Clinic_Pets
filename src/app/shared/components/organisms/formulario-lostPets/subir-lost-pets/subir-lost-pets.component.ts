import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LostPetsService } from '../../../../../features/wanted/service/lost-pets.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { ImageUploadService } from '../../../../../images-services/image-upload.service';


@Component({
  selector: 'app-subir-lost-pets',
  templateUrl: './subir-lost-pets.component.html',
  styleUrls: ['./subir-lost-pets.component.scss']
})
export class SubirLostPetsComponent implements OnInit {
  estilos = 'padding: 8px; background-color: #CCC4FF; border-radius: 5px; width: 300px; height:35px; font-size: 15px; border: none; margin-bottom: 5px; color: black';

  petsForm!: FormGroup;
  selectedImage: File | null = null;
  selectedImagePreview: string | ArrayBuffer | null = null;

  isEditMode: boolean = false;
  IdUsuario: string = '';
  loading: boolean = false; // Nueva propiedad para controlar el estado de carga

  constructor(
    private formBuilder: FormBuilder,
    private publicacionService: LostPetsService,
    private router: Router,
    private route: ActivatedRoute,
    private imageUploadService: ImageUploadService
  ) {}

  ngOnInit(): void {
    console.log('SubirLostPetsComponent inicializado');

    this.petsForm = this.formBuilder.group({
      imagenMascota: [''],
      nombreMascota: ['', Validators.required],
      infoMascota: ['', [Validators.required, Validators.maxLength(600)]],
      numeroTelefono: ['', Validators.required]
    });

    this.route.params.subscribe(params => {
      this.IdUsuario = params['IdUsuario'] || '';
      console.log('User ID recibido:', this.IdUsuario); // Verifica aquí
    });
  }




  onFileChange(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files.length) {
      const file = input.files[0];
      this.selectedImage = file;

      const reader = new FileReader();
      reader.onload = (e: any) => {
        this.selectedImagePreview = e.target.result;
      };
      reader.readAsDataURL(file);
    }
  }

  onSubmit(): void {
    if (this.petsForm.invalid) {
      return;
    }

    this.loading = true; // Activar el estado de carga

    if (this.selectedImage) {
      this.imageUploadService.uploadImage(this.selectedImage).subscribe({
        next: (response) => {
          const imageUrl = response.url; // Asumiendo que la API devuelve la URL en la propiedad 'url'
          console.log('imageUrl', imageUrl);

          this.savePetWithImage(imageUrl);
        },
        error: (error) => {
          console.error('Error al subir la imagen:', error);
          Swal.fire('Error', 'Hubo un problema al subir la imagen.', 'error');
          this.loading = false; // Desactivar el estado de carga en caso de error
        }
      });
    } else {
      this.savePetWithImage('');
    }
  }

  savePetWithImage(imageUrl: string): void {
    console.log('imprimo imageUrl', imageUrl);

    const petData: any = {
      nombreMascota: this.petsForm.get('nombreMascota')?.value,
      infoMascota: this.petsForm.get('infoMascota')?.value,
      numeroTelefono: this.petsForm.get('numeroTelefono')?.value,
      IdUsuario: this.IdUsuario,
      imagenMascota: imageUrl
    };


    this.publicacionService.publicarMascota(petData).subscribe({
      next: () => {
        this.loading = false; // Desactivar el estado de carga
        Swal.fire('Publicación exitosa', 'Tu publicación ha sido enviada con éxito.', 'success').then(() => {
          this.router.navigate(['/lost-pets']);
        });
        this.petsForm.reset();
        this.selectedImage = null;
        this.selectedImagePreview = null;
      },
      error: (err) => {
        this.loading = false; // Desactivar el estado de carga en caso de error
        console.error('Error al enviar la publicación:', err);
        Swal.fire('Error', 'Hubo un problema al enviar la publicación.', 'error');
      }
    });
  }

  onCancel(): void {
    this.petsForm.reset();
    this.selectedImage = null;
    this.selectedImagePreview = null;
    this.router.navigate(['/lost-pets']);

  }
}
