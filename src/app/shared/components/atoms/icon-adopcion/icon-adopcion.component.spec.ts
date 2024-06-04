import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconAdopcionComponent } from './icon-adopcion.component';

describe('IconAdopcionComponent', () => {
  let component: IconAdopcionComponent;
  let fixture: ComponentFixture<IconAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconAdopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
