import * as actions from './mark-complete.actions';

describe('Mark Complete Actions', () => {
  describe('SetShowExtra', () => {
    it('Should have correct type', () => {
      const action = new actions.SetShowExtra('', false);
      expect(action.type).toBe(actions.SET_SHOW_EXTRA);
    });

    it('Should have correct itemId', () => {
      const action = new actions.SetShowExtra('some item id', false);
      expect(action.itemId).toBe('some item id');
    });

    it('Should have correct showExtra', () => {
      const action = new actions.SetShowExtra('', true);
      expect(action.showExtra).toBe(true);
    });
  });

  describe('SetEndTime', () => {
    it('Should have correct type', () => {
      const action = new actions.SetEndTime('', 0);
      expect(action.type).toBe(actions.SET_ENDTIME);
    });

    it('Should have correct itemId', () => {
      const action = new actions.SetEndTime('some item id', 0);
      expect(action.itemId).toBe('some item id');
    });

    it('Should have correct endTime', () => {
      const action = new actions.SetEndTime('', 1234);
      expect(action.endTime).toBe(1234);
    });
  });

  describe('Remove', () => {
    it('Should have correct type', () => {
      const action = new actions.Remove('');
      expect(action.type).toBe(actions.REMOVE);
    });

    it('Should have correct itemId', () => {
      const action = new actions.Remove('some item id');
      expect(action.itemId).toBe('some item id');
    });
  });

  describe('LoadItems', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadItems([]);
      expect(action.type).toBe(actions.LOAD_ITEMS);
    });

    it('Should have correct itemIds', () => {
      const action = new actions.LoadItems(['some item id', 'some other item id']);
      expect(action.itemIds).toEqual(['some item id', 'some other item id']);
    });
  });

  describe('AddNewItem', () => {
    it('Should have correct type', () => {
      const action = new actions.AddNewItem('some new item id');
      expect(action.type).toBe(actions.ADD_NEW_ITEM);
    });

    it('Should have correct itemId', () => {
      const action = new actions.AddNewItem('some new item id');
      expect(action.itemId).toBe('some new item id');
    });
  });
});
