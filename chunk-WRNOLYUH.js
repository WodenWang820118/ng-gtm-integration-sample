import{d as i,i as c}from"./chunk-XHDSLAJA.js";var r=function(o){return o.FLUTTER="flutter",o.ANDROID="android",o.IOS="ios",o.UNKNOWN="unknown",o}(r||{});var l=(()=>{let a=class a{constructor(){}getPlatform(){return window.flutter_inappwebview?r.FLUTTER:window.AnalyticsWebInterface?r.ANDROID:window.webkit&&window.webkit.messageHandlers&&window.webkit.messageHandlers.firebase?r.IOS:r.UNKNOWN}};a.\u0275fac=function(t){return new(t||a)},a.\u0275prov=i({token:a,factory:a.\u0275fac,providedIn:"root"});let o=a;return o})();var p=(()=>{let a=class a{constructor(e){this.envDetector=e}logEvent(e,t){switch(this.envDetector.getPlatform()){case r.FLUTTER:this.flutterHandler(e,t,"eventHandler");break;case r.ANDROID:this.androidHandler(e,t,"logEvent");break;case r.IOS:this.iosHandler(e,t,"logEvent");break;default:break}}setUserProperty(e,t){switch(this.envDetector.getPlatform()){case r.FLUTTER:this.flutterHandler(e,t,"userPropertyHandler");break;case r.ANDROID:this.androidHandler(e,t,"setUserProperty");break;case r.IOS:this.iosHandler(e,t,"setUserProperty");break;default:break}}setUserId(e="123456"){let t=window.dataLayer||[];switch(this.envDetector.getPlatform()){case r.FLUTTER:window.flutter_inappwebview.callHandler("userIdHandler",{user_id:e});break;case r.ANDROID:this.androidHandler("null",e,"setUserId");break;case r.IOS:break;default:break}}flutterHandler(e,t,n){try{window.flutter_inappwebview.callHandler(n,{name:e,params:t})}catch(s){console.log(s)}}androidHandler(e,t,n){try{switch(n){case"logEvent":window.AnalyticsWebInterface.logEvent(e,JSON.stringify(t));break;case"setUserProperty":window.AnalyticsWebInterface.setUserProperty(e,t);break;case"setUserId":window.AnalyticsWebInterface.setUserId(t);break;default:break}}catch(s){console.log(s)}}iosHandler(e,t,n){try{let s={command:n,name:e,parameters:t};window.webkit.messageHandlers.firebase.postMessage(s)}catch(s){console.log(s)}}};a.\u0275fac=function(t){return new(t||a)(c(l))},a.\u0275prov=i({token:a,factory:a.\u0275fac,providedIn:"root"});let o=a;return o})();export{l as a,p as b};
