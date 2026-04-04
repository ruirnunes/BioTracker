import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SightingFormComponent } from './sighting-form';
import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { ActivatedRoute } from '@angular/router';

describe('SightingFormComponent', () => {
  let component: SightingFormComponent;
  let fixture: ComponentFixture<SightingFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingFormComponent],
      providers: [
        provideHttpClient(),
        provideHttpClientTesting(),
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

    fixture = TestBed.createComponent(SightingFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});