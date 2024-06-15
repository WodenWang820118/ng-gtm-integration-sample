import {
  AfterContentInit,
  AfterViewChecked,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subject, first, tap } from 'rxjs';
import { UrlTrackerService } from './shared/services/url-tracker/url-tracker.service';
import { LoadingService } from './shared/services/loading/loading.service';
import { StyleLoadService } from './shared/services/style-load/style-load.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  template: `
    @defer (on immediate) {
    <router-outlet></router-outlet>
    }
  `,
})
export class AppComponent
  implements OnInit, AfterContentInit, AfterViewChecked
{
  title = 'ng-gtm-integration-sample';
  @ViewChild('loadingDiv', { static: false }) loadingDiv!: ElementRef;
  private destroy$ = new Subject<void>();

  constructor(
    private urlTrackerService: UrlTrackerService,
    private loadingService: LoadingService,
    private styleLoadService: StyleLoadService
  ) {}

  ngOnInit() {
    this.styleLoadService.appendAllStyles();
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
