import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AdmiHeaderComponent } from './admi-header.component';

describe('AdmiHeaderComponent', () => {
  let component: AdmiHeaderComponent;
  let fixture: ComponentFixture<AdmiHeaderComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AdmiHeaderComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AdmiHeaderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
