import { Component , OnInit} from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import {  EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-modal-editar-perfil',
  templateUrl: './modal-editar-perfil.component.html',
  styleUrl: './modal-editar-perfil.component.scss'
})
export class ModalEditarPerfilComponent  implements OnInit{

  estilos = "border:none; border-radius:10px ;height: 30px; margin-top: 16px; padding: 0px 8px; width: 300px; margin-bottom: 10px";

  @Output() closeedit = new EventEmitter<void>();

  closemodaledit(): void {
    this.closeedit.emit();
  }
  registerForm!: FormGroup;
  constructor(private fb: FormBuilder){

  }

  ngOnInit(): void {
    this.registerForm = this.fb.group({
      nombre: ["", Validators.required],
      apellido: ["", Validators.required],
      numeroDeDocumento: ["", [Validators.required,Validators.minLength(10), Validators.maxLength(10)]],
      numeroDeTelefono: ["", [Validators.required, Validators.minLength(10), Validators.maxLength(10)]],
      email: ["", [Validators.required, Validators.email]],
      contrasenia: ["", [Validators.required,Validators.minLength(5), Validators.maxLength(20)]],
      //confirmarContrasenia: ["", Validators.required]
    });
  }

  closemodal(): void {
    
  }

  async onSubmit(){

  }
}
