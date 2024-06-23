import{a as Z,b as ee,j as h}from"./chunk-OGBJ4DTI.js";var ne=function(t){let e=[],n=0;for(let i=0;i<t.length;i++){let r=t.charCodeAt(i);r<128?e[n++]=r:r<2048?(e[n++]=r>>6|192,e[n++]=r&63|128):(r&64512)===55296&&i+1<t.length&&(t.charCodeAt(i+1)&64512)===56320?(r=65536+((r&1023)<<10)+(t.charCodeAt(++i)&1023),e[n++]=r>>18|240,e[n++]=r>>12&63|128,e[n++]=r>>6&63|128,e[n++]=r&63|128):(e[n++]=r>>12|224,e[n++]=r>>6&63|128,e[n++]=r&63|128)}return e},we=function(t){let e=[],n=0,i=0;for(;n<t.length;){let r=t[n++];if(r<128)e[i++]=String.fromCharCode(r);else if(r>191&&r<224){let s=t[n++];e[i++]=String.fromCharCode((r&31)<<6|s&63)}else if(r>239&&r<365){let s=t[n++],o=t[n++],a=t[n++],c=((r&7)<<18|(s&63)<<12|(o&63)<<6|a&63)-65536;e[i++]=String.fromCharCode(55296+(c>>10)),e[i++]=String.fromCharCode(56320+(c&1023))}else{let s=t[n++],o=t[n++];e[i++]=String.fromCharCode((r&15)<<12|(s&63)<<6|o&63)}}return e.join("")},re={byteToCharMap_:null,charToByteMap_:null,byteToCharMapWebSafe_:null,charToByteMapWebSafe_:null,ENCODED_VALS_BASE:"ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",get ENCODED_VALS(){return this.ENCODED_VALS_BASE+"+/="},get ENCODED_VALS_WEBSAFE(){return this.ENCODED_VALS_BASE+"-_."},HAS_NATIVE_SUPPORT:typeof atob=="function",encodeByteArray(t,e){if(!Array.isArray(t))throw Error("encodeByteArray takes an array as a parameter");this.init_();let n=e?this.byteToCharMapWebSafe_:this.byteToCharMap_,i=[];for(let r=0;r<t.length;r+=3){let s=t[r],o=r+1<t.length,a=o?t[r+1]:0,c=r+2<t.length,l=c?t[r+2]:0,Q=s>>2,_=(s&3)<<4|a>>4,D=(a&15)<<2|l>>6,I=l&63;c||(I=64,o||(D=64)),i.push(n[Q],n[_],n[D],n[I])}return i.join("")},encodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?btoa(t):this.encodeByteArray(ne(t),e)},decodeString(t,e){return this.HAS_NATIVE_SUPPORT&&!e?atob(t):we(this.decodeStringToByteArray(t,e))},decodeStringToByteArray(t,e){this.init_();let n=e?this.charToByteMapWebSafe_:this.charToByteMap_,i=[];for(let r=0;r<t.length;){let s=n[t.charAt(r++)],a=r<t.length?n[t.charAt(r)]:0;++r;let l=r<t.length?n[t.charAt(r)]:64;++r;let _=r<t.length?n[t.charAt(r)]:64;if(++r,s==null||a==null||l==null||_==null)throw new R;let D=s<<2|a>>4;if(i.push(D),l!==64){let I=a<<4&240|l>>2;if(i.push(I),_!==64){let ve=l<<6&192|_;i.push(ve)}}}return i},init_(){if(!this.byteToCharMap_){this.byteToCharMap_={},this.charToByteMap_={},this.byteToCharMapWebSafe_={},this.charToByteMapWebSafe_={};for(let t=0;t<this.ENCODED_VALS.length;t++)this.byteToCharMap_[t]=this.ENCODED_VALS.charAt(t),this.charToByteMap_[this.byteToCharMap_[t]]=t,this.byteToCharMapWebSafe_[t]=this.ENCODED_VALS_WEBSAFE.charAt(t),this.charToByteMapWebSafe_[this.byteToCharMapWebSafe_[t]]=t,t>=this.ENCODED_VALS_BASE.length&&(this.charToByteMap_[this.ENCODED_VALS_WEBSAFE.charAt(t)]=t,this.charToByteMapWebSafe_[this.ENCODED_VALS.charAt(t)]=t)}}},R=class extends Error{constructor(){super(...arguments),this.name="DecodeBase64StringError"}},De=function(t){let e=ne(t);return re.encodeByteArray(e,!0)},y=function(t){return De(t).replace(/\./g,"")},Ie=function(t){try{return re.decodeString(t,!0)}catch(e){console.error("base64Decode failed: ",e)}return null};function Se(){if(typeof self<"u")return self;if(typeof window<"u")return window;if(typeof global<"u")return global;throw new Error("Unable to locate global object.")}var Ce=()=>Se().__FIREBASE_DEFAULTS__,Ae=()=>{if(typeof process>"u"||typeof process.env>"u")return;let t=process.env.__FIREBASE_DEFAULTS__;if(t)return JSON.parse(t)},Oe=()=>{if(typeof document>"u")return;let t;try{t=document.cookie.match(/__FIREBASE_DEFAULTS__=([^;]+)/)}catch{return}let e=t&&Ie(t[1]);return e&&JSON.parse(e)},C=()=>{try{return Ce()||Ae()||Oe()}catch(t){console.info(`Unable to get __FIREBASE_DEFAULTS__ due to: ${t}`);return}},xe=t=>{var e,n;return(n=(e=C())===null||e===void 0?void 0:e.emulatorHosts)===null||n===void 0?void 0:n[t]},Pt=t=>{let e=xe(t);if(!e)return;let n=e.lastIndexOf(":");if(n<=0||n+1===e.length)throw new Error(`Invalid host ${e} with no separate hostname and port!`);let i=parseInt(e.substring(n+1),10);return e[0]==="["?[e.substring(1,n-1),i]:[e.substring(0,n),i]},L=()=>{var t;return(t=C())===null||t===void 0?void 0:t.config},kt=t=>{var e;return(e=C())===null||e===void 0?void 0:e[`_${t}`]};var S=class{constructor(){this.reject=()=>{},this.resolve=()=>{},this.promise=new Promise((e,n)=>{this.resolve=e,this.reject=n})}wrapCallback(e){return(n,i)=>{n?this.reject(n):this.resolve(i),typeof e=="function"&&(this.promise.catch(()=>{}),e.length===1?e(n):e(n,i))}}};function jt(t,e){if(t.uid)throw new Error('The "uid" field is no longer supported by mockUserToken. Please use "sub" instead for Firebase Auth User ID.');let n={alg:"none",type:"JWT"},i=e||"demo-project",r=t.iat||0,s=t.sub||t.user_id;if(!s)throw new Error("mockUserToken must contain 'sub' or 'user_id' field!");let o=Object.assign({iss:`https://securetoken.google.com/${i}`,aud:i,iat:r,exp:r+3600,auth_time:r,sub:s,user_id:s,firebase:{sign_in_provider:"custom",identities:{}}},t);return[y(JSON.stringify(n)),y(JSON.stringify(o)),""].join(".")}function ie(){return typeof navigator<"u"&&typeof navigator.userAgent=="string"?navigator.userAgent:""}function Ft(){return typeof window<"u"&&!!(window.cordova||window.phonegap||window.PhoneGap)&&/ios|iphone|ipod|ipad|android|blackberry|iemobile/i.test(ie())}function Be(){var t;let e=(t=C())===null||t===void 0?void 0:t.forceEnvironment;if(e==="node")return!0;if(e==="browser")return!1;try{return Object.prototype.toString.call(global.process)==="[object process]"}catch{return!1}}function Ht(){let t=typeof chrome=="object"?chrome.runtime:typeof browser=="object"?browser.runtime:void 0;return typeof t=="object"&&t.id!==void 0}function zt(){return typeof navigator=="object"&&navigator.product==="ReactNative"}function Ut(){let t=ie();return t.indexOf("MSIE ")>=0||t.indexOf("Trident/")>=0}function Vt(){return!Be()&&!!navigator.userAgent&&navigator.userAgent.includes("Safari")&&!navigator.userAgent.includes("Chrome")}function se(){try{return typeof indexedDB=="object"}catch{return!1}}function oe(){return new Promise((t,e)=>{try{let n=!0,i="validate-browser-context-for-indexeddb-analytics-module",r=self.indexedDB.open(i);r.onsuccess=()=>{r.result.close(),n||self.indexedDB.deleteDatabase(i),t(!0)},r.onupgradeneeded=()=>{n=!1},r.onerror=()=>{var s;e(((s=r.error)===null||s===void 0?void 0:s.message)||"")}}catch(n){e(n)}})}var Te="FirebaseError",p=class t extends Error{constructor(e,n,i){super(n),this.code=e,this.customData=i,this.name=Te,Object.setPrototypeOf(this,t.prototype),Error.captureStackTrace&&Error.captureStackTrace(this,E.prototype.create)}},E=class{constructor(e,n,i){this.service=e,this.serviceName=n,this.errors=i}create(e,...n){let i=n[0]||{},r=`${this.service}/${e}`,s=this.errors[e],o=s?Ne(s,i):"Error",a=`${this.serviceName}: ${o} (${r}).`;return new p(r,a,i)}};function Ne(t,e){return t.replace(Re,(n,i)=>{let r=e[i];return r!=null?String(r):`<${i}?>`})}var Re=/\{\$([^}]+)}/g;function Wt(t){for(let e in t)if(Object.prototype.hasOwnProperty.call(t,e))return!1;return!0}function A(t,e){if(t===e)return!0;let n=Object.keys(t),i=Object.keys(e);for(let r of n){if(!i.includes(r))return!1;let s=t[r],o=e[r];if(te(s)&&te(o)){if(!A(s,o))return!1}else if(s!==o)return!1}for(let r of i)if(!n.includes(r))return!1;return!0}function te(t){return t!==null&&typeof t=="object"}function Gt(t){let e=[];for(let[n,i]of Object.entries(t))Array.isArray(i)?i.forEach(r=>{e.push(encodeURIComponent(n)+"="+encodeURIComponent(r))}):e.push(encodeURIComponent(n)+"="+encodeURIComponent(i));return e.length?"&"+e.join("&"):""}function Jt(t,e){let n=new M(t,e);return n.subscribe.bind(n)}var M=class{constructor(e,n){this.observers=[],this.unsubscribes=[],this.observerCount=0,this.task=Promise.resolve(),this.finalized=!1,this.onNoObservers=n,this.task.then(()=>{e(this)}).catch(i=>{this.error(i)})}next(e){this.forEachObserver(n=>{n.next(e)})}error(e){this.forEachObserver(n=>{n.error(e)}),this.close(e)}complete(){this.forEachObserver(e=>{e.complete()}),this.close()}subscribe(e,n,i){let r;if(e===void 0&&n===void 0&&i===void 0)throw new Error("Missing Observer.");Me(e,["next","error","complete"])?r=e:r={next:e,error:n,complete:i},r.next===void 0&&(r.next=N),r.error===void 0&&(r.error=N),r.complete===void 0&&(r.complete=N);let s=this.unsubscribeOne.bind(this,this.observers.length);return this.finalized&&this.task.then(()=>{try{this.finalError?r.error(this.finalError):r.complete()}catch{}}),this.observers.push(r),s}unsubscribeOne(e){this.observers===void 0||this.observers[e]===void 0||(delete this.observers[e],this.observerCount-=1,this.observerCount===0&&this.onNoObservers!==void 0&&this.onNoObservers(this))}forEachObserver(e){if(!this.finalized)for(let n=0;n<this.observers.length;n++)this.sendOne(n,e)}sendOne(e,n){this.task.then(()=>{if(this.observers!==void 0&&this.observers[e]!==void 0)try{n(this.observers[e])}catch(i){typeof console<"u"&&console.error&&console.error(i)}})}close(e){this.finalized||(this.finalized=!0,e!==void 0&&(this.finalError=e),this.task.then(()=>{this.observers=void 0,this.onNoObservers=void 0}))}};function Me(t,e){if(typeof t!="object"||t===null)return!1;for(let n of e)if(n in t&&typeof t[n]=="function")return!0;return!1}function N(){}var Kt=4*60*60*1e3;function Yt(t){return t&&t._delegate?t._delegate:t}var b=class{constructor(e,n,i){this.name=e,this.instanceFactory=n,this.type=i,this.multipleInstances=!1,this.serviceProps={},this.instantiationMode="LAZY",this.onInstanceCreated=null}setInstantiationMode(e){return this.instantiationMode=e,this}setMultipleInstances(e){return this.multipleInstances=e,this}setServiceProps(e){return this.serviceProps=e,this}setInstanceCreatedCallback(e){return this.onInstanceCreated=e,this}};var m="[DEFAULT]";var $=class{constructor(e,n){this.name=e,this.container=n,this.component=null,this.instances=new Map,this.instancesDeferred=new Map,this.instancesOptions=new Map,this.onInitCallbacks=new Map}get(e){let n=this.normalizeInstanceIdentifier(e);if(!this.instancesDeferred.has(n)){let i=new S;if(this.instancesDeferred.set(n,i),this.isInitialized(n)||this.shouldAutoInitialize())try{let r=this.getOrInitializeService({instanceIdentifier:n});r&&i.resolve(r)}catch{}}return this.instancesDeferred.get(n).promise}getImmediate(e){var n;let i=this.normalizeInstanceIdentifier(e?.identifier),r=(n=e?.optional)!==null&&n!==void 0?n:!1;if(this.isInitialized(i)||this.shouldAutoInitialize())try{return this.getOrInitializeService({instanceIdentifier:i})}catch(s){if(r)return null;throw s}else{if(r)return null;throw Error(`Service ${this.name} is not available`)}}getComponent(){return this.component}setComponent(e){if(e.name!==this.name)throw Error(`Mismatching Component ${e.name} for Provider ${this.name}.`);if(this.component)throw Error(`Component for ${this.name} has already been provided`);if(this.component=e,!!this.shouldAutoInitialize()){if($e(e))try{this.getOrInitializeService({instanceIdentifier:m})}catch{}for(let[n,i]of this.instancesDeferred.entries()){let r=this.normalizeInstanceIdentifier(n);try{let s=this.getOrInitializeService({instanceIdentifier:r});i.resolve(s)}catch{}}}}clearInstance(e=m){this.instancesDeferred.delete(e),this.instancesOptions.delete(e),this.instances.delete(e)}delete(){return h(this,null,function*(){let e=Array.from(this.instances.values());yield Promise.all([...e.filter(n=>"INTERNAL"in n).map(n=>n.INTERNAL.delete()),...e.filter(n=>"_delete"in n).map(n=>n._delete())])})}isComponentSet(){return this.component!=null}isInitialized(e=m){return this.instances.has(e)}getOptions(e=m){return this.instancesOptions.get(e)||{}}initialize(e={}){let{options:n={}}=e,i=this.normalizeInstanceIdentifier(e.instanceIdentifier);if(this.isInitialized(i))throw Error(`${this.name}(${i}) has already been initialized`);if(!this.isComponentSet())throw Error(`Component ${this.name} has not been registered yet`);let r=this.getOrInitializeService({instanceIdentifier:i,options:n});for(let[s,o]of this.instancesDeferred.entries()){let a=this.normalizeInstanceIdentifier(s);i===a&&o.resolve(r)}return r}onInit(e,n){var i;let r=this.normalizeInstanceIdentifier(n),s=(i=this.onInitCallbacks.get(r))!==null&&i!==void 0?i:new Set;s.add(e),this.onInitCallbacks.set(r,s);let o=this.instances.get(r);return o&&e(o,r),()=>{s.delete(e)}}invokeOnInitCallbacks(e,n){let i=this.onInitCallbacks.get(n);if(i)for(let r of i)try{r(e,n)}catch{}}getOrInitializeService({instanceIdentifier:e,options:n={}}){let i=this.instances.get(e);if(!i&&this.component&&(i=this.component.instanceFactory(this.container,{instanceIdentifier:Le(e),options:n}),this.instances.set(e,i),this.instancesOptions.set(e,n),this.invokeOnInitCallbacks(i,e),this.component.onInstanceCreated))try{this.component.onInstanceCreated(this.container,e,i)}catch{}return i||null}normalizeInstanceIdentifier(e=m){return this.component?this.component.multipleInstances?e:m:e}shouldAutoInitialize(){return!!this.component&&this.component.instantiationMode!=="EXPLICIT"}};function Le(t){return t===m?void 0:t}function $e(t){return t.instantiationMode==="EAGER"}var O=class{constructor(e){this.name=e,this.providers=new Map}addComponent(e){let n=this.getProvider(e.name);if(n.isComponentSet())throw new Error(`Component ${e.name} has already been registered with ${this.name}`);n.setComponent(e)}addOrOverwriteComponent(e){this.getProvider(e.name).isComponentSet()&&this.providers.delete(e.name),this.addComponent(e)}getProvider(e){if(this.providers.has(e))return this.providers.get(e);let n=new $(e,this);return this.providers.set(e,n),n}getProviders(){return Array.from(this.providers.values())}};var Pe=[],f=function(t){return t[t.DEBUG=0]="DEBUG",t[t.VERBOSE=1]="VERBOSE",t[t.INFO=2]="INFO",t[t.WARN=3]="WARN",t[t.ERROR=4]="ERROR",t[t.SILENT=5]="SILENT",t}(f||{}),ke={debug:f.DEBUG,verbose:f.VERBOSE,info:f.INFO,warn:f.WARN,error:f.ERROR,silent:f.SILENT},je=f.INFO,Fe={[f.DEBUG]:"log",[f.VERBOSE]:"log",[f.INFO]:"info",[f.WARN]:"warn",[f.ERROR]:"error"},He=(t,e,...n)=>{if(e<t.logLevel)return;let i=new Date().toISOString(),r=Fe[e];if(r)console[r](`[${i}]  ${t.name}:`,...n);else throw new Error(`Attempted to log a message with an invalid logType (value: ${e})`)},x=class{constructor(e){this.name=e,this._logLevel=je,this._logHandler=He,this._userLogHandler=null,Pe.push(this)}get logLevel(){return this._logLevel}set logLevel(e){if(!(e in f))throw new TypeError(`Invalid value "${e}" assigned to \`logLevel\``);this._logLevel=e}setLogLevel(e){this._logLevel=typeof e=="string"?ke[e]:e}get logHandler(){return this._logHandler}set logHandler(e){if(typeof e!="function")throw new TypeError("Value assigned to `logHandler` must be a function");this._logHandler=e}get userLogHandler(){return this._userLogHandler}set userLogHandler(e){this._userLogHandler=e}debug(...e){this._userLogHandler&&this._userLogHandler(this,f.DEBUG,...e),this._logHandler(this,f.DEBUG,...e)}log(...e){this._userLogHandler&&this._userLogHandler(this,f.VERBOSE,...e),this._logHandler(this,f.VERBOSE,...e)}info(...e){this._userLogHandler&&this._userLogHandler(this,f.INFO,...e),this._logHandler(this,f.INFO,...e)}warn(...e){this._userLogHandler&&this._userLogHandler(this,f.WARN,...e),this._logHandler(this,f.WARN,...e)}error(...e){this._userLogHandler&&this._userLogHandler(this,f.ERROR,...e),this._logHandler(this,f.ERROR,...e)}};var ze=(t,e)=>e.some(n=>t instanceof n),ae,ce;function Ue(){return ae||(ae=[IDBDatabase,IDBObjectStore,IDBIndex,IDBCursor,IDBTransaction])}function Ve(){return ce||(ce=[IDBCursor.prototype.advance,IDBCursor.prototype.continue,IDBCursor.prototype.continuePrimaryKey])}var fe=new WeakMap,k=new WeakMap,le=new WeakMap,P=new WeakMap,F=new WeakMap;function We(t){let e=new Promise((n,i)=>{let r=()=>{t.removeEventListener("success",s),t.removeEventListener("error",o)},s=()=>{n(d(t.result)),r()},o=()=>{i(t.error),r()};t.addEventListener("success",s),t.addEventListener("error",o)});return e.then(n=>{n instanceof IDBCursor&&fe.set(n,t)}).catch(()=>{}),F.set(e,t),e}function Ge(t){if(k.has(t))return;let e=new Promise((n,i)=>{let r=()=>{t.removeEventListener("complete",s),t.removeEventListener("error",o),t.removeEventListener("abort",o)},s=()=>{n(),r()},o=()=>{i(t.error||new DOMException("AbortError","AbortError")),r()};t.addEventListener("complete",s),t.addEventListener("error",o),t.addEventListener("abort",o)});k.set(t,e)}var j={get(t,e,n){if(t instanceof IDBTransaction){if(e==="done")return k.get(t);if(e==="objectStoreNames")return t.objectStoreNames||le.get(t);if(e==="store")return n.objectStoreNames[1]?void 0:n.objectStore(n.objectStoreNames[0])}return d(t[e])},set(t,e,n){return t[e]=n,!0},has(t,e){return t instanceof IDBTransaction&&(e==="done"||e==="store")?!0:e in t}};function he(t){j=t(j)}function Je(t){return t===IDBDatabase.prototype.transaction&&!("objectStoreNames"in IDBTransaction.prototype)?function(e,...n){let i=t.call(B(this),e,...n);return le.set(i,e.sort?e.sort():[e]),d(i)}:Ve().includes(t)?function(...e){return t.apply(B(this),e),d(fe.get(this))}:function(...e){return d(t.apply(B(this),e))}}function Ke(t){return typeof t=="function"?Je(t):(t instanceof IDBTransaction&&Ge(t),ze(t,Ue())?new Proxy(t,j):t)}function d(t){if(t instanceof IDBRequest)return We(t);if(P.has(t))return P.get(t);let e=Ke(t);return e!==t&&(P.set(t,e),F.set(e,t)),e}var B=t=>F.get(t);function ue(t,e,{blocked:n,upgrade:i,blocking:r,terminated:s}={}){let o=indexedDB.open(t,e),a=d(o);return i&&o.addEventListener("upgradeneeded",c=>{i(d(o.result),c.oldVersion,c.newVersion,d(o.transaction),c)}),n&&o.addEventListener("blocked",c=>n(c.oldVersion,c.newVersion,c)),a.then(c=>{s&&c.addEventListener("close",()=>s()),r&&c.addEventListener("versionchange",l=>r(l.oldVersion,l.newVersion,l))}).catch(()=>{}),a}var Ye=["get","getKey","getAll","getAllKeys","count"],qe=["put","add","delete","clear"],H=new Map;function de(t,e){if(!(t instanceof IDBDatabase&&!(e in t)&&typeof e=="string"))return;if(H.get(e))return H.get(e);let n=e.replace(/FromIndex$/,""),i=e!==n,r=qe.includes(n);if(!(n in(i?IDBIndex:IDBObjectStore).prototype)||!(r||Ye.includes(n)))return;let s=function(o,...a){return h(this,null,function*(){let c=this.transaction(o,r?"readwrite":"readonly"),l=c.store;return i&&(l=l.index(a.shift())),(yield Promise.all([l[n](...a),r&&c.done]))[0]})};return H.set(e,s),s}he(t=>ee(Z({},t),{get:(e,n,i)=>de(e,n)||t.get(e,n,i),has:(e,n)=>!!de(e,n)||t.has(e,n)}));var U=class{constructor(e){this.container=e}getPlatformInfoString(){return this.container.getProviders().map(n=>{if(Xe(n)){let i=n.getImmediate();return`${i.library}/${i.version}`}else return null}).filter(n=>n).join(" ")}};function Xe(t){let e=t.getComponent();return e?.type==="VERSION"}var V="@firebase/app",pe="0.10.5";var g=new x("@firebase/app"),Qe="@firebase/app-compat",Ze="@firebase/analytics-compat",et="@firebase/analytics",tt="@firebase/app-check-compat",nt="@firebase/app-check",rt="@firebase/auth",it="@firebase/auth-compat",st="@firebase/database",ot="@firebase/database-compat",at="@firebase/functions",ct="@firebase/functions-compat",ft="@firebase/installations",lt="@firebase/installations-compat",ht="@firebase/messaging",dt="@firebase/messaging-compat",ut="@firebase/performance",pt="@firebase/performance-compat",mt="@firebase/remote-config",bt="@firebase/remote-config-compat",gt="@firebase/storage",_t="@firebase/storage-compat",yt="@firebase/firestore",Et="@firebase/vertexai-preview",vt="@firebase/firestore-compat",wt="firebase",Dt="10.12.2";var W="[DEFAULT]",It={[V]:"fire-core",[Qe]:"fire-core-compat",[et]:"fire-analytics",[Ze]:"fire-analytics-compat",[nt]:"fire-app-check",[tt]:"fire-app-check-compat",[rt]:"fire-auth",[it]:"fire-auth-compat",[st]:"fire-rtdb",[ot]:"fire-rtdb-compat",[at]:"fire-fn",[ct]:"fire-fn-compat",[ft]:"fire-iid",[lt]:"fire-iid-compat",[ht]:"fire-fcm",[dt]:"fire-fcm-compat",[ut]:"fire-perf",[pt]:"fire-perf-compat",[mt]:"fire-rc",[bt]:"fire-rc-compat",[gt]:"fire-gcs",[_t]:"fire-gcs-compat",[yt]:"fire-fst",[vt]:"fire-fst-compat",[Et]:"fire-vertex","fire-js":"fire-js",[wt]:"fire-js-all"};var T=new Map,St=new Map,G=new Map;function me(t,e){try{t.container.addComponent(e)}catch(n){g.debug(`Component ${e.name} failed to register with FirebaseApp ${t.name}`,n)}}function J(t){let e=t.name;if(G.has(e))return g.debug(`There were multiple attempts to register component ${e}.`),!1;G.set(e,t);for(let n of T.values())me(n,t);for(let n of St.values())me(n,t);return!0}function pn(t,e){let n=t.container.getProvider("heartbeat").getImmediate({optional:!0});return n&&n.triggerHeartbeat(),t.container.getProvider(e)}function mn(t){return t.settings!==void 0}var Ct={"no-app":"No Firebase App '{$appName}' has been created - call initializeApp() first","bad-app-name":"Illegal App name: '{$appName}'","duplicate-app":"Firebase App named '{$appName}' already exists with different options or config","app-deleted":"Firebase App named '{$appName}' already deleted","server-app-deleted":"Firebase Server App has been deleted","no-options":"Need to provide options, when not being deployed to hosting via source.","invalid-app-argument":"firebase.{$appName}() takes either no argument or a Firebase App instance.","invalid-log-argument":"First argument to `onLog` must be null or a function.","idb-open":"Error thrown when opening IndexedDB. Original error: {$originalErrorMessage}.","idb-get":"Error thrown when reading from IndexedDB. Original error: {$originalErrorMessage}.","idb-set":"Error thrown when writing to IndexedDB. Original error: {$originalErrorMessage}.","idb-delete":"Error thrown when deleting from IndexedDB. Original error: {$originalErrorMessage}.","finalization-registry-not-supported":"FirebaseServerApp deleteOnDeref field defined but the JS runtime does not support FinalizationRegistry.","invalid-server-app-environment":"FirebaseServerApp is not for use in browser environments."},u=new E("app","Firebase",Ct);var K=class{constructor(e,n,i){this._isDeleted=!1,this._options=Object.assign({},e),this._config=Object.assign({},n),this._name=n.name,this._automaticDataCollectionEnabled=n.automaticDataCollectionEnabled,this._container=i,this.container.addComponent(new b("app",()=>this,"PUBLIC"))}get automaticDataCollectionEnabled(){return this.checkDestroyed(),this._automaticDataCollectionEnabled}set automaticDataCollectionEnabled(e){this.checkDestroyed(),this._automaticDataCollectionEnabled=e}get name(){return this.checkDestroyed(),this._name}get options(){return this.checkDestroyed(),this._options}get config(){return this.checkDestroyed(),this._config}get container(){return this._container}get isDeleted(){return this._isDeleted}set isDeleted(e){this._isDeleted=e}checkDestroyed(){if(this.isDeleted)throw u.create("app-deleted",{appName:this._name})}};var bn=Dt;function X(t,e={}){let n=t;typeof e!="object"&&(e={name:e});let i=Object.assign({name:W,automaticDataCollectionEnabled:!1},e),r=i.name;if(typeof r!="string"||!r)throw u.create("bad-app-name",{appName:String(r)});if(n||(n=L()),!n)throw u.create("no-options");let s=T.get(r);if(s){if(A(n,s.options)&&A(i,s.config))return s;throw u.create("duplicate-app",{appName:r})}let o=new O(r);for(let c of G.values())o.addComponent(c);let a=new K(n,i,o);return T.set(r,a),a}function gn(t=W){let e=T.get(t);if(!e&&t===W&&L())return X();if(!e)throw u.create("no-app",{appName:t});return e}function v(t,e,n){var i;let r=(i=It[t])!==null&&i!==void 0?i:t;n&&(r+=`-${n}`);let s=r.match(/\s|\//),o=e.match(/\s|\//);if(s||o){let a=[`Unable to register library "${r}" with version "${e}":`];s&&a.push(`library name "${r}" contains illegal characters (whitespace or "/")`),s&&o&&a.push("and"),o&&a.push(`version name "${e}" contains illegal characters (whitespace or "/")`),g.warn(a.join(" "));return}J(new b(`${r}-version`,()=>({library:r,version:e}),"VERSION"))}var At="firebase-heartbeat-database",Ot=1,w="firebase-heartbeat-store",z=null;function ye(){return z||(z=ue(At,Ot,{upgrade:(t,e)=>{switch(e){case 0:try{t.createObjectStore(w)}catch(n){console.warn(n)}}}}).catch(t=>{throw u.create("idb-open",{originalErrorMessage:t.message})})),z}function xt(t){return h(this,null,function*(){try{let n=(yield ye()).transaction(w),i=yield n.objectStore(w).get(Ee(t));return yield n.done,i}catch(e){if(e instanceof p)g.warn(e.message);else{let n=u.create("idb-get",{originalErrorMessage:e?.message});g.warn(n.message)}}})}function be(t,e){return h(this,null,function*(){try{let i=(yield ye()).transaction(w,"readwrite");yield i.objectStore(w).put(e,Ee(t)),yield i.done}catch(n){if(n instanceof p)g.warn(n.message);else{let i=u.create("idb-set",{originalErrorMessage:n?.message});g.warn(i.message)}}})}function Ee(t){return`${t.name}!${t.options.appId}`}var Bt=1024,Tt=30*24*60*60*1e3,Y=class{constructor(e){this.container=e,this._heartbeatsCache=null;let n=this.container.getProvider("app").getImmediate();this._storage=new q(n),this._heartbeatsCachePromise=this._storage.read().then(i=>(this._heartbeatsCache=i,i))}triggerHeartbeat(){return h(this,null,function*(){var e,n;let r=this.container.getProvider("platform-logger").getImmediate().getPlatformInfoString(),s=ge();if(!(((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null&&(this._heartbeatsCache=yield this._heartbeatsCachePromise,((n=this._heartbeatsCache)===null||n===void 0?void 0:n.heartbeats)==null))&&!(this._heartbeatsCache.lastSentHeartbeatDate===s||this._heartbeatsCache.heartbeats.some(o=>o.date===s)))return this._heartbeatsCache.heartbeats.push({date:s,agent:r}),this._heartbeatsCache.heartbeats=this._heartbeatsCache.heartbeats.filter(o=>{let a=new Date(o.date).valueOf();return Date.now()-a<=Tt}),this._storage.overwrite(this._heartbeatsCache)})}getHeartbeatsHeader(){return h(this,null,function*(){var e;if(this._heartbeatsCache===null&&(yield this._heartbeatsCachePromise),((e=this._heartbeatsCache)===null||e===void 0?void 0:e.heartbeats)==null||this._heartbeatsCache.heartbeats.length===0)return"";let n=ge(),{heartbeatsToSend:i,unsentEntries:r}=Nt(this._heartbeatsCache.heartbeats),s=y(JSON.stringify({version:2,heartbeats:i}));return this._heartbeatsCache.lastSentHeartbeatDate=n,r.length>0?(this._heartbeatsCache.heartbeats=r,yield this._storage.overwrite(this._heartbeatsCache)):(this._heartbeatsCache.heartbeats=[],this._storage.overwrite(this._heartbeatsCache)),s})}};function ge(){return new Date().toISOString().substring(0,10)}function Nt(t,e=Bt){let n=[],i=t.slice();for(let r of t){let s=n.find(o=>o.agent===r.agent);if(s){if(s.dates.push(r.date),_e(n)>e){s.dates.pop();break}}else if(n.push({agent:r.agent,dates:[r.date]}),_e(n)>e){n.pop();break}i=i.slice(1)}return{heartbeatsToSend:n,unsentEntries:i}}var q=class{constructor(e){this.app=e,this._canUseIndexedDBPromise=this.runIndexedDBEnvironmentCheck()}runIndexedDBEnvironmentCheck(){return h(this,null,function*(){return se()?oe().then(()=>!0).catch(()=>!1):!1})}read(){return h(this,null,function*(){if(yield this._canUseIndexedDBPromise){let n=yield xt(this.app);return n?.heartbeats?n:{heartbeats:[]}}else return{heartbeats:[]}})}overwrite(e){return h(this,null,function*(){var n;if(yield this._canUseIndexedDBPromise){let r=yield this.read();return be(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:e.heartbeats})}else return})}add(e){return h(this,null,function*(){var n;if(yield this._canUseIndexedDBPromise){let r=yield this.read();return be(this.app,{lastSentHeartbeatDate:(n=e.lastSentHeartbeatDate)!==null&&n!==void 0?n:r.lastSentHeartbeatDate,heartbeats:[...r.heartbeats,...e.heartbeats]})}else return})}};function _e(t){return y(JSON.stringify({version:2,heartbeats:t})).length}function Rt(t){J(new b("platform-logger",e=>new U(e),"PRIVATE")),J(new b("heartbeat",e=>new Y(e),"PRIVATE")),v(V,pe,t),v(V,pe,"esm2017"),v("fire-js","")}Rt("");var Mt="firebase",Lt="10.12.2";v(Mt,Lt,"app");var $t={apiKey:"AIzaSyDICii4NRsaRPqn5QCZh5kaEPaxd9ZvLGQ",authDomain:"ng-gtm-integration.firebaseapp.com",projectId:"ng-gtm-integration",storageBucket:"ng-gtm-integration.appspot.com",messagingSenderId:"564340780055",appId:"1:564340780055:web:97b78b49dba10e27df4052"},Sn=X($t);export{Ie as a,xe as b,Pt as c,kt as d,jt as e,ie as f,Ft as g,Ht as h,zt as i,Ut as j,Vt as k,p as l,E as m,Wt as n,A as o,Gt as p,Jt as q,Yt as r,b as s,f as t,x as u,J as v,pn as w,mn as x,bn as y,gn as z,v as A,Sn as B};
