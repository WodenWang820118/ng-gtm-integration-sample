import { CookieService } from './shared/services/cookie/cookie.service';
import {
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { NavbarComponent } from './shared/components/navbar/navbar.component';
import { HeaderComponent } from './shared/components/header/header.component';
import { FooterComponent } from './shared/components/footer/footer.component';
import { DisclaimerComponent } from './shared/components/disclaimer/disclaimer.component';
import { AuthService } from './shared/services/auth/auth.service';
import { Subject, first, take, tap } from 'rxjs';
import { UrlTrackerService } from './shared/services/url-tracker/url-tracker.service';
import { LoadingService } from './shared/services/loading/loading.service';

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
  template: `
    <app-navbar></app-navbar>
    <header>
      <app-header></app-header>
    </header>
    @defer (on viewport) {
    <router-outlet></router-outlet>
    <app-footer></app-footer>
    <app-disclaimer></app-disclaimer>
    } @placeholder {
    <div #loadingDiv>Loading..</div>
    }
  `,
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
