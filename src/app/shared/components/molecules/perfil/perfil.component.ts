import { Component, Input} from '@angular/core';

@Component({
  selector: 'app-perfil',
  templateUrl: './perfil.component.html',
  styleUrls: ['./perfil.component.scss']
})
export class PerfilComponent {
  username: string = "kevin Mamaguevo"
  isModalOpen = false;

  @Input() user : any = {
    nombre: "Kevin",
    rol: "Usuario"
  }

  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}
