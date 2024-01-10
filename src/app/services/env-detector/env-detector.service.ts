import { Injectable } from '@angular/core';
import { Environment } from './utils';

@Injectable({
  providedIn: 'root',
})
export class EnvDetectorService {
  constructor() {}

  getPlatform(): Environment {
    if (window.flutter_inappwebview) {
      return Environment.FLUTTER;
    } else if (window.AnalyticsWebInterface) {
      return Environment.ANDROID;
    } else if (
      window.webkit &&
      window.webkit.messageHandlers &&
      window.webkit.messageHandlers.firebase
    ) {
      return Environment.IOS;
    } else {
      return Environment.UNKNOWN;
    }
  }
}
