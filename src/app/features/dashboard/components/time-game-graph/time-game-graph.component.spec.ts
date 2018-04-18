import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TimeGameGraphComponent } from './time-game-graph.component';

describe('TimeGameGraphComponent', () => {
  let component: TimeGameGraphComponent;
  let fixture: ComponentFixture<TimeGameGraphComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        TimeGameGraphComponent
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();
    fixture = TestBed.createComponent(TimeGameGraphComponent);
    component = fixture.componentInstance;
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));
});
