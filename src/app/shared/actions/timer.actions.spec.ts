import { HistoryEntity } from 'shared/reducers/history.reducer';

import { AddTimerInfo, TimerInfo } from 'shared/models';

import * as actions from './timer.actions';

describe('Timer Actions', () => {
  describe('ResetTimer', () => {
    it('Should have correct type', () => {
      const action = new actions.ResetTimer();
      expect(action.type).toBe(actions.RESET_TIMER);
    });
  });

  describe('SetGame', () => {
    it('Should have correct type', () => {
      const action = new actions.SetGame('');
      expect(action.type).toBe(actions.SET_GAME);
    });

    it('Should have correct game', () => {
      const game = 'some game';
      const action = new actions.SetGame(game);

      expect(action.game).toBe(game);
    });
  });

  describe('SetPlatform', () => {
    it('Should have correct type', () => {
      const action = new actions.SetPlatform('');
      expect(action.type).toBe(actions.SET_PLATFORM);
    });

    it('Should have correct platform', () => {
      const platform = 'some platform';
      const action = new actions.SetPlatform(platform);

      expect(action.platform).toBe(platform);
    });
  });

  describe('SetStartTime', () => {
    it('Should have correct type', () => {
      const action = new actions.SetStartTime(0);
      expect(action.type).toBe(actions.SET_START_TIME);
    });

    it('Should have correct startTime', () => {
      const startTime = 3000;
      const action = new actions.SetStartTime(startTime);

      expect(action.startTime).toBe(startTime);
    });
  });

  describe('SaveTimerInfo', () => {
    it('Should have correct type', () => {
      const action = new actions.SaveTimerInfo({
        userId: '',
        game: '',
        platform: '',
        startTime: 0,
        endTime: 0
      });
      expect(action.type).toBe(actions.SAVE_TIMER_INFO);
    });

    it('Should have correct info', () => {
      const info: AddTimerInfo = {
        userId: 'some user id',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000
      };
      const action = new actions.SaveTimerInfo(info);

      expect(action.info).toEqual(info);
    });
  });

  describe('SaveTimerInfoSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.SaveTimerInfoSucceeded({
        id: '',
        game: '',
        platform: '',
        startTime: 0,
        endTime: 0
      });
      expect(action.type).toBe(actions.SAVE_TIMER_INFO_SUCCEEDED);
    });

    it('Should have correct item', () => {
      const item: HistoryEntity = {
        id: 'some id',
        game: 'some game',
        platform: 'some platform',
        startTime: 3000,
        endTime: 6000
      };
      const action = new actions.SaveTimerInfoSucceeded(item);

      expect(action.item).toEqual(item);
    });
  });

  describe('CancelTimer', () => {
    it('Should have correct type', () => {
      const action = new actions.CancelTimer();
      expect(action.type).toBe(actions.CANCEL_TIMER);
    });
  });

  describe('LoadTimerInfo', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadTimerInfo('');
      expect(action.type).toBe(actions.LOAD_TIMER_INFO);
    });

    it('Should have correct userId', () => {
      const userId = 'some user id';
      const action = new actions.LoadTimerInfo(userId);

      expect(action.userId).toBe(userId);
    });
  });

  describe('SetTimerInfo', () => {
    it('Should have correct type', () => {
      const action = new actions.SetTimerInfo({
        game: '',
        platform: '',
        startTime: 0
      });
      expect(action.type).toBe(actions.SET_TIMER_INFO);
    });

    it('Should have correct info', () => {
      const info: TimerInfo = {
        game: 'some game',
        platform: 'some platform',
        startTime: 3000
      };
      const action = new actions.SetTimerInfo(info);

      expect(action.info).toEqual(info);
    });
  });
});
