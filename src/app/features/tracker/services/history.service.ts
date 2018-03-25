import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AddTimerInfo, HistoryListItem, History } from '../models';
import { Guid } from '../../../shared/guid.utils';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {

  private historyCollection: AngularFirestoreCollection<History>;
  constructor(private afs: AngularFirestore) {
    this.historyCollection = this.afs.collection<History>('history');
  }

  getHistoryList(): Observable<HistoryListItem[]> {
    return this.historyCollection.valueChanges()
      .map(histories => histories
        .map(history => this.getHistoryListItemFromHistory(history)));
  }

  saveTimerInfo(info: AddTimerInfo): Observable<HistoryListItem> {
    const newItem = this.getNewHistoryListItem(info);
    this.historyCollection.add(newItem);
    return Observable.of(this.getHistoryListItemFromHistory(newItem));
  }

  private getNewHistoryListItem(info: AddTimerInfo): History {
    const id = Guid.newGuid();
    return <History>{
      id,
      ...info
    };
  }

  private getHistoryListItemFromHistory(history: History): HistoryListItem {
    return <HistoryListItem>{
      id: history.id,
      game: history.game,
      platform: history.platform,
      startTime: history.startTime,
      endTime: history.endTime
    };
  }
}
