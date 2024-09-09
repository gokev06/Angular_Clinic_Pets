import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminAdopcionesComponent } from './admin-adopciones.component';

describe('AdminAdopcionesComponent', () => {
  let component: AdminAdopcionesComponent;
  let fixture: ComponentFixture<AdminAdopcionesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdminAdopcionesComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdminAdopcionesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
