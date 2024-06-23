import {
  AfterViewInit,
  ChangeDetectionStrategy,
  Component,
  Input,
} from '@angular/core';
import { faCookie } from '@fortawesome/free-solid-svg-icons';
import { ConsentService } from '../../services/consent/consent.service';
import { take, tap } from 'rxjs';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'app-cookie-consent',
  standalone: true,
  imports: [FontAwesomeModule, AsyncPipe],
  templateUrl: './cookie-consent.component.html',
  styleUrl: './cookie-consent.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CookieConsentComponent implements AfterViewInit {
  @Input() showModal: boolean = false;
  @Input() showCookieConsent: boolean = false;

  faCookie = faCookie;

  constructor(public consentService: ConsentService) {
    if (localStorage.getItem('consentPreferences')) {
      this.consentService.setConsetPreferences(
        JSON.parse(localStorage.getItem('consentPreferences') || '{}')
      );
    } else {
      this.consentService.initConsentPreferences();
    }
  }

  ngAfterViewInit() {
    // need to update GTM consent preferences after the component is initialized
    this.consentService.consentPreferences$
      .pipe(
        take(1),
        tap((consentPreferences) => {
          this.consentService.updateConsentPreferences(consentPreferences);
        })
      )
      .subscribe();
  }

  hide() {
    this.showModal = false;
  }

  show() {
    this.showModal = true;
  }

  showCookieConsentIcon() {
    this.showCookieConsent = true;
  }

  hideCookieConsentIcon() {
    this.showCookieConsent = false;
  }

  acceptAnalytics(event: Event) {
    const consent = (event.target as HTMLInputElement).checked;
    console.log(`Analytics consent: ${consent}`);

    if (consent) {
      this.consentService.updateConsentPreferences({
        ad_storage: true,
        analytics_storage: true,
        ad_user_data: true,
        ad_personalization: false,
      });
    } else {
      this.consentService.updateConsentPreferences({
        ad_storage: false,
        analytics_storage: false,
        ad_user_data: false,
        ad_personalization: false,
      });
    }
  }

  acceptMeasurement(event: Event) {
    const consent = (event.target as HTMLInputElement).checked;
    console.log(`Measurement consent: ${consent}`);
    if (consent) {
      this.consentService.updateConsentPreferences({
        ad_storage: true,
        ad_user_data: true,
        analytics_storage: false,
        ad_personalization: false,
      });
    } else {
      this.consentService.updateConsentPreferences({
        ad_storage: false,
        ad_user_data: false,
        analytics_storage: false,
        ad_personalization: false,
      });
    }
  }

  acceptAudience(event: Event) {
    const consent = (event.target as HTMLInputElement).checked;
    console.log(`Audience consent: ${consent}`);
    if (consent) {
      this.consentService.updateConsentPreferences({
        ad_storage: true,
        ad_user_data: true,
        ad_personalization: true,
        analytics_storage: false,
      });
    } else {
      this.consentService.updateConsentPreferences({
        ad_storage: false,
        ad_user_data: false,
        ad_personalization: false,
        analytics_storage: false,
      });
    }
  }

  acceptCookies(event: Event) {
    this.acceptMeasurement(event);
    this.acceptAudience(event);
    this.acceptAnalytics(event);
    this.hide();
  }

  switchModal() {
    this.showModal = !this.showModal;
  }

  consent() {
    this.consentService.hasConsent();
  }
}
