import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertacitaComponent } from './alertacita.component';

describe('AlertacitaComponent', () => {
  let component: AlertacitaComponent;
  let fixture: ComponentFixture<AlertacitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertacitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertacitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
