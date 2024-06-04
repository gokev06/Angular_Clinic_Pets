import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopedFormularioComponent } from './scoped-formulario.component';

describe('ScopedFormularioComponent', () => {
  let component: ScopedFormularioComponent;
  let fixture: ComponentFixture<ScopedFormularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScopedFormularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScopedFormularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
