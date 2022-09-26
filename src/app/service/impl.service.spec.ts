import { TestBed } from '@angular/core/testing';

import {ImplService} from './impl.service';

describe('ImplService', () => {
  let service: ImplService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ImplService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
