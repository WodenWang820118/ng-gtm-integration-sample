import{c as _}from"./chunk-DXKRETAF.js";import{$ as d,fa as P}from"./chunk-VQLRNSVV.js";import{p as B}from"./chunk-WGVAYHTF.js";import{A as f,Ba as c,Ia as i,Ja as a,Ka as s,X as p,d as g,e as h,fb as C,ga as l,ha as k,hb as w,i as y,ib as m,ka as b,na as D,p as v,sa as x,vb as F,wb as I,ya as M,za as S}from"./chunk-XNEAXIXF.js";import"./chunk-YPXM7B5S.js";import"./chunk-JQ2Q4TV4.js";var j=`
    .p-progressspinner {
        position: relative;
        margin: 0 auto;
        width: 100px;
        height: 100px;
        display: inline-block;
    }

    .p-progressspinner::before {
        content: '';
        display: block;
        padding-top: 100%;
    }

    .p-progressspinner-spin {
        height: 100%;
        transform-origin: center center;
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        right: 0;
        margin: auto;
        animation: p-progressspinner-rotate 2s linear infinite;
    }

    .p-progressspinner-circle {
        stroke-dasharray: 89, 200;
        stroke-dashoffset: 0;
        stroke: dt('progressspinner.colorOne');
        animation:
            p-progressspinner-dash 1.5s ease-in-out infinite,
            p-progressspinner-color 6s ease-in-out infinite;
        stroke-linecap: round;
    }

    @keyframes p-progressspinner-rotate {
        100% {
            transform: rotate(360deg);
        }
    }
    @keyframes p-progressspinner-dash {
        0% {
            stroke-dasharray: 1, 200;
            stroke-dashoffset: 0;
        }
        50% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -35px;
        }
        100% {
            stroke-dasharray: 89, 200;
            stroke-dashoffset: -124px;
        }
    }
    @keyframes p-progressspinner-color {
        100%,
        0% {
            stroke: dt('progressspinner.color.one');
        }
        40% {
            stroke: dt('progressspinner.color.two');
        }
        66% {
            stroke: dt('progressspinner.color.three');
        }
        80%,
        90% {
            stroke: dt('progressspinner.color.four');
        }
    }
`;var H={root:()=>["p-progressspinner"],spin:"p-progressspinner-spin",circle:"p-progressspinner-circle"},E=(()=>{class e extends P{name="progressspinner";theme=j;classes=H;static \u0275fac=(()=>{let o;return function(n){return(o||(o=f(e)))(n||e)}})();static \u0275prov=g({token:e,factory:e.\u0275fac})}return e})();var u=(()=>{class e extends _{styleClass;strokeWidth="2";fill="none";animationDuration="2s";ariaLabel;_componentStyle=y(E);static \u0275fac=(()=>{let o;return function(n){return(o||(o=f(e)))(n||e)}})();static \u0275cmp=l({type:e,selectors:[["p-progressSpinner"],["p-progress-spinner"],["p-progressspinner"]],hostVars:7,hostBindings:function(t,n){t&2&&(c("aria-label",n.ariaLabel)("role","progressbar")("data-pc-name","progressspinner")("data-pc-section","root")("aria-busy",!0),m(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",strokeWidth:"strokeWidth",fill:"fill",animationDuration:"animationDuration",ariaLabel:"ariaLabel"},features:[F([E]),b],decls:2,vars:9,consts:[["viewBox","25 25 50 50"],["cx","50","cy","50","r","20","stroke-miterlimit","10"]],template:function(t,n){t&1&&(v(),i(0,"svg",0),s(1,"circle",1),a()),t&2&&(m(n.cx("spin")),C("animation-duration",n.animationDuration),c("data-pc-section","root"),p(),m(n.cx("circle")),c("fill",n.fill)("stroke-width",n.strokeWidth))},dependencies:[B,d],encapsulation:2,changeDetection:0})}return e})(),T=(()=>{class e{static \u0275fac=function(t){return new(t||e)};static \u0275mod=k({type:e});static \u0275inj=h({imports:[u,d,d]})}return e})();var N=()=>[import("./chunk-TU6QDPBV.js").then(e=>e.FooterComponent),import("./chunk-3WYGHAT7.js").then(e=>e.NavbarComponent),import("./chunk-EOVT56Q5.js").then(e=>e.DisclaimerComponent),import("./chunk-3SH2QA5N.js").then(e=>e.RouterOutlet)],O=()=>({width:"100px",height:"100px"});function V(e,r){e&1&&(i(0,"div",1),s(1,"app-navbar",2),i(2,"main",3),s(3,"router-outlet"),a(),i(4,"footer",4),s(5,"app-footer")(6,"app-disclaimer",5),a()())}function G(e,r){e&1&&(i(0,"div",6),s(1,"p-progress-spinner",7),a()),e&2&&(p(),w(I(2,O)))}var re=(()=>{let r=class r{};r.\u0275fac=function(n){return new(n||r)},r.\u0275cmp=l({type:r,selectors:[["app-home"]],decls:4,vars:0,consts:[[1500],[1,"flex","flex-col","min-h-screen"],[1,"bg-white","shadow"],[1,"flex-grow","container","mx-auto","px-4","py-8"],[1,"bg-white"],[1,"mt-2"],[1,"fixed","inset-0","flex","items-center","justify-center"],["ariaLabel","loading"]],template:function(n,R){n&1&&(D(0,V,7,0)(1,G,2,3),M(2,0,N,null,1,null,null,0,x),S())},dependencies:[T,u],encapsulation:2});let e=r;return e})();export{re as HomeComponent};
