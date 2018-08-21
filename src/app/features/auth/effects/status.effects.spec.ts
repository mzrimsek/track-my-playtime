import { TestBed } from '@angular/core/testing';

import { provideMockActions } from '@ngrx/effects/testing';

import { StatusEffects } from './status.effects';

import * as appActions from '../../../actions/app.actions';
import * as statusActions from '../actions/status.actions';
import * as userActions from '../actions/user.actions';

import '../../../rxjs-operators';

describe('Status Effects', () => {
  let actions: any;
  let effects: StatusEffects;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        StatusEffects,
        provideMockActions(() => actions)
      ]
    });

    effects = TestBed.get(StatusEffects);
  });

  it('Should be created', () => {
    expect(effects).toBeTruthy();
  });
});
