import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconmessageComponent } from './inconmessage.component';

describe('InconmessageComponent', () => {
  let component: InconmessageComponent;
  let fixture: ComponentFixture<InconmessageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InconmessageComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InconmessageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
