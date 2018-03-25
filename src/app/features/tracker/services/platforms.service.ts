import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';

@Injectable()
export class PlatformsService {

  private platformsCollection: AngularFirestoreCollection<Platforms>;
  constructor(private afs: AngularFirestore) {
    this.platformsCollection = this.afs.collection<Platforms>('platforms');
  }

  getPlatformsOptions(): Observable<string[]> {
    return this.platformsCollection.valueChanges()
      .map(platforms => platforms[0].options);
  }
}

interface Platforms {
  options: string[];
}
