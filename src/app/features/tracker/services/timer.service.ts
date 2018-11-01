import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { first, map } from 'rxjs/operators';

import { TimerInfo } from '../../../shared/models';

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
    const timerDoc = this.timerCollection.doc<FirestoreTimerItem>(userId).valueChanges().pipe(first());
    return timerDoc.pipe(map(timer => <TimerInfo>{
      ...timer
    }));
  }

  getNowTime(): number {
    return new Date().getTime();
  }
}

export interface FirestoreTimerItem {
  game: string;
  platform: string;
  startTime: number;
}
