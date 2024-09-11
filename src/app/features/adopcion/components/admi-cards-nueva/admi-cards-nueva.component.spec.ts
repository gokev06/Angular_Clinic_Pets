import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiCardsNuevaComponent } from './admi-cards-nueva.component';

describe('AdmiCardsNuevaComponent', () => {
  let component: AdmiCardsNuevaComponent;
  let fixture: ComponentFixture<AdmiCardsNuevaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmiCardsNuevaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmiCardsNuevaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
