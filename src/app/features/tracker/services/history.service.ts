import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { AddTimerInfo, HistoryListItem } from '../models';

import { getUUID } from '../../../shared/utils/uuid.utils';

@Injectable()
export class HistoryService {

  private historyCollection: AngularFirestoreCollection<HistoryCollection>;
  constructor(private afs: AngularFirestore) {
    this.historyCollection = this.afs.collection<HistoryCollection>('history');
  }

  getHistoryList(userId: string): Observable<HistoryListItem[]> {
    const historyList = this.getUserItemCollection(userId).valueChanges();
    return historyList.map(histories => histories
      .map(history => this.getHistoryListItem(history)));
  }

  saveTimerInfo(info: AddTimerInfo): Observable<HistoryListItem> {
    const newItem = this.getNewHistory(info);
    this.getUserItemCollection(info.userId).doc(newItem.id).set(newItem);
    return Observable.of(this.getHistoryListItem(newItem));
  }

  deleteHistoryItem(userId: string, itemId: string): Observable<string> {
    this.getUserItemCollection(userId).doc(itemId).delete();
    return Observable.of(itemId);
  }

  updateGame(userId: string, itemId: string, game: string): Observable<UpdateProperty> {
    this.getUserItemCollection(userId).doc(itemId).update({ game });
    return Observable.of(<UpdateProperty>{
      itemId,
      property: game
    });
  }

  updatePlatform(userId: string, itemId: string, platform: string): Observable<UpdateProperty> {
    this.getUserItemCollection(userId).doc(itemId).update({ platform });
    return Observable.of(<UpdateProperty>{
      itemId,
      property: platform
    });
  }

  private getNewHistory(info: AddTimerInfo): History {
    const id = getUUID(info.userId);
    return <History>{
      id,
      game: info.game,
      platform: info.platform,
      startTime: info.startTime,
      endTime: info.endTime,
      source: 'web'
    };
  }

  private getUserItemCollection(userId: string): AngularFirestoreCollection<History> {
    return this.historyCollection.doc(userId).collection('items');
  }

  private getHistoryListItem(history: History): HistoryListItem {
    return <HistoryListItem>{
      id: history.id,
      game: history.game,
      platform: history.platform,
      startTime: history.startTime,
      endTime: history.endTime
    };
  }
}

interface History {
  id: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
  source: string;
}

interface HistoryCollection {
  items: History[];
}

interface UpdateProperty {
  itemId: string;
  property: string | number;
}
