import { Action } from '@ngrx/store';

export const GET_USER = '[Auth] Get User';
export class GetUser implements Action {
  readonly type = GET_USER;
  constructor(public payload?: any) { }
}

export const AUTHENTICATED = '[Auth] Authenticated';
export class Authenticated implements Action {
  readonly type = AUTHENTICATED;
  constructor(public payload?: any) { }
}

export const NOT_AUTHENTICATED = '[Auth] Not Authenticated';
export class NotAuthenticated implements Action {
  readonly type = NOT_AUTHENTICATED;
  constructor(public payload?: any) { }
}

export const GOOGLE_LOGIN = '[Auth] Google Login Attempt';
export class GoogleLogin implements Action {
  readonly type = GOOGLE_LOGIN;
  constructor(public payload?: any) { }
}

export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor(public payload?: any) { }
}

export type All = GetUser |
  Authenticated |
  NotAuthenticated |
  GoogleLogin |
  Logout;
