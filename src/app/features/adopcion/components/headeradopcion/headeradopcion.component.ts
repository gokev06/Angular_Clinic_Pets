import { Component, Output, EventEmitter, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-headeradopcion',
  templateUrl: './headeradopcion.component.html',
  styleUrl: './headeradopcion.component.scss'
})
export class HeaderadopcionComponent  implements OnInit{

  searchTerm: string = '';


  @Output() search = new EventEmitter <string>();


  constructor(private router: Router){}

  ngOnInit(): void {

  }


  onSearch() {
    this.search.emit(this.searchTerm);
    console.log(this.searchTerm);

  }

  navigateToNuevaAdopcion() {
    this.router.navigate(['/nueva-adopcion']);
  }
}
