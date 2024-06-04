import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImgAndtextbigComponent } from './img-andtextbig.component';

describe('ImgAndtextbigComponent', () => {
  let component: ImgAndtextbigComponent;
  let fixture: ComponentFixture<ImgAndtextbigComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ImgAndtextbigComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ImgAndtextbigComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
