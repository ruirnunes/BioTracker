import { TestBed } from '@angular/core/testing';
import { provideRouter } from '@angular/router';
import { App } from './app';

describe('AppComponent', () => {
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [App],
      providers: [
        provideRouter([])
      ]
    }).compileComponents();
  });

  it('should create the app', () => {
    const fixture = TestBed.createComponent(App);
    const app = fixture.componentInstance;

    expect(app).toBeTruthy();
  });

  it('should render navbar', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const navbar = fixture.nativeElement.querySelector('app-navbar');
    expect(navbar).toBeTruthy();
  });

  it('should render router outlet', () => {
    const fixture = TestBed.createComponent(App);
    fixture.detectChanges();

    const outlet = fixture.nativeElement.querySelector('router-outlet');
    expect(outlet).toBeTruthy();
  });
});