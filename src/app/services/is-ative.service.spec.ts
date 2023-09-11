import { TestBed } from '@angular/core/testing';

import { IsAtiveService } from './is-ative.service';

describe('IsAtiveService', () => {
  let service: IsAtiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsAtiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
