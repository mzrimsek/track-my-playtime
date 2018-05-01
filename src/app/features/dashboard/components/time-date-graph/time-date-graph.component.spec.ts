import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeDateGraphComponent } from './time-date-graph.component';

describe('TimeDateGraphComponent', () => {
  let component: TimeDateGraphComponent;
  let fixture: ComponentFixture<TimeDateGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeDateGraphComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(TimeDateGraphComponent);
    component = fixture.componentInstance;
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));
});
