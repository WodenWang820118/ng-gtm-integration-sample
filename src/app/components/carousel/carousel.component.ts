import { destinations } from './../../services/destination/destinations';
import { AfterViewInit, Component } from '@angular/core';
import { SharedModule } from '../../shared.module';
import { DestinationService } from '../../services/destination/destination.service';
import { SharedService } from '../../services/shared/shared.service';
import { AnalyticsService } from '../../services/analytics/analytics.service';
import { NavigationService } from '../../../app/services/navigation/navigation.service';
import { DomSanitizer } from '@angular/platform-browser';
@Component({
  selector: 'app-carousel',
  standalone: true,
  imports: [SharedModule],
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss'],
})
export class CarouselComponent implements AfterViewInit {
  destinations = destinations;
  activeSlideIndex = 0;

  constructor(
    private destinationService: DestinationService,
    public sharedService: SharedService,
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
