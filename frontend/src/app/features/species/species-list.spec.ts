import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesListComponent } from './species-list';

describe('SpeciesList', () => {
  let component: SpeciesListComponent;
  let fixture: ComponentFixture<SpeciesListComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesListComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesListComponent);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
