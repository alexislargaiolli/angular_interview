import { TestBed } from '@angular/core/testing';

import { AuthService } from './auth.service';
import { Observer } from 'rxjs';

describe('AuthService', () => {
  let service: AuthService;
  let observer: Observer<unknown>;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(AuthService);
    observer = {
      next: jasmine.createSpy(),
      error: jasmine.createSpy(),
      complete: jasmine.createSpy(),
    };
  });

  describe('login()', () => {
    it('should authenticate when using username:password credentials', () => {
      service.authenticated$.subscribe(observer);
      service.login('username', 'password');
      expect(observer.next).toHaveBeenCalledWith(true);
    });

    it('should not authenticate when using other credentials than username:password', () => {
      service.authenticated$.subscribe(observer);
      service.login('username@gmail.com', 'azerty');
      expect(observer.next).toHaveBeenCalledWith(false);
    });
  });
});
