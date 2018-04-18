import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        HomeComponent
      ],
    }).compileComponents();
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  it('Should have correct tagline text', async(() => {
    const tagline = 'Game Time Tracking Made Simple';
    expect(component.tagline).toBe(tagline);
  }));
});
