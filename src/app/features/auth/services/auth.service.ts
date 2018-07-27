import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }

  getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  signInWithGoogle(): Observable<any> {
    return Observable.fromPromise(this.googleLogin());
  }

  signOut(): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signOut());
  }

  signUpWithEmail(email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.createUserAndRetrieveDataWithEmailAndPassword(email, password));
  }

  signInWithEmail(email: string, password: string): Observable<any> {
    return Observable.fromPromise(this.afAuth.auth.signInAndRetrieveDataWithEmailAndPassword(email, password));
  }

  private googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
