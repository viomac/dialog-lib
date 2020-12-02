import { TestBed } from '@angular/core/testing';

import { DialogLibService } from './dialog-lib.service';

describe('DialogLibService', () => {
  let service: DialogLibService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DialogLibService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
