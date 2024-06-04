import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TTiendaComponent } from './t-tienda.component';

describe('TTiendaComponent', () => {
  let component: TTiendaComponent;
  let fixture: ComponentFixture<TTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [TTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(TTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
