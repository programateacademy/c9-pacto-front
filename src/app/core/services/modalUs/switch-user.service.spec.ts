import { TestBed } from '@angular/core/testing';

import { SwitchUserService } from './switch-user.service';

describe('SwitchUserService', () => {
  let service: SwitchUserService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SwitchUserService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
