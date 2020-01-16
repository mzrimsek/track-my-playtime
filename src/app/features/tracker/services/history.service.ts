import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { HistoryEntity } from '../../../shared/reducers/history.reducer';

import {
    AddTimerInfo, UpdateHistoryItemGamePayload, UpdateHistoryItemPlatformPayload,
    UpdateHistoryItemTimesPayload
} from '../../../shared/models';

import { getUUID } from '../../../shared/utils/uuid.utils';

@Injectable()
export class HistoryService {

  private historyCollection: AngularFirestoreCollection<HistoryCollection>;
  constructor(private afs: AngularFirestore) {
    this.historyCollection = this.afs.collection<HistoryCollection>('history');
  }

  getHistoryList(userId: string): Observable<HistoryEntity[]> {
    const historyList = this.getUserItemCollection(userId).valueChanges();
    return historyList.pipe(map(histories => histories.map(history => this.getHistoryEntity(history))));
  }

  saveTimerInfo(info: AddTimerInfo): Observable<HistoryEntity> {
    const newItem = this.getNewHistoryItem(info);
    this.getUserItemCollection(info.userId).doc(newItem.id).set(newItem);
    return of(this.getHistoryEntity(newItem));
  }

  deleteHistoryItem(userId: string, itemId: string): Observable<string> {
    this.getUserItemCollection(userId).doc(itemId).delete();
    return of(itemId);
  }

  updateGame(userId: string, payload: UpdateHistoryItemGamePayload): Observable<UpdateHistoryItemGamePayload> {
    const { itemId, game } = payload;
    this.getUserItemCollection(userId).doc(itemId).update({ game });
    return of(payload);
  }

  updatePlatform(userId: string, payload: UpdateHistoryItemPlatformPayload): Observable<UpdateHistoryItemPlatformPayload> {
    const { itemId, platform } = payload;
    this.getUserItemCollection(userId).doc(itemId).update({ platform });
    return of(payload);
  }

  updateElapsedTime(userId: string, payload: UpdateHistoryItemTimesPayload): Observable<UpdateHistoryItemTimesPayload> {
    const { itemId, startTime, endTime } = payload;
    this.getUserItemCollection(userId).doc(itemId).update({ startTime, endTime });
    return of(payload);
  }

  getNewHistoryItem(info: AddTimerInfo): FirestoreHistoryItem {
    const id = getUUID(info.userId);
    return {
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
    return {
      id: history.id,
      game: history.game,
      platform: history.platform,
      startTime: history.startTime,
      endTime: history.endTime
    };
  }
}

export interface FirestoreHistoryItem {
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
