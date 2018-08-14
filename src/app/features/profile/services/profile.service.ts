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
    const profileDoc = this.profileCollection.doc<FirestoreProfileItem>(userId).valueChanges();
    return profileDoc.map(profile => <Profile>{
      ...profile
    });
  }
}

export interface FirestoreProfileItem {
  displayName: string;
  email: string;
}
