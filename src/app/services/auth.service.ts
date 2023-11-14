import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated$ = new BehaviorSubject(true);

  get authenticated$() {
    return this._authenticated$.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    const isAuthorized = username === 'username' && password === 'password';
    this._authenticated$.next(isAuthorized);
    return of(isAuthorized);
  }
}
