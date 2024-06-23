import{a as M,c as P,d as k,g as _,i as E,j as O,n as N,o as T,p as w}from"./chunk-RTLSBLF3.js";import{a as F}from"./chunk-EX2LUZP7.js";import{a as Q}from"./chunk-FDKFOO6Y.js";import{m as q}from"./chunk-C2HNWMJH.js";import"./chunk-WM6QRSU2.js";import{Y as x,ja as v}from"./chunk-G7PQ22R5.js";import"./chunk-WRNOLYUH.js";import{Da as R,Ea as V,Fa as Y,Ga as e,Ha as t,Ia as c,Ta as S,aa as l,ba as s,cb as n,d as B,db as y,eb as C,gb as g,i as b,ib as p,jb as d,o as f,wa as h}from"./chunk-XHDSLAJA.js";import{I as j,V as G,g as $}from"./chunk-YEGXVBAB.js";import"./chunk-OGBJ4DTI.js";var I=(()=>{let i=class i{constructor(a,o,m){this.fb=a,this.analyticsService=o,this.orderService=m,this.shippingForm=this.fb.group({name:[""],address:[""],zip:[""],city:[""]}),this.paymentForm=this.fb.group({cardNum:[""],expiration:[""],security:[""]}),this.isShippingFormSubmitted=new $(!1),this.isPaymentFormSubmitted=new $(!1)}shippingFormComplete(){this.orderService.orders$.pipe(j(1),G(a=>{this.isShippingFormSubmitted.next(!0),this.analyticsService.trackEvent("add_shipping_info",a)})).subscribe()}paymentFormComplete(){this.orderService.orders$.pipe(j(1),G(a=>{this.isPaymentFormSubmitted.next(!0),this.analyticsService.trackEvent("add_payment_info",a)})).subscribe()}get isShippingFormSubmitted$(){return this.isShippingFormSubmitted.asObservable()}get isPaymentFormSubmitted$(){return this.isPaymentFormSubmitted.asObservable()}};i.\u0275fac=function(o){return new(o||i)(b(N),b(q),b(F))},i.\u0275prov=B({token:i,factory:i.\u0275fac,providedIn:"root"});let r=i;return r})();var H=(()=>{let i=class i{constructor(a,o){this.checkoutFormManager=a,this.navigationService=o}ngOnInit(){this.paymentForm=this.checkoutFormManager.paymentForm}navigateToThankYou(){this.navigationService.navigateToThankYou()}trackAddPaymentInfo(){this.checkoutFormManager.paymentFormComplete()}};i.\u0275fac=function(o){return new(o||i)(s(I),s(Q))},i.\u0275cmp=f({type:i,selectors:[["app-payment-form"]],standalone:!0,features:[g],decls:21,vars:4,consts:[["id","paymentMethod",1,"container","p-0",3,"ngClass"],[3,"formGroup"],[1,"row","mb-3"],["for","cardNum",1,"col-sm-2","col-form-label"],[1,"col-sm-10"],["formControlName","cardNum","type","text","id","cardNum",1,"form-control"],["for","expiration",1,"col-sm-2","col-form-label"],["formControlName","expiration","type","text","id","expiration",1,"form-control"],["for","security",1,"col-sm-2","col-form-label"],["formControlName","security","type","text","id","security",1,"form-control"],[3,"click"],[1,"btn","btn-primary",3,"click"]],template:function(o,m){o&1&&(e(0,"div",0),p(1,"async"),e(2,"form",1)(3,"div",2)(4,"label",3),n(5,"Card Number"),t(),e(6,"div",4),c(7,"input",5),t()(),e(8,"div",2)(9,"label",6),n(10,"Expiration"),t(),e(11,"div",4),c(12,"input",7),t()(),e(13,"div",2)(14,"label",8),n(15,"Security Code"),t(),e(16,"div",4),c(17,"input",9),t()(),e(18,"a",10),S("click",function(){return m.navigateToThankYou()}),e(19,"button",11),S("click",function(){return m.trackAddPaymentInfo()}),n(20," Place Order "),t()()()()),o&2&&(h("ngClass",d(1,2,m.checkoutFormManager.isShippingFormSubmitted$)?"visible":"hidden"),l(2),h("formGroup",m.paymentForm))},dependencies:[w,_,M,P,k,E,O,T,v,x],styles:["#paymentMethod[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100%;color:#4682b4;text-transform:lowercase;font-variant:small-caps;font-size:16px}"]});let r=i;return r})();var J=(()=>{let i=class i{constructor(a){this.checkoutFormManager=a}ngOnInit(){this.shippingForm=this.checkoutFormManager.shippingForm}continue(){this.shippingForm.valid&&(console.log("shipping form is valid"),this.checkoutFormManager.shippingFormComplete())}};i.\u0275fac=function(o){return new(o||i)(s(I))},i.\u0275cmp=f({type:i,selectors:[["app-shipping-form"]],standalone:!0,features:[g],decls:26,vars:4,consts:[["id","shippingForm",1,"container","p-0"],[3,"ngSubmit","formGroup"],[1,"mb-3","row"],["for","name",1,"col-sm-2","col-form-label"],[1,"col-sm-10"],["formControlName","name","type","text","id","name",1,"form-control"],["for","address",1,"col-sm-2","col-form-label"],["formControlName","address","type","text","id","address",1,"form-control"],["for","zip",1,"col-sm-2","col-form-label"],["formControlName","zip","type","text","id","zip",1,"form-control"],["for","city",1,"col-sm-2","col-form-label"],["formControlName","city","type","text","id","city",1,"form-control"],["id","confirmReservation",3,"ngClass"],[1,"btn","btn-primary"]],template:function(o,m){o&1&&(e(0,"div",0)(1,"form",1),S("ngSubmit",function(){return m.continue()}),e(2,"div",2)(3,"label",3),n(4,"Name:"),t(),e(5,"div",4),c(6,"input",5),t()(),e(7,"div",2)(8,"label",6),n(9,"Address:"),t(),e(10,"div",4),c(11,"input",7),t()(),e(12,"div",2)(13,"label",8),n(14,"Zip Code:"),t(),e(15,"div",4),c(16,"input",9),t()(),e(17,"div",2)(18,"label",10),n(19,"City:"),t(),e(20,"div",4),c(21,"input",11),t()(),e(22,"div",12),p(23,"async"),e(24,"button",13),n(25,"Continue"),t()()()()),o&2&&(l(),h("formGroup",m.shippingForm),l(21),h("ngClass",d(23,2,m.checkoutFormManager.isShippingFormSubmitted)?"hidden":"visible"))},dependencies:[v,x,w,_,M,P,k,E,O,T],styles:["#confirmReservation[_ngcontent-%COMP%]{margin:10px 0}#confirmReservation[_ngcontent-%COMP%]   a[_ngcontent-%COMP%]{font-size:20px;padding:10px}#shippingForm[_ngcontent-%COMP%]   label[_ngcontent-%COMP%]{width:100%;color:#4682b4;text-transform:lowercase;font-variant:small-caps;font-size:16px}#shippingForm[_ngcontent-%COMP%]   input[_ngcontent-%COMP%], #shippingForm[_ngcontent-%COMP%]   textarea[_ngcontent-%COMP%]{width:100%}"]});let r=i;return r})();function L(r,i){if(r&1&&(e(0,"tr")(1,"td"),n(2),t(),e(3,"td"),n(4),t(),e(5,"td"),n(6),t(),e(7,"td"),n(8),t(),e(9,"td"),n(10),t()()),r&2){let u=i.$implicit;l(2),y(u.id),l(2),y(u.title),l(2),C("$",u.value,""),l(2),y(u.quantity),l(2),C("$",u.value*u.quantity,"")}}var ce=(()=>{let i=class i{constructor(a,o){this.orderService=a,this.fb=o,this.orders$=this.orderService.orders$}calculateTotalPrice(){return this.orderService.calculateTotalPrice()}};i.\u0275fac=function(o){return new(o||i)(s(F),s(N))},i.\u0275cmp=f({type:i,selectors:[["app-checkout"]],standalone:!0,features:[g],decls:29,vars:5,consts:[["id","checkout",1,"container"],["id","checkoutTable",1,"table","table-striped"],["colspan","6",1,"h3"],["id","errareMSG"]],template:function(o,m){o&1&&(e(0,"div",0)(1,"h2"),n(2,"Checkout"),t(),e(3,"table",1)(4,"caption"),n(5," Summary "),t(),e(6,"tr")(7,"th"),n(8,"Ref."),t(),e(9,"th"),n(10,"Name"),t(),e(11,"th"),n(12,"Price Per Person"),t(),e(13,"th"),n(14,"Quantity"),t(),e(15,"th"),n(16,"Total"),t()(),e(17,"tbody"),V(18,L,11,5,"tr",null,R),p(20,"async"),t(),e(21,"tfoot")(22,"tr")(23,"td",2),n(24),p(25,"async"),t()()()(),c(26,"app-shipping-form")(27,"app-payment-form")(28,"div",3),t()),o&2&&(l(18),Y(d(20,1,m.orders$)),l(6),C(" Total Price: $",d(25,3,m.calculateTotalPrice())," "))},dependencies:[J,H,v],styles:["#checkout[_ngcontent-%COMP%]   h2[_ngcontent-%COMP%]{color:#4682b4;margin:0 0 20px;padding:0;border-bottom:1px dashed;text-align:right;text-transform:lowercase;font-variant:small-caps}#checkoutTable[_ngcontent-%COMP%]{width:100%;border-collapse:collapse;color:#4682b4;text-align:center!important;font-size:16px;text-transform:lowercase;font-variant:small-caps}#checkoutTable[_ngcontent-%COMP%]   caption[_ngcontent-%COMP%]{font-size:24px;padding:0 0 6px;text-align:left;caption-side:top}#checkoutTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], td[_ngcontent-%COMP%]{border:1px solid;text-align:center!important}#checkoutTable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%]{color:#4682b4;background:#e9e9e9;text-transform:lowercase;font-variant:small-caps}#checkoutPrice[_ngcontent-%COMP%]{text-align:center;vertical-align:middle;font-weight:700;background:#e9e9e9;color:#4682b4}#errareMSG[_ngcontent-%COMP%]{display:none}#errareMSG[_ngcontent-%COMP%]   p[_ngcontent-%COMP%]{color:red;font-weight:700;font-size:16px}"]});let r=i;return r})();export{ce as CheckoutComponent};
