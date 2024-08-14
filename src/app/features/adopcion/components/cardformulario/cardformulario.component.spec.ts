import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardformularioComponent } from './cardformulario.component';

describe('CardformularioComponent', () => {
  let component: CardformularioComponent;
  let fixture: ComponentFixture<CardformularioComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardformularioComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardformularioComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
