import {
  Component,
  ElementRef,
  OnInit,
  Type,
  ViewChild,
  ViewEncapsulation,
} from '@angular/core';
import { AsyncPipe, NgClass } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  FormsModule,
} from '@angular/forms';
import { take, tap } from 'rxjs';
import { YouTubePlayerModule } from '@angular/youtube-player';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { WindowSizeService } from '../../../../shared/services/window-size/window-size.service';
import { UtilsService } from '../../../../shared/services/utils/utils.service';
import { DestinationService } from '../../../../shared/services/destination/destination.service';
import { SearchService } from '../../../../shared/services/search/search.service';
import { YoutubeService } from '../../../../shared/services/youtube/youtube.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FirestoreCountryService } from '../../../../shared/services/firestore-country/firestore-country.service';
import { AnalyticsService } from '../../../../shared/services/analytics/analytics.service';
import { Destination } from '../../../../shared/models/destination.model';

@Component({
  selector: 'app-destination',
  standalone: true,
  imports: [
    YouTubePlayerModule,
    NgClass,
    AsyncPipe,
    ReactiveFormsModule,
    FormsModule,
  ],
  templateUrl: './destination.component.html',
  styleUrls: ['./destination.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class DestinationComponent implements OnInit {
  destinations: Destination[] = [];
  searchForm: FormGroup = new FormGroup({
    searchTerm: new FormControl(''),
  });

  @ViewChild('ytPlayerModal') ytPlayerModal!: ElementRef;
  @ViewChild('player') videoPlayer: any;
  currentComponent: Type<any> | null = null;
  videoId = '';
  showVideoPlayer = false;
  playerVars = {
    enablejsapi: 1,
  };

  constructor(
    private destinationService: DestinationService,
    public utilsService: UtilsService,
    public windowSizeService: WindowSizeService,
    private navigationService: NavigationService,
    public searchService: SearchService,
    private youtubeService: YoutubeService,
    private sanitizer: DomSanitizer,
    private firestoreCountryService: FirestoreCountryService,
    private analyticsService: AnalyticsService
  ) {}

  ngOnInit() {
    this.firestoreCountryService
      .getFirstDestinationsData()
      .pipe(
        take(1),
        tap((destinations) => {
          this.destinations = destinations;
          this.trackViewItemList(destinations);
        })
      )
      .subscribe();

    this.searchService.searchResults$
      .pipe(
        tap((results) => {
          this.destinations = results;
        })
      )
      .subscribe();
  }

  getNextDestinations() {
    this.firestoreCountryService
      .getNextDestinationsData()
      .pipe(
        take(1),
        tap((destinations) => {
          this.destinations = destinations;
          this.trackViewItemList(destinations);
        })
      )
      .subscribe();
  }

  getPreviousDestinations() {
    if (this.isPreviousDisabled()) return;
    this.firestoreCountryService
      .getPreviousDestinationsData()
      .pipe(
        take(1),
        tap((destinations) => {
          this.destinations = destinations;
          this.trackViewItemList(destinations);
        })
      )
      .subscribe();
  }

  trackViewItemList(destinations: Destination[]) {
    this.analyticsService.trackEvent('view_item_list', {
      ecommerce: {
        items: destinations.map((destination) => ({
          item_id: destination.id,
          item_name: destination.title,
          item_category: destination.title,
          price: destination.price,
          quantity: 1,
        })),
      },
    });
  }

  isPreviousDisabled() {
    return this.firestoreCountryService.getPreviousDocsStackLength() < 2;
  }

  navigateToHome() {
    this.navigationService.navigateToHome();
  }

  goToDetails(destination: any): void {
    this.destinationService.changeDestination(destination);
    this.navigationService.navigateToDetail(destination.id);
  }

  selectItem(destination: any): void {
    this.destinationService.trackSelectItem(destination);
  }

  navigateToSearchResults(query: string): void {
    this.searchService.search(query);
    this.navigationService.navigateToDestinationResults(query);
  }

  onSubmit(f: FormGroup): void {
    const query = f.value.searchTerm;
    this.navigateToSearchResults(query);
  }

  getVideoId(url: string): string {
    return url.split('/')[url.split('/').length - 1];
  }

  closeModal() {
    this.showVideoPlayer = false;
    this.videoPlayer.pauseVideo();
    this.youtubeService.stopProgressTracking();
  }

  showModal(url: string) {
    this.videoId = this.getVideoId(url);
    this.showVideoPlayer = true;
  }

  onStateChange(event: any) {
    this.youtubeService.trackVideoEvent(event);
  }

  authorInforByPassed(info: string) {
    return this.sanitizer.bypassSecurityTrustHtml(info);
  }
}
