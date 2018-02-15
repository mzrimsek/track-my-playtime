import { Action } from '@ngrx/store';
import { EntityState, EntityAdapter, createEntityAdapter } from '@ngrx/entity';

export interface History {
  id: string;
  game: string;
  platform: string;
  startDate: Date;
  endDate: Date;
}

export interface State extends EntityState<History> { }

export const adapter: EntityAdapter<History> = createEntityAdapter<History>();
const initialState: State = adapter.getInitialState();

export function reducer(state: State = initialState, action: Action): State {
  switch (action.type) {
    default: {
      return state;
    }
  }
}
