import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PlatformsService {

  private platformsCollection: AngularFirestoreCollection<FirestorePlatformsItem>;
  constructor(private afs: AngularFirestore) {
    this.platformsCollection = this.afs.collection<FirestorePlatformsItem>('platforms');
  }

  getPlatformsOptions(): Observable<string[]> {
    const platformsItems = this.platformsCollection.valueChanges();
    return platformsItems.pipe(map(items =>
      items.sort((a, b) => a.index - b.index)
        .map(item => item.option)));
  }
}

export interface FirestorePlatformsItem {
  index: number;
  option: string;
}
