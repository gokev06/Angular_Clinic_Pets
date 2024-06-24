import { TestBed } from '@angular/core/testing';

import { SolicitudAdopcionService } from './solicitud-adopcion.service';

describe('SolicitudAdopcionService', () => {
  let service: SolicitudAdopcionService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SolicitudAdopcionService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
