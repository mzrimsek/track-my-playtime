import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PlayingItemComponent } from './playing-item.component';

import { TimePipe } from '../../../../shared/pipes/time.pipe';

describe('PlayingItemComponent', () => {
  let component: PlayingItemComponent;
  let fixture: ComponentFixture<PlayingItemComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        PlayingItemComponent,
        TimePipe
      ]
    }).compileComponents();

    fixture = TestBed.createComponent(PlayingItemComponent);
    component = fixture.componentInstance;
    component.displayData = {
      item: {
        id: '1',
        startEntryId: 'start 1',
        endEntryId: ''
      },
      startEntryData: {
        id: 'start 1',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000,
        dateRange: [new Date(3000), new Date(6000)]
      }
    };
    fixture.detectChanges();
  }));

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });
});
