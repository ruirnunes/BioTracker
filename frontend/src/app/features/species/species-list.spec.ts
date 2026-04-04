import { ComponentFixture, TestBed } from '@angular/core/testing';
import { provideHttpClient } from '@angular/common/http';
import { provideRouter } from '@angular/router';

import { SpeciesListComponent } from './species-list';

describe('SpeciesListComponent', () => {
  let component: SpeciesListComponent;
  let fixture: ComponentFixture<SpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesListComponent],
      providers: [
        provideHttpClient(),
        provideRouter([])
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesListComponent);
    component = fixture.componentInstance;

    fixture.detectChanges();
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});