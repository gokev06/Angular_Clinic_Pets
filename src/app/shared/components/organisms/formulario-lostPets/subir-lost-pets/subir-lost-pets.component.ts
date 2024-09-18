import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LostPetsService } from '../../../../../features/wanted/service/lost-pets.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';

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
  IdUsuario: string = '1091202566';

  constructor(
    private formBuilder: FormBuilder,
    private publicacionService: LostPetsService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.petsForm = this.formBuilder.group({
      imagenMascota: [''],
      nombreMascota: ['', Validators.required],
      infoMascota: ['', [Validators.required, Validators.maxLength(600)]],
      numeroTelefono: ['', Validators.required]
    });

    // Recupera el IdUsuario desde el estado de navegación
    const navigation = this.router.getCurrentNavigation();
    if (navigation?.extras.state) {
      this.IdUsuario = navigation.extras.state['userId'] || '';
      console.log('User ID:', this.IdUsuario);
    }
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

    const debugObject = {
      nombreMascota: this.petsForm.get('nombreMascota')?.value || '',
      infoMascota: this.petsForm.get('infoMascota')?.value || '',
      numeroTelefono: this.petsForm.get('numeroTelefono')?.value || '',
      IdUsuario: this.IdUsuario || '',
      imagenMascota: this.selectedImage ? this.selectedImage.name : 'No image selected'
    };
    
    console.log('Datos para debug:', debugObject);
    

    const formData = new FormData();
    formData.append('nombreMascota', this.petsForm.get('nombreMascota')?.value || '');
    formData.append('infoMascota', this.petsForm.get('infoMascota')?.value || '');
    formData.append('numeroTelefono', this.petsForm.get('numeroTelefono')?.value || '');
    formData.append('IdUsuario', this.IdUsuario || '');

  if (this.selectedImage) {
      formData.append('imagenMascota', this.selectedImage, this.selectedImage.name);  
  }

console.log('Datos enviados:', formData); // Esto es para debugging, pero no imprimirá los datos de FormData como esperas


    this.publicacionService.publicarMascota(formData).subscribe({
      next: () => {
        Swal.fire('Publicación exitosa', 'Tu publicación ha sido enviada con éxito.', 'success').then(() => {
          this.router.navigate(['/lost-pets']); // Redirige a /lost-pets después del éxito
        });        
        this.petsForm.reset();
        this.selectedImage = null;
        this.selectedImagePreview = null;
      },
      error: (err) => {
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
