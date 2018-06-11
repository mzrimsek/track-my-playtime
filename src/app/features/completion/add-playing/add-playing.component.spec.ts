import { CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPlayingComponent } from './add-playing.component';

describe('AddPlayingComponent', () => {
  let component: AddPlayingComponent;
  let fixture: ComponentFixture<AddPlayingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [AddPlayingComponent],
      schemas: [CUSTOM_ELEMENTS_SCHEMA, NO_ERRORS_SCHEMA]
    }).compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPlayingComponent);
    component = fixture.componentInstance;
    component.info = {
      game: '',
      platform: '',
      startTime: 0
    };
    fixture.detectChanges();
  });

  it('Should create component', () => {
    expect(component).toBeTruthy();
  });
});
