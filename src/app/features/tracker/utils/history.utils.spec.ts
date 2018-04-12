import { HistoryListItem } from '../models';

import { getHistoryListItemsMap } from './history.utils';

describe('History Utils', () => {
  describe('getHistoryListItemsMap', () => {
    it('Can map an empty list', () => {
      const items: HistoryListItem[] = [];
      const result = getHistoryListItemsMap(items, item => item.game);
      expect(result.size).toBe(0);
    });

    it('Can map a list of items with different keys', () => {
      const items: HistoryListItem[] = [
        getHistoryListItem('Awesome Game'),
        getHistoryListItem('Awesome Game'),
        getHistoryListItem('Awesome Game 2')
      ];

      const result = getHistoryListItemsMap(items, item => item.game);

      expect(result.size).toBe(2);
      result.forEach((value: HistoryListItem[], key: string) => {
        const allMatchKey = value.every(item => item.game === key);
        expect(allMatchKey).toBe(true);
      });
    });

    it('Can map a list of items with same key', () => {
      const game = 'Awesome Game';
      const items: HistoryListItem[] = [
        getHistoryListItem(game),
        getHistoryListItem(game),
        getHistoryListItem(game)
      ];

      const result = getHistoryListItemsMap(items, item => item.game);

      expect(result.size).toBe(1);
      result.forEach((value: HistoryListItem[], key: string) => {
        const allMatchKey = value.every(item => item.game === key);
        expect(allMatchKey).toBe(true);
      });
    });

    xit('Tests will not pass without this', () => {
      // I have no idea what is going on...
    });
  });
});

const getHistoryListItem = (game: string): HistoryListItem => {
  return <HistoryListItem>{
    id: 'totally a unique id',
    game,
    platform: 'the best platform ever',
    startTime: 0,
    endTime: 0,
    dateRange: []
  };
};
