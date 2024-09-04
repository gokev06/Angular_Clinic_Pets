import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ModalVerAdopcionComponent } from './modal-ver-adopcion.component';

describe('ModalVerAdopcionComponent', () => {
  let component: ModalVerAdopcionComponent;
  let fixture: ComponentFixture<ModalVerAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ModalVerAdopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ModalVerAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
