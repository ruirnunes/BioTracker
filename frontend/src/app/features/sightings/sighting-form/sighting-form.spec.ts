import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingForm } from './sighting-form';

describe('SightingForm', () => {
  let component: SightingForm;
  let fixture: ComponentFixture<SightingForm>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingForm],
    }).compileComponents();

    fixture = TestBed.createComponent(SightingForm);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
