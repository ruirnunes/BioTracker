import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

import { SightingsListComponent } from './sightings-list';

describe('SightingsListComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingsListComponent],
      providers: [
        provideRouter([]),
        {
          provide: ActivatedRoute,
          useValue: {}
        }
      ]
    }).compileComponents();
  });

  it('should create', () => {
    const fixture = TestBed.createComponent(SightingsListComponent);
    expect(fixture.componentInstance).toBeTruthy();
  });
});