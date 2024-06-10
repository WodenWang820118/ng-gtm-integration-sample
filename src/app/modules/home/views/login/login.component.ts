import { Component } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { take, tap } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, FormsModule],
  template: `
    <div
      class="d-flex flex-column justify-content-center align-items-center"
      id="main"
    >
      <div id="msg"></div>
      <form [formGroup]="signInForm" id="signInForm" (ngSubmit)="login()">
        <div class="mb-3">
          <label for="login55" class="form-label">Username :</label>
          <input
            type="text"
            class="form-control"
            name="login"
            id="login55"
            formControlName="username"
          />
        </div>
        <div class="mb-3">
          <label for="password55" class="form-label">Password :</label>
          <input
            type="password"
            class="form-control"
            name="password"
            id="password55"
            formControlName="password"
          />
        </div>
        <div class="mb-3">
          <button class="btn btn-primary">Sign-in</button>
        </div>
      </form>
    </div>
  `,
  styles: [``],
})
export class LoginComponent {
  signInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  login() {
    if (this.signInForm.invalid) {
      alert('Please fill out the form completely.');
      return;
    }

    const username = this.signInForm.controls.username.value;
    const password = this.signInForm.controls.password.value;

    if (username && password) {
      this.authService
        .login(username, password)
        .pipe(
          tap((user) => {
            take(1);
            if (user) {
              this.navigationService.navigateToHome();
            } else {
              alert('Login failed.');
            }
          })
        )
        .subscribe();
    }
  }
}
