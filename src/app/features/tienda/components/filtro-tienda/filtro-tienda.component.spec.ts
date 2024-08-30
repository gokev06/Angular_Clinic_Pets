import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroTiendaComponent } from './filtro-tienda.component';

describe('FiltroTiendaComponent', () => {
  let component: FiltroTiendaComponent;
  let fixture: ComponentFixture<FiltroTiendaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [FiltroTiendaComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FiltroTiendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
