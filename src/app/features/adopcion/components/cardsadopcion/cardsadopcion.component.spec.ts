import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardsadopcionComponent } from './cardsadopcion.component';

describe('CardsadopcionComponent', () => {
  let component: CardsadopcionComponent;
  let fixture: ComponentFixture<CardsadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CardsadopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(CardsadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
