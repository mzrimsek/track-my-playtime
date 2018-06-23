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

  it('Should create the component', () => {
    expect(component).toBeTruthy();
  });

  describe('getDisplayData', () => {
    it('Should return empty when no items', () => {
      const result = component.getDisplayData();
      expect(result.length).toBe(0);
    });

    it('Should return empty when no item start entry match', () => {
      component.items = [{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: ''
      }];
      component.gameGroupings = [
        {
          key: 'some game',
          historyItems: [{
            id: 'not some start id',
            game: 'some game',
            platform: 'some platform',
            startTime: 1000,
            endTime: 4000,
            dateRange: [new Date(1000), new Date(4000)]
          }],
          totalTime: 3
        }
      ];
      fixture.detectChanges();

      const result = component.getDisplayData();

      expect(result.length).toBe(0);
    });

    it('Should return correct data when item start entry matches', () => {
      component.items = [{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: ''
      }];
      component.gameGroupings = [
        {
          key: 'some game',
          historyItems: [{
            id: 'some start id',
            game: 'some game',
            platform: 'some platform',
            startTime: 1000,
            endTime: 4000,
            dateRange: [new Date(1000), new Date(4000)]
          }],
          totalTime: 3
        }
      ];
      component.markCompleteEntities = {
        '1': {
          id: '1',
          showExtra: false,
          endTime: 0
        }
      };
      fixture.detectChanges();

      const result = component.getDisplayData();

      expect(result).toEqual([{
        item: {
          id: '1',
          startEntryId: 'some start id',
          endEntryId: ''
        },
        startEntryData: {
          id: 'some start id',
          game: 'some game',
          platform: 'some platform',
          startTime: 1000,
          endTime: 4000,
          dateRange: [new Date(1000), new Date(4000)]
        },
        timePlayed: 3,
        endDates: [4000],
        markComplete: {
          id: '1',
          showExtra: false,
          endTime: 0
        }
      }]);
    });
  });
});
