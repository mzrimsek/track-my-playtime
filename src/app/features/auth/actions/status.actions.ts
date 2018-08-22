import { Action } from '@ngrx/store';

export const SET_ATTEMPTING_LOGIN = '[Status] Set Attempting Login';
export class SetAttemptingLogin implements Action {
  readonly type = SET_ATTEMPTING_LOGIN;
  constructor(public attemptingLogin: boolean) { }
}

export const SET_VALIDATION_MESSAGE = '[Status] Set Validation Message';
export class SetValidationMessage implements Action {
  readonly type = SET_VALIDATION_MESSAGE;
  constructor(public validationMessage: string) { }
}

export type All = SetAttemptingLogin | SetValidationMessage;
