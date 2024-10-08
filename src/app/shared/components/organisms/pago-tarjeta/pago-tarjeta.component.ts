import { Component, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-pago-tarjeta',
  templateUrl: './pago-tarjeta.component.html',
  styleUrls: ['./pago-tarjeta.component.scss']
})
export class PagoTarjetaComponent {

  @Output() onSubmit = new EventEmitter<void>();

  imageSrc = '../../../../../assets/icons/tarjetajuano.png';
  fechaVencimiento: string = '';
  cvv: string = '';
  tipoDocumento: string = 'cc'; // Valor por defecto

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

  submitPayment() {
    // Emitir el evento para informar al componente padre que el pago ha sido realizado
    this.onSubmit.emit();
  }

  onTipoDocumentoChange() {
    // Realiza acciones basadas en el tipo de documento seleccionado
    console.log('Tipo de documento seleccionado:', this.tipoDocumento);
  }
}
