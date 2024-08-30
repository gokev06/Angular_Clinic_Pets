import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderTiendaComponent } from './header-tienda.component';

describe('HeaderTiendaComponent', () => {
  let component: HeaderTiendaComponent;
  let fixture: ComponentFixture<HeaderTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
