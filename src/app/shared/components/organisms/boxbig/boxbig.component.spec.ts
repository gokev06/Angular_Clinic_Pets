import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BoxbigComponent } from './boxbig.component';

describe('BoxbigComponent', () => {
  let component: BoxbigComponent;
  let fixture: ComponentFixture<BoxbigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BoxbigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BoxbigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
