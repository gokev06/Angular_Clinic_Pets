import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconphoneComponent } from './inconphone.component';

describe('InconphoneComponent', () => {
  let component: InconphoneComponent;
  let fixture: ComponentFixture<InconphoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InconphoneComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InconphoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
