import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admi-header',
  templateUrl: './admi-header.component.html',
  styleUrl: './admi-header.component.scss'
})
export class AdmiHeaderComponent implements OnInit{

  notificationCount: number = 2; // Cambia este valor según el número de notificaciones

  constructor(private router: Router) {}

  searchTerm: string = '';


  @Output() search = new EventEmitter <string>();


  ngOnInit(): void {

  }


  onSearch() {
    this.search.emit(this.searchTerm);
    console.log(this.searchTerm);

  }


  navigateToNotifications(): void {
    this.router.navigate(['/nueva-adopcion']); // Redirige a la ruta deseada
  }


}
