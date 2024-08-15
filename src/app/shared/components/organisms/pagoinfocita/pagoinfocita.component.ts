import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pagoinfocita',
  templateUrl: './pagoinfocita.component.html',
  styleUrls: ['./pagoinfocita.component.scss']
})
export class PagoinfocitaComponent {

  showAlert() {
    Swal.fire({
      title: 'Confirmar pago',
      text: '¿Estás seguro de que quieres confirmar el pago?' ,
      color:'#498649',
      showCancelButton: true,
      imageUrl: '../../../../../assets/icons/tarjetapago.png',
      imageWidth: 100,
      imageHeight: 100, 
      confirmButtonText: 'Sí, confirmar',
      confirmButtonColor: 'rgba(55, 163, 59, 0.47)',
      cancelButtonText: 'No, cancelar',
      cancelButtonColor:'rgba(209, 0, 0, 0.47)',
      
    }).then((result) => {
      if (result.isConfirmed) {
      this.isModalOpen = true
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        this.modalcancel= true
      }
    });
  }
  modalcancel= false
  isModalOpen = false;

  toggleModalcancel() {
    this.modalcancel = !this.modalcancel;
  }
  closeModalcancel() {
    this.modalcancel = false;
  }


  toggleModal() {
    this.isModalOpen = !this.isModalOpen;
  }
  closeModal() {
    this.isModalOpen = false;
  }
}

