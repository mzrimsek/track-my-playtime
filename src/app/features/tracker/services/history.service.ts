import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { UserService } from '../../auth/services/user.service';

import { AddTimerInfo, HistoryListItem } from '../models';

import { environment } from '../../../../environments/environment';

import uuidv5 = require('uuid/v5');

@Injectable()
export class HistoryService {

  private historyCollection: AngularFirestoreCollection<HistoryCollection>;
  constructor(private afs: AngularFirestore, private userService: UserService) {
    this.historyCollection = this.afs.collection<HistoryCollection>('history');
  }

  getHistoryList(): Observable<HistoryListItem[]> {
    const historyList = this.userService.getUser()
      .switchMap(user =>
        this.getUserItemCollection(user.uid).valueChanges());
    return historyList.map(histories => histories
      .map(history => this.getHistoryListItem(history)));
  }

  saveTimerInfo(info: AddTimerInfo): Observable<HistoryListItem> {
    const newItem = this.getNewHistory(info);
    this.getUserItemCollection(info.userId).doc(newItem.id).set(newItem);
    return Observable.of(this.getHistoryListItem(newItem));
  }

  deleteHistoryItem(itemId: string): Observable<string> {
    this.userService.getUser()
      .switchMap(user =>
        this.getUserItemCollection(user.uid).doc(itemId).delete());
    return Observable.of(itemId);
  }

  updateHistoryItem(item: HistoryListItem): void {
    const history = this.getHistory(item);
    this.userService.getUser()
      .switchMap(user =>
        this.getUserItemCollection(user.uid).doc(history.id).update(history));
  }

  private getNewHistory(info: AddTimerInfo): History {
    const id = uuidv5(environment.domain, uuidv5.URL);
    return <History>{
      id,
      game: info.game,
      platform: info.platform,
      startTime: info.startTime,
      endTime: info.endTime
    };
  }

  private getUserItemCollection(userId: string): AngularFirestoreCollection<History> {
    return this.historyCollection.doc(userId).collection('items');
  }

  private getHistoryListItem(history: History): HistoryListItem {
    return <HistoryListItem>{
      ...history
    };
  }

  private getHistory(item: HistoryListItem): History {
    return <History>{
      ...item
    };
  }
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
