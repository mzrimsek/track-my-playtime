import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EditDisplayNameComponent } from './edit-display-name.component';

describe('EditDisplayNameComponent', () => {
  let component: EditDisplayNameComponent;
  let fixture: ComponentFixture<EditDisplayNameComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EditDisplayNameComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EditDisplayNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
