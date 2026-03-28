import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SpeciesList } from './species-list';

describe('SpeciesList', () => {
  let component: SpeciesList;
  let fixture: ComponentFixture<SpeciesList>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SpeciesList],
    }).compileComponents();

    fixture = TestBed.createComponent(SpeciesList);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
