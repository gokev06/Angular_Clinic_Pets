import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormularioCitasComponent } from './formulario-citas.component';

describe('FormularioCitasComponent', () => {
  let component: FormularioCitasComponent;
  let fixture: ComponentFixture<FormularioCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FormularioCitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FormularioCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
