import{b as a,n as h,o as S,p as b}from"./chunk-RTLSBLF3.js";import{a as v}from"./chunk-W5ENONFY.js";import"./chunk-4PDZSTQS.js";import{a as f}from"./chunk-FDKFOO6Y.js";import"./chunk-C2HNWMJH.js";import"./chunk-WM6QRSU2.js";import"./chunk-G7PQ22R5.js";import"./chunk-WRNOLYUH.js";import{Ga as s,Ha as m,Ia as d,Ta as u,ba as n,cb as p,gb as g,o as l}from"./chunk-XHDSLAJA.js";import{V as c}from"./chunk-YEGXVBAB.js";import"./chunk-OGBJ4DTI.js";var k=(()=>{let e=class e{constructor(i,t,r){this.fb=i,this.authService=t,this.navigationService=r,this.signInForm=this.fb.group({username:["",a.required],password:["",a.required]})}ngOnInit(){this.authService.isLoggedIn().pipe(c(i=>{console.log("isLoggedIn",i),i&&this.navigationService.navigateToHome()})).subscribe()}loginWithGoogle(){this.authService.loginWithGoogle().subscribe()}};e.\u0275fac=function(t){return new(t||e)(n(h),n(v),n(f))},e.\u0275cmp=l({type:e,selectors:[["app-login"]],standalone:!0,features:[g],decls:5,vars:0,consts:[["id","main",1,"d-flex","flex-column","justify-content-center","align-items-center"],["id","msg"],[1,"btn","btn-primary",3,"click"]],template:function(t,r){t&1&&(s(0,"div",0),d(1,"div",1),s(2,"div")(3,"button",2),u("click",function(){return r.loginWithGoogle()}),p(4," Sign-in with Google "),m()()())},dependencies:[b,S]});let o=e;return o})();export{k as LoginComponent};