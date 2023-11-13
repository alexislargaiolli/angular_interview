import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated$ = new BehaviorSubject(false);

  get authenticated$() {
    return this._authenticated$.asObservable();
  }

  login(username: string, password: string): Observable<boolean> {
    this._authenticated$.next(true);
    return of(true);
  }
}
