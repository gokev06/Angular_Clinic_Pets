import { Component } from '@angular/core';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrl: './pago-tarjeta.component.scss'
})
export class PagoTarjetaComponent {

  imageSrc= '../../../../../assets/icons/tarjetajuano.png'
  fechaVencimiento: string = '';

  onInputChange(event: any): void {
    const inputValue = event.target.value;
    if (inputValue.length > 0 && inputValue.charAt(0) === '4') {
      this.imageSrc = '../../../../../assets/icons/visa.png';
    } else if (inputValue.length > 0 && inputValue.charAt(0) === '5') {
      this.imageSrc = '../../../../../assets/icons/masterdcard.png';
    } else {
      this.imageSrc = '../../../../../assets/icons/tarjetajuano.png';
    }
  }

  formatearFecha() {
    const valorActual = this.fechaVencimiento;

    if (valorActual.length === 2) {
      this.fechaVencimiento += '/';
    }

    if (valorActual.length > 4) {
      this.fechaVencimiento = valorActual.slice(0, 4);
    }
  }
  cvv: string = '';

  onSubmit() {
    // Aquí enviarías el valor de cvv al servidor de forma segura
    console.log('CVV ingresado:', this.cvv);
  }
    tipoDocumento: string = 'cc'; // Valor por defecto
  
    onTipoDocumentoChange() {
      // Aquí puedes realizar acciones basadas en el tipo de documento seleccionado
      console.log('Tipo de documento seleccionado:', this.tipoDocumento);
    }
}


