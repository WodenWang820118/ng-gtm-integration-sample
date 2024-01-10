## Enhancing Scroll Tracking in Single Page Applications

Single Page Applications (SPAs) present unique challenges for scroll tracking due to their dynamic nature. The default scroll tracking method with enhanced measurement often falls short for several reasons:

1. **Limited Trigger Scope**: In SPAs, the `{{ Scroll Depth Threshold }}` variable and associated triggers typically only activate on the initial page load (the landing page). As users navigate to other "pages" or routes within the SPA, these scroll events don't re-trigger as they would in a traditional multi-page website.

2. **Inaccuracy due to Lazy Loading**: Many SPAs implement lazy loading to improve performance, loading components only as needed. This can interfere with scroll tracking accuracy. For example, if the landing page defers loading of a carousel until it's in or near the viewport, the scroll depth might be reported as 100% prematurely, because the full content length wasn't considered at the initial calculation.

To address these issues and achieve accurate scroll tracking across all parts of a SPA, the project adopts a custom solution. The approach involves:

- **Custom HTML in GTM**: Instead of relying on the default settings, a custom HTML tag in Google Tag Manager (GTM) is used to monitor and report scroll depth. This allows for more precise control and ensures that scroll tracking is responsive to the SPA's dynamic content and navigation.

By implementing this custom method, the project can more accurately track user engagement and scroll behavior throughout the entire SPA, regardless of how content is loaded or how users navigate between sections. You may involve the logic in the sample app.

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
