import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderVetComponent } from './header-vet.component';

describe('HeaderVetComponent', () => {
  let component: HeaderVetComponent;
  let fixture: ComponentFixture<HeaderVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderVetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
