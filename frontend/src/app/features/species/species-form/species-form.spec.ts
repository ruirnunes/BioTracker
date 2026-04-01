import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesForm } from './species-form';

describe('SpeciesForm', () => {
  let component: SpeciesForm;
  let fixture: ComponentFixture<SpeciesForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
