import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TEST_PROVIDERS } from '../../../../testing/test-providers';

import { SpeciesDetailComponent } from './species-detail';

describe('SpeciesDetailComponent', () => {
  let component: SpeciesDetailComponent;
  let fixture: ComponentFixture<SpeciesDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesDetailComponent],
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

    fixture = TestBed.createComponent(SpeciesDetailComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});