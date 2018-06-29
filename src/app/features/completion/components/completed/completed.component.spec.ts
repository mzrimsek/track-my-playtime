import { NO_ERRORS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CompletedComponent } from './completed.component';

describe('CompletedComponent', () => {
  let component: CompletedComponent;
  let fixture: ComponentFixture<CompletedComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [CompletedComponent],
      schemas: [NO_ERRORS_SCHEMA]
    }).compileComponents();

    fixture = TestBed.createComponent(CompletedComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('Should create the component', async(() => {
    expect(component).toBeTruthy();
  }));

  describe('getDisplayData', () => {
    it('Should return empty when no items', async(() => {
      const result = component.getDisplayData();
      expect(result.length).toBe(0);
    }));

    it('Should return empty when no item start entry match', async(() => {
      component.items = [{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: 'some end id'
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
            dateRange: [new Date(1000), new Date(4000)],
            locked: false
          }],
          totalTime: 3
        }
      ];
      fixture.detectChanges();

      const result = component.getDisplayData();

      expect(result.length).toBe(0);
    }));

    it('Should return correct data when item start entry matches', async(() => {
      component.items = [{
        id: '1',
        startEntryId: 'some start id',
        endEntryId: 'some end id'
      }];
      component.gameGroupings = [
        {
          key: 'some game',
          historyItems: [{
            id: 'some end id',
            game: 'some game',
            platform: 'some platform',
            startTime: 5000,
            endTime: 6000,
            dateRange: [new Date(5000), new Date(6000)],
            locked: false
          }, {
            id: 'some start id',
            game: 'some game',
            platform: 'some platform',
            startTime: 1000,
            endTime: 4000,
            dateRange: [new Date(1000), new Date(4000)],
            locked: false
          }],
          totalTime: 4
        }
      ];
      fixture.detectChanges();

      const result = component.getDisplayData();

      expect(result).toEqual([{
        item: {
          id: '1',
          startEntryId: 'some start id',
          endEntryId: 'some end id'
        },
        completedItem: {
          game: 'some game',
          platform: 'some platform',
          startTime: 1000,
          endTime: 6000,
          timePlayed: 4
        }
      }]);
    }));
  });
});
