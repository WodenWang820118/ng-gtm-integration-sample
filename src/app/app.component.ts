import { AfterContentInit, Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, first, tap } from 'rxjs';
import { UrlTrackerService } from './shared/services/url-tracker/url-tracker.service';
import { LoadingService } from './shared/services/loading/loading.service';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  template: ` <router-outlet></router-outlet> `,
})
export class AppComponent implements OnInit, AfterContentInit {
  title = 'ng-gtm-integration-sample';
  // @ViewChild('loadingDiv', { static: false }) loadingDiv!: ElementRef;
  private readonly destroy$ = new Subject<void>();

  constructor(
    private readonly urlTrackerService: UrlTrackerService,
    private readonly loadingService: LoadingService
  ) {}

  ngOnInit() {
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

  ngAfterContentInit() {
    window.onload = () => {};
  }

  ngOnDestroy() {
    // Cleanup subscriptions
    this.destroy$.next();
    this.destroy$.complete();
  }
}
