import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class PlatformsService {

  private platformsCollection: AngularFirestoreCollection<PlatformsCollection>;
  constructor(private afs: AngularFirestore) {
    this.platformsCollection = this.afs.collection<PlatformsCollection>('platforms');
  }

  getPlatformsOptions(): Observable<string[]> {
    return this.platformsCollection.valueChanges()
      .map(platforms => platforms[0].options);
  }
}

interface PlatformsCollection {
  options: string[];
}
