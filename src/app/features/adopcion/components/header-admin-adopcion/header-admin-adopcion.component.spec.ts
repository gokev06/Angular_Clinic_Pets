import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAdminAdopcionComponent } from './header-admin-adopcion.component';

describe('HeaderAdminAdopcionComponent', () => {
  let component: HeaderAdminAdopcionComponent;
  let fixture: ComponentFixture<HeaderAdminAdopcionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [HeaderAdminAdopcionComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderAdminAdopcionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
