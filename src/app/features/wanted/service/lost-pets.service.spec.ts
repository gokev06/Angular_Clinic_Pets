import { TestBed } from '@angular/core/testing';

import { LostPetsService } from './lost-pets.service';

describe('LostPetsService', () => {
  let service: LostPetsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(LostPetsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
