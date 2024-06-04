import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesCitasComponent } from './pages-citas.component';

describe('PagesCitasComponent', () => {
  let component: PagesCitasComponent;
  let fixture: ComponentFixture<PagesCitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesCitasComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesCitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
