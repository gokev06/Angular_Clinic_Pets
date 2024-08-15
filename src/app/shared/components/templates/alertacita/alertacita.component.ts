import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-alertacita',
  templateUrl: './alertacita.component.html',
  styleUrl: './alertacita.component.scss'
})
export class AlertacitaComponent {
  isModalOpen = false;
  @Output() close = new EventEmitter<void>();

  closeModal(): void {
    this.close.emit();
  }

}
