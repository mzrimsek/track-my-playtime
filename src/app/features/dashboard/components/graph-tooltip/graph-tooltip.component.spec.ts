import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { GraphTooltipComponent } from './graph-tooltip.component';

describe('GraphTooltipComponent', () => {
  let component: GraphTooltipComponent;
  let fixture: ComponentFixture<GraphTooltipComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ GraphTooltipComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(GraphTooltipComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
