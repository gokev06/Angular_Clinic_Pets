import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderadopcionComponent } from './headeradopcion.component';

describe('HeaderadopcionComponent', () => {
  let component: HeaderadopcionComponent;
  let fixture: ComponentFixture<HeaderadopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderadopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderadopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
