import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SetNotesComponent } from './set-notes.component';

describe('SetNotesComponent', () => {
  let component: SetNotesComponent;
  let fixture: ComponentFixture<SetNotesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SetNotesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SetNotesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
