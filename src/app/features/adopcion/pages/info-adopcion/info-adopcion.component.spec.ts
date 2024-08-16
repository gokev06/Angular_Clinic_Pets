import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InfoAdopcionComponent } from './info-adopcion.component';

describe('InfoAdopcionComponent', () => {
  let component: InfoAdopcionComponent;
  let fixture: ComponentFixture<InfoAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InfoAdopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InfoAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
