import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SightingDetail } from './sighting-detail';

describe('SightingDetail', () => {
  let component: SightingDetail;
  let fixture: ComponentFixture<SightingDetail>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SightingDetail],
    }).compileComponents();

    fixture = TestBed.createComponent(SightingDetail);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
