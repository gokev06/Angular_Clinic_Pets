import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedoresAdminComponent } from './contenedores-admin.component';

describe('ContenedoresAdminComponent', () => {
  let component: ContenedoresAdminComponent;
  let fixture: ComponentFixture<ContenedoresAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenedoresAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenedoresAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
