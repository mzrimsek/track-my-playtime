import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlatformsService {

  private platformsCollection: AngularFirestoreCollection<FirestorePlatformsItem>;
  constructor(private afs: AngularFirestore) {
    this.platformsCollection = this.afs.collection<FirestorePlatformsItem>('platforms');
  }

  getPlatformsOptions(): Observable<string[]> {
    const platformsItems = this.platformsCollection.valueChanges().first();
    return platformsItems.map(items =>
      items.sort((a, b) => a.index - b.index)
        .map(item => item.option));
  }
}

export interface FirestorePlatformsItem {
  index: number;
  option: string;
}
