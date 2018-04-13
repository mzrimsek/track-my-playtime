import { Action } from '@ngrx/store';

import { User } from '../models';

export const GET_USER = '[Auth] Get User';
export class GetUser implements Action {
  readonly type = GET_USER;
  constructor() { }
}

export const AUTHENTICATED = '[Auth] Authenticated';
export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public user: User) { }
}

export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';
export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor() { }
}

export const GOOGLE_LOGIN = '[Auth] Google Login Attempt';
export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor() { }
}

export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() { }
}

export type All = GetUser |
  Authenticated |
  NotAuthenticated |
  GoogleLogin |
  Logout;
