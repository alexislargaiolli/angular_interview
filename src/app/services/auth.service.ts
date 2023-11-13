import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private _authenticated$ = new BehaviorSubject(false);

  get authenticated$() {
    return this._authenticated$.asObservable();
  }

  login() {
    this._authenticated$.next(true);
  }
}
