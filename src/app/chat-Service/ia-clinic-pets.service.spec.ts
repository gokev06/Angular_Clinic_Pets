import { TestBed } from '@angular/core/testing';

import { IAClinicPetsService } from './ia-clinic-pets.service';

describe('IAClinicPetsService', () => {
  let service: IAClinicPetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IAClinicPetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
