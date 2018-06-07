import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedComponent } from './completed.component';

describe('CompletedComponent', () => {
  let component: CompletedComponent;
  let fixture: ComponentFixture<CompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create the component', () => {
    expect(component).toBeTruthy();
  });
});
