import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { ProgressEntity } from '../reducers/progress.reducer';

import { AddPlaying, MarkCompletePayload } from '../models';

import { getUUID } from '../../../shared/utils/uuid.utils';

@Injectable()
export class ProgressService {

  private progressCollection: AngularFirestoreCollection<ProgressCollection>;
  constructor(private afs: AngularFirestore) {
    this.progressCollection = this.afs.collection<ProgressCollection>('progress');
  }

  getProgressList(userId: string): Observable<ProgressEntity[]> {
    const progressList = this.getUserItemCollection(userId).valueChanges().first();
    return progressList.map(progressListItems => progressListItems
      .map(progress => progress as ProgressEntity));
  }

  saveAddPlaying(addPlaying: AddPlaying): Observable<ProgressEntity> {
    const newItem = this.getNewProgressItem(addPlaying);
    this.getUserItemCollection(addPlaying.userId).doc(newItem.id).set(newItem);
    return Observable.of(newItem as ProgressEntity);
  }

  getNewProgressItem(addPlaying: AddPlaying): FirestoreProgressItem {
    const id = getUUID(addPlaying.userId);
    return {
      id,
      startEntryId: addPlaying.startEntryId,
      endEntryId: ''
    };
  }

  markCompleted(userId: string, payload: MarkCompletePayload): Observable<MarkCompletePayload> {
    // update item with end value
    return Observable.of(payload);
  }

  private getUserItemCollection(userId: string): AngularFirestoreCollection<FirestoreProgressItem> {
    return this.progressCollection.doc(userId).collection('items');
  }
}

export interface FirestoreProgressItem {
  id: string;
  startEntryId: string;
  endEntryId: string;
}

interface ProgressCollection {
  items: FirestoreProgressItem[];
}
