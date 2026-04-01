import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesDetail } from './species-detail';

describe('SpeciesDetail', () => {
  let component: SpeciesDetail;
  let fixture: ComponentFixture<SpeciesDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
