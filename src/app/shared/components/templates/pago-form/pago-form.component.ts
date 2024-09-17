import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-pago-form',
  templateUrl: './pago-form.component.html',
  styleUrl: './pago-form.component.scss'
})
export class PagoFormComponent {
  tarjetaNumero: string = '';
  tarjetaNombre: string = '';
  tarjetaFechaExpiracion: string = '';
  tarjetaCVV: string = '';

  // Simular el proceso de pago
  procesarPago(): void {
    if (this.validarFormulario()) {
      // Mostrar un indicador de carga mientras simulamos el procesamiento del pago
      Swal.fire({
        title: 'Procesando Pago',
        text: 'Estamos procesando tu pago. Por favor, espera...',
        icon: 'info',
        allowOutsideClick: false,
        didOpen: () => {
          Swal.showLoading();
        }
      });

      // Simular un retraso para el procesamiento del pago
      setTimeout(() => {
        // Suponiendo que el pago fue exitoso
        Swal.fire({
          title: 'Pago Exitoso',
          text: 'Tu pago ha sido realizado con éxito.',
          icon: 'success'
        }).then(() => {
          // Redirigir o realizar otras acciones necesarias
        });
      }, 2000); // Retraso de 2 segundos
    } else {
      // Mostrar un mensaje de error si la validación falla
      Swal.fire({
        title: 'Error',
        text: 'Por favor, completa todos los campos correctamente.',
        icon: 'error'
      });
    }
  }

  // Método para validar el formulario
  validarFormulario(): any {
    return this.tarjetaNumero && this.tarjetaNombre && this.tarjetaFechaExpiracion && this.tarjetaCVV;
  }
}
