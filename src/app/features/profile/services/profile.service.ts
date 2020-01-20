import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/firestore';

import { Observable, of } from 'rxjs';
import { map } from 'rxjs/operators';

import { Profile } from '../models';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  private profileCollection: AngularFirestoreCollection<FirestoreProfileItem>;
  constructor(private afs: AngularFirestore) {
    this.profileCollection = this.afs.collection<FirestoreProfileItem>('profile');
  }

  getProfile(userId: string): Observable<Profile> {
    const profileDoc = this.profileCollection.doc<FirestoreProfileItem>(userId).valueChanges();
    return profileDoc.pipe(map(profile => <Profile>{
      ...profile
    }));
  }

  setDisplayName(userId: string, displayName: string): Observable<string> {
    this.profileCollection.doc(userId).set({ displayName }, { merge: true });
    return of(displayName);
  }
}

export interface FirestoreProfileItem {
  displayName: string;
}
