# NgGtmSite: Angular Google Tag Manager Integration Sample

## Table of Contents

- [Overview](#overview)
- [Setting Up Google Tag Manager](#setting-up-google-tag-manager)
- [Javascript interface](#javascript-interface)
- [Data streams differentiation](#data-streams-differentiation)
- [Firebase SDK](#firebase-sdk)
- [PWA (Progressive Web App)](#pwa-progressive-web-app)
- [YouTube video tracking](#youtube-video-tracking)
- [Consent mode v2](#consent-mode-v2)
- [Enhancing Scroll Tracking in Single Page Applications](#enhancing-scroll-tracking-in-single-page-applications)
- [Deep Linking](#deep-linking-Android)
- [Development server](#development-server)
- [Build](#build)
- [Documentation as a static site (Experimental)](#documentation-as-a-static-site-experimental)
- [License](#license)

## Overview

This project demonstrates a simple implementation of Google Tag Manager (GTM) with an Angular application. It showcases various GTM events like `page_view`, `view_promotion`, and more, to help you understand and test GTM integration in a real-world scenario.

For now, the app supports:

1. `page_view`
2. `view_promotion`
3. `select_promotion`
4. `view_item_list`
5. `select_item`
6. `view_item`
7. `add_to_cart`
8. `remove_from_cart`
9. `view_cart`
10. `begin_checkout`
11. `add_shipping_info`
12. `add_payment_info`
13. `purchase`
14. `refund`

## Setting Up Google Tag Manager

To configure Google Tag Manager for this project, please locate the file titled `GTM-NBMX2DWS_workspace<version>.json` in the project's root directory. This file contains the necessary settings for your GTM workspace. You can easily import this configuration into your GTM account. Once imported, select and follow the specific topics relevant to your needs. Also, please refer to the [data layer checker extension](https://chrome.google.com/webstore/detail/datalayer-checker/ffljdddodmkedhkcjhpmdajhjdbkogke) to inject your own GTM on the GitHub page.

## Javascript interface

The [Javascript interface](https://firebase.google.com/docs/analytics/webview?platform=android) is used to bridge the Angular application and the Android/iOS applications. Additionally, I configured the [flutter_inappwebview](https://pub.dev/packages/flutter_inappwebview/versions/6.0.0-beta.28) plugin to send the data back to the Flutter application.

## Data streams differentiation

### Overview

Sometimes we want to reuse the website and embed it in the Android/iOS application. The data in the app (Android/iOS) should be separated from the website. The project demonstrates how to differentiate the data streams from the website and the Android/iOS application.

### Methodology

The basic methodology in the project cached a query parameter, `app_source`, and in GTM, we can use a custom Javascript variable `app_source` variable to differentiate the data stream. For example, `http://localhost:4200/?app_source=app` is the data stream for the Android/iOS application, and `http://localhost:4200/` is by default the data stream for the web application.

Checking GTM tags via GTM preview mode is straightforward. There could be another way to differentiate data streams such as checking registered window objects from Flutter/Android/iOS, but not obvious.

## Firebase SDK

The events data sent from the website to Flutter/Android/iOS are in the same format suggested by the [GA4 recommended events](https://support.google.com/analytics/answer/9267735?hl=en) and it's easy to integrate and map events with the [Firebase SDK](https://firebase.google.com/docs/guides).

Be aware of the data types of the parameters. For instance, inconsistent `value` parameter types such as double from the website and integer in Flutter will cause the `purchase` event to fail to send.

## PWA (Progressive Web App)

A Progressive Web App (PWA) is designed to work offline, mimicking a native app experience on the user's device. To ensure important analytics data isn't lost when users are offline, [Dexie.js](https://dexie.org/) is utilized to store data in IndexedDB. Once the user is back online, the stored data is sent to the GA4 property through `window.dataLayer.push()`, adhering to Google Tag Manager (GTM) practices. For more details about PWAs and their capabilities, refer to the [PWA documentation](https://web.dev/progressive-web-apps/). Please also refer to the Angular service worker [documentation](https://angular.io/guide/service-worker-intro) for more implementation details.

Use the following steps to test the PWA functionality:

1. Run `ng build` to build the project.
2. Use `http-server` and run `npx http-server -p 8080 -c-1 dist/ng-gtm-integration-sample`
3. Follow and click the port number link in the terminal to open the PWA.
4. Turn off the network and trigger some events.
5. Turn on the network and check the events in the data layer object.

## YouTube video tracking

Please follow the documentation in the [YouTube Player API Reference for iframe Embeds](https://developers.google.com/youtube/iframe_api_reference) to set up YouTube video tracking. The project utilizes Angular's [youtube-player component](https://github.com/angular/components) to streamline the integration process.

### Enhanced measurement

Due to CORS policy restrictions, the YouTube iframe is unable to perform `postMessage` actions and use [enhanced measurement](https://support.google.com/analytics/answer/9216061?hl=en) to transmit data to the data layer. To address this, it is necessary to modify the Content Security Policy (CSP) to permit these actions from the YouTube iframe. For detailed guidance on configuring CSP, please refer to the [Content Security Policy (CSP) documentation](https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP).

### Data stream differentiation issue

The enhanced measurement is unable to [differentiate data streams](#data-streams-differentiation). To address this, the project implements events manually according to API. The details are in the `services/youtube/youtube.service.ts` file.

## Consent mode v2

### Overview

Google is updating its offerings, including Consent Mode, to comply with regulations like GDPR and DMA. The Consent Mode V2 introduces additional settings to better control data usage and ensure lawful consent collection. This tool helps organizations adapt Google tags based on user consent, with new parameters like "Ad personalization" and "ad user data" for more refined control. Organizations in the European Economic Area using Google's advertising and measurement products must upgrade to [Consent Mode V2](https://developers.google.com/tag-platform/security/guides/consent#upgrade-consent-v2) by March 6, 2024, to maintain features and comply with DMA requirements​. You may load the GTM script dynamically based on the consent status or related logic. The implementation below ensures privacy primarily by using GTM.

The implementation uses localStorage to store the consent status and uses the `gtm-templates-simo-ahava`[template](https://github.com/gtm-templates-simo-ahava) in GTM implementation. Here are some setup steps in GTM:

### Consent tags using the template

1. A `Default Consent` Tag. It is a tag that fires on the earliest `Consent Initialization` stage with default values.
2. An `Update Consent` Tag. It is a tag that fires when the consent status is updated, with a trigger of `Custom Event`, `update_consent` for example.

The codebase updates the consent status within the local storage and fires the `update_consent` event with the consent status. Then, the tag uses data layer variables to update the consent status.

### Configuration tags

1. A `Default Configuration tag` is necessary before data collection as it uses [gtag.js](https://developers.google.com/tag-platform/gtagjs) to configure the analytics tracking:

```javascript
// Default Configuration tag; Tag Type: 'Google Tag' in GTM
gtag("config", "G-XXXXXXXX", {
  send_page_view: false,
  allow_ad_personalization_signals: false, // consent mode v2 ad_personalization parameter
  allow_google_signals: false, // consent mode v2 advertising features
  debug_mode: "true", // to use it in the Google Analytics 4 debug mode
});
```

Please refer to the configuration settings in the [documentation](https://support.google.com/tagmanager/answer/13438166).

The trigger is usually `All Pages`, with the condition `{{CJS - analytics_consent}}` equals true.

```javascript
// {{CJS - analytics_consent}} is a custom Javascript variable
function() {
  var consent = JSON.parse(localStorage.getItem('consentPreferences'));
  var analytics_storage = consent.analytics_storage;
  var ad_storage = consent.ad_storage;
  var ad_user_data = consent.ad_user_data;
  var ad_personalization = consent.ad_personalization;
  return ad_storage && analytics_storage && ad_user_data;
}
```

2. An `Update Configuration tag` is necessary to update the configuration settings when the consent status is updated. The trigger is usually `Custom Event`, `update_consent` for example. To stop data collection when the consent status is false, the workaround, for now, is utilizing [Tag ID](https://support.google.com/tagmanager/answer/12002338#Tag). The variable `{{CJS - Measurement ID}}` is used to control the data collection.

```javascript
// {{CJS - Measurement ID}} is a custom Javascript variable
function() {
  var analyticsConsent = {{CJS - analytics_consent}};
  return analyticsConsent ? {{Measurement ID}} : 'G-0';
}
```

The `{{Measurement ID}}` is the measurement ID of the GA4 property. The `G-0` is a non-existent measurement ID.

### Tags

All tags should configure the measurement ID with the `{{CJS - Measurement ID}}` variable.

## Enhancing Scroll Tracking in Single Page Applications

Single Page Applications (SPAs) present unique challenges for scroll tracking due to their dynamic nature. The default scroll tracking method with enhanced measurement often falls short for several reasons:

1. **Limited Trigger Scope**: In SPAs, the `{{ Scroll Depth Threshold }}` variable and associated triggers typically only activate on the initial page load (the landing page). As users navigate to other "pages" or routes within the SPA, these scroll events don't re-trigger as they would in a traditional multi-page website.

2. **Inaccuracy due to Lazy Loading**: Many SPAs implement lazy loading to improve performance, loading components only as needed. This can interfere with scroll tracking accuracy. For example, if the landing page defers loading of a carousel until it's in or near the viewport, the scroll depth might be reported as 100% prematurely, because the full content length wasn't considered at the initial calculation.

In addressing the scroll tracking issue within our Angular SPA, the logic is divided into three critical parts to ensure accurate and meaningful event firing:

### Detecting Completion of Lazy Loading

The Angular SPA is designed to initially display a loading Div while deferring the loading of components. To track the completion of this process, the ngAfterViewChecked lifecycle hook is employed. This hook is part of Angular's change detection mechanism, which runs after every cycle of view checks. By implementing a check within this hook, the app continuously monitors the presence of the loading Div. Once this Div is no longer found in the DOM, it's interpreted that all deferred components have finished loading. This transition signifies that the page is fully rendered and interactive, marking an ideal point to initiate scroll tracking.

### Accurate Scroll Event Handling

In pages where content length doesn't necessitate scrolling, traditional scroll tracking might inaccurately report a 100% scroll event. To address this, a custom JavaScript variable, as suggested by [Simo Ahava](https://www.simoahava.com/analytics/customize-scroll-depth-trigger/), is implemented. This variable introduces a refined logic that discerns between meaningful and unmeaningful scroll events. It accounts for various factors like the viewport size, content length, and user interaction to determine if a scroll event genuinely represents user engagement or is merely a default behavior in a non-scrollable context. By integrating this variable, the scroll tracking becomes more precise, only firing events that truly reflect user interaction and intent.

By combining these two strategies, the Angular SPA not only ensures that all components are fully loaded before initiating scroll tracking but also refines the scroll tracking mechanism to report only meaningful interactions. This dual approach significantly enhances the accuracy of engagement metrics, providing more reliable data for understanding user behavior and optimizing the website experience.

### Custom HTML script

By implementing this custom method, the project can more accurately track user engagement and scroll behavior throughout the entire SPA, regardless of how content is loaded or how users navigate between sections. You may involve the logic in the sample app. The usual triggers would be `window loaded` for the initial page loading and the `history change` trigger when route changes.

<details>
<summary>Custom HTML</summary>

```html
<script>
  // IIFE to avoid global window pollution
  var PageScrollTracker = (function () {
    var dataLayer = window.dataLayer || [];
    var pageScroll = {
      min: 1.0,
      sc25: false,
      sc50: false,
      sc75: false,
      sc95: false,
      sc2pg: true,
      sclstop: 0,
    };

    function init() {
      resetPageScroll();
      calculateMetrics();
    }

    function resetPageScroll() {
      pageScroll = {
        min: 1.0,
        sc25: false,
        sc50: false,
        sc75: false,
        sc95: false,
        sc2pg: true,
        sclstop: 0,
      };
    }

    function calculateMetrics() {
      pageScroll.DocSize = getViewportHeight() / getDocumentHeight();
      pageScroll.DocSizeName = getViewportHeight() / getDocumentHeight() < pageScroll.min ? "long-doc" : "test1-too-small";
      pageScroll.DocPages = getDocumentHeight() / getViewportHeight();
      pageScroll.DocCP = getCurrentPosition() / getDocumentHeight();
      pageScroll.TooSmall = getViewportHeight() / getDocumentHeight() > pageScroll.min;
    }

    function getDocumentHeight() {
      var selector = "div#__next > div";
      var element = document.querySelector(selector);
      if (element !== null) {
        return element.offsetHeight;
      }
      return Math.max(document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight);
    }

    function getCurrentPosition() {
      return window.pageYOffset + getViewportHeight();
    }

    function getViewportHeight() {
      if (typeof window.innerHeight === "number") {
        return window.innerHeight;
      }
      if (document.documentElement && document.documentElement.clientHeight) {
        return document.documentElement.clientHeight;
      }
      if (document.body && document.body.clientHeight) {
        return document.body.clientHeight;
      }
    }

    function trackScroll() {
      calculateMetrics();
      if (getViewportHeight() / getDocumentHeight() > pageScroll.min) {
        pageScroll.TooSmall = true;
      } else {
        pageScroll.TooSmall = false;
        var isScrollingDown = getCurrentPosition() > pageScroll.sclstop;
        pageScroll.sclstop = getCurrentPosition();
        if (isScrollingDown) {
          checkScrollThresholdsAndPushEvents();
        }
      }
    }

    function checkScrollThresholdsAndPushEvents() {
      var scrollThresholds = [
        { name: "sc25", value: 0.25, pushed: false },
        { name: "sc50", value: 0.5, pushed: false },
        { name: "sc75", value: 0.75, pushed: false },
        { name: "sc95", value: 1, pushed: false },
      ];
      scrollThresholds.forEach(function (threshold) {
        var hasScrolledPastThreshold = getCurrentPosition() >= threshold.value * getDocumentHeight();
        if (hasScrolledPastThreshold && !pageScroll[threshold.name]) {
          // can set the event name manually or pass it as function parameter
          dataLayer.push({ event: "CustomScroll", customScrollPercent: threshold.value * 100 });
          pageScroll[threshold.name] = true;
        }
      });
    }

    return {
      init: init,
      trackScroll: trackScroll,
    };
  })();

  try {
    PageScrollTracker.init();
    window.onscroll = PageScrollTracker.trackScroll;
  } catch (e) {
    console.error("scroll plugin failed.", e);
  }
</script>
```

</details>

## Deep Linking (Android)

### Overview

The deep linking feature allows users to open the app from the website. The project demonstrates how to implement deep linking in the Android application. The implementation is based on the [documentation](https://developer.android.com/training/app-links/deep-linking).

### Website

The website implementation uses `a` tag with the `href` attribute. i.e., `<a href="https://wodenwang820118.github.io/ng-gtm-integration-sample/?utm_source=ng-gtm-integration-sample&utm_medium=website&utm_campaign=app_download">App</a>`. It intends to have UTM parameters to test Firebase UTM tracking. After clicking the link on the mobile browser, the Android application will be opened.

### Android Emulator

Please note that in the `Settings` -> `Apps` -> `All apps` -> `App info` -> `Open by default` settings (or any other way to access the app's setting), the `Links to open in this app` should be enabled with `wodenwang820118.github.io` as the domain. Otherwise, the app will not be opened.

### AndroidManifest.xml

We'll need to add the following code in the `AndroidManifest.xml` file to support deep linking.

```xml
 <intent-filter android:autoVerify="true">
    <action android:name="android.intent.action.VIEW" />
    <action android:name="android.intent.action.MAIN" />
    <category android:name="android.intent.category.DEFAULT" />
    <category android:name="android.intent.category.LAUNCHER" />
    <category android:name="android.intent.category.BROWSABLE" />
    <!-- Accepts URIs that begin with
    "https://wodenwang820118.github.io/ng-gtm-integration-sample/" -->
    <data android:scheme="https" />
    <data android:host="wodenwang820118.github.io" />
    <!-- note that the leading "/" is required for pathPrefix-->
</intent-filter>
```

Please refer to the [Deep Linking documentation](https://developer.android.com/training/app-links/deep-linking) for more information about testing deep linking.

### Localhost testing on an emulator

If you want to test the deep linking feature on an emulator, you could open the development server on the Android emulator Please refer to the [StackOverflow post](https://stackoverflow.com/questions/5806220/how-to-connect-to-my-http-localhost-web-server-from-android-emulator) to open the development server on the Android emulator.

```bash
ng serve --disable-host-check --host 0.0.0.0
```

The default port is 4200.

Then, on the emulator, open the browser and type: `10.0.2.2:4200`

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Build

- Run `npm run build-file` to generate the local file with [http-server](https://github.com/http-party/http-server).
- Run `npm run build-github` to generate the GitHub page. Remember to change the repo to your own.
- By allowing Workflow permissions, the GitHub page will be automatically updated after pushing the code to the `main` branch.

## Documentation as a static site (Experimental)

Utilizing [Docusaurus](https://docusaurus.io/), this project's [REAEMD.md](https://ng-gtm-integration-sample-docs.netlify.app/docs/Overview) is transformed into a static website, which is hosted via Netlify. It is designed specifically for non-technical users, providing an easy-to-understand overview of the project and topics related to GTM, without the need for familiarity with GitHub or GitLab.

## License

MIT
