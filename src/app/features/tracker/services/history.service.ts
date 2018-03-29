import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { HistoryEntity } from '../reducers/history.reducer';

import { AddTimerInfo } from '../models';

import { getUUID } from '../../../shared/utils/uuid.utils';

@Injectable()
export class HistoryService {

  private historyCollection: AngularFirestoreCollection<HistoryCollection>;
  constructor(private afs: AngularFirestore) {
    this.historyCollection = this.afs.collection<HistoryCollection>('history');
  }

  getHistoryList(userId: string): Observable<HistoryEntity[]> {
    const historyList = this.getUserItemCollection(userId).valueChanges();
    return historyList.map(histories => histories
      .map(history => this.getHistoryEntity(history)));
  }

  saveTimerInfo(info: AddTimerInfo): Observable<HistoryEntity> {
    const newItem = this.getNewHistoryItem(info);
    this.getUserItemCollection(info.userId).doc(newItem.id).set(newItem);
    return Observable.of(this.getHistoryEntity(newItem));
  }

  deleteHistoryItem(userId: string, itemId: string): Observable<string> {
    this.getUserItemCollection(userId).doc(itemId).delete();
    return Observable.of(itemId);
  }

  updateGame(userId: string, itemId: string, game: string): Observable<UpdateProperty> {
    this.getUserItemCollection(userId).doc(itemId).update({ game });
    return Observable.of(<UpdateProperty>{
      itemId,
      prop: game
    });
  }

  updatePlatform(userId: string, itemId: string, platform: string): Observable<UpdateProperty> {
    this.getUserItemCollection(userId).doc(itemId).update({ platform });
    return Observable.of(<UpdateProperty>{
      itemId,
      prop: platform
    });
  }

  updateElapsedTime(userId: string, itemId: string, startTime: number, endTime: number): Observable<UpdateMultiProperty> {
    this.getUserItemCollection(userId).doc(itemId).update({ startTime, endTime });
    return Observable.of(<UpdateMultiProperty>{
      itemId,
      props: {
        startTime,
        endTime
      }
    });
  }

  private getNewHistoryItem(info: AddTimerInfo): FirestoreHistoryItem {
    const id = getUUID(info.userId);
    return <FirestoreHistoryItem>{
      id,
      game: info.game,
      platform: info.platform,
      startTime: info.startTime,
      endTime: info.endTime,
      source: 'web'
    };
  }

  private getUserItemCollection(userId: string): AngularFirestoreCollection<FirestoreHistoryItem> {
    return this.historyCollection.doc(userId).collection('items');
  }

  private getHistoryEntity(history: FirestoreHistoryItem): HistoryEntity {
    return <HistoryEntity>{
      id: history.id,
      game: history.game,
      platform: history.platform,
      startTime: history.startTime,
      endTime: history.endTime
    };
  }
}

interface FirestoreHistoryItem {
  id: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
  source: string;
}

interface HistoryCollection {
  items: FirestoreHistoryItem[];
}

interface UpdateProperty {
  itemId: string;
  prop: string;
}

interface UpdateMultiProperty {
  itemId: string;
  props: {
    [key: string]: number;
  };
}
