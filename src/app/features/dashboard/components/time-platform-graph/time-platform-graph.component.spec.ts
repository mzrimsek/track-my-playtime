import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimePlatformGraphComponent } from './time-platform-graph.component';

describe('TimePlatformGraphComponent', () => {
  let component: TimePlatformGraphComponent;
  let fixture: ComponentFixture<TimePlatformGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimePlatformGraphComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TimePlatformGraphComponent);
    component = fixture.componentInstance;
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));
});
