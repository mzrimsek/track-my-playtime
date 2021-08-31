import { createEntityAdapter, createSlice, EntityState } from '@reduxjs/toolkit';
import { HistoryEntity } from 'models';

export interface HistoryState extends EntityState<HistoryEntity> {
  loading: boolean;
}

const adapter = createEntityAdapter<HistoryEntity>();
const initialState: HistoryState = adapter.getInitialState({ loading: false });

export const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addHistoryItem: adapter.addOne
  }
});
