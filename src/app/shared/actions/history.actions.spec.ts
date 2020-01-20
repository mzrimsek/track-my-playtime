import { HistoryEntity } from 'shared/reducers/history.reducer';

import {
    UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload, UpdateHistoryItemTimesPayload
} from 'shared/models';

import * as actions from './history.actions';

describe('History Actions', () => {
  describe('AddNewHistoryItem', () => {
    it('Should have correct type', () => {
      const action = new actions.AddNewHistoryItem({
        id: '',
        game: '',
        platform: '',
        startTime: 0,
        endTime: 0
      });
      expect(action.type).toBe(actions.ADD_NEW_HISTORY_ITEM);
    });

    it('Should have correct item', () => {
      const item: HistoryEntity = {
        id: 'some id',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000
      };
      const action = new actions.AddNewHistoryItem(item);

      expect(action.item).toBe(item);
    });
  });

  describe('LoadHistoryItems', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadHistoryItems('');
      expect(action.type).toBe(actions.LOAD_HISTORY_ITEMS);
    });

    it('Should have correct userId', () => {
      const userId = 'some user id';
      const action = new actions.LoadHistoryItems(userId);

      expect(action.userId).toBe(userId);
    });
  });

  describe('LoadHistoryItemsSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadHistoryItemsSucceeded([]);
      expect(action.type).toBe(actions.LOAD_HISTORY_ITEMS_SUCCEEDED);
    });

    it('Should have correct items', () => {
      const items: HistoryEntity[] = [{
        id: 'some id',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000
      },
      {
        id: 'some id 2',
        game: 'some other game',
        platform: 'some other platform',
        startTime: 2000,
        endTime: 8000
      }];
      const action = new actions.LoadHistoryItemsSucceeded(items);

      expect(action.items).toEqual(items);
    });
  });

  describe('RemoveHistoryItem', () => {
    it('Should have correct type', () => {
      const action = new actions.RemoveHistoryItem('', '');
      expect(action.type).toBe(actions.REMOVE_HISTORY_ITEM);
    });

    it('Should have correct userId', () => {
      const userId = 'some user id';
      const action = new actions.RemoveHistoryItem(userId, '');

      expect(action.userId).toBe(userId);
    });

    it('Should have correct itemId', () => {
      const itemId = 'some itemId id';
      const action = new actions.RemoveHistoryItem('', itemId);

      expect(action.itemId).toBe(itemId);
    });
  });

  describe('RemoveHistoryItemSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.RemoveHistoryItemSucceeded('');
      expect(action.type).toBe(actions.REMOVE_HISTORY_ITEM_SUCCEEDED);
    });

    it('Should have correct itemId', () => {
      const itemId = 'some item id';
      const action = new actions.RemoveHistoryItemSucceeded(itemId);

      expect(action.itemId).toBe(itemId);
    });
  });

  describe('UpdateGame', () => {
    it('Should have correct type', () => {
      const action = new actions.UpdateGame('', {
        itemId: '',
        game: ''
      });
      expect(action.type).toBe(actions.UPDATE_GAME);
    });

    it('Should have correct userId', () => {
      const userId = 'some user id';
      const action = new actions.UpdateGame(userId, {
        itemId: '',
        game: ''
      });

      expect(action.userId).toBe(userId);
    });

    it('Should have correct payload', () => {
      const payload: UpdateHistoryItemGamePayload = {
        itemId: 'some item id',
        game: 'some game'
      };
      const action = new actions.UpdateGame('', payload);

      expect(action.payload).toEqual(payload);
    });
  });

  describe('UpdateGameSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.UpdateGameSucceeded({
        itemId: '',
        game: ''
      });
      expect(action.type).toBe(actions.UPDATE_GAME_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const payload: UpdateHistoryItemGamePayload = {
        itemId: 'some item id',
        game: 'some game'
      };
      const action = new actions.UpdateGameSucceeded(payload);

      expect(action.payload).toEqual(payload);
    });
  });

  describe('UpdatePlatform', () => {
    it('Should have correct type', () => {
      const action = new actions.UpdatePlatform('', {
        itemId: '',
        platform: ''
      });
      expect(action.type).toBe(actions.UPDATE_PLATFORM);
    });

    it('Should have correct userId', () => {
      const userId = 'some user id';
      const action = new actions.UpdatePlatform(userId, {
        itemId: '',
        platform: ''
      });

      expect(action.userId).toBe(userId);
    });

    it('Should have correct payload', () => {
      const payload: UpdateHistoryItemPlatformPayload = {
        itemId: 'some item id',
        platform: 'some platform'
      };
      const action = new actions.UpdatePlatform('', payload);

      expect(action.payload).toEqual(payload);
    });
  });

  describe('UpdatePlatformSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.UpdatePlatformSucceeded({
        itemId: '',
        platform: ''
      });
      expect(action.type).toBe(actions.UPDATE_PLATFORM_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const payload: UpdateHistoryItemPlatformPayload = {
        itemId: 'some item id',
        platform: 'some platform'
      };
      const action = new actions.UpdatePlatformSucceeded(payload);

      expect(action.payload).toEqual(payload);
    });
  });

  describe('UpdateElapsedTime', () => {
    it('Should have correct type', () => {
      const action = new actions.UpdateElapsedTime('', {
        itemId: '',
        startTime: 0,
        endTime: 0
      });
      expect(action.type).toBe(actions.UPDATE_ELAPSED_TIME);
    });

    it('Should have correct userId', () => {
      const userId = 'some user id';
      const action = new actions.UpdateElapsedTime(userId, {
        itemId: '',
        startTime: 0,
        endTime: 0
      });

      expect(action.userId).toBe(userId);
    });

    it('Should have correct payload', () => {
      const payload: UpdateHistoryItemTimesPayload = {
        itemId: 'some item id',
        startTime: 2000,
        endTime: 5000
      };
      const action = new actions.UpdateElapsedTime('', payload);

      expect(action.payload).toEqual(payload);
    });
  });

  describe('UpdateElapsedTimeSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.UpdateElapsedTimeSucceeded({
        itemId: '',
        startTime: 0,
        endTime: 0
      });
      expect(action.type).toBe(actions.UPDATE_ELAPSED_TIME_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const payload: UpdateHistoryItemTimesPayload = {
        itemId: 'some item id',
        startTime: 2000,
        endTime: 5000
      };
      const action = new actions.UpdateElapsedTimeSucceeded(payload);

      expect(action.payload).toEqual(payload);
    });
  });
});
