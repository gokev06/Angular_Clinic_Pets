import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesNuevaadopcionComponent } from './pages-nuevaadopcion.component';

describe('PagesNuevaadopcionComponent', () => {
  let component: PagesNuevaadopcionComponent;
  let fixture: ComponentFixture<PagesNuevaadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesNuevaadopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesNuevaadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
