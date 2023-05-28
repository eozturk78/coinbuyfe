import { TestBed } from '@angular/core/testing';

import { CoinbuyApiService } from './coinbuy-api.service';

describe('CoinbuyApiService', () => {
  let service: CoinbuyApiService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CoinbuyApiService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
