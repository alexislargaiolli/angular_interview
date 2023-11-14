import { SignInComponent } from './sign-in.component';
import {
  byText,
  createRoutingFactory,
  mockProvider,
  Spectator,
} from '@ngneat/spectator';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { of } from 'rxjs';

describe('SignInComponent', () => {
  let spectator: Spectator<SignInComponent>;
  const createComponent = createRoutingFactory({
    component: SignInComponent,
    providers: [mockProvider(Router, {}), mockProvider(AuthService)],
  });

  beforeEach(() => {
    spectator = createComponent();
    spectator.inject(Router).navigate.andCallFake(() => Promise.resolve(true));
  });

  const signIn = (username: string, password: string) => {
    spectator.typeInElement(username, '#username');
    spectator.typeInElement(password, '#password');
    spectator.click('button[type="submit"]');
  };

  it('should navigate to root path when sign in succeed', () => {
    spectator.inject(AuthService).login.andReturn(of(true));
    signIn('username', 'password');

    expect(spectator.inject(Router).navigate).toHaveBeenCalled();
  });

  it('should display an error message when sign in failed', () => {
    spectator.inject(AuthService).login.andReturn(of(false));
    signIn('username', 'password');

    expect(spectator.query(byText('Authentication failed'))).toBeVisible();
  });
});
