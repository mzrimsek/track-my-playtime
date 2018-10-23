import { MetaReducer } from '@ngrx/store';

import { clearState } from './clear.meta.reducer';

export const metaReducers: MetaReducer<any>[] = [clearState];
