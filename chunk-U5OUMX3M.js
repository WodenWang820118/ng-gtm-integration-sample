import{a as x}from"./chunk-EX2LUZP7.js";import{a as g}from"./chunk-FDKFOO6Y.js";import{m as b}from"./chunk-C2HNWMJH.js";import"./chunk-WM6QRSU2.js";import{ja as k}from"./chunk-G7PQ22R5.js";import"./chunk-WRNOLYUH.js";import{Ga as e,Ha as i,Ia as d,Ta as l,aa as u,ba as c,cb as t,eb as f,gb as S,ib as h,jb as y,o as v}from"./chunk-XHDSLAJA.js";import{I as m,V as p}from"./chunk-YEGXVBAB.js";import"./chunk-OGBJ4DTI.js";var I=(()=>{let r=class r{constructor(o,n,a){this.orderService=o,this.analyticsService=n,this.navigationService=a}resetOrders(){this.orderService.resetOrders(),this.navigationService.navigateToHome()}trackRefund(){this.orderService.orders$.pipe(m(1),p(o=>{this.analyticsService.trackEvent("refund",o)})).subscribe()}};r.\u0275fac=function(n){return new(n||r)(c(x),c(b),c(g))},r.\u0275cmp=v({type:r,selectors:[["app-thankyou"]],standalone:!0,features:[S],decls:28,vars:3,consts:[["id","content",1,"container"],[1,"page-header"],[1,"row"],[1,"span3"],[1,"span6","text-center"],["id","orderConfirmed",1,"alert","alert-info"],["id","price"],[1,"text-center"],[1,"btn","btn-inverse",3,"click"],["id","cancelOrder"]],template:function(n,a){n&1&&(e(0,"div",0)(1,"div",1)(2,"h1"),t(3," Reservation Complete! "),e(4,"small"),t(5,"You are almost at your destination."),i()()(),e(6,"div",2)(7,"div",3),t(8,"\xA0"),i(),e(9,"div",4)(10,"div",5)(11,"h2"),t(12),h(13,"async"),d(14,"span",6),t(15,". Enjoy! "),i(),d(16,"br"),e(17,"div",7)(18,"a")(19,"button",8),l("click",function(){return a.resetOrders()}),e(20,"h4"),t(21,"Back to Home"),i()()(),e(22,"a",9)(23,"button",8),l("click",function(){return a.trackRefund(),a.resetOrders()}),e(24,"h4"),t(25,"Cancel Order"),i()()()()()(),e(26,"div",3),t(27,"\xA0"),i()()()),n&2&&(u(12),f(" Thank you for reserving your trip through GTM Travel Site for $",y(13,1,a.orderService.totalPrice$),""))},dependencies:[k],encapsulation:2});let s=r;return s})();export{I as ThankyouComponent};