import { ComponentFixture, TestBed } from '@angular/core/testing';

import { IconCitasComponent } from './icon-citas.component';

describe('IconCitasComponent', () => {
  let component: IconCitasComponent;
  let fixture: ComponentFixture<IconCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [IconCitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(IconCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
