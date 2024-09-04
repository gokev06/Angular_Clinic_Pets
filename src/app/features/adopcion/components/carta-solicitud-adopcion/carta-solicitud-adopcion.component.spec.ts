import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CartaSolicitudAdopcionComponent } from './carta-solicitud-adopcion.component';

describe('CartaSolicitudAdopcionComponent', () => {
  let component: CartaSolicitudAdopcionComponent;
  let fixture: ComponentFixture<CartaSolicitudAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CartaSolicitudAdopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CartaSolicitudAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
