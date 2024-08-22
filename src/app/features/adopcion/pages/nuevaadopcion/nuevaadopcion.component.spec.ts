import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NuevaadopcionComponent } from './nuevaadopcion.component';

describe('NuevaadopcionComponent', () => {
  let component: NuevaadopcionComponent;
  let fixture: ComponentFixture<NuevaadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NuevaadopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NuevaadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
