import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgAndtextComponent } from './img-andtext.component';

describe('ImgAndtextComponent', () => {
  let component: ImgAndtextComponent;
  let fixture: ComponentFixture<ImgAndtextComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgAndtextComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgAndtextComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
