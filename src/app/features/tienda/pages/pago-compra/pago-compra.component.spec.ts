import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoCompraComponent } from './pago-compra.component';

describe('PagoCompraComponent', () => {
  let component: PagoCompraComponent;
  let fixture: ComponentFixture<PagoCompraComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoCompraComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoCompraComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
