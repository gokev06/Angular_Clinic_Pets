import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopedFooterComponent } from './scoped-footer.component';

describe('ScopedFooterComponent', () => {
  let component: ScopedFooterComponent;
  let fixture: ComponentFixture<ScopedFooterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScopedFooterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScopedFooterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
