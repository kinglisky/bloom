var e=Object.assign;import{C as o}from"./vendor.ff8828c8.js";!function(e=".",o="__import__"){try{self[o]=new Function("u","return import(u)")}catch(a){const t=new URL(e,location),n=e=>{URL.revokeObjectURL(e.src),e.remove()};self[o]=e=>new Promise(((a,s)=>{const c=new URL(e,t);if(self[o].moduleMap[c])return a(self[o].moduleMap[c]);const r=new Blob([`import * as m from '${c}';`,`${o}.moduleMap['${c}']=m;`],{type:"text/javascript"}),p=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){s(new Error(`Failed to import: ${e}`)),n(p)},onload(){a(self[o].moduleMap[c]),n(p)}});document.head.appendChild(p)})),self[o].moduleMap={}}}("/uni-link/assets/");const a={ttxsapp:{scheme:"ttxs",appstore:"https://apps.apple.com/cn/app/稿定设计-用模板轻松作图拼图/id1113276760",yingyongbao:"https://a.app.qq.com/o/simple.jsp?pkgname=com.hlg.daydaytobusiness"},focodesign:{scheme:"focodesign"},focovideo:{scheme:"focovideo"}};const t=function(){const o=new URLSearchParams(window.location.search).get("redirect")||"";if(!o)return null;const t=new URL(o),n=t.hostname.replace(/^www\.|\.com$/g,""),s=[...new URLSearchParams(t.search).entries()];return e(e({},a[n]),{host:t.hostname,path:t.pathname,param:s.reduce(((e,[o,a])=>(e[o]=a,e)),{}),fallback:t.origin})}();if(t){const e={scheme:{protocol:t.scheme},appstore:t.appstore,yingyongbao:t.yingyongbao,timeout:800,fallback:t.fallback};t.package&&(e.intent={package:t.package,scheme:t.scheme});new o(e).open({path:t.path,param:t.params})}
