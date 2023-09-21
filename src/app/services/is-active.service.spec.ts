import { TestBed } from '@angular/core/testing';

import { IsActiveService } from './is-active.service';

describe('IsActiveService', () => {
  let service: IsActiveService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(IsActiveService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
