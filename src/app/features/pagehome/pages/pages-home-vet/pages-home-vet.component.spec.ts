import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHomeVetComponent } from './pages-home-vet.component';

describe('PagesHomeVetComponent', () => {
  let component: PagesHomeVetComponent;
  let fixture: ComponentFixture<PagesHomeVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesHomeVetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesHomeVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
