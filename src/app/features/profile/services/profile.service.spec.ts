import { inject, TestBed } from '@angular/core/testing';

import { ProfileService } from './profile.service';

describe('ProfileService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ProfileService]
    });
  });

  it('Should be created', inject([ProfileService], (service: ProfileService) => {
    expect(service).toBeTruthy();
  }));
});
