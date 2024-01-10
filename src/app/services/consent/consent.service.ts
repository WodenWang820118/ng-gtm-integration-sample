import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';

interface ConsentPreferences {
  analytics_storage: boolean;
  ad_storage: boolean;
  ad_user_data: boolean;
  ad_personalization: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class ConsentService {
  consentPreferencesSubject = new BehaviorSubject<ConsentPreferences>({
    analytics_storage: false,
    ad_storage: false,
    ad_user_data: false,
    ad_personalization: false,
  });

  consentPreferences$ = this.consentPreferencesSubject.asObservable();

  constructor() {}

  initConsentPreferences() {
    const initialConsentPreferences = {
      analytics_storage: false,
      ad_storage: false,
      ad_user_data: false,
      ad_personalization: false,
    };

    this.setConsetPreferences(initialConsentPreferences);
  }

  setConsetPreferences(consentPreferences: ConsentPreferences) {
    localStorage.setItem(
      'consentPreferences',
      JSON.stringify(consentPreferences)
    );
    this.consentPreferencesSubject.next(consentPreferences);
  }

  analyticsConsentGiven$() {
    return this.consentPreferences$.pipe(
      map(
        (consentOptions) =>
          consentOptions.analytics_storage &&
          consentOptions.ad_storage &&
          consentOptions.ad_user_data
      )
    );
  }

  measurementConsentGiven$() {
    return this.consentPreferences$.pipe(
      map(
        (consentOptions) =>
          consentOptions.ad_storage && consentOptions.ad_user_data
      )
    );
  }

  audienceConsentGiven$() {
    return this.consentPreferences$.pipe(
      map(
        (consentOptions) =>
          consentOptions.ad_storage &&
          consentOptions.ad_user_data &&
          consentOptions.ad_personalization
      )
    );
  }

  getConsentPreferences() {
    return JSON.parse(localStorage.getItem('consentPreferences') || '{}');
  }

  updateConsentPreferences(consentPreferences: ConsentPreferences) {
    this.setConsetPreferences(consentPreferences);

    const consentPreferencesDataLayer = {
      ad_storage: consentPreferences.ad_storage ? 'granted' : 'denied',
      analytics_storage: consentPreferences.analytics_storage
        ? 'granted'
        : 'denied',
      ad_user_data: consentPreferences.ad_user_data ? 'granted' : 'denied',
      ad_personalization: consentPreferences.ad_personalization
        ? 'granted'
        : 'denied',
    };

    window.dataLayer.push({
      event: 'update_consent',
      ...consentPreferencesDataLayer,
    });
  }

  hasConsent() {
    localStorage.setItem('consent', 'true');
  }

  getConsentStatus() {
    return JSON.parse(localStorage.getItem('consent') || 'false');
  }
}
