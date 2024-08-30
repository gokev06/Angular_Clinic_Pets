import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TiendaProductoComponent } from './tienda-producto.component';

describe('TiendaProductoComponent', () => {
  let component: TiendaProductoComponent;
  let fixture: ComponentFixture<TiendaProductoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TiendaProductoComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TiendaProductoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
