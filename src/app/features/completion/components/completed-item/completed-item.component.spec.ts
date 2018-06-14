import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedItemComponent } from './completed-item.component';

describe('CompletedItemComponent', () => {
  let component: CompletedItemComponent;
  let fixture: ComponentFixture<CompletedItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedItemComponent]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });
});
