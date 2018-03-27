import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import { AddTimerInfo, HistoryListItem } from '../models';
import { Guid } from '../../../shared/guid.utils';
import 'rxjs/add/observable/of';
import 'rxjs/add/operator/map';

@Injectable()
export class HistoryService {

  private historyCollection: AngularFirestoreCollection<HistoryCollection>;
  constructor(private afs: AngularFirestore) {
    this.historyCollection = this.afs.collection<HistoryCollection>('history');
  }

  getHistoryList(): Observable<HistoryListItem[]> {
    // return this.historyCollection.valueChanges()
    // .map(histories => histories
    // .map(history => this.getHistoryListItemFromHistory(history)));
  }

  saveTimerInfo(info: AddTimerInfo): Observable<HistoryListItem> {
    const newItem = this.getNewHistory(info);
    this.getUserItemCollection(info.userId).add(newItem);
    return Observable.of(this.getHistoryListItem(newItem));
  }

  private getNewHistory(info: AddTimerInfo): History {
    const id = Guid.newGuid();
    return <History>{
      id,
      game: info.game,
      platform: info.platform,
      startTime: info.startTime,
      endTime: info.endTime
    };
  }

  private getUserItemCollection(userId: string): AngularFirestoreCollection<HistoryListItem> {
    return this.historyCollection.doc(userId).collection('items');
  }

  private getHistoryListItem(history: History): HistoryListItem {
    return <HistoryListItem>{
      ...history
    };
  }

interface History {
  id: string;
  game: string;
  platform: string;
  startTime: number;
  endTime: number;
}

interface HistoryCollection {
  items: History[];
}
