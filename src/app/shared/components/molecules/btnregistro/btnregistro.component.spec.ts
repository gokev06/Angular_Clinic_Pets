import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnregistroComponent } from './btnregistro.component';

describe('BtnregistroComponent', () => {
  let component: BtnregistroComponent;
  let fixture: ComponentFixture<BtnregistroComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [BtnregistroComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(BtnregistroComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
