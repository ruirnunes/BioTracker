import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingsList } from './sightings-list';

describe('SightingsList', () => {
  let component: SightingsList;
  let fixture: ComponentFixture<SightingsList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingsList],
    }).compileComponents();

    fixture = TestBed.createComponent(SightingsList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
