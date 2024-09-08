import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InventarioDatosComponent } from './inventario-datos.component';

describe('InventarioDatosComponent', () => {
  let component: InventarioDatosComponent;
  let fixture: ComponentFixture<InventarioDatosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InventarioDatosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InventarioDatosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
