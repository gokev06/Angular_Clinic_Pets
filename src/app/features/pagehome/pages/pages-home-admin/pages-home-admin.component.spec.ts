import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PagesHomeAdminComponent } from './pages-home-admin.component';

describe('PagesHomeAdminComponent', () => {
  let component: PagesHomeAdminComponent;
  let fixture: ComponentFixture<PagesHomeAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [PagesHomeAdminComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(PagesHomeAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
