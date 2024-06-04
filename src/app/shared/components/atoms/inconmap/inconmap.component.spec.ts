import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InconmapComponent } from './inconmap.component';

describe('InconmapComponent', () => {
  let component: InconmapComponent;
  let fixture: ComponentFixture<InconmapComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [InconmapComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(InconmapComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
