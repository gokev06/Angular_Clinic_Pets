import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContenedoresVetComponent } from './contenedores-vet.component';

describe('ContenedoresVetComponent', () => {
  let component: ContenedoresVetComponent;
  let fixture: ComponentFixture<ContenedoresVetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ContenedoresVetComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ContenedoresVetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
