import { TestBed } from '@angular/core/testing';

import { DisabledHorariosService } from './disabled-horarios.service';

describe('DisabledHorariosService', () => {
  let service: DisabledHorariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DisabledHorariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
