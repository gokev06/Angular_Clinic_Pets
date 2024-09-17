import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SubirLostPetsComponent } from './subir-lost-pets.component';

describe('SubirLostPetsComponent', () => {
  let component: SubirLostPetsComponent;
  let fixture: ComponentFixture<SubirLostPetsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SubirLostPetsComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(SubirLostPetsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
