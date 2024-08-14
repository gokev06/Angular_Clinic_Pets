import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHistorialComponent } from './pages-historial.component';

describe('PagesHistorialComponent', () => {
  let component: PagesHistorialComponent;
  let fixture: ComponentFixture<PagesHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
