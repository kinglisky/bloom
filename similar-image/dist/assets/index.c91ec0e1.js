var e=Object.assign;import{w as t,r as a,c as s,o as l,a as i,b as n,d as r,v as o,t as u,F as h,e as c,f as g}from"./vendor.547c935e.js";!function(e=".",t="__import__"){try{self[t]=new Function("u","return import(u)")}catch(a){const s=new URL(e,location),l=e=>{URL.revokeObjectURL(e.src),e.remove()};self[t]=e=>new Promise(((a,i)=>{const n=new URL(e,s);if(self[t].moduleMap[n])return a(self[t].moduleMap[n]);const r=new Blob([`import * as m from '${n}';`,`${t}.moduleMap['${n}']=m;`],{type:"text/javascript"}),o=Object.assign(document.createElement("script"),{type:"module",src:URL.createObjectURL(r),onerror(){i(new Error(`Failed to import: ${e}`)),l(o)},onload(){a(self[t].moduleMap[n]),l(o)}});document.head.appendChild(o)})),self[t].moduleMap={}}}("/similar-image/dist/assets/");const m=["/similar-image/dist/assets/0.2feaa414.jpeg","/similar-image/dist/assets/1.fd51b679.jpeg"],d=({imageRefs:e,imageSize:t})=>{const s=a(""),l=a([]),i=()=>{const e=document.createElement("canvas");return e.width=t.value,e.height=t.value,e},n=(e,t=4)=>{const a=256/t,s=a/2,l=Array.from({length:Math.pow(t,3)}).fill(0);for(let i=0;i<e.width;i++)for(let n=0;n<e.height;n++){const r=4*(i+n*e.width),o=Math.round((e.data[r+0]+s)/a)-1,u=Math.round((e.data[r+1]+s)/a)-1,h=Math.round((e.data[r+2]+s)/a)-1;l[o*Math.pow(t,2)+u*t+h]+=1}return l};return{compareColorInfo:s,colorsList:l,createColorHistogram:()=>{const[a,r]=(()=>{const a=i(),s=i(),[l,n]=e.value,r=a.getContext("2d"),o=s.getContext("2d");return r.drawImage(l,0,0,l.naturalWidth,l.naturalHeight,0,0,t.value,t.value),o.drawImage(n,0,0,n.naturalWidth,n.naturalHeight,0,0,t.value,t.value),[r.getImageData(0,0,a.width,a.height),o.getImageData(0,0,s.width,s.height)]})(),o=n(a),u=n(r);l.value=[o,u];const h=((e,t)=>{let a=0,s=0,l=0;for(let i=0;i<e.length;i++)a+=e[i]*t[i],s+=Math.pow(e[i],2),l+=Math.pow(t[i],2);return a/(Math.sqrt(s)*Math.sqrt(l))})(o,u);s.value=`颜色向量相似度为：${100*h}%`}}},p={name:"App",setup(){const l=(()=>{const e=a(64),t=s((()=>({"--width":`${e.value}px`,"--height":`${e.value}px`}))),l=a([]),i=a([...m]);return{imageSize:e,imageStyles:t,imageRefs:l,imageUrls:i,updateImageUrls:e=>{let t=[...e.target.files].slice(0,2).map((e=>URL.createObjectURL(e)));t.length<2&&(t=[...t,...m].slice(0,2)),i.value=t}}})(),i=(({imageRefs:e,imageSize:t})=>{const s=a([]),l=a(!1),i=(e,t,a)=>parseInt(.299*e+.587*t+.114*a),n=e=>{const t=e.getContext("2d"),a=t.getImageData(0,0,e.width,e.height);for(let s=0;s<a.width;s++)for(let e=0;e<a.height;e++){const t=4*(s+e*a.width),l=a.data[t+0],n=a.data[t+1],r=a.data[t+2],o=i(l,n,r);a.data[t+0]=o,a.data[t+1]=o,a.data[t+2]=o}t.putImageData(a,0,0)};return{grayCavans:s,hasGrayOutput:l,setGrayOutput:()=>{const[a,i]=e.value,[r,o]=s.value,u=r.getContext("2d"),h=o.getContext("2d");u.drawImage(a,0,0,a.naturalWidth,a.naturalHeight,0,0,t.value,t.value),h.drawImage(i,0,0,i.naturalWidth,i.naturalHeight,0,0,t.value,t.value),n(r),n(o),l.value=!0}}})(l),n=(({grayCavans:e})=>{const t=a([]),s=a([]),l=e=>{let t=0;for(let a=0;a<e.length-1;a+=4)t+=e[a]+e[a+1]+e[a+2];return Math.round(t/e.length)},i=e=>{let t=0,a=Array(256).fill(0),s=e.length;for(;t<s;)a[e[t++]]++;let l=0;for(let h=0;h<256;h++)l+=h*a[h];let i=0,n=0,r=0,o=0,u=0;for(let h=0;h<256;h++){if(i+=a[h],0===i)continue;if(n=s-i,0===n)break;r+=h*a[h];let e=i*n*(r/i-(l-r)/n)**2;e>o&&(o=e,u=h)}return u},n=(e,t,a)=>{const{width:s,height:l,data:i}=t,n=[];for(let o=0;o<s;o++)for(let t=0;t<l;t++){const s=4*(o+t*e.width),l=i[s+0]>a?255:0;i[s]=l,i[s+1]=l,i[s+2]=l,n.push(l>0?1:0)}const r=e.getContext("2d");return r.clearRect(0,0,e.width,e.height),r.putImageData(t,0,0),n},r=()=>{const[t,a]=e.value,s=t.getContext("2d"),l=a.getContext("2d");return[s.getImageData(0,0,t.width,t.height),l.getImageData(0,0,a.width,a.height)]};return{extremumCanvas:t,setAverageOutput:()=>{const[e,a]=r(),i=l(e.data),o=l(a.data),[u,h]=t.value,c=n(u,e,i),g=n(h,a,o);s.value=[c,g]},setOtsuOutput:()=>{const[e,a]=r(),l=i(e.data),o=i(a.data),[u,h]=t.value,c=n(u,e,l),g=n(h,a,o);s.value=[c,g]},hashData:s}})(i),r=(e=>{const s=a("");return t(e,(e=>{if(!e.length)return;const[t,a]=e;let l=0;t.forEach(((e,t)=>{l+=e^a[t]})),s.value=`差异: ${l}, 相似度: ${(t.length-l)/t.length*100}%`,console.log(s.value)})),{compareHashInfo:s}})(n.hashData),o=d(l),u=()=>{i.hasGrayOutput.value=!1,n.hashData.value=[],o.colorsList.value=[],o.compareColorInfo.value=""};return t(l.imageUrls,u),t(l.imageSize,u),e(e(e(e(e({},l),i),n),o),r)}},v={class:"header"},f={class:"header-item upload"},w=n("label",{for:"upload"},"图片上传",-1),y={class:"header-item size"},C=n("span",null,"图片尺寸",-1),S={class:"panel"},z=n("span",{class:"title"},"原始图片",-1),x={class:"contents"},I={class:"panel"},O={class:"title"},U={class:"contents"},b={key:0,class:"panel"},M={class:"title"},R=n("span",null,"二值化",-1),D={class:"contents"},L={key:1,class:"panel"},k=n("div",{class:"title"}," 特征值比较 ",-1),j={class:"contents"},H={class:"contents"},$={class:"compare-info"},A={key:2,class:"panel"},G={class:"title"},E={class:"contents"},W={class:"contents"},_={class:"compare-info"};p.render=function(e,t,a,s,g,m){return l(),i("main",{class:"similar-images",style:e.imageStyles},[n("div",v,[n("button",f,[w,n("input",{multiple:"",id:"upload-btn",type:"file",accept:"image/*",onChange:t[1]||(t[1]=(...t)=>e.updateImageUrls&&e.updateImageUrls(...t))},null,32)]),n("div",y,[C,r(n("input",{type:"range",placeholder:"图片尺寸",min:"8",max:"128",step:"4","onUpdate:modelValue":t[2]||(t[2]=t=>e.imageSize=t)},null,512),[[o,e.imageSize]]),n("span",null,u(e.imageSize)+"px",1)])]),e.imageUrls.length?(l(),i(h,{key:0},[n("div",S,[z,n("div",x,[n("img",{class:"content-item",src:e.imageUrls[0],ref:t=>e.imageRefs[0]=t},null,8,["src"]),n("img",{class:"content-item",src:e.imageUrls[1],ref:t=>e.imageRefs[1]=t},null,8,["src"])])]),n("div",I,[n("span",O,[n("button",{onClick:t[3]||(t[3]=(...t)=>e.setGrayOutput&&e.setGrayOutput(...t))}," 灰度 ")]),n("div",U,[n("canvas",{class:"content-item",width:e.imageSize,height:e.imageSize,ref:t=>e.grayCavans[0]=t},null,8,["width","height"]),n("canvas",{class:"content-item",width:e.imageSize,height:e.imageSize,ref:t=>e.grayCavans[1]=t},null,8,["width","height"])])]),e.hasGrayOutput?(l(),i("div",b,[n("div",M,[n("button",{onClick:t[4]||(t[4]=(...t)=>e.setAverageOutput&&e.setAverageOutput(...t))}," average "),n("button",{onClick:t[5]||(t[5]=(...t)=>e.setOtsuOutput&&e.setOtsuOutput(...t))}," otsu "),R]),n("div",D,[n("canvas",{class:"content-item",width:e.imageSize,height:e.imageSize,ref:t=>e.extremumCanvas[0]=t},null,8,["width","height"]),n("canvas",{class:"content-item",width:e.imageSize,height:e.imageSize,ref:t=>e.extremumCanvas[1]=t},null,8,["width","height"])])])):c("",!0),e.hashData.length?(l(),i("div",L,[k,n("div",j,[n("textarea",{class:"content-item",readonly:"",width:e.imageSize,height:e.imageSize,value:e.hashData[0]},null,8,["width","height","value"]),n("textarea",{class:"content-item",readonly:"",width:e.imageSize,height:e.imageSize,value:e.hashData[1]},null,8,["width","height","value"])]),n("div",H,[n("h2",$,u(e.compareHashInfo),1)])])):c("",!0),e.imageUrls.length?(l(),i("div",A,[n("div",G,[n("button",{onClick:t[6]||(t[6]=(...t)=>e.createColorHistogram&&e.createColorHistogram(...t))}," 颜色向量比较 ")]),n("div",E,[n("textarea",{class:"content-item",readonly:"",width:e.imageSize,height:e.imageSize,value:e.colorsList[0]},null,8,["width","height","value"]),n("textarea",{class:"content-item",readonly:"",width:e.imageSize,height:e.imageSize,value:e.colorsList[1]},null,8,["width","height","value"])]),n("div",W,[n("h2",_,u(e.compareColorInfo),1)])])):c("",!0)],64)):c("",!0)],4)};g(p).mount("#app");
