import {
  BehaviorSubject,
  Observable,
  catchError,
  defer,
  from,
  map,
  of,
} from 'rxjs';
import { Injectable } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';
import { signInWithPopup, GoogleAuthProvider, User } from 'firebase/auth';
import { auth } from '../../../firebase/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private user = new BehaviorSubject<User | undefined>(undefined);

  constructor(private analyticsService: AnalyticsService) {}

  loginWithGoogle() {
    const provider = new GoogleAuthProvider();
    return defer(() =>
      from(
        signInWithPopup(auth, provider)
          .then((result) => {
            // This gives you a Google Access Token. You can use it to access the Google API.
            const credential = GoogleAuthProvider.credentialFromResult(result);
            const token = credential?.accessToken;
            // The signed-in user info.
            const user = result.user;
            if (user) this.user.next(user);
            // IdP data available using getAdditionalUserInfo(result)
            // ...
            this.analyticsService.trackEvent('login', { method: 'google' });
          })
          .catch((error) => {
            // Handle Errors here.
            const errorCode = error.code;
            const errorMessage = error.message;
            // The email of the user's account used.
            const email = error.customData.email;
            // The AuthCredential type that was used.
            const credential = GoogleAuthProvider.credentialFromError(error);
            // ...
          })
      )
    ).pipe(
      catchError((error) => {
        console.error('loginWithGoogle error', error);
        return of(undefined);
      })
    );
  }

  isLoggedIn(): Observable<boolean> {
    return this.user.pipe(map((user) => !!user));
  }

  getUser(): Observable<User | undefined> {
    return this.user;
  }

  logout() {
    this.user.next(undefined);
    return defer(() =>
      from(auth.signOut()).pipe(
        catchError((error) => {
          console.error('logout error', error);
          return of(undefined);
        })
      )
    );
  }
}
