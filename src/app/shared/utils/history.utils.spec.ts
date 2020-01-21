import { history } from 'app/test-helpers';
import { addDays, eachDay, subDays } from 'date-fns';

import { HistoryListItem } from 'shared/models';

import {
    filterGroupingsByDateRange, getElapsedTimeFrom, getFilteredGrouping, getHistoryGroupingList,
    getHistoryListItemMap, getHistoryListItemsMap, HistoryListItemMap
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
        history.getHistoryListItem(game, ''),
        history.getHistoryListItem(game, ''),
        history.getHistoryListItem(game, '')
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
        history.getHistoryListItem(game1, ''),
        history.getHistoryListItem(game1, ''),
        history.getHistoryListItem(game2, '')
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
        history.getHistoryListItem(game, ''),
        history.getHistoryListItem(game + '2', '')
      ];
      const map = getHistoryListItemsMap(items, item => item.game);

      const result = getHistoryGroupingList(map);

      expect(result.length).toBe(2);
    });

    describe('Builds each history grouping correctly', () => {
      it('Should set the key', () => {
        const game = 'Awesome Game';
        const items = [
          history.getHistoryListItem(game, '')
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].key).toBe(game);
      });

      it('Should set the total time', () => {
        const game = 'Awesome Game';
        const now = new Date().getTime();
        const items = [
          history.getHistoryListItem(game, '', now, now + (30 * 1000)),
          history.getHistoryListItem(game, '', now, now + (60 * 1000))
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].totalTime).toBe(90);
      });

      it('Should set the history items', () => {
        const game = 'Awesome Game';
        const items = [
          history.getHistoryListItem(game, ''),
          history.getHistoryListItem(game, '')
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].historyItems).toEqual(items);
      });
    });
  });

  describe('getFilteredGrouping', () => {
    const start = new Date(2018, 3, 1);
    const end = addDays(start, 6);
    const inRange = addDays(start, 3);
    const outOfRangeAhead = addDays(start, 15);
    const outOfRangeBehind = subDays(start, 3);
    const range = eachDay(start, end);
    const game = 'some game';

    it('Should filter history items outside of date range', () => {
      const grouping = history.getHistoryGrouping(game, 0);
      grouping.historyItems = [{
        ...history.getHistoryListItem(game, 'some platform', outOfRangeAhead.getTime(), outOfRangeAhead.getTime()),
        id: 'some id 4'
      }, {
        ...history.getHistoryListItem(game, 'some platform', inRange.getTime(), inRange.getTime()),
        id: 'some id 3'
      }, {
        ...history.getHistoryListItem(game, 'some platform', start.getTime(), start.getTime()),
        id: 'some id 2'
      }, {
        ...history.getHistoryListItem(game, 'some platform', outOfRangeBehind.getTime(), outOfRangeBehind.getTime()),
        id: 'some id'
      }];

      const result = getFilteredGrouping(grouping, range);

      expect(result).toEqual({
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
          ],
          locked: false
        }, {
          id: 'some id 2',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime(),
          dateRange: [
            start,
            start
          ],
          locked: false
        }]
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
      const grouping1 = history.getHistoryGrouping(game, 0);
      grouping1.historyItems = [{
        ...history.getHistoryListItem(game, 'some platform', outOfRangeAhead.getTime(), outOfRangeAhead.getTime()),
        id: 'some id 4'
      }, {
        ...history.getHistoryListItem(game, 'some platform', inRange.getTime(), inRange.getTime()),
        id: 'some id 3'
      }, {
        ...history.getHistoryListItem(game, 'some platform', start.getTime(), start.getTime()),
        id: 'some id 2'
      }, {
        ...history.getHistoryListItem(game, 'some platform', outOfRangeBehind.getTime(), outOfRangeBehind.getTime()),
        id: 'some id'
      }];

      const grouping2 = history.getHistoryGrouping(game, 0);
      grouping2.historyItems = [{
        ...history.getHistoryListItem(game, 'some platform', inRange.getTime() + 1000, inRange.getTime() + 1000),
        id: 'some id 8'
      }, {
        ...history.getHistoryListItem(game, 'some platform', inRange.getTime(), inRange.getTime()),
        id: 'some id 7'
      }, {
        ...history.getHistoryListItem(game, 'some platform', start.getTime(), start.getTime()),
        id: 'some id 6'
      }, {
        ...history.getHistoryListItem(game, 'some platform', outOfRangeBehind.getTime(), outOfRangeBehind.getTime()),
        id: 'some id 5'
      }];

      const result = filterGroupingsByDateRange([grouping1, grouping2], range);

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
          ],
          locked: false
        }, {
          id: 'some id 2',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime(),
          dateRange: [
            start,
            start
          ],
          locked: false
        }]
      }, {
        key: game,
        totalTime: 0,
        historyItems: [{
          id: 'some id 8',
          game,
          platform: 'some platform',
          startTime: inRange.getTime() + 1000,
          endTime: inRange.getTime() + 1000,
          dateRange: [
            new Date(inRange.getTime() + 1000),
            new Date(inRange.getTime() + 1000)
          ],
          locked: false
        }, {
          id: 'some id 7',
          game,
          platform: 'some platform',
          startTime: inRange.getTime(),
          endTime: inRange.getTime(),
          dateRange: [
            inRange,
            inRange
          ],
          locked: false
        }, {
          id: 'some id 6',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime(),
          dateRange: [
            start,
            start
          ],
          locked: false
        }]
      }]);
    });

    it('Should update total time', () => {
      const grouping = history.getHistoryGrouping(game, 7000);
      grouping.historyItems = [{
        ...history.getHistoryListItem(game, 'some platform', outOfRangeAhead.getTime(), outOfRangeAhead.getTime() + 2000),
        id: 'some id 4'
      }, {
        ...history.getHistoryListItem(game, 'some platform', inRange.getTime(), inRange.getTime() + 1000),
        id: 'some id 3'
      }, {
        ...history.getHistoryListItem(game, 'some platform', start.getTime(), start.getTime() + 1000),
        id: 'some id 2'
      }, {
        ...history.getHistoryListItem(game, 'some platform', outOfRangeBehind.getTime(), outOfRangeBehind.getTime() + 3000),
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
          ],
          locked: false
        }, {
          id: 'some id 2',
          game,
          platform: 'some platform',
          startTime: start.getTime(),
          endTime: start.getTime() + 1000,
          dateRange: [
            start,
            new Date(start.getTime() + 1000)
          ],
          locked: false
        }]
      }]);
    });
  });

  describe('getElapsedTimeFrom', () => {
    it('Should return 0 when list is empty', () => {
      const result = getElapsedTimeFrom([]);
      expect(result).toBe(0);
    });

    it('Should return correct seconds', () => {
      const items: HistoryListItem[] = [{
        id: '1',
        game: '',
        platform: '',
        startTime: 1000,
        endTime: 3000,
        dateRange: [new Date(1000), new Date(3000)],
        locked: false
      }, {
        id: '2',
        game: '',
        platform: '',
        startTime: 1000,
        endTime: 2000,
        dateRange: [new Date(1000), new Date(2000)],
        locked: false
      }];
      const result = getElapsedTimeFrom(items);
      expect(result).toBe(3);
    });
  });

  describe('getHistoryListItemMap', () => {
    it('Should return empty when there are no groupings', () => {
      const result = getHistoryListItemMap([]);
      expect(result).toEqual(new Map<string, HistoryListItem>());
    });

    it('Should return correct map when there are groupings', () => {
      const expected: HistoryListItemMap = new Map<string, HistoryListItem>();
      expected.set('4', {
        id: '4',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 8000,
        endTime: 9000,
        dateRange: [new Date(8000), new Date(9000)],
        locked: false
      });
      expected.set('3', {
        id: '3',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 5000,
        endTime: 6000,
        dateRange: [new Date(5000), new Date(6000)],
        locked: false
      });
      expected.set('2', {
        id: '2',
        game: history.testGame,
        platform: 'Platform 1',
        startTime: 3000,
        endTime: 4000,
        dateRange: [new Date(3000), new Date(4000)],
        locked: false
      });
      expected.set('1', {
        id: '1',
        game: history.testGame,
        platform: 'Platform 2',
        startTime: 1000,
        endTime: 2000,
        dateRange: [new Date(1000), new Date(2000)],
        locked: false
      });
      const result = getHistoryListItemMap(history.testGroupings);
      expect(result).toEqual(expected);
    });
  });
});
