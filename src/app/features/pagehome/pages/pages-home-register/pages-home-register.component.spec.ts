import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHomeRegisterComponent } from './pages-home-register.component';

describe('PagesHomeRegisterComponent', () => {
  let component: PagesHomeRegisterComponent;
  let fixture: ComponentFixture<PagesHomeRegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesHomeRegisterComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesHomeRegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
