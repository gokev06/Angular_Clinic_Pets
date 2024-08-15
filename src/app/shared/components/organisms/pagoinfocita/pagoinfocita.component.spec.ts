import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagoinfocitaComponent } from './pagoinfocita.component';

describe('PagoinfocitaComponent', () => {
  let component: PagoinfocitaComponent;
  let fixture: ComponentFixture<PagoinfocitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagoinfocitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagoinfocitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
