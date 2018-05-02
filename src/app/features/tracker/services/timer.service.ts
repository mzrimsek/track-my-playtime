import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { TimerInfo } from '../models';

@Injectable()
export class TimerService {

  private timerCollection: AngularFirestoreCollection<FirestoreTimerItem>;
  constructor(private afs: AngularFirestore) {
    this.timerCollection = this.afs.collection<FirestoreTimerItem>('timer');
  }

  setTimer(userId: string, info: TimerInfo) {
    this.timerCollection.doc(userId).set({
      game: info.game,
      platform: info.platform,
      startTime: info.startTime
    });
  }

  setGame(userId: string, game: string) {
    this.timerCollection.doc(userId).set({ game }, { merge: true });
  }

  setPlatform(userId: string, platform: string) {
    this.timerCollection.doc(userId).set({ platform }, { merge: true });
  }

  setStartTime(userId: string, startTime: number) {
    this.timerCollection.doc(userId).set({ startTime }, { merge: true });
  }

  resetTimer(userId: string) {
    this.timerCollection.doc(userId).set({
      game: '',
      platform: '',
      startTime: 0
    });
  }

  getTimerInfo(userId: string): Observable<TimerInfo> {
    const timerDoc = this.timerCollection.doc<FirestoreTimerItem>(userId).valueChanges().first();
    return timerDoc.map(timer => <TimerInfo>{
      ...timer
    });
  }
}

export interface FirestoreTimerItem {
  game: string;
  platform: string;
  startTime: number;
}
