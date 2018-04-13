import { HistoryListItem } from '../models';

import { getHistoryGroupingList, getHistoryListItemsMap } from './history.utils';

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
        getHistoryListItem(game),
        getHistoryListItem(game),
        getHistoryListItem(game)
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
        getHistoryListItem(game1),
        getHistoryListItem(game1),
        getHistoryListItem(game2)
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
        getHistoryListItem(game),
        getHistoryListItem(game + '2')
      ];
      const map = getHistoryListItemsMap(items, item => item.game);

      const result = getHistoryGroupingList(map);

      expect(result.length).toBe(2);
    });

    describe('Builds each history grouping correctly', () => {
      it('Should set the key', () => {
        const game = 'Awesome Game';
        const items = [
          getHistoryListItem(game)
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].key).toBe(game);
      });

      it('Should set the total time', () => {
        const game = 'Awesome Game';
        const now = new Date().getTime();
        const items = [
          getHistoryListItem(game, now, now + (30 * 1000)),
          getHistoryListItem(game, now, now + (60 * 1000))
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].totalTime).toBe(90);
      });

      it('Should set the history items', () => {
        const game = 'Awesome Game';
        const items = [
          getHistoryListItem(game),
          getHistoryListItem(game)
        ];
        const map = getHistoryListItemsMap(items, item => item.game);

        const result = getHistoryGroupingList(map);

        expect(result[0].historyItems).toEqual(items);
      });
    });
  });
});

const getHistoryListItem = (game: string, startTime: number = 0, endTime: number = 0): HistoryListItem => {
  return <HistoryListItem>{
    id: 'totally a unique id',
    game,
    platform: 'the best platform ever',
    startTime,
    endTime,
    dateRange: []
  };
};
