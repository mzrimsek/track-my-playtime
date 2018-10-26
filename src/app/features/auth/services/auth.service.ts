import { Injectable } from '@angular/core';

import { AngularFireAuth } from 'angularfire2/auth';
import * as firebase from 'firebase/app';
import { from, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  constructor(private afAuth: AngularFireAuth) { }

  getAuthState(): Observable<firebase.User | null> {
    return this.afAuth.authState;
  }

  signInWithGoogle(): Observable<any> {
    return from(this.googleLogin());
  }

  signInWithFacebook(): Observable<any> {
    return from(this.facebookLogin());
  }

  signInWithTwitter(): Observable<any> {
    return from(this.twitterLogin());
  }

  signOut(): Observable<any> {
    return from(this.afAuth.auth.signOut());
  }

  signUpWithEmail(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.createUserWithEmailAndPassword(email, password));
  }

  signInWithEmail(email: string, password: string): Observable<any> {
    return from(this.afAuth.auth.signInWithEmailAndPassword(email, password));
  }

  resetPassword(email: string): Observable<any> {
    return from(this.afAuth.auth.sendPasswordResetEmail(email));
  }

  private googleLogin(): Promise<any> {
    const provider = new firebase.auth.GoogleAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private facebookLogin(): Promise<any> {
    const provider = new firebase.auth.FacebookAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }

  private twitterLogin(): Promise<any> {
    const provider = new firebase.auth.TwitterAuthProvider();
    return this.afAuth.auth.signInWithPopup(provider);
  }
}
