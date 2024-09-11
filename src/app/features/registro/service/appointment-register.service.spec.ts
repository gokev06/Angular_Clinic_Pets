import { TestBed } from '@angular/core/testing';

import { AppointmentRegisterService } from './appointment-register.service';

describe('AppointmentRegisterService', () => {
  let service: AppointmentRegisterService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AppointmentRegisterService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
