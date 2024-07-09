import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ScopedTableHistorialComponent } from './scoped-table-historial.component';

describe('ScopedTableHistorialComponent', () => {
  let component: ScopedTableHistorialComponent;
  let fixture: ComponentFixture<ScopedTableHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ScopedTableHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ScopedTableHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
