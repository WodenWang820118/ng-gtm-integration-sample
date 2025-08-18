import{c as O}from"./chunk-DXKRETAF.js";import{$ as g,_ as E,fa as w}from"./chunk-VQLRNSVV.js";import{k as j,m as S,p as k}from"./chunk-WGVAYHTF.js";import{$a as d,A as v,Ba as s,Ha as i,Ia as b,Ja as y,Qa as _,Wa as T,X as r,Xa as I,Ya as Q,Za as p,ab as m,d as h,e as C,ga as x,ha as B,i as M,ib as f,ka as D,ma as c,vb as F}from"./chunk-XNEAXIXF.js";var q=`
    .p-toolbar {
        display: flex;
        align-items: center;
        justify-content: space-between;
        flex-wrap: wrap;
        padding: dt('toolbar.padding');
        background: dt('toolbar.background');
        border: 1px solid dt('toolbar.border.color');
        color: dt('toolbar.color');
        border-radius: dt('toolbar.border.radius');
        gap: dt('toolbar.gap');
    }

    .p-toolbar-start,
    .p-toolbar-center,
    .p-toolbar-end {
        display: flex;
        align-items: center;
    }
`;var N=["start"],R=["end"],A=["center"],P=["*"];function V(e,l){e&1&&_(0)}function H(e,l){if(e&1&&(b(0,"div"),c(1,V,1,0,"ng-container",1),y()),e&2){let t=T();f(t.cx("start")),s("data-pc-section","start"),r(),i("ngTemplateOutlet",t.startTemplate||t._startTemplate)}}function z(e,l){e&1&&_(0)}function G(e,l){if(e&1&&(b(0,"div"),c(1,z,1,0,"ng-container",1),y()),e&2){let t=T();f(t.cx("center")),s("data-pc-section","center"),r(),i("ngTemplateOutlet",t.centerTemplate||t._centerTemplate)}}function J(e,l){e&1&&_(0)}function K(e,l){if(e&1&&(b(0,"div"),c(1,J,1,0,"ng-container",1),y()),e&2){let t=T();f(t.cx("end")),s("data-pc-section","end"),r(),i("ngTemplateOutlet",t.endTemplate||t._endTemplate)}}var U={root:()=>["p-toolbar p-component"],start:"p-toolbar-start",center:"p-toolbar-center",end:"p-toolbar-end"},L=(()=>{class e extends w{name="toolbar";theme=q;classes=U;static \u0275fac=(()=>{let t;return function(n){return(t||(t=v(e)))(n||e)}})();static \u0275prov=h({token:e,factory:e.\u0275fac})}return e})();var W=(()=>{class e extends O{styleClass;ariaLabelledBy;_componentStyle=M(L);getBlockableElement(){return this.el.nativeElement.children[0]}startTemplate;endTemplate;centerTemplate;templates;_startTemplate;_endTemplate;_centerTemplate;ngAfterContentInit(){this.templates.forEach(t=>{switch(t.getType()){case"start":case"left":this._startTemplate=t.template;break;case"end":case"right":this._endTemplate=t.template;break;case"center":this._centerTemplate=t.template;break}})}static \u0275fac=(()=>{let t;return function(n){return(t||(t=v(e)))(n||e)}})();static \u0275cmp=x({type:e,selectors:[["p-toolbar"]],contentQueries:function(a,n,u){if(a&1&&(p(u,N,4),p(u,R,4),p(u,A,4),p(u,E,4)),a&2){let o;d(o=m())&&(n.startTemplate=o.first),d(o=m())&&(n.endTemplate=o.first),d(o=m())&&(n.centerTemplate=o.first),d(o=m())&&(n.templates=o)}},hostAttrs:["data-pc-section","root","data-pc-name","toolbar","role","toolbar"],hostVars:3,hostBindings:function(a,n){a&2&&(s("aria-labelledby",n.ariaLabelledBy),f(n.cn(n.cx("root"),n.styleClass)))},inputs:{styleClass:"styleClass",ariaLabelledBy:"ariaLabelledBy"},features:[F([L]),D],ngContentSelectors:P,decls:4,vars:3,consts:[[3,"class",4,"ngIf"],[4,"ngTemplateOutlet"]],template:function(a,n){a&1&&(I(),Q(0),c(1,H,2,4,"div",0)(2,G,2,4,"div",0)(3,K,2,4,"div",0)),a&2&&(r(),i("ngIf",n.startTemplate||n._startTemplate),r(),i("ngIf",n.centerTemplate||n._centerTemplate),r(),i("ngIf",n.endTemplate||n._endTemplate))},dependencies:[k,j,S,g],encapsulation:2,changeDetection:0})}return e})(),fe=(()=>{class e{static \u0275fac=function(a){return new(a||e)};static \u0275mod=B({type:e});static \u0275inj=C({imports:[W,g,g]})}return e})();export{W as a,fe as b};
