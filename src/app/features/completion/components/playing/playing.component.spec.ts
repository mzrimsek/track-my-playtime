import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingComponent } from './playing.component';

describe('PlayingComponent', () => {
  let component: PlayingComponent;
  let fixture: ComponentFixture<PlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [PlayingComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('getDisplayData', () => {


  });
});
