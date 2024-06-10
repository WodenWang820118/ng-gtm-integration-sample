import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { DisclaimerComponent } from '../../../../shared/components/disclaimer/disclaimer.component';
import {
  faHome,
  faGlobe,
  faTag,
  faCookie,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '../../../../shared/services/navigation/navigation.service';
import { CookieConsentComponent } from '../../../../shared/components/cookie-consent/cookie-consent.component';
import { ConsentService } from '../../../../shared/services/consent/consent.service';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    CarouselComponent,
    DisclaimerComponent,
    CookieConsentComponent,
    FontAwesomeModule,
  ],
  template: `
    <div class="container overflow-hidden px-4">
      <div class="row">
        <app-carousel></app-carousel>
      </div>
      <div id="viewDestination">
        <a (click)="navigateToDestinations()" class="btn btn-primary btn-large">
          <h2>View Destinations</h2>
        </a>
      </div>
      @defer (on viewport) {
      <div class="row rwd-mobile" style="gap: 1rem">
        <div class="p-3 col text-center">
          <h3>
            <fa-icon [icon]="faHome" size="xs"></fa-icon>
            <i class="fas fa-home" style="vertical-align: middle"></i> Luxurious
            Accommodations
          </h3>
          <p style="text-align: justify">
            Nunc ornare turpis eu nisi hendrerit a tempor felis ullamcorper.
            Integer turpis felis, consectetur quis congue tempus, porta vitae
            purus. Mauris condimentum orci et nunc tempor mollis.
          </p>
        </div>
        <div class="p-3 col text-center">
          <h3>
            <fa-icon [icon]="faGlobe" size="xs"></fa-icon>
            <i class="fas fa-globe" style="vertical-align: middle"></i>
            Incredible Locations
          </h3>
          <p style="text-align: justify">
            Nunc ornare turpis eu nisi hendrerit a tempor felis ullamcorper.
            Integer turpis felis, consectetur quis congue tempus, porta vitae
            purus. Mauris condimentum orci et nunc tempor mollis.
          </p>
        </div>
        <div class="p-3 col text-center">
          <h3>
            <fa-icon [icon]="faTag" size="xs"></fa-icon>
            Pricing
          </h3>
          <p style="text-align: justify">
            Please use our
            <a
              href="https://wodenwang820118.github.io/ng-gtm-integration-sample/?utm_source=ng-gtm-integration-sample&utm_medium=website&utm_campaign=app_download"
              target="_blank"
              >app</a
            >
            for more seemless services. Please use the link in the mobile to
            test the deep link with UTM parameters.
          </p>
        </div>
      </div>
      } @placeholder {
      <div>Loading..</div>
      }
      <app-cookie-consent
        [showModal]="showCookieModal"
        [showCookieConsent]="true"
      ></app-cookie-consent>
    </div>
  `,
  styleUrls: ['./main.component.scss'],
})
export class MainComponent implements OnInit {
  faHome = faHome;
  faGlobe = faGlobe;
  faTag = faTag;
  faCookie = faCookie;
  showCookieModal!: boolean;
  @ViewChild(CookieConsentComponent)
  cookieConsentComponent!: CookieConsentComponent;

  constructor(
    private navigationService: NavigationService,
    private consentService: ConsentService
  ) {}

  ngOnInit(): void {
    // show cookie consent modal if consent has not been confirmed
    this.showCookieModal = !this.consentService.getConsentStatus();
  }

  navigateToDestinations() {
    this.navigationService.navigateToDestinations();
  }
}
