import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AlertacancelarcitaComponent } from './alertacancelarcita.component';

describe('AlertacancelarcitaComponent', () => {
  let component: AlertacancelarcitaComponent;
  let fixture: ComponentFixture<AlertacancelarcitaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AlertacancelarcitaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AlertacancelarcitaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
