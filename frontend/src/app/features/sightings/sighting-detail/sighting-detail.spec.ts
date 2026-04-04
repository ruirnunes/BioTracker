import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TEST_PROVIDERS } from '../../../../testing/test-providers';

import { SightingDetailComponent } from './sighting-detail';

describe('SightingDetailComponent', () => {
  let component: SightingDetailComponent;
  let fixture: ComponentFixture<SightingDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingDetailComponent],
      providers: [
        ...TEST_PROVIDERS,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => '1'
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SightingDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});