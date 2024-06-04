import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopedTituloComponent } from './scoped-titulo.component';

describe('ScopedTituloComponent', () => {
  let component: ScopedTituloComponent;
  let fixture: ComponentFixture<ScopedTituloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScopedTituloComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScopedTituloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
