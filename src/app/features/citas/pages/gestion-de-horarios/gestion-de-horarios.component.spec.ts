import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionDeHorariosComponent } from './gestion-de-horarios.component';

describe('GestionDeHorariosComponent', () => {
  let component: GestionDeHorariosComponent;
  let fixture: ComponentFixture<GestionDeHorariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionDeHorariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionDeHorariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
