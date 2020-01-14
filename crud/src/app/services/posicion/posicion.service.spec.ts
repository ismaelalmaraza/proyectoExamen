import { TestBed } from '@angular/core/testing';

import { PosicionService } from './posicion.service';

describe('PosicionService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PosicionService = TestBed.get(PosicionService);
    expect(service).toBeTruthy();
  });
});
