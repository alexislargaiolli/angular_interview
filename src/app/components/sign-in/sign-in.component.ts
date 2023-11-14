import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CardModule } from 'primeng/card';
import { ButtonModule } from 'primeng/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { AuthService } from '../../services/auth.service';
import { Router } from '@angular/router';
import { MessagesModule } from 'primeng/messages';
import { Message } from 'primeng/api';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [
    CommonModule,
    CardModule,
    ButtonModule,
    ReactiveFormsModule,
    InputTextModule,
    PasswordModule,
    MessagesModule,
  ],
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SignInComponent {
  signInForm = new FormGroup({
    username: new FormControl<string>('', Validators.required),
    password: new FormControl<string>('', Validators.required),
  });
  validationMessages: Message[] = [];

  constructor(
    private authService: AuthService,
    private router: Router,
  ) {}

  onSubmit() {
    const { username, password } = this.signInForm.value;
    if (this.signInForm.valid && username && password) {
      this.authService.login(username, password).subscribe((authenticated) => {
        if (authenticated) {
          this.router.navigate(['/']);
        } else {
          this.validationMessages = [
            {
              severity: 'error',
              summary: 'Authentication failed',
              detail: 'Try to use username: username and password: password.',
              id: 'authentication-failed-message',
            },
          ];
        }
      });
    } else {
      this.signInForm.markAllAsTouched();
    }
  }
}
