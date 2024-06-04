import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TAdopcionComponent } from './t-adopcion.component';

describe('TAdopcionComponent', () => {
  let component: TAdopcionComponent;
  let fixture: ComponentFixture<TAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TAdopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
