import { addDays, eachDay, subDays } from 'date-fns';

import { HistoryGrouping, HistoryListItem } from '../models';

import {
    filterGroupingsByDateRange, getHistoryGroupingList, getHistoryListItemsMap, getUniqueFrom
} from './history.utils';

describe('History Utils', () => {
  describe('getHistoryListItemsMap', () => {
    it('Can map an empty list', () => {
      const items: HistoryListItem[] = [];
      const result = getHistoryListItemsMap(items, item => item.game);
      expect(result.size).toBe(0);
    });

    it('Can map a list of items with same key', () => {
      const game = 'Awesome Game';
      const items = [
        getHistoryListItem(game, ''),
        getHistoryListItem(game, ''),
        getHistoryListItem(game, '')
      ];

      const result = getHistoryListItemsMap(items, item => item.game);

      expect(result.size).toBe(1);
      const historyListItems = result.get(game);
      // tslint:disable-next-line:no-non-null-assertion
      expect(historyListItems!.length).toBe(3);
    });

    it('Can map a list of items with different keys', () => {
      const game1 = 'Awesome Game';
      const game2 = game1 + '2';
      const items = [
        getHistoryListItem(game1, ''),
        getHistoryListItem(game1, ''),
        getHistoryListItem(game2, '')
      ];

      const result = getHistoryListItemsMap(items, item => item.game);

      expect(result.size).toBe(2);
      const historyListItems1 = result.get(game1);
      const historyListItems2 = result.get(game2);
      // tslint:disable:no-non-null-assertion
      expect(historyListItems1!.length).toBe(2);
      expect(historyListItems2!.length).toBe(1);
      // tslint:enable:no-non-null-assertion
    });
  });

  describe('getHistoryGroupingList', () => {
    it('Should return an empty list when map is empty', () => {
      const items: HistoryListItem[] = [];
      const map = getHistoryListItemsMap(items, item => item.game);

      const result = getHistoryGroupingList(map);

      expect(result.length).toBe(0);
    });

    it('Should return a list with same length as the map size', () => {
      const game = 'Awesome Game';
      const items = [
        getHistoryListItem(game, ''),
        getHistoryListItem(game + '2', '')
      ];
      const map = getHistoryListItemsMap(items, item => item.game);

      const result = getHistoryGroupingList(map);

      expect(result.length).toBe(2);
    });

    describe('Builds each history grouping correctly', () => {
      it('Should set the key', () => {
        const game = 'Awesome Game';
        const items = [
          getHistoryListItem(game, '')
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].key).toBe(game);
      });

      it('Should set the total time', () => {
        const game = 'Awesome Game';
        const now = new Date().getTime();
        const items = [
          getHistoryListItem(game, '', now, now + (30 * 1000)),
          getHistoryListItem(game, '', now, now + (60 * 1000))
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].totalTime).toBe(90);
      });

      it('Should set the history items', () => {
        const game = 'Awesome Game';
        const items = [
          getHistoryListItem(game, ''),
          getHistoryListItem(game, '')
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].historyItems).toEqual(items);
      });
    });
  });

  describe('filterGroupingsByDateRange', () => {
    const start = new Date(2018, 3, 1);
    const end = addDays(start, 6);
    const inRange = addDays(start, 3);
    const outOfRangeAhead = addDays(start, 15);
    const outOfRangeBehind = subDays(start, 3);
    const range = eachDay(start, end);
    const game = 'some game';

    it('Should filter history items outside of date range', () => {
      const grouping = getHistoryGrouping(game, 0);
      grouping.historyItems = [{
        ...getHistoryListItem(game, 'some platform', outOfRangeAhead.getTime(), outOfRangeAhead.getTime()),
        id: 'some id 4'
      }, {
        ...getHistoryListItem(game, 'some platform', inRange.getTime(), inRange.getTime()),
        id: 'some id 3'
      }, {
        ...getHistoryListItem(game, 'some platform', start.getTime(), start.getTime()),
        id: 'some id 2'
      }, {
        ...getHistoryListItem(game, 'some platform', outOfRangeBehind.getTime(), outOfRangeBehind.getTime()),
        id: 'some id'
      }];

      const result = filterGroupingsByDateRange([grouping], range);

      expect(result).toEqual([{
        key: game,
        totalTime: 0,
        historyItems: [{
          id: 'some id 3',
          game,
          platform: 'some platform',
          startTime: inRange.getTime(),
          endTime: inRange.getTime(),
          dateRange: [
            inRange,
            inRange
          ]
        }, {
          id: 'some id 2',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime(),
          dateRange: [
            start,
            start
          ]
        }]
      }]);
    });

    it('Should update total time', () => {
      const grouping = getHistoryGrouping(game, 7000);
      grouping.historyItems = [{
        ...getHistoryListItem(game, 'some platform', outOfRangeAhead.getTime(), outOfRangeAhead.getTime() + 2000),
        id: 'some id 4'
      }, {
        ...getHistoryListItem(game, 'some platform', inRange.getTime(), inRange.getTime() + 1000),
        id: 'some id 3'
      }, {
        ...getHistoryListItem(game, 'some platform', start.getTime(), start.getTime() + 1000),
        id: 'some id 2'
      }, {
        ...getHistoryListItem(game, 'some platform', outOfRangeBehind.getTime(), outOfRangeBehind.getTime() + 3000),
        id: 'some id'
      }];

      const result = filterGroupingsByDateRange([grouping], range);

      expect(result).toEqual([{
        key: game,
        totalTime: 2, // time on history items is in milliseconds; total time is in seconds
        historyItems: [{
          id: 'some id 3',
          game,
          platform: 'some platform',
          startTime: inRange.getTime(),
          endTime: inRange.getTime() + 1000,
          dateRange: [
            inRange,
            new Date(inRange.getTime() + 1000)
          ]
        }, {
          id: 'some id 2',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime() + 1000,
          dateRange: [
            start,
            new Date(start.getTime() + 1000)
          ]
        }]
      }]);
    });
  });

  describe('getUniqueFrom', () => {
    it('Should return list of unique games', () => {
      const items: HistoryListItem[] = [
        getHistoryListItem('Game 3', ''),
        getHistoryListItem('Game 1', ''),
        getHistoryListItem('Game 1', ''),
        getHistoryListItem('Game 2', '')
      ];
      const result = getUniqueFrom(items, item => item.game);
      expect(result).toEqual(['Game 3', 'Game 1', 'Game 2']);
    });

    it('Should return list of unique games', () => {
      const items: HistoryListItem[] = [
        getHistoryListItem('', 'Platform 1'),
        getHistoryListItem('', 'Platform 3'),
        getHistoryListItem('', 'Platform 2'),
        getHistoryListItem('', 'Platform 3')
      ];
      const result = getUniqueFrom(items, item => item.platform);
      expect(result).toEqual(['Platform 1', 'Platform 3', 'Platform 2']);
    });
  });
});

const getHistoryListItem = (game: string, platform: string, startTime = 0, endTime = 0): HistoryListItem => {
  return <HistoryListItem>{
    id: 'totally a unique id',
    game,
    platform,
    startTime,
    endTime,
    dateRange: [new Date(startTime), new Date(endTime)]
  };
}

const getHistoryGrouping = (key: string, totalTime: number): HistoryGrouping => {
  return {
    key,
    totalTime,
    historyItems: []
  };
};
