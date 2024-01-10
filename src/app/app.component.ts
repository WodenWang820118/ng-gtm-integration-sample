import { CookieService } from './services/cookie/cookie.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './components/navbar/navbar.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { DisclaimerComponent } from './components/disclaimer/disclaimer.component';
import { AuthService } from './services/auth/auth.service';
import { Subject, first, take, tap } from 'rxjs';
import { UrlTrackerService } from './services/url-tracker/url-tracker.service';
import { LoadingService } from './services/loading/loading.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule,
    RouterOutlet,
    NavbarComponent,
    HeaderComponent,
    FooterComponent,
    DisclaimerComponent,
  ],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, AfterViewChecked {
  title = 'ng-gtm-integration-sample';
  @ViewChild('loadingDiv', { static: false }) loadingDiv!: ElementRef;
  private destroy$ = new Subject<void>();

  constructor(
    private cookieService: CookieService,
    private authService: AuthService,
    private urlTrackerService: UrlTrackerService,
    private loadingService: LoadingService
  ) {}

  ngOnInit() {
    // TODO: implement consent banner and monitor consent
    this.cookieService.createCookie('visit', 'true', 1);
    this.authService
      .checkIsLoggedIn()
      .pipe(
        take(1),
        tap((isLoggedIn) => {
          if (isLoggedIn) {
            this.authService.setIsLoggedIn(true);
          } else {
            this.authService.setIsLoggedIn(false);
          }
        })
      )
      .subscribe();

    this.loadingService
      .getLoadingState()
      .pipe(
        first((isLoading) => !isLoading),
        tap((isLoading) => {
          if (!isLoading) {
            window.dataLayer.push({
              event: 'componentsLoaded',
            });
          }
        })
      )
      .subscribe();
    this.urlTrackerService.initializeUrlTracking();
  }

  ngAfterViewChecked() {
    try {
      if (this.loadingDiv.nativeElement) {
        this.loadingService.setLoadingState(true);
      }
    } catch (error) {
      // loadingDiv is no longer available
      this.loadingService.setLoadingState(false);
    }
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
