var s=Object.create;var j=Object.defineProperty,t=Object.defineProperties,u=Object.getOwnPropertyDescriptor,v=Object.getOwnPropertyDescriptors,w=Object.getOwnPropertyNames,k=Object.getOwnPropertySymbols,p=Object.getPrototypeOf,n=Object.prototype.hasOwnProperty,q=Object.prototype.propertyIsEnumerable,x=Reflect.get;var m=(b,a)=>(a=Symbol[b])?a:Symbol.for("Symbol."+b);var o=(b,a,c)=>a in b?j(b,a,{enumerable:!0,configurable:!0,writable:!0,value:c}):b[a]=c,z=(b,a)=>{for(var c in a||={})n.call(a,c)&&o(b,c,a[c]);if(k)for(var c of k(a))q.call(a,c)&&o(b,c,a[c]);return b},A=(b,a)=>t(b,v(a));var B=(b,a)=>{var c={};for(var d in b)n.call(b,d)&&a.indexOf(d)<0&&(c[d]=b[d]);if(b!=null&&k)for(var d of k(b))a.indexOf(d)<0&&q.call(b,d)&&(c[d]=b[d]);return c};var C=(b,a)=>()=>(b&&(a=b(b=0)),a);var D=(b,a)=>()=>(a||b((a={exports:{}}).exports,a),a.exports),E=(b,a)=>{for(var c in a)j(b,c,{get:a[c],enumerable:!0})},r=(b,a,c,d)=>{if(a&&typeof a=="object"||typeof a=="function")for(let e of w(a))!n.call(b,e)&&e!==c&&j(b,e,{get:()=>a[e],enumerable:!(d=u(a,e))||d.enumerable});return b};var F=(b,a,c)=>(c=b!=null?s(p(b)):{},r(a||!b||!b.__esModule?j(c,"default",{value:b,enumerable:!0}):c,b)),G=b=>r(j({},"__esModule",{value:!0}),b);var H=(b,a,c)=>x(p(b),c,a);var I=(b,a,c)=>new Promise((d,e)=>{var f=g=>{try{i(c.next(g))}catch(l){e(l)}},h=g=>{try{i(c.throw(g))}catch(l){e(l)}},i=g=>g.done?d(g.value):Promise.resolve(g.value).then(f,h);i((c=c.apply(b,a)).next())}),y=function(b,a){this[0]=b,this[1]=a};var J=b=>{var a=b[m("asyncIterator")],c=!1,d,e={};return a==null?(a=b[m("iterator")](),d=f=>e[f]=h=>a[f](h)):(a=a.call(b),d=f=>e[f]=h=>{if(c){if(c=!1,f==="throw")throw h;return h}return c=!0,{done:!1,value:new y(new Promise(i=>{var g=a[f](h);if(!(g instanceof Object))throw TypeError("Object expected");i(g)}),1)}}),e[m("iterator")]=()=>e,d("next"),"throw"in a?d("throw"):e.throw=f=>{throw f},"return"in a&&d("return"),e};export{z as a,A as b,B as c,C as d,D as e,E as f,F as g,G as h,H as i,I as j,J as k};
