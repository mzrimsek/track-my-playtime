import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { ProgressEntity } from '../../../shared/reducers/progress.reducer';

import { MarkCompletePayload, SetNotesPayload } from '../../../shared/models';
import { AddPlaying } from '../models';

import { getUUID } from '../../../shared/utils/uuid.utils';

@Injectable()
export class ProgressService {

  private progressCollection: AngularFirestoreCollection<ProgressCollection>;
  constructor(private afs: AngularFirestore) {
    this.progressCollection = this.afs.collection<ProgressCollection>('progress');
  }

  getProgressList(userId: string): Observable<ProgressEntity[]> {
    const progressList = this.getUserItemCollection(userId).valueChanges();
    return progressList.pipe(map(progressListItems => progressListItems.map(progress => this.getProgressEntity(progress))));
  }

  saveAddPlaying(addPlaying: AddPlaying): Observable<ProgressEntity> {
    const newItem = this.getNewProgressItem(addPlaying);
    this.getUserItemCollection(addPlaying.userId).doc(newItem.id).set(newItem);
    return of(newItem as ProgressEntity);
  }

  markCompleted(userId: string, payload: MarkCompletePayload): Observable<MarkCompletePayload> {
    const { itemId, endEntryId } = payload;
    this.getUserItemCollection(userId).doc(itemId).update({ endEntryId });
    return of(payload);
  }

  remove(userId: string, itemId: string): Observable<string> {
    this.getUserItemCollection(userId).doc(itemId).delete();
    return of(itemId);
  }

  setNotes(userId: string, payload: SetNotesPayload): Observable<SetNotesPayload> {
    const { itemId, notes } = payload;
    this.getUserItemCollection(userId).doc(itemId).update({ notes });
    return of(payload);
  }

  getNewProgressItem(addPlaying: AddPlaying): FirestoreProgressItem {
    const id = getUUID(addPlaying.userId);
    return {
      id,
      startEntryId: addPlaying.startEntryId,
      endEntryId: '',
      notes: ''
    };
  }

  private getUserItemCollection(userId: string): AngularFirestoreCollection<FirestoreProgressItem> {
    return this.progressCollection.doc(userId).collection('items');
  }

  private getProgressEntity(progress: FirestoreProgressItem): ProgressEntity {
    return {
      id: progress.id,
      startEntryId: progress.startEntryId,
      endEntryId: progress.endEntryId,
      notes: progress.notes ? progress.notes : ''
    };
  }
}

export interface FirestoreProgressItem {
  id: string;
  startEntryId: string;
  endEntryId: string;
  notes?: string;
}

interface ProgressCollection {
  items: FirestoreProgressItem[];
}
