import{a as ae,b as le,d as ce,f as pe,g as de,i as he,j as ue,k as ge,m as fe}from"./chunk-C2HNWMJH.js";import{b as se}from"./chunk-WM6QRSU2.js";import{Da as M,e as oe}from"./chunk-G7PQ22R5.js";import"./chunk-WRNOLYUH.js";import{$a as J,C as H,Ia as G,J as R,K,_a as X,a as W,ab as ee,ba as C,ca as $,d as l,ea as Q,fa as Y,g as B,gb as te,ha as q,i as g,ia as T,j as Z,o as z,ob as re,qb as ie,s as I,ub as ne}from"./chunk-XHDSLAJA.js";import{A as u,B as c,I as d,K as L,N as x,Q as V,T as m,V as S,f as b,g as F,l as E,m as j,p,t as U,u as A,w as k,z as O}from"./chunk-YEGXVBAB.js";import{a as _}from"./chunk-OGBJ4DTI.js";var me=[{path:"home",loadChildren:()=>import("./chunk-HC4WBYY2.js").then(n=>n.HOME_ROUTES)},{path:"product",loadChildren:()=>import("./chunk-OQGUZNFH.js").then(n=>n.PRODUCT_ROUTES)},{path:"transaction",loadChildren:()=>import("./chunk-QHQXN6EY.js").then(n=>n.TRANSACTION_ROUTES)},{path:"admin",loadChildren:()=>import("./chunk-NUUTVIEY.js").then(n=>n.ADMIN_ROUTES)},{path:"**",redirectTo:"home"}];var y="Service workers are disabled or not supported by this browser";function ke(n){return A(()=>j(new Error(n)))}var f=class{constructor(e){if(this.serviceWorker=e,!e)this.worker=this.events=this.registration=ke(y);else{let t=k(e,"controllerchange").pipe(p(()=>e.controller)),r=A(()=>E(e.controller)),o=U(r,t);this.worker=o.pipe(c(h=>!!h)),this.registration=this.worker.pipe(m(()=>e.getRegistration()));let N=k(e,"message").pipe(p(h=>h.data)).pipe(c(h=>h&&h.type)).pipe(V());N.connect(),this.events=N}}postMessage(e,i){return this.worker.pipe(d(1),S(t=>{t.postMessage(_({action:e},i))})).toPromise().then(()=>{})}postMessageWithOperation(e,i,t){let r=this.waitForOperationCompleted(t),o=this.postMessage(e,i);return Promise.all([o,r]).then(([,s])=>s)}generateNonce(){return Math.round(Math.random()*1e7)}eventsOfType(e){let i;return typeof e=="string"?i=t=>t.type===e:i=t=>e.includes(t.type),this.events.pipe(c(i))}nextEventOfType(e){return this.eventsOfType(e).pipe(d(1))}waitForOperationCompleted(e){return this.eventsOfType("OPERATION_COMPLETED").pipe(c(i=>i.nonce===e),d(1),p(i=>{if(i.result!==void 0)return i.result;throw new Error(i.error)})).toPromise()}get isEnabled(){return!!this.serviceWorker}},Oe=(()=>{let e=class e{get isEnabled(){return this.sw.isEnabled}constructor(t){if(this.sw=t,this.pushManager=null,this.subscriptionChanges=new b,!t.isEnabled){this.messages=u,this.notificationClicks=u,this.subscription=u;return}this.messages=this.sw.eventsOfType("PUSH").pipe(p(o=>o.data)),this.notificationClicks=this.sw.eventsOfType("NOTIFICATION_CLICK").pipe(p(o=>o.data)),this.pushManager=this.sw.registration.pipe(p(o=>o.pushManager));let r=this.pushManager.pipe(m(o=>o.getSubscription()));this.subscription=O(r,this.subscriptionChanges)}requestSubscription(t){if(!this.sw.isEnabled||this.pushManager===null)return Promise.reject(new Error(y));let r={userVisibleOnly:!0},o=this.decodeBase64(t.serverPublicKey.replace(/_/g,"/").replace(/-/g,"+")),s=new Uint8Array(new ArrayBuffer(o.length));for(let a=0;a<o.length;a++)s[a]=o.charCodeAt(a);return r.applicationServerKey=s,this.pushManager.pipe(m(a=>a.subscribe(r)),d(1)).toPromise().then(a=>(this.subscriptionChanges.next(a),a))}unsubscribe(){if(!this.sw.isEnabled)return Promise.reject(new Error(y));let t=r=>{if(r===null)throw new Error("Not subscribed to push notifications.");return r.unsubscribe().then(o=>{if(!o)throw new Error("Unsubscribe failed!");this.subscriptionChanges.next(null)})};return this.subscription.pipe(d(1),m(t)).toPromise()}decodeBase64(t){return atob(t)}};e.\u0275fac=function(r){return new(r||e)(g(f))},e.\u0275prov=l({token:e,factory:e.\u0275fac});let n=e;return n})(),Re=(()=>{let e=class e{get isEnabled(){return this.sw.isEnabled}constructor(t){if(this.sw=t,!t.isEnabled){this.versionUpdates=u,this.unrecoverable=u;return}this.versionUpdates=this.sw.eventsOfType(["VERSION_DETECTED","VERSION_INSTALLATION_FAILED","VERSION_READY","NO_NEW_VERSION_DETECTED"]),this.unrecoverable=this.sw.eventsOfType("UNRECOVERABLE_STATE")}checkForUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(y));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("CHECK_FOR_UPDATES",{nonce:t},t)}activateUpdate(){if(!this.sw.isEnabled)return Promise.reject(new Error(y));let t=this.sw.generateNonce();return this.sw.postMessageWithOperation("ACTIVATE_UPDATE",{nonce:t},t)}};e.\u0275fac=function(r){return new(r||e)(g(f))},e.\u0275prov=l({token:e,factory:e.\u0275fac});let n=e;return n})();var ve=new B("");function Me(n,e,i,t){return()=>{if(!(M(t)&&"serviceWorker"in navigator&&i.enabled!==!1))return;navigator.serviceWorker.addEventListener("controllerchange",()=>{navigator.serviceWorker.controller!==null&&navigator.serviceWorker.controller.postMessage({action:"INITIALIZE"})});let r;if(typeof i.registrationStrategy=="function")r=i.registrationStrategy();else{let[s,...a]=(i.registrationStrategy||"registerWhenStable:30000").split(":");switch(s){case"registerImmediately":r=E(null);break;case"registerWithDelay":r=ye(+a[0]||0);break;case"registerWhenStable":r=a[0]?O(we(n),ye(+a[0])):we(n);break;default:throw new Error(`Unknown ServiceWorker registration strategy: ${i.registrationStrategy}`)}}n.get(T).runOutsideAngular(()=>r.pipe(d(1)).subscribe(()=>navigator.serviceWorker.register(e,{scope:i.scope}).catch(s=>console.error("Service worker registration failed with:",s))))}}function ye(n){return E(null).pipe(L(n))}function we(n){return n.get(ie).isStable.pipe(c(i=>i))}function Pe(n,e){return new f(M(e)&&n.enabled!==!1?navigator.serviceWorker:void 0)}var v=class{};function be(n,e={}){return I([Oe,Re,{provide:ve,useValue:n},{provide:v,useValue:e},{provide:f,useFactory:Pe,deps:[v,R]},{provide:re,useFactory:Me,deps:[H,ve,v,R],multi:!0}])}var De="@",Ne=(()=>{let e=class e{constructor(t,r,o,s,a){this.doc=t,this.delegate=r,this.zone=o,this.animationType=s,this.moduleImpl=a,this._rendererFactoryPromise=null,this.scheduler=Z(Q,{optional:!0})}ngOnDestroy(){this._engine?.flush()}loadImpl(){return(this.moduleImpl??import("./chunk-Q2UCQ66U.js")).catch(r=>{throw new W(5300,!1)}).then(({\u0275createEngine:r,\u0275AnimationRendererFactory:o})=>{this._engine=r(this.animationType,this.doc,this.scheduler);let s=new o(this.delegate,this._engine,this.zone);return this.delegate=s,s})}createRenderer(t,r){let o=this.delegate.createRenderer(t,r);if(o.\u0275type===0)return o;typeof o.throwOnSyntheticProps=="boolean"&&(o.throwOnSyntheticProps=!1);let s=new P(o);return r?.data?.animation&&!this._rendererFactoryPromise&&(this._rendererFactoryPromise=this.loadImpl()),this._rendererFactoryPromise?.then(a=>{let D=a.createRenderer(t,r);s.use(D)}).catch(a=>{s.use(o)}),s}begin(){this.delegate.begin?.()}end(){this.delegate.end?.()}whenRenderingDone(){return this.delegate.whenRenderingDone?.()??Promise.resolve()}};e.\u0275fac=function(r){$()},e.\u0275prov=l({token:e,factory:e.\u0275fac});let n=e;return n})(),P=class{constructor(e){this.delegate=e,this.replay=[],this.\u0275type=1}use(e){if(this.delegate=e,this.replay!==null){for(let i of this.replay)i(e);this.replay=null}}get data(){return this.delegate.data}destroy(){this.replay=null,this.delegate.destroy()}createElement(e,i){return this.delegate.createElement(e,i)}createComment(e){return this.delegate.createComment(e)}createText(e){return this.delegate.createText(e)}get destroyNode(){return this.delegate.destroyNode}appendChild(e,i){this.delegate.appendChild(e,i)}insertBefore(e,i,t,r){this.delegate.insertBefore(e,i,t,r)}removeChild(e,i,t){this.delegate.removeChild(e,i,t)}selectRootElement(e,i){return this.delegate.selectRootElement(e,i)}parentNode(e){return this.delegate.parentNode(e)}nextSibling(e){return this.delegate.nextSibling(e)}setAttribute(e,i,t,r){this.delegate.setAttribute(e,i,t,r)}removeAttribute(e,i,t){this.delegate.removeAttribute(e,i,t)}addClass(e,i){this.delegate.addClass(e,i)}removeClass(e,i){this.delegate.removeClass(e,i)}setStyle(e,i,t,r){this.delegate.setStyle(e,i,t,r)}removeStyle(e,i,t){this.delegate.removeStyle(e,i,t)}setProperty(e,i,t){this.shouldReplay(i)&&this.replay.push(r=>r.setProperty(e,i,t)),this.delegate.setProperty(e,i,t)}setValue(e,i){this.delegate.setValue(e,i)}listen(e,i,t){return this.shouldReplay(i)&&this.replay.push(r=>r.listen(e,i,t)),this.delegate.listen(e,i,t)}shouldReplay(e){return this.replay!==null&&e.startsWith(De)}};function Ee(n="animations"){return q("NgAsyncAnimations"),I([{provide:Y,useFactory:(e,i,t)=>new Ne(e,i,t,n),deps:[oe,ae,T]},{provide:K,useValue:n==="noop"?"NoopAnimations":"BrowserAnimations"}])}var Se={providers:[ue(me,ge(he)),se(),Ee(),be("ngsw-worker.js",{enabled:!ne(),registrationStrategy:"registerWhenStable:30000"})]};var Ie=(()=>{let e=class e{constructor(t,r){this.analyticsService=t,this.router=r}initializeUrlTracking(){this.router.events.pipe(c(t=>t instanceof ce)).subscribe(t=>{this.analyticsService.trackPageViewECEvent(t.url),t.url.includes("/destinations")?this.analyticsService.trackEvent("page_view",{page_path:t.url,page_title:"Destinations",page_location:window.location.href}):t.url.includes("/thankyou")?this.analyticsService.trackEvent("page_view",{page_path:t.url,page_title:"Thank You",page_location:window.location.href}):t.url.includes("/detail")?this.analyticsService.trackEvent("page_view",{page_path:t.url,page_title:"Detail",page_location:window.location.href}):t.url.includes("/basket")?this.analyticsService.trackEvent("page_view",{page_path:t.url,page_title:"Basket",page_location:window.location.href}):t.url.includes("/login")?this.analyticsService.trackEvent("page_view",{page_path:t.url,page_title:"Login",page_location:window.location.href}):t.url.includes("/checkout")?this.analyticsService.trackEvent("page_view",{page_path:t.url,page_title:"Checkout",page_location:window.location.href}):this.analyticsService.trackEvent("page_view",{page_path:t.url,page_title:"Home",page_location:window.location.href})})}};e.\u0275fac=function(r){return new(r||e)(g(fe),g(de))},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var Ce=(()=>{let e=class e{constructor(){this.loadingState=new F(!0)}setLoadingState(t){this.loadingState.next(t)}getLoadingState(){return this.loadingState.asObservable()}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var Te=(()=>{let e=class e{constructor(){}appendAllStyles(){this.appendStyle("bootstrap.css"),this.appendStyle("styles.css"),this.appendStyle("bootstrap-icons.css")}appendStyle(t){let r=document.createElement("link");r.rel="stylesheet",r.type="text/css",r.href=t,document.head.appendChild(r)}};e.\u0275fac=function(r){return new(r||e)},e.\u0275prov=l({token:e,factory:e.\u0275fac,providedIn:"root"});let n=e;return n})();var Ue=["loadingDiv"],Ae=(()=>{let e=class e{constructor(t,r,o){this.urlTrackerService=t,this.loadingService=r,this.styleLoadService=o,this.title="ng-gtm-integration-sample",this.destroy$=new b}ngOnInit(){this.styleLoadService.appendAllStyles(),this.loadingService.getLoadingState().pipe(x(t=>!t),S(t=>{t||window.dataLayer.push({event:"componentsLoaded"})})).subscribe(),this.urlTrackerService.initializeUrlTracking()}ngAfterContentInit(){window.onload=()=>{}}ngAfterViewChecked(){try{this.loadingDiv.nativeElement&&this.loadingService.setLoadingState(!0)}catch{this.loadingService.setLoadingState(!1)}}ngOnDestroy(){this.destroy$.next(),this.destroy$.complete()}};e.\u0275fac=function(r){return new(r||e)(C(Ie),C(Ce),C(Te))},e.\u0275cmp=z({type:e,selectors:[["app-root"]],viewQuery:function(r,o){if(r&1&&X(Ue,5),r&2){let s;J(s=ee())&&(o.loadingDiv=s.first)}},standalone:!0,features:[te],decls:1,vars:0,template:function(r,o){r&1&&G(0,"router-outlet")},dependencies:[pe],encapsulation:2});let n=e;return n})();le(Ae,Se).catch(n=>console.error(n));