import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoProductoTiendaComponent } from './info-producto-tienda.component';

describe('InfoProductoTiendaComponent', () => {
  let component: InfoProductoTiendaComponent;
  let fixture: ComponentFixture<InfoProductoTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoProductoTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoProductoTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
