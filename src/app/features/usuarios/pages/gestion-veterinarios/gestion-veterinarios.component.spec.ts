import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GestionVeterinariosComponent } from './gestion-veterinarios.component';

describe('GestionVeterinariosComponent', () => {
  let component: GestionVeterinariosComponent;
  let fixture: ComponentFixture<GestionVeterinariosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [GestionVeterinariosComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(GestionVeterinariosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
