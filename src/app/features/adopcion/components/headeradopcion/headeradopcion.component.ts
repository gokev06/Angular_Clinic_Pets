import { Component, Output, EventEmitter, OnInit } from '@angular/core';

@Component({
  selector: 'app-headeradopcion',
  templateUrl: './headeradopcion.component.html',
  styleUrl: './headeradopcion.component.scss'
})
export class HeaderadopcionComponent  implements OnInit{

  searchTerm: string = '';


  @Output() search = new EventEmitter <string>();


  constructor(){}

  ngOnInit(): void {

  }


  onSearch() {
    this.search.emit(this.searchTerm);
    console.log(this.searchTerm);

  }
}
