import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { tap } from 'rxjs';
import { AuthService } from '../../../../shared/services/auth/auth.service';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, FormsModule, ButtonModule],
  template: `
    <div class="flex justify-center items-center min-h-screen bg-gray-100">
      <div class="w-full max-w-xs">
        <button
          pButton
          type="button"
          label="Sign in with Google"
          icon="pi pi-google"
          class="w-full"
          (click)="loginWithGoogle()"
        ></button>
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
    private readonly fb: FormBuilder,
    private readonly authService: AuthService,
    private readonly navigationService: NavigationService
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
