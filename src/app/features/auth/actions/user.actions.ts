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

export const FACEBOOK_LOGIN = '[Auth] Facebook Login Attempt';
export class FacebookLogin implements Action {
  readonly type = FACEBOOK_LOGIN;
  constructor() { }
}

export const TWITTER_LOGIN = '[Auth] Twitter Login Attempt';
export class TwitterLogin implements Action {
  readonly type = TWITTER_LOGIN;
  constructor() { }
}

export const LOGOUT = '[Auth] Logout';
export class Logout implements Action {
  readonly type = LOGOUT;
  constructor() { }
}

export const SIGNUP = '[Auth] Signup';
export class SignUp implements Action {
  readonly type = SIGNUP;
  constructor(public email: string, public password: string) { }
}

export const EMAIL_LOGIN = '[Auth] Email Login Attempt';
export class EmailLogin implements Action {
  readonly type = EMAIL_LOGIN;
  constructor(public email: string, public password: string) { }
}

export const RESET_PASSWORD = '[Auth] Reset Password';
export class ResetPassword implements Action {
  readonly type = RESET_PASSWORD;
  constructor(public email: string) { }
}

export type All = GetUser |
  Authenticated |
  NotAuthenticated |
  GoogleLogin |
  FacebookLogin |
  TwitterLogin |
  Logout |
  SignUp |
  EmailLogin |
  ResetPassword;
