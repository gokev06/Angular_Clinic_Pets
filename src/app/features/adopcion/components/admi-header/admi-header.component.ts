import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admi-header',
  templateUrl: './admi-header.component.html',
  styleUrl: './admi-header.component.scss'
})
export class AdmiHeaderComponent {
  
  notificationCount: number = 2; // Cambia este valor según el número de notificaciones

  constructor(private router: Router) {}

 

  navigateToNotifications(): void {
    this.router.navigate(['/nueva-adopcion']); // Redirige a la ruta deseada
  }
  
  @Output() filterEvent = new EventEmitter<string>();
  searchTerm: string = '';

  onSearch() {
    this.filterEvent.emit(this.searchTerm.toLowerCase());
}
}
