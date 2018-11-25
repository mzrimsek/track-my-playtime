import * as actions from './progress.actions';

describe('Progress Actions', () => {
  describe('AddNewProgressItem', () => {
    it('Should have correct type', () => {
      const action = new actions.AddNewProgressItem({
        id: '',
        startEntryId: '',
        endEntryId: '',
        notes: ''
      });
      expect(action.type).toBe(actions.ADD_NEW_PROGRESS_ITEM);
    });

    it('Should have correct data', () => {
      const action = new actions.AddNewProgressItem({
        id: 'some id',
        startEntryId: 'some entry id',
        endEntryId: '',
        notes: ''
      });
      expect(action.item).toEqual({
        id: 'some id',
        startEntryId: 'some entry id',
        endEntryId: '',
        notes: ''
      });
    });
  });

  describe('LoadProgressItems', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadProgressItems('');
      expect(action.type).toBe(actions.LOAD_PROGRESS_ITEMS);
    });

    it('Should have correct userId', () => {
      const action = new actions.LoadProgressItems('some id');
      expect(action.userId).toBe('some id');
    });
  });

  describe('LoadProgressItemsSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.LoadProgressItemsSucceeded([]);
      expect(action.type).toBe(actions.LOAD_PROGRESS_ITEMS_SUCCEEDED);
    });

    it('Should have correct items', () => {
      const action = new actions.LoadProgressItemsSucceeded([{
        id: '1',
        startEntryId: 'a',
        endEntryId: 'b',
        notes: 'new game plus'
      }]);
      expect(action.items).toEqual([{
        id: '1',
        startEntryId: 'a',
        endEntryId: 'b',
        notes: 'new game plus'
      }]);
    });
  });

  describe('RemoveProgressItem', () => {
    it('Should have correct type', () => {
      const action = new actions.RemoveProgressItem('', '');
      expect(action.type).toBe(actions.REMOVE_PROGRESS_ITEM);
    });

    it('Should have correct userId', () => {
      const action = new actions.RemoveProgressItem('some user id', '');
      expect(action.userId).toBe('some user id');
    });

    it('Should have correct itemId', () => {
      const action = new actions.RemoveProgressItem('', 'some item id');
      expect(action.itemId).toBe('some item id');
    });
  });

  describe('RemoveProgressItemSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.RemoveProgressItemSucceeded('');
      expect(action.type).toBe(actions.REMOVE_PROGRESS_ITEM_SUCCEEDED);
    });

    it('Should have correct itemId', () => {
      const action = new actions.RemoveProgressItemSucceeded('some item id');
      expect(action.itemId).toBe('some item id');
    });
  });

  describe('MarkComplete', () => {
    it('Should have correct type', () => {
      const action = new actions.MarkComplete('some user id', {
        itemId: 'some item id',
        endEntryId: 'some end id'
      });
      expect(action.type).toBe(actions.MARK_COMPLETE);
    });

    it('Should have correct userId', () => {
      const action = new actions.MarkComplete('some user id', {
        itemId: 'some item id',
        endEntryId: 'some end id'
      });
      expect(action.userId).toBe('some user id');
    });

    it('Should have correct payload', () => {
      const action = new actions.MarkComplete('some user id', {
        itemId: 'some item id',
        endEntryId: 'some end id'
      });
      expect(action.payload).toEqual({
        itemId: 'some item id',
        endEntryId: 'some end id'
      });
    });
  });

  describe('MarkCompleteSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.MarkCompleteSucceeded({
        itemId: 'some item id',
        endEntryId: 'some end id'
      });
      expect(action.type).toBe(actions.MARK_COMPLETE_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const action = new actions.MarkCompleteSucceeded({
        itemId: 'some item id',
        endEntryId: 'some end id'
      });
      expect(action.payload).toEqual({
        itemId: 'some item id',
        endEntryId: 'some end id'
      });
    });
  });

  describe('SetNotes', () => {
    it('Should have correct type', () => {
      const action = new actions.SetNotes('some user id', {
        itemId: 'some item id',
        notes: 'some notes'
      });
      expect(action.type).toBe(actions.SET_NOTES);
    });

    it('Should have correct userId', () => {
      const action = new actions.SetNotes('some user id', {
        itemId: 'some item id',
        notes: 'set notes'
      });
      expect(action.userId).toBe('some user id');
    });

    it('Should have correct payload', () => {
      const action = new actions.SetNotes('some user id', {
        itemId: 'some item id',
        notes: 'some notes'
      });
      expect(action.payload).toEqual({
        itemId: 'some item id',
        notes: 'some notes'
      });
    });
  });

  describe('SetNotesSucceeded', () => {
    it('Should have correct type', () => {
      const action = new actions.SetNotesSucceeded({
        itemId: 'some item id',
        notes: 'some notes'
      });
      expect(action.type).toBe(actions.SET_NOTES_SUCCEEDED);
    });

    it('Should have correct payload', () => {
      const action = new actions.SetNotesSucceeded({
        itemId: 'some item id',
        notes: 'some notes'
      });
      expect(action.payload).toEqual({
        itemId: 'some item id',
        notes: 'some notes'
      });
    });
  });
});
