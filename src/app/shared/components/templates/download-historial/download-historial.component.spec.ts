import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DownloadHistorialComponent } from './download-historial.component';

describe('DownloadHistorialComponent', () => {
  let component: DownloadHistorialComponent;
  let fixture: ComponentFixture<DownloadHistorialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DownloadHistorialComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(DownloadHistorialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
