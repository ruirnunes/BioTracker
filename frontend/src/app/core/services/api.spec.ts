import { TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting, HttpTestingController } from '@angular/common/http/testing';
import { ApiService } from './api';
import { environment } from '../../../environments/environment';

describe('ApiService', () => {
  let service: ApiService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ApiService,
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });

    service = TestBed.inject(ApiService);
    httpMock = TestBed.inject(HttpTestingController);
  });

  it('should perform GET request with correct URL', () => {
    service.get('/test').subscribe();

    const req = httpMock.expectOne(`${environment.apiUrl}/test`);
    expect(req.request.method).toBe('GET');

    req.flush({});
  });

  afterEach(() => {
    httpMock.verify();
  });
});