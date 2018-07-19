import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { addMinutes } from 'date-fns';

import { LockedHistoryEntryComponent } from './locked-history-entry.component';

import { ElapsedTimePipe } from '../../../../shared/pipes/elapsed-time.pipe';

import { HistoryListItem } from '../../../../shared/models';

describe('LockedHistoryEntryComponent', () => {
  let component: LockedHistoryEntryComponent;
  let fixture: ComponentFixture<LockedHistoryEntryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [
        LockedHistoryEntryComponent,
        ElapsedTimePipe
      ],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(LockedHistoryEntryComponent);
    component = fixture.componentInstance;
    component.item = testItem;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));
});

const start = new Date();
const end = addMinutes(start, 15);
const testItem: HistoryListItem = {
  id: '1',
  game: 'some game',
  platform: 'some platform',
  startTime: start.getTime(),
  endTime: end.getTime(),
  dateRange: [start, end],
  locked: true
};
