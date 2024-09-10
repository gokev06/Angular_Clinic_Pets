import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EstadoCargaComponent } from './estado-carga.component';

describe('EstadoCargaComponent', () => {
  let component: EstadoCargaComponent;
  let fixture: ComponentFixture<EstadoCargaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [EstadoCargaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(EstadoCargaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
