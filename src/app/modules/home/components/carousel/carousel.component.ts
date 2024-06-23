import { DomSanitizer } from '@angular/platform-browser';
import { AfterViewInit, Component } from '@angular/core';
import { DestinationService } from '../../../../shared/services/destination/destination.service';
import { UtilsService } from '../../../../shared/services/utils/utils.service';
import { AnalyticsService } from '../../../../shared/services/analytics/analytics.service';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { destinations } from '../../../../shared/services/destination/destinations';
@Component({
  selector: 'app-carousel',
  standalone: true,
  template: `
    <div
      id="myCarousel"
      class="carousel slide"
      data-bs-ride="carousel"
      (slid.bs.carousel)="onSlideChanged($event)"
    >
      <div class="carousel-inner">
        @for (destination of destinations; track destination; let i = $index) {
        <div
          class="carousel-item"
          data-bs-interval="4000"
          [class.active]="i === 0"
        >
          <a (click)="selectPromotion(destination); goToDetails(destination)">
            <img [src]="destination.imageBig" class="d-block w-100" alt="" />
            <div class="carousel-caption d-none d-md-block">
              <h4>{{ destination.title }}</h4>
              <div
                (click)="preventDefault($event)"
                [innerHTML]="
                  authorInforByPassed(destination.imageBigAuthorInfo)
                "
              ></div>
            </div>
          </a>
        </div>
        }
      </div>
      <button
        class="carousel-control-prev"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="prev"
      >
        <span class="carousel-control-prev-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Previous</span>
      </button>
      <button
        class="carousel-control-next"
        type="button"
        data-bs-target="#myCarousel"
        data-bs-slide="next"
      >
        <span class="carousel-control-next-icon" aria-hidden="true"></span>
        <span class="visually-hidden">Next</span>
      </button>
    </div>
  `,
  styles: [
    `
      .carousel-caption {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        padding: 10px 15px 5px;
        background: rgba(0, 0, 0, 0.75);
      }

      .carousel-item {
        cursor: pointer;
      }

      img {
        width: 100%;
        height: 500px;
        object-fit: cover;
        border-radius: 5px;

        @media screen and (max-width: 480px) {
          height: 300px;
        }
      }

      h4 {
        color: white;
      }
    `,
  ],
})
export class CarouselComponent implements AfterViewInit {
  destinations = destinations;
  activeSlideIndex = 0;

  constructor(
    private destinationService: DestinationService,
    public utilsService: UtilsService,
    private analyticsService: AnalyticsService,
    private navigationService: NavigationService,
    private sanitizer: DomSanitizer
  ) {}

  ngAfterViewInit(): void {
    // track the first promotion
    // other promotions will be tracked on slide change
    this.analyticsService.trackEvent(
      'view_promotion',
      this.destinations[this.activeSlideIndex]
    );
  }

  onSlideChange(newIndex: number): void {
    this.activeSlideIndex = newIndex;
  }

  goToDetails(destination: any): void {
    this.destinationService.changeDestination(destination);
    this.navigationService.navigateToDetail(destination.id);
  }

  onSlideChanged(event: any) {
    this.activeSlideIndex = event.to;
    this.analyticsService.trackEvent(
      'view_promotion',
      this.destinations[this.activeSlideIndex]
    );
  }

  selectPromotion(destination: any): void {
    console.log('selectPromotion', destination);
    this.analyticsService.trackEvent('select_promotion', destination);
  }

  preventDefault(event: any): void {
    event.stopPropagation();
  }

  authorInforByPassed(info: string) {
    return this.sanitizer.bypassSecurityTrustHtml(info);
  }
}
