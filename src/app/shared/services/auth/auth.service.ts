import { BehaviorSubject, Observable, catchError, map, of } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AnalyticsService } from '../analytics/analytics.service';

interface User {
  username: string;
  password: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:3000'; // for http mocking
  private isLoggedIn = new BehaviorSubject<boolean>(false);
  private readonly mockUsername = 'admin';
  private readonly mockPassword = 'admin';

  constructor(
    private http: HttpClient,
    private analyticsService: AnalyticsService
  ) {}

  login(username: string, password: string): Observable<User | undefined> {
    if (username === this.mockUsername && password === this.mockPassword) {
      // If user is found, login is successful.
      localStorage.setItem('user', JSON.stringify({ username, password }));
      localStorage.setItem('isLoggedIn', 'true');
      this.setIsLoggedIn(true);
      this.analyticsService.trackEvent('login', {
        method: 'username/password',
      });
      return of({ username, password });
    } else {
      console.log('User not found.');
      return of(undefined);
    }
  }

  // login(username: string, password: string): Observable<User | undefined> {
  //   return this.http.get<User[]>(`${this.baseUrl}/users`).pipe(
  //     map((users) => {
  //       console.log('users', users);
  //       const user = users.find(
  //         (x) => x.username === username && x.password === password
  //       );

  //       if (user) {
  //         // If user is found, login is successful.
  //         localStorage.setItem('user', JSON.stringify(user));
  //         localStorage.setItem('isLoggedIn', 'true');
  //         this.setIsLoggedIn(true);
  //         this.analyticsService.trackEvent('login', {
  //           method: 'username/password',
  //         });
  //         return user;
  //       } else {
  //         console.log('User not found.');
  //         return undefined;
  //       }
  //     }),
  //     catchError((error) => {
  //       // In case of error, login failed.
  //       console.error(error.message);
  //       return of(undefined);
  //     })
  //   );
  // }

  logout(): void {
    // Logic for logout.
    localStorage.removeItem('user');
    localStorage.removeItem('isLoggedIn');
    this.setIsLoggedIn(false);
    this.analyticsService.trackEvent('logout', {});
  }

  setIsLoggedIn(value: boolean) {
    this.isLoggedIn.next(value);
  }

  getIsLoggedIn(): Observable<boolean> {
    return this.isLoggedIn.asObservable();
  }

  checkIsLoggedIn() {
    // Logic for checking if user is logged in.
    const isLoggedIn = localStorage.getItem('isLoggedIn');
    if (isLoggedIn) {
      return of(true);
    } else {
      return of(false);
    }
  }
}
