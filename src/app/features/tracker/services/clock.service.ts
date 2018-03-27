import { Injectable } from '@angular/core';

import { Observable } from 'rxjs/Observable';

@Injectable()
export class ClockService {

  private currentTime$: Observable<number>;
  constructor() {
    this.currentTime$ = Observable.interval(1000).map(() => new Date().getTime()).share();
  }

  getCurrentTime(): Observable<number> {
    return this.currentTime$;
  }
}
