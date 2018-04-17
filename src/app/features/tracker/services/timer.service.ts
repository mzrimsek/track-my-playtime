import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';

@Injectable()
export class TimerService {

  private timerCollection: AngularFirestoreCollection<FirestoreTimerItem>;
  constructor(private afs: AngularFirestore) {
    this.timerCollection = this.afs.collection<FirestoreTimerItem>('timer');
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
}

interface FirestoreTimerItem {
  game: string;
  platform: string;
  startTime: number;
}
