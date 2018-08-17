import { Injectable } from '@angular/core';

import { AngularFirestore, AngularFirestoreCollection } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Profile } from '../models';

@Injectable()
export class ProfileService {

  private profileCollection: AngularFirestoreCollection<FirestoreProfileItem>;
  constructor(private afs: AngularFirestore) {
    this.profileCollection = this.afs.collection<FirestoreProfileItem>('profile');
  }

  getProfile(userId: string): Observable<Profile> {
    const profileDoc = this.profileCollection.doc<FirestoreProfileItem>(userId).valueChanges().first();
    return profileDoc.map(profile => <Profile>{
      ...profile
    });
  }

  setDisplayName(userId: string, displayName: string): Observable<string> {
    this.profileCollection.doc(userId).set({ displayName }, { merge: true });
    return Observable.of(displayName);
  }
}

export interface FirestoreProfileItem {
  displayName: string;
}
