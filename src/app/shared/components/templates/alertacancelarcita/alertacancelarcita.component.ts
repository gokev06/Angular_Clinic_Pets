import { Component, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alertacancelarcita',
  templateUrl: './alertacancelarcita.component.html',
  styleUrl: './alertacancelarcita.component.scss'
})
export class AlertacancelarcitaComponent {
  modalcancel = false;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

}
