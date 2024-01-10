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
