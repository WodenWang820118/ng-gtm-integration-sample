import { Component, OnInit, ViewChild } from '@angular/core';
import { CarouselComponent } from '../../components/carousel/carousel.component';
import { DisclaimerComponent } from '../../components/disclaimer/disclaimer.component';
import { SharedModule } from '../../shared.module';
import {
  faHome,
  faGlobe,
  faTag,
  faCookie,
} from '@fortawesome/free-solid-svg-icons';
import { NavigationService } from '../../services/navigation/navigation.service';
import { CookieConsentComponent } from '../../components/cookie-consent/cookie-consent.component';
import { ConsentService } from '../../services/consent/consent.service';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [
    SharedModule,
    CarouselComponent,
    DisclaimerComponent,
    CookieConsentComponent,
  ],
  templateUrl: './main.component.html',
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
