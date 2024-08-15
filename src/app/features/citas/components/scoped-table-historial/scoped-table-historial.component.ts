import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-scoped-table-historial',
  templateUrl: './scoped-table-historial.component.html',
  styleUrls: ['./scoped-table-historial.component.scss']
})
export class ScopedTableHistorialComponent implements OnInit {
  @Input() citas: any[] = [];

  constructor() {}

  ngOnInit(): void {}
}
