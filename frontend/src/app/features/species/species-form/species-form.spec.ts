import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ActivatedRoute } from '@angular/router';
import { TEST_PROVIDERS } from '../../../../testing/test-providers';

import { SpeciesFormComponent } from './species-form';

describe('SpeciesFormComponent', () => {
  let component: SpeciesFormComponent;
  let fixture: ComponentFixture<SpeciesFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesFormComponent],
      providers: [
        ...TEST_PROVIDERS,
        {
          provide: ActivatedRoute,
          useValue: {
            snapshot: {
              paramMap: {
                get: () => null
              }
            }
          }
        }
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesFormComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});