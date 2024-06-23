import { Component, OnInit } from '@angular/core';
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
      <div>
        <button class="btn btn-primary" (click)="loginWithGoogle()">
          Sign-in with Google
        </button>
      </div>
    </div>
  `,
  styles: [``],
})
export class LoginComponent implements OnInit {
  signInForm = this.fb.group({
    username: ['', Validators.required],
    password: ['', Validators.required],
  });
  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private navigationService: NavigationService
  ) {}

  ngOnInit(): void {
    this.authService
      .isLoggedIn()
      .pipe(
        tap((isLoggedIn) => {
          console.log('isLoggedIn', isLoggedIn);
          if (isLoggedIn) this.navigationService.navigateToHome();
        })
      )
      .subscribe();
  }

  loginWithGoogle(): void {
    this.authService.loginWithGoogle().subscribe();
  }
}
