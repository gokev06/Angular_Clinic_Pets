import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ErroresValidacionesComponent } from './errores-validaciones.component';

describe('ErroresValidacionesComponent', () => {
  let component: ErroresValidacionesComponent;
  let fixture: ComponentFixture<ErroresValidacionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ErroresValidacionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ErroresValidacionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
