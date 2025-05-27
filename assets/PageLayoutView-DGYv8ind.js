import{A as F,a2 as It,w as de,g as Bo,C as Ne,o as ze,q as $,a3 as On,a4 as Tn,v as ue,i as Z,P as ce,a1 as Nn,$ as Ke,a5 as En,k as j,y as ne,E as rt,a6 as Mn,l as f,a7 as Bn,G as q,a8 as Ho,J as Qe,a9 as Ro,aa as Hn,Q as Fo,U as et,ab as it,ac as lt,ad as Rn,ae as Fn,af as Ln,ag as Lt,ah as Oe,ai as Lo,aj as Ee,ak as zt,al as Kn,am as ro,an as Dn,ao as io,ap as lo,aq as Xe,ar as jn,as as ao,at as Wn,au as Vn,av as Gn,aw as Un,ax as Yn,ay as qn,az as Xn,c as A,S as Ko,d as Ce,a as C,aA as fe,j as O,h as T,aB as Zn,T as De,m as pe,n as J,H as Fe,F as Jn,s as ye,aC as je,D as Qn,aD as er,aE as tr,aF as or,aG as Do,p as nr,r as be,aH as at,L as Ze,aI as $t,aJ as he,aK as jo,aL as rr,aM as ir,W as st,X as We,Y as ve,V as lr,aN as ar,aO as sr,aP as dr,_ as ae,Z as ie,aQ as ht}from"./index-ob3tm0dU.js";import{c as cr,t as Kt,i as Wo,g as ur,b as fr,f as Ie,k as He,a as Dt,_ as hr}from"./logo2-Ds9nQVt9.js";import{u as vr}from"./loading-CKCRRWz0.js";import{d as re,o as le,b as At,f as pr,j as Pt,r as vt,X as Vo,u as Le,c as oe,k as mr,l as gr,N as br,m as yr,s as xr,S as Go,n as Uo,V as wr,p as Cr,q as Sr,B as Ir}from"./Button-s0udh16G.js";import{_ as zr}from"./_plugin-vue_export-helper-DlAUqK2U.js";let tt=[];const Yo=new WeakMap;function $r(){tt.forEach(e=>e(...Yo.get(e))),tt=[]}function Ar(e,...t){Yo.set(e,t),!tt.includes(e)&&tt.push(e)===1&&requestAnimationFrame($r)}function so(e,t){let{target:o}=e;for(;o;){if(o.dataset&&o.dataset[t]!==void 0)return!0;o=o.parentElement}return!1}function Pr(e){const t=F(!!e.value);if(t.value)return It(t);const o=de(e,n=>{n&&(t.value=!0,o())});return It(t)}function kr(){return Bo()!==null}const _r=typeof window<"u";let _e,Re;const Or=()=>{var e,t;_e=_r?(t=(e=document)===null||e===void 0?void 0:e.fonts)===null||t===void 0?void 0:t.ready:void 0,Re=!1,_e!==void 0?_e.then(()=>{Re=!0}):Re=!0};Or();function Tr(e){if(Re)return;let t=!1;Ne(()=>{Re||_e==null||_e.then(()=>{t||e()})}),ze(()=>{t=!0})}function jt(e,t){return $(()=>{for(const o of t)if(e[o]!==void 0)return e[o];return e[t[t.length-1]]})}function Nr(e={},t){const o=On({ctrl:!1,command:!1,win:!1,shift:!1,tab:!1}),{keydown:n,keyup:r}=e,i=a=>{switch(a.key){case"Control":o.ctrl=!0;break;case"Meta":o.command=!0,o.win=!0;break;case"Shift":o.shift=!0;break;case"Tab":o.tab=!0;break}n!==void 0&&Object.keys(n).forEach(d=>{if(d!==a.key)return;const c=n[d];if(typeof c=="function")c(a);else{const{stop:v=!1,prevent:u=!1}=c;v&&a.stopPropagation(),u&&a.preventDefault(),c.handler(a)}})},l=a=>{switch(a.key){case"Control":o.ctrl=!1;break;case"Meta":o.command=!1,o.win=!1;break;case"Shift":o.shift=!1;break;case"Tab":o.tab=!1;break}r!==void 0&&Object.keys(r).forEach(d=>{if(d!==a.key)return;const c=r[d];if(typeof c=="function")c(a);else{const{stop:v=!1,prevent:u=!1}=c;v&&a.stopPropagation(),u&&a.preventDefault(),c.handler(a)}})},s=()=>{(t===void 0||t.value)&&(le("keydown",document,i),le("keyup",document,l)),t!==void 0&&de(t,a=>{a?(le("keydown",document,i),le("keyup",document,l)):(re("keydown",document,i),re("keyup",document,l))})};return kr()?(Tn(s),ze(()=>{(t===void 0||t.value)&&(re("keydown",document,i),re("keyup",document,l))})):s(),It(o)}const Er=ue("n-internal-select-menu-body"),Wt=ue("n-drawer-body"),Vt=ue("n-modal-body"),dt=ue("n-popover-body"),qo="__disabled__";function Te(e){const t=Z(Vt,null),o=Z(Wt,null),n=Z(dt,null),r=Z(Er,null),i=F();if(typeof document<"u"){i.value=document.fullscreenElement;const l=()=>{i.value=document.fullscreenElement};Ne(()=>{le("fullscreenchange",document,l)}),ze(()=>{re("fullscreenchange",document,l)})}return ce(()=>{var l;const{to:s}=e;return s!==void 0?s===!1?qo:s===!0?i.value||"body":s:t!=null&&t.value?(l=t.value.$el)!==null&&l!==void 0?l:t.value:o!=null&&o.value?o.value:n!=null&&n.value?n.value:r!=null&&r.value?r.value:s??(i.value||"body")})}Te.tdkey=qo;Te.propTo={type:[String,Object,Boolean],default:void 0};function Mr(e,t,o){const n=F(e.value);let r=null;return de(e,i=>{r!==null&&window.clearTimeout(r),i===!0?o&&!o.value?n.value=!0:r=window.setTimeout(()=>{n.value=!0},t):n.value=!1}),n}function kt(e,t,o="default"){const n=t[o];if(n===void 0)throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);return n()}function _t(e,t=!0,o=[]){return e.forEach(n=>{if(n!==null){if(typeof n!="object"){(typeof n=="string"||typeof n=="number")&&o.push(Nn(String(n)));return}if(Array.isArray(n)){_t(n,t,o);return}if(n.type===Ke){if(n.children===null)return;Array.isArray(n.children)&&_t(n.children,t,o)}else n.type!==En&&o.push(n)}}),o}function co(e,t,o="default"){const n=t[o];if(n===void 0)throw new Error(`[vueuc/${e}]: slot[${o}] is empty.`);const r=_t(n());if(r.length===1)return r[0];throw new Error(`[vueuc/${e}]: slot[${o}] should have exactly one child.`)}let xe=null;function Xo(){if(xe===null&&(xe=document.getElementById("v-binder-view-measurer"),xe===null)){xe=document.createElement("div"),xe.id="v-binder-view-measurer";const{style:e}=xe;e.position="fixed",e.left="0",e.right="0",e.top="0",e.bottom="0",e.pointerEvents="none",e.visibility="hidden",document.body.appendChild(xe)}return xe.getBoundingClientRect()}function Br(e,t){const o=Xo();return{top:t,left:e,height:0,width:0,right:o.width-e,bottom:o.height-t}}function pt(e){const t=e.getBoundingClientRect(),o=Xo();return{left:t.left-o.left,top:t.top-o.top,bottom:o.height+o.top-t.bottom,right:o.width+o.left-t.right,width:t.width,height:t.height}}function Hr(e){return e.nodeType===9?null:e.parentNode}function Zo(e){if(e===null)return null;const t=Hr(e);if(t===null)return null;if(t.nodeType===9)return document;if(t.nodeType===1){const{overflow:o,overflowX:n,overflowY:r}=getComputedStyle(t);if(/(auto|scroll|overlay)/.test(o+r+n))return t}return Zo(t)}const Jo=j({name:"Binder",props:{syncTargetWithParent:Boolean,syncTarget:{type:Boolean,default:!0}},setup(e){var t;ne("VBinder",(t=Bo())===null||t===void 0?void 0:t.proxy);const o=Z("VBinder",null),n=F(null),r=h=>{n.value=h,o&&e.syncTargetWithParent&&o.setTargetRef(h)};let i=[];const l=()=>{let h=n.value;for(;h=Zo(h),h!==null;)i.push(h);for(const k of i)le("scroll",k,v,!0)},s=()=>{for(const h of i)re("scroll",h,v,!0);i=[]},a=new Set,d=h=>{a.size===0&&l(),a.has(h)||a.add(h)},c=h=>{a.has(h)&&a.delete(h),a.size===0&&s()},v=()=>{Ar(u)},u=()=>{a.forEach(h=>h())},b=new Set,g=h=>{b.size===0&&le("resize",window,p),b.has(h)||b.add(h)},m=h=>{b.has(h)&&b.delete(h),b.size===0&&re("resize",window,p)},p=()=>{b.forEach(h=>h())};return ze(()=>{re("resize",window,p),s()}),{targetRef:n,setTargetRef:r,addScrollListener:d,removeScrollListener:c,addResizeListener:g,removeResizeListener:m}},render(){return kt("binder",this.$slots)}}),Qo=j({name:"Target",setup(){const{setTargetRef:e,syncTarget:t}=Z("VBinder");return{syncTarget:t,setTargetDirective:{mounted:e,updated:e}}},render(){const{syncTarget:e,setTargetDirective:t}=this;return e?rt(co("follower",this.$slots),[[t]]):co("follower",this.$slots)}}),$e="@@mmoContext",Rr={mounted(e,{value:t}){e[$e]={handler:void 0},typeof t=="function"&&(e[$e].handler=t,le("mousemoveoutside",e,t))},updated(e,{value:t}){const o=e[$e];typeof t=="function"?o.handler?o.handler!==t&&(re("mousemoveoutside",e,o.handler),o.handler=t,le("mousemoveoutside",e,t)):(e[$e].handler=t,le("mousemoveoutside",e,t)):o.handler&&(re("mousemoveoutside",e,o.handler),o.handler=void 0)},unmounted(e){const{handler:t}=e[$e];t&&re("mousemoveoutside",e,t),e[$e].handler=void 0}},Ae="@@coContext",uo={mounted(e,{value:t,modifiers:o}){e[Ae]={handler:void 0},typeof t=="function"&&(e[Ae].handler=t,le("clickoutside",e,t,{capture:o.capture}))},updated(e,{value:t,modifiers:o}){const n=e[Ae];typeof t=="function"?n.handler?n.handler!==t&&(re("clickoutside",e,n.handler,{capture:o.capture}),n.handler=t,le("clickoutside",e,t,{capture:o.capture})):(e[Ae].handler=t,le("clickoutside",e,t,{capture:o.capture})):n.handler&&(re("clickoutside",e,n.handler,{capture:o.capture}),n.handler=void 0)},unmounted(e,{modifiers:t}){const{handler:o}=e[Ae];o&&re("clickoutside",e,o,{capture:t.capture}),e[Ae].handler=void 0}};function Fr(e,t){console.error(`[vdirs/${e}]: ${t}`)}class Lr{constructor(){this.elementZIndex=new Map,this.nextZIndex=2e3}get elementCount(){return this.elementZIndex.size}ensureZIndex(t,o){const{elementZIndex:n}=this;if(o!==void 0){t.style.zIndex=`${o}`,n.delete(t);return}const{nextZIndex:r}=this;n.has(t)&&n.get(t)+1===this.nextZIndex||(t.style.zIndex=`${r}`,n.set(t,r),this.nextZIndex=r+1,this.squashState())}unregister(t,o){const{elementZIndex:n}=this;n.has(t)?n.delete(t):o===void 0&&Fr("z-index-manager/unregister-element","Element not found when unregistering."),this.squashState()}squashState(){const{elementCount:t}=this;t||(this.nextZIndex=2e3),this.nextZIndex-t>2500&&this.rearrange()}rearrange(){const t=Array.from(this.elementZIndex.entries());t.sort((o,n)=>o[1]-n[1]),this.nextZIndex=2e3,t.forEach(o=>{const n=o[0],r=this.nextZIndex++;`${r}`!==n.style.zIndex&&(n.style.zIndex=`${r}`)})}}const mt=new Lr,Pe="@@ziContext",en={mounted(e,t){const{value:o={}}=t,{zIndex:n,enabled:r}=o;e[Pe]={enabled:!!r,initialized:!1},r&&(mt.ensureZIndex(e,n),e[Pe].initialized=!0)},updated(e,t){const{value:o={}}=t,{zIndex:n,enabled:r}=o,i=e[Pe].enabled;r&&!i&&(mt.ensureZIndex(e,n),e[Pe].initialized=!0),e[Pe].enabled=!!r},unmounted(e,t){if(!e[Pe].initialized)return;const{value:o={}}=t,{zIndex:n}=o;mt.unregister(e,n)}},{c:Be}=Mn(),tn="vueuc-style";function fo(e){return typeof e=="string"?document.querySelector(e):e()}const Kr=j({name:"LazyTeleport",props:{to:{type:[String,Object],default:void 0},disabled:Boolean,show:{type:Boolean,required:!0}},setup(e){return{showTeleport:Pr(q(e,"show")),mergedTo:$(()=>{const{to:t}=e;return t??"body"})}},render(){return this.showTeleport?this.disabled?kt("lazy-teleport",this.$slots):f(Bn,{disabled:this.disabled,to:this.mergedTo},kt("lazy-teleport",this.$slots)):null}}),Ge={top:"bottom",bottom:"top",left:"right",right:"left"},ho={start:"end",center:"center",end:"start"},gt={top:"height",bottom:"height",left:"width",right:"width"},Dr={"bottom-start":"top left",bottom:"top center","bottom-end":"top right","top-start":"bottom left",top:"bottom center","top-end":"bottom right","right-start":"top left",right:"center left","right-end":"bottom left","left-start":"top right",left:"center right","left-end":"bottom right"},jr={"bottom-start":"bottom left",bottom:"bottom center","bottom-end":"bottom right","top-start":"top left",top:"top center","top-end":"top right","right-start":"top right",right:"center right","right-end":"bottom right","left-start":"top left",left:"center left","left-end":"bottom left"},Wr={"bottom-start":"right","bottom-end":"left","top-start":"right","top-end":"left","right-start":"bottom","right-end":"top","left-start":"bottom","left-end":"top"},vo={top:!0,bottom:!1,left:!0,right:!1},po={top:"end",bottom:"start",left:"end",right:"start"};function Vr(e,t,o,n,r,i){if(!r||i)return{placement:e,top:0,left:0};const[l,s]=e.split("-");let a=s??"center",d={top:0,left:0};const c=(b,g,m)=>{let p=0,h=0;const k=o[b]-t[g]-t[b];return k>0&&n&&(m?h=vo[g]?k:-k:p=vo[g]?k:-k),{left:p,top:h}},v=l==="left"||l==="right";if(a!=="center"){const b=Wr[e],g=Ge[b],m=gt[b];if(o[m]>t[m]){if(t[b]+t[m]<o[m]){const p=(o[m]-t[m])/2;t[b]<p||t[g]<p?t[b]<t[g]?(a=ho[s],d=c(m,g,v)):d=c(m,b,v):a="center"}}else o[m]<t[m]&&t[g]<0&&t[b]>t[g]&&(a=ho[s])}else{const b=l==="bottom"||l==="top"?"left":"top",g=Ge[b],m=gt[b],p=(o[m]-t[m])/2;(t[b]<p||t[g]<p)&&(t[b]>t[g]?(a=po[b],d=c(m,b,v)):(a=po[g],d=c(m,g,v)))}let u=l;return t[l]<o[gt[l]]&&t[l]<t[Ge[l]]&&(u=Ge[l]),{placement:a!=="center"?`${u}-${a}`:u,left:d.left,top:d.top}}function Gr(e,t){return t?jr[e]:Dr[e]}function Ur(e,t,o,n,r,i){if(i)switch(e){case"bottom-start":return{top:`${Math.round(o.top-t.top+o.height)}px`,left:`${Math.round(o.left-t.left)}px`,transform:"translateY(-100%)"};case"bottom-end":return{top:`${Math.round(o.top-t.top+o.height)}px`,left:`${Math.round(o.left-t.left+o.width)}px`,transform:"translateX(-100%) translateY(-100%)"};case"top-start":return{top:`${Math.round(o.top-t.top)}px`,left:`${Math.round(o.left-t.left)}px`,transform:""};case"top-end":return{top:`${Math.round(o.top-t.top)}px`,left:`${Math.round(o.left-t.left+o.width)}px`,transform:"translateX(-100%)"};case"right-start":return{top:`${Math.round(o.top-t.top)}px`,left:`${Math.round(o.left-t.left+o.width)}px`,transform:"translateX(-100%)"};case"right-end":return{top:`${Math.round(o.top-t.top+o.height)}px`,left:`${Math.round(o.left-t.left+o.width)}px`,transform:"translateX(-100%) translateY(-100%)"};case"left-start":return{top:`${Math.round(o.top-t.top)}px`,left:`${Math.round(o.left-t.left)}px`,transform:""};case"left-end":return{top:`${Math.round(o.top-t.top+o.height)}px`,left:`${Math.round(o.left-t.left)}px`,transform:"translateY(-100%)"};case"top":return{top:`${Math.round(o.top-t.top)}px`,left:`${Math.round(o.left-t.left+o.width/2)}px`,transform:"translateX(-50%)"};case"right":return{top:`${Math.round(o.top-t.top+o.height/2)}px`,left:`${Math.round(o.left-t.left+o.width)}px`,transform:"translateX(-100%) translateY(-50%)"};case"left":return{top:`${Math.round(o.top-t.top+o.height/2)}px`,left:`${Math.round(o.left-t.left)}px`,transform:"translateY(-50%)"};case"bottom":default:return{top:`${Math.round(o.top-t.top+o.height)}px`,left:`${Math.round(o.left-t.left+o.width/2)}px`,transform:"translateX(-50%) translateY(-100%)"}}switch(e){case"bottom-start":return{top:`${Math.round(o.top-t.top+o.height+n)}px`,left:`${Math.round(o.left-t.left+r)}px`,transform:""};case"bottom-end":return{top:`${Math.round(o.top-t.top+o.height+n)}px`,left:`${Math.round(o.left-t.left+o.width+r)}px`,transform:"translateX(-100%)"};case"top-start":return{top:`${Math.round(o.top-t.top+n)}px`,left:`${Math.round(o.left-t.left+r)}px`,transform:"translateY(-100%)"};case"top-end":return{top:`${Math.round(o.top-t.top+n)}px`,left:`${Math.round(o.left-t.left+o.width+r)}px`,transform:"translateX(-100%) translateY(-100%)"};case"right-start":return{top:`${Math.round(o.top-t.top+n)}px`,left:`${Math.round(o.left-t.left+o.width+r)}px`,transform:""};case"right-end":return{top:`${Math.round(o.top-t.top+o.height+n)}px`,left:`${Math.round(o.left-t.left+o.width+r)}px`,transform:"translateY(-100%)"};case"left-start":return{top:`${Math.round(o.top-t.top+n)}px`,left:`${Math.round(o.left-t.left+r)}px`,transform:"translateX(-100%)"};case"left-end":return{top:`${Math.round(o.top-t.top+o.height+n)}px`,left:`${Math.round(o.left-t.left+r)}px`,transform:"translateX(-100%) translateY(-100%)"};case"top":return{top:`${Math.round(o.top-t.top+n)}px`,left:`${Math.round(o.left-t.left+o.width/2+r)}px`,transform:"translateY(-100%) translateX(-50%)"};case"right":return{top:`${Math.round(o.top-t.top+o.height/2+n)}px`,left:`${Math.round(o.left-t.left+o.width+r)}px`,transform:"translateY(-50%)"};case"left":return{top:`${Math.round(o.top-t.top+o.height/2+n)}px`,left:`${Math.round(o.left-t.left+r)}px`,transform:"translateY(-50%) translateX(-100%)"};case"bottom":default:return{top:`${Math.round(o.top-t.top+o.height+n)}px`,left:`${Math.round(o.left-t.left+o.width/2+r)}px`,transform:"translateX(-50%)"}}}const Yr=Be([Be(".v-binder-follower-container",{position:"absolute",left:"0",right:"0",top:"0",height:"0",pointerEvents:"none",zIndex:"auto"}),Be(".v-binder-follower-content",{position:"absolute",zIndex:"auto"},[Be("> *",{pointerEvents:"all"})])]),on=j({name:"Follower",inheritAttrs:!1,props:{show:Boolean,enabled:{type:Boolean,default:void 0},placement:{type:String,default:"bottom"},syncTrigger:{type:Array,default:["resize","scroll"]},to:[String,Object],flip:{type:Boolean,default:!0},internalShift:Boolean,x:Number,y:Number,width:String,minWidth:String,containerClass:String,teleportDisabled:Boolean,zindexable:{type:Boolean,default:!0},zIndex:Number,overlap:Boolean},setup(e){const t=Z("VBinder"),o=ce(()=>e.enabled!==void 0?e.enabled:e.show),n=F(null),r=F(null),i=()=>{const{syncTrigger:u}=e;u.includes("scroll")&&t.addScrollListener(a),u.includes("resize")&&t.addResizeListener(a)},l=()=>{t.removeScrollListener(a),t.removeResizeListener(a)};Ne(()=>{o.value&&(a(),i())});const s=Ho();Yr.mount({id:"vueuc/binder",head:!0,anchorMetaName:tn,ssr:s}),ze(()=>{l()}),Tr(()=>{o.value&&a()});const a=()=>{if(!o.value)return;const u=n.value;if(u===null)return;const b=t.targetRef,{x:g,y:m,overlap:p}=e,h=g!==void 0&&m!==void 0?Br(g,m):pt(b);u.style.setProperty("--v-target-width",`${Math.round(h.width)}px`),u.style.setProperty("--v-target-height",`${Math.round(h.height)}px`);const{width:k,minWidth:E,placement:w,internalShift:S,flip:_}=e;u.setAttribute("v-placement",w),p?u.setAttribute("v-overlap",""):u.removeAttribute("v-overlap");const{style:x}=u;k==="target"?x.width=`${h.width}px`:k!==void 0?x.width=k:x.width="",E==="target"?x.minWidth=`${h.width}px`:E!==void 0?x.minWidth=E:x.minWidth="";const H=pt(u),R=pt(r.value),{left:P,top:V,placement:B}=Vr(w,h,H,S,_,p),G=Gr(B,p),{left:L,top:I,transform:W}=Ur(B,R,h,V,P,p);u.setAttribute("v-placement",B),u.style.setProperty("--v-offset-left",`${Math.round(P)}px`),u.style.setProperty("--v-offset-top",`${Math.round(V)}px`),u.style.transform=`translateX(${L}) translateY(${I}) ${W}`,u.style.setProperty("--v-transform-origin",G),u.style.transformOrigin=G};de(o,u=>{u?(i(),d()):l()});const d=()=>{Qe().then(a).catch(u=>console.error(u))};["placement","x","y","internalShift","flip","width","overlap","minWidth"].forEach(u=>{de(q(e,u),a)}),["teleportDisabled"].forEach(u=>{de(q(e,u),d)}),de(q(e,"syncTrigger"),u=>{u.includes("resize")?t.addResizeListener(a):t.removeResizeListener(a),u.includes("scroll")?t.addScrollListener(a):t.removeScrollListener(a)});const c=Ro(),v=ce(()=>{const{to:u}=e;if(u!==void 0)return u;c.value});return{VBinder:t,mergedEnabled:o,offsetContainerRef:r,followerRef:n,mergedTo:v,syncPosition:a}},render(){return f(Kr,{show:this.show,to:this.mergedTo,disabled:this.teleportDisabled},{default:()=>{var e,t;const o=f("div",{class:["v-binder-follower-container",this.containerClass],ref:"offsetContainerRef"},[f("div",{class:"v-binder-follower-content",ref:"followerRef"},(t=(e=this.$slots).default)===null||t===void 0?void 0:t.call(e))]);return this.zindexable?rt(o,[[en,{enabled:this.mergedEnabled,zIndex:this.zIndex}]]):o}})}}),me="v-hidden",qr=Be("[v-hidden]",{display:"none!important"}),Xr=j({name:"Overflow",props:{getCounter:Function,getTail:Function,updateCounter:Function,onUpdateCount:Function,onUpdateOverflow:Function},setup(e,{slots:t}){const o=F(null),n=F(null);function r(l){const{value:s}=o,{getCounter:a,getTail:d}=e;let c;if(a!==void 0?c=a():c=n.value,!s||!c)return;c.hasAttribute(me)&&c.removeAttribute(me);const{children:v}=s;if(l.showAllItemsBeforeCalculate)for(const E of v)E.hasAttribute(me)&&E.removeAttribute(me);const u=s.offsetWidth,b=[],g=t.tail?d==null?void 0:d():null;let m=g?g.offsetWidth:0,p=!1;const h=s.children.length-(t.tail?1:0);for(let E=0;E<h-1;++E){if(E<0)continue;const w=v[E];if(p){w.hasAttribute(me)||w.setAttribute(me,"");continue}else w.hasAttribute(me)&&w.removeAttribute(me);const S=w.offsetWidth;if(m+=S,b[E]=S,m>u){const{updateCounter:_}=e;for(let x=E;x>=0;--x){const H=h-1-x;_!==void 0?_(H):c.textContent=`${H}`;const R=c.offsetWidth;if(m-=b[x],m+R<=u||x===0){p=!0,E=x-1,g&&(E===-1?(g.style.maxWidth=`${u-R}px`,g.style.boxSizing="border-box"):g.style.maxWidth="");const{onUpdateCount:P}=e;P&&P(H);break}}}}const{onUpdateOverflow:k}=e;p?k!==void 0&&k(!0):(k!==void 0&&k(!1),c.setAttribute(me,""))}const i=Ho();return qr.mount({id:"vueuc/overflow",head:!0,anchorMetaName:tn,ssr:i}),Ne(()=>r({showAllItemsBeforeCalculate:!1})),{selfRef:o,counterRef:n,sync:r}},render(){const{$slots:e}=this;return Qe(()=>this.sync({showAllItemsBeforeCalculate:!1})),f("div",{class:"v-overflow",ref:"selfRef"},[Hn(e,"default"),e.counter?e.counter():f("span",{style:{display:"inline-block"},ref:"counterRef"}),e.tail?e.tail():null])}});function nn(e){return e instanceof HTMLElement}function rn(e){for(let t=0;t<e.childNodes.length;t++){const o=e.childNodes[t];if(nn(o)&&(an(o)||rn(o)))return!0}return!1}function ln(e){for(let t=e.childNodes.length-1;t>=0;t--){const o=e.childNodes[t];if(nn(o)&&(an(o)||ln(o)))return!0}return!1}function an(e){if(!Zr(e))return!1;try{e.focus({preventScroll:!0})}catch{}return document.activeElement===e}function Zr(e){if(e.tabIndex>0||e.tabIndex===0&&e.getAttribute("tabIndex")!==null)return!0;if(e.getAttribute("disabled"))return!1;switch(e.nodeName){case"A":return!!e.href&&e.rel!=="ignore";case"INPUT":return e.type!=="hidden"&&e.type!=="file";case"BUTTON":case"SELECT":case"TEXTAREA":return!0;default:return!1}}let Me=[];const Jr=j({name:"FocusTrap",props:{disabled:Boolean,active:Boolean,autoFocus:{type:Boolean,default:!0},onEsc:Function,initialFocusTo:String,finalFocusTo:String,returnFocusOnDeactivated:{type:Boolean,default:!0}},setup(e){const t=Fo(),o=F(null),n=F(null);let r=!1,i=!1;const l=typeof document>"u"?null:document.activeElement;function s(){return Me[Me.length-1]===t}function a(p){var h;p.code==="Escape"&&s()&&((h=e.onEsc)===null||h===void 0||h.call(e,p))}Ne(()=>{de(()=>e.active,p=>{p?(v(),le("keydown",document,a)):(re("keydown",document,a),r&&u())},{immediate:!0})}),ze(()=>{re("keydown",document,a),r&&u()});function d(p){if(!i&&s()){const h=c();if(h===null||h.contains(At(p)))return;b("first")}}function c(){const p=o.value;if(p===null)return null;let h=p;for(;h=h.nextSibling,!(h===null||h instanceof Element&&h.tagName==="DIV"););return h}function v(){var p;if(!e.disabled){if(Me.push(t),e.autoFocus){const{initialFocusTo:h}=e;h===void 0?b("first"):(p=fo(h))===null||p===void 0||p.focus({preventScroll:!0})}r=!0,document.addEventListener("focus",d,!0)}}function u(){var p;if(e.disabled||(document.removeEventListener("focus",d,!0),Me=Me.filter(k=>k!==t),s()))return;const{finalFocusTo:h}=e;h!==void 0?(p=fo(h))===null||p===void 0||p.focus({preventScroll:!0}):e.returnFocusOnDeactivated&&l instanceof HTMLElement&&(i=!0,l.focus({preventScroll:!0}),i=!1)}function b(p){if(s()&&e.active){const h=o.value,k=n.value;if(h!==null&&k!==null){const E=c();if(E==null||E===k){i=!0,h.focus({preventScroll:!0}),i=!1;return}i=!0;const w=p==="first"?rn(E):ln(E);i=!1,w||(i=!0,h.focus({preventScroll:!0}),i=!1)}}}function g(p){if(i)return;const h=c();h!==null&&(p.relatedTarget!==null&&h.contains(p.relatedTarget)?b("last"):b("first"))}function m(p){i||(p.relatedTarget!==null&&p.relatedTarget===o.value?b("last"):b("first"))}return{focusableStartRef:o,focusableEndRef:n,focusableStyle:"position: absolute; height: 0; width: 0;",handleStartFocus:g,handleEndFocus:m}},render(){const{default:e}=this.$slots;if(e===void 0)return null;if(this.disabled)return e();const{active:t,focusableStyle:o}=this;return f(Ke,null,[f("div",{"aria-hidden":"true",tabindex:t?"0":"-1",ref:"focusableStartRef",style:o,onFocus:this.handleStartFocus}),e(),f("div",{"aria-hidden":"true",style:o,ref:"focusableEndRef",tabindex:t?"0":"-1",onFocus:this.handleEndFocus})])}});let bt;function Qr(){return bt===void 0&&(bt=navigator.userAgent.includes("Node.js")||navigator.userAgent.includes("jsdom")),bt}function ei(e){switch(typeof e){case"string":return e||void 0;case"number":return String(e);default:return}}function ti(e){return t=>{t?e.value=t.$el:e.value=null}}function oi(e,t="default",o=void 0){const n=e[t];if(!n)return et("getFirstSlotVNode",`slot[${t}] is empty`),null;const r=pr(n(o));return r.length===1?r[0]:(et("getFirstSlotVNode",`slot[${t}] should have exactly one child`),null)}var Ot=it(lt,"WeakMap"),ni=Rn(Object.keys,Object),ri=Object.prototype,ii=ri.hasOwnProperty;function li(e){if(!Fn(e))return ni(e);var t=[];for(var o in Object(e))ii.call(e,o)&&o!="constructor"&&t.push(o);return t}function Gt(e){return Lt(e)?Ln(e):li(e)}function ai(e,t){for(var o=-1,n=t.length,r=e.length;++o<n;)e[r+o]=t[o];return e}function si(e,t){for(var o=-1,n=e==null?0:e.length,r=0,i=[];++o<n;){var l=e[o];t(l,o,e)&&(i[r++]=l)}return i}function di(){return[]}var ci=Object.prototype,ui=ci.propertyIsEnumerable,mo=Object.getOwnPropertySymbols,fi=mo?function(e){return e==null?[]:(e=Object(e),si(mo(e),function(t){return ui.call(e,t)}))}:di;function hi(e,t,o){var n=t(e);return Oe(e)?n:ai(n,o(e))}function go(e){return hi(e,Gt,fi)}var Tt=it(lt,"DataView"),Nt=it(lt,"Promise"),Et=it(lt,"Set"),bo="[object Map]",vi="[object Object]",yo="[object Promise]",xo="[object Set]",wo="[object WeakMap]",Co="[object DataView]",pi=Ee(Tt),mi=Ee(zt),gi=Ee(Nt),bi=Ee(Et),yi=Ee(Ot),we=Lo;(Tt&&we(new Tt(new ArrayBuffer(1)))!=Co||zt&&we(new zt)!=bo||Nt&&we(Nt.resolve())!=yo||Et&&we(new Et)!=xo||Ot&&we(new Ot)!=wo)&&(we=function(e){var t=Lo(e),o=t==vi?e.constructor:void 0,n=o?Ee(o):"";if(n)switch(n){case pi:return Co;case mi:return bo;case gi:return yo;case bi:return xo;case yi:return wo}return t});var xi="__lodash_hash_undefined__";function wi(e){return this.__data__.set(e,xi),this}function Ci(e){return this.__data__.has(e)}function ot(e){var t=-1,o=e==null?0:e.length;for(this.__data__=new Kn;++t<o;)this.add(e[t])}ot.prototype.add=ot.prototype.push=wi;ot.prototype.has=Ci;function Si(e,t){for(var o=-1,n=e==null?0:e.length;++o<n;)if(t(e[o],o,e))return!0;return!1}function Ii(e,t){return e.has(t)}var zi=1,$i=2;function sn(e,t,o,n,r,i){var l=o&zi,s=e.length,a=t.length;if(s!=a&&!(l&&a>s))return!1;var d=i.get(e),c=i.get(t);if(d&&c)return d==t&&c==e;var v=-1,u=!0,b=o&$i?new ot:void 0;for(i.set(e,t),i.set(t,e);++v<s;){var g=e[v],m=t[v];if(n)var p=l?n(m,g,v,t,e,i):n(g,m,v,e,t,i);if(p!==void 0){if(p)continue;u=!1;break}if(b){if(!Si(t,function(h,k){if(!Ii(b,k)&&(g===h||r(g,h,o,n,i)))return b.push(k)})){u=!1;break}}else if(!(g===m||r(g,m,o,n,i))){u=!1;break}}return i.delete(e),i.delete(t),u}function Ai(e){var t=-1,o=Array(e.size);return e.forEach(function(n,r){o[++t]=[r,n]}),o}function Pi(e){var t=-1,o=Array(e.size);return e.forEach(function(n){o[++t]=n}),o}var ki=1,_i=2,Oi="[object Boolean]",Ti="[object Date]",Ni="[object Error]",Ei="[object Map]",Mi="[object Number]",Bi="[object RegExp]",Hi="[object Set]",Ri="[object String]",Fi="[object Symbol]",Li="[object ArrayBuffer]",Ki="[object DataView]",So=ro?ro.prototype:void 0,yt=So?So.valueOf:void 0;function Di(e,t,o,n,r,i,l){switch(o){case Ki:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1;e=e.buffer,t=t.buffer;case Li:return!(e.byteLength!=t.byteLength||!i(new io(e),new io(t)));case Oi:case Ti:case Mi:return Dn(+e,+t);case Ni:return e.name==t.name&&e.message==t.message;case Bi:case Ri:return e==t+"";case Ei:var s=Ai;case Hi:var a=n&ki;if(s||(s=Pi),e.size!=t.size&&!a)return!1;var d=l.get(e);if(d)return d==t;n|=_i,l.set(e,t);var c=sn(s(e),s(t),n,r,i,l);return l.delete(e),c;case Fi:if(yt)return yt.call(e)==yt.call(t)}return!1}var ji=1,Wi=Object.prototype,Vi=Wi.hasOwnProperty;function Gi(e,t,o,n,r,i){var l=o&ji,s=go(e),a=s.length,d=go(t),c=d.length;if(a!=c&&!l)return!1;for(var v=a;v--;){var u=s[v];if(!(l?u in t:Vi.call(t,u)))return!1}var b=i.get(e),g=i.get(t);if(b&&g)return b==t&&g==e;var m=!0;i.set(e,t),i.set(t,e);for(var p=l;++v<a;){u=s[v];var h=e[u],k=t[u];if(n)var E=l?n(k,h,u,t,e,i):n(h,k,u,e,t,i);if(!(E===void 0?h===k||r(h,k,o,n,i):E)){m=!1;break}p||(p=u=="constructor")}if(m&&!p){var w=e.constructor,S=t.constructor;w!=S&&"constructor"in e&&"constructor"in t&&!(typeof w=="function"&&w instanceof w&&typeof S=="function"&&S instanceof S)&&(m=!1)}return i.delete(e),i.delete(t),m}var Ui=1,Io="[object Arguments]",zo="[object Array]",Ue="[object Object]",Yi=Object.prototype,$o=Yi.hasOwnProperty;function qi(e,t,o,n,r,i){var l=Oe(e),s=Oe(t),a=l?zo:we(e),d=s?zo:we(t);a=a==Io?Ue:a,d=d==Io?Ue:d;var c=a==Ue,v=d==Ue,u=a==d;if(u&&lo(e)){if(!lo(t))return!1;l=!0,c=!1}if(u&&!c)return i||(i=new Xe),l||jn(e)?sn(e,t,o,n,r,i):Di(e,t,a,o,n,r,i);if(!(o&Ui)){var b=c&&$o.call(e,"__wrapped__"),g=v&&$o.call(t,"__wrapped__");if(b||g){var m=b?e.value():e,p=g?t.value():t;return i||(i=new Xe),r(m,p,o,n,i)}}return u?(i||(i=new Xe),Gi(e,t,o,n,r,i)):!1}function Ut(e,t,o,n,r){return e===t?!0:e==null||t==null||!ao(e)&&!ao(t)?e!==e&&t!==t:qi(e,t,o,n,Ut,r)}var Xi=1,Zi=2;function Ji(e,t,o,n){var r=o.length,i=r;if(e==null)return!i;for(e=Object(e);r--;){var l=o[r];if(l[2]?l[1]!==e[l[0]]:!(l[0]in e))return!1}for(;++r<i;){l=o[r];var s=l[0],a=e[s],d=l[1];if(l[2]){if(a===void 0&&!(s in e))return!1}else{var c=new Xe,v;if(!(v===void 0?Ut(d,a,Xi|Zi,n,c):v))return!1}}return!0}function dn(e){return e===e&&!Wn(e)}function Qi(e){for(var t=Gt(e),o=t.length;o--;){var n=t[o],r=e[n];t[o]=[n,r,dn(r)]}return t}function cn(e,t){return function(o){return o==null?!1:o[e]===t&&(t!==void 0||e in Object(o))}}function el(e){var t=Qi(e);return t.length==1&&t[0][2]?cn(t[0][0],t[0][1]):function(o){return o===e||Ji(o,e,t)}}function tl(e,t){return e!=null&&t in Object(e)}function ol(e,t,o){t=cr(t,e);for(var n=-1,r=t.length,i=!1;++n<r;){var l=Kt(t[n]);if(!(i=e!=null&&o(e,l)))break;e=e[l]}return i||++n!=r?i:(r=e==null?0:e.length,!!r&&Vn(r)&&Gn(l,r)&&(Oe(e)||Un(e)))}function nl(e,t){return e!=null&&ol(e,t,tl)}var rl=1,il=2;function ll(e,t){return Wo(e)&&dn(t)?cn(Kt(e),t):function(o){var n=ur(o,e);return n===void 0&&n===t?nl(o,e):Ut(t,n,rl|il)}}function al(e){return function(t){return t==null?void 0:t[e]}}function sl(e){return function(t){return fr(t,e)}}function dl(e){return Wo(e)?al(Kt(e)):sl(e)}function cl(e){return typeof e=="function"?e:e==null?Yn:typeof e=="object"?Oe(e)?ll(e[0],e[1]):el(e):dl(e)}function ul(e,t){return e&&qn(e,t,Gt)}function fl(e,t){return function(o,n){if(o==null)return o;if(!Lt(o))return e(o,n);for(var r=o.length,i=-1,l=Object(o);++i<r&&n(l[i],i,l)!==!1;);return o}}var hl=fl(ul);function vl(e,t){var o=-1,n=Lt(e)?Array(e.length):[];return hl(e,function(r,i,l){n[++o]=t(r,i,l)}),n}function pl(e,t){var o=Oe(e)?Xn:vl;return o(e,cl(t))}const ml=j({name:"ChevronDownFilled",render(){return f("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},f("path",{d:"M3.20041 5.73966C3.48226 5.43613 3.95681 5.41856 4.26034 5.70041L8 9.22652L11.7397 5.70041C12.0432 5.41856 12.5177 5.43613 12.7996 5.73966C13.0815 6.0432 13.0639 6.51775 12.7603 6.7996L8.51034 10.7996C8.22258 11.0668 7.77743 11.0668 7.48967 10.7996L3.23966 6.7996C2.93613 6.51775 2.91856 6.0432 3.20041 5.73966Z",fill:"currentColor"}))}}),un=j({name:"ChevronRight",render(){return f("svg",{viewBox:"0 0 16 16",fill:"none",xmlns:"http://www.w3.org/2000/svg"},f("path",{d:"M5.64645 3.14645C5.45118 3.34171 5.45118 3.65829 5.64645 3.85355L9.79289 8L5.64645 12.1464C5.45118 12.3417 5.45118 12.6583 5.64645 12.8536C5.84171 13.0488 6.15829 13.0488 6.35355 12.8536L10.8536 8.35355C11.0488 8.15829 11.0488 7.84171 10.8536 7.64645L6.35355 3.14645C6.15829 2.95118 5.84171 2.95118 5.64645 3.14645Z",fill:"currentColor"}))}});function Ao(e){return Array.isArray(e)?e:[e]}const Mt={STOP:"STOP"};function fn(e,t){const o=t(e);e.children!==void 0&&o!==Mt.STOP&&e.children.forEach(n=>fn(n,t))}function gl(e,t={}){const{preserveGroup:o=!1}=t,n=[],r=o?l=>{l.isLeaf||(n.push(l.key),i(l.children))}:l=>{l.isLeaf||(l.isGroup||n.push(l.key),i(l.children))};function i(l){l.forEach(r)}return i(e),n}function bl(e,t){const{isLeaf:o}=e;return o!==void 0?o:!t(e)}function yl(e){return e.children}function xl(e){return e.key}function wl(){return!1}function Cl(e,t){const{isLeaf:o}=e;return!(o===!1&&!Array.isArray(t(e)))}function Sl(e){return e.disabled===!0}function Il(e,t){return e.isLeaf===!1&&!Array.isArray(t(e))}function xt(e){var t;return e==null?[]:Array.isArray(e)?e:(t=e.checkedKeys)!==null&&t!==void 0?t:[]}function wt(e){var t;return e==null||Array.isArray(e)?[]:(t=e.indeterminateKeys)!==null&&t!==void 0?t:[]}function zl(e,t){const o=new Set(e);return t.forEach(n=>{o.has(n)||o.add(n)}),Array.from(o)}function $l(e,t){const o=new Set(e);return t.forEach(n=>{o.has(n)&&o.delete(n)}),Array.from(o)}function Al(e){return(e==null?void 0:e.type)==="group"}class Pl extends Error{constructor(){super(),this.message="SubtreeNotLoadedError: checking a subtree whose required nodes are not fully loaded."}}function kl(e,t,o,n){return nt(t.concat(e),o,n,!1)}function _l(e,t){const o=new Set;return e.forEach(n=>{const r=t.treeNodeMap.get(n);if(r!==void 0){let i=r.parent;for(;i!==null&&!(i.disabled||o.has(i.key));)o.add(i.key),i=i.parent}}),o}function Ol(e,t,o,n){const r=nt(t,o,n,!1),i=nt(e,o,n,!0),l=_l(e,o),s=[];return r.forEach(a=>{(i.has(a)||l.has(a))&&s.push(a)}),s.forEach(a=>r.delete(a)),r}function Ct(e,t){const{checkedKeys:o,keysToCheck:n,keysToUncheck:r,indeterminateKeys:i,cascade:l,leafOnly:s,checkStrategy:a,allowNotLoaded:d}=e;if(!l)return n!==void 0?{checkedKeys:zl(o,n),indeterminateKeys:Array.from(i)}:r!==void 0?{checkedKeys:$l(o,r),indeterminateKeys:Array.from(i)}:{checkedKeys:Array.from(o),indeterminateKeys:Array.from(i)};const{levelTreeNodeMap:c}=t;let v;r!==void 0?v=Ol(r,o,t,d):n!==void 0?v=kl(n,o,t,d):v=nt(o,t,d,!1);const u=a==="parent",b=a==="child"||s,g=v,m=new Set,p=Math.max.apply(null,Array.from(c.keys()));for(let h=p;h>=0;h-=1){const k=h===0,E=c.get(h);for(const w of E){if(w.isLeaf)continue;const{key:S,shallowLoaded:_}=w;if(b&&_&&w.children.forEach(P=>{!P.disabled&&!P.isLeaf&&P.shallowLoaded&&g.has(P.key)&&g.delete(P.key)}),w.disabled||!_)continue;let x=!0,H=!1,R=!0;for(const P of w.children){const V=P.key;if(!P.disabled){if(R&&(R=!1),g.has(V))H=!0;else if(m.has(V)){H=!0,x=!1;break}else if(x=!1,H)break}}x&&!R?(u&&w.children.forEach(P=>{!P.disabled&&g.has(P.key)&&g.delete(P.key)}),g.add(S)):H&&m.add(S),k&&b&&g.has(S)&&g.delete(S)}}return{checkedKeys:Array.from(g),indeterminateKeys:Array.from(m)}}function nt(e,t,o,n){const{treeNodeMap:r,getChildren:i}=t,l=new Set,s=new Set(e);return e.forEach(a=>{const d=r.get(a);d!==void 0&&fn(d,c=>{if(c.disabled)return Mt.STOP;const{key:v}=c;if(!l.has(v)&&(l.add(v),s.add(v),Il(c.rawNode,i))){if(n)return Mt.STOP;if(!o)throw new Pl}})}),s}function Tl(e,{includeGroup:t=!1,includeSelf:o=!0},n){var r;const i=n.treeNodeMap;let l=e==null?null:(r=i.get(e))!==null&&r!==void 0?r:null;const s={keyPath:[],treeNodePath:[],treeNode:l};if(l!=null&&l.ignored)return s.treeNode=null,s;for(;l;)!l.ignored&&(t||!l.isGroup)&&s.treeNodePath.push(l),l=l.parent;return s.treeNodePath.reverse(),o||s.treeNodePath.pop(),s.keyPath=s.treeNodePath.map(a=>a.key),s}function Nl(e){if(e.length===0)return null;const t=e[0];return t.isGroup||t.ignored||t.disabled?t.getNext():t}function El(e,t){const o=e.siblings,n=o.length,{index:r}=e;return t?o[(r+1)%n]:r===o.length-1?null:o[r+1]}function Po(e,t,{loop:o=!1,includeDisabled:n=!1}={}){const r=t==="prev"?Ml:El,i={reverse:t==="prev"};let l=!1,s=null;function a(d){if(d!==null){if(d===e){if(!l)l=!0;else if(!e.disabled&&!e.isGroup){s=e;return}}else if((!d.disabled||n)&&!d.ignored&&!d.isGroup){s=d;return}if(d.isGroup){const c=Yt(d,i);c!==null?s=c:a(r(d,o))}else{const c=r(d,!1);if(c!==null)a(c);else{const v=Bl(d);v!=null&&v.isGroup?a(r(v,o)):o&&a(r(d,!0))}}}}return a(e),s}function Ml(e,t){const o=e.siblings,n=o.length,{index:r}=e;return t?o[(r-1+n)%n]:r===0?null:o[r-1]}function Bl(e){return e.parent}function Yt(e,t={}){const{reverse:o=!1}=t,{children:n}=e;if(n){const{length:r}=n,i=o?r-1:0,l=o?-1:r,s=o?-1:1;for(let a=i;a!==l;a+=s){const d=n[a];if(!d.disabled&&!d.ignored)if(d.isGroup){const c=Yt(d,t);if(c!==null)return c}else return d}}return null}const Hl={getChild(){return this.ignored?null:Yt(this)},getParent(){const{parent:e}=this;return e!=null&&e.isGroup?e.getParent():e},getNext(e={}){return Po(this,"next",e)},getPrev(e={}){return Po(this,"prev",e)}};function Rl(e,t){const o=t?new Set(t):void 0,n=[];function r(i){i.forEach(l=>{n.push(l),!(l.isLeaf||!l.children||l.ignored)&&(l.isGroup||o===void 0||o.has(l.key))&&r(l.children)})}return r(e),n}function Fl(e,t){const o=e.key;for(;t;){if(t.key===o)return!0;t=t.parent}return!1}function hn(e,t,o,n,r,i=null,l=0){const s=[];return e.forEach((a,d)=>{var c;const v=Object.create(n);if(v.rawNode=a,v.siblings=s,v.level=l,v.index=d,v.isFirstChild=d===0,v.isLastChild=d+1===e.length,v.parent=i,!v.ignored){const u=r(a);Array.isArray(u)&&(v.children=hn(u,t,o,n,r,v,l+1))}s.push(v),t.set(v.key,v),o.has(l)||o.set(l,[]),(c=o.get(l))===null||c===void 0||c.push(v)}),s}function Je(e,t={}){var o;const n=new Map,r=new Map,{getDisabled:i=Sl,getIgnored:l=wl,getIsGroup:s=Al,getKey:a=xl}=t,d=(o=t.getChildren)!==null&&o!==void 0?o:yl,c=t.ignoreEmptyChildren?w=>{const S=d(w);return Array.isArray(S)?S.length?S:null:S}:d,v=Object.assign({get key(){return a(this.rawNode)},get disabled(){return i(this.rawNode)},get isGroup(){return s(this.rawNode)},get isLeaf(){return bl(this.rawNode,c)},get shallowLoaded(){return Cl(this.rawNode,c)},get ignored(){return l(this.rawNode)},contains(w){return Fl(this,w)}},Hl),u=hn(e,n,r,v,c);function b(w){if(w==null)return null;const S=n.get(w);return S&&!S.isGroup&&!S.ignored?S:null}function g(w){if(w==null)return null;const S=n.get(w);return S&&!S.ignored?S:null}function m(w,S){const _=g(w);return _?_.getPrev(S):null}function p(w,S){const _=g(w);return _?_.getNext(S):null}function h(w){const S=g(w);return S?S.getParent():null}function k(w){const S=g(w);return S?S.getChild():null}const E={treeNodes:u,treeNodeMap:n,levelTreeNodeMap:r,maxLevel:Math.max(...r.keys()),getChildren:c,getFlattenedNodes(w){return Rl(u,w)},getNode:b,getPrev:m,getNext:p,getParent:h,getChild:k,getFirstAvailableNode(){return Nl(u)},getPath(w,S={}){return Tl(w,S,E)},getCheckedKeys(w,S={}){const{cascade:_=!0,leafOnly:x=!1,checkStrategy:H="all",allowNotLoaded:R=!1}=S;return Ct({checkedKeys:xt(w),indeterminateKeys:wt(w),cascade:_,leafOnly:x,checkStrategy:H,allowNotLoaded:R},E)},check(w,S,_={}){const{cascade:x=!0,leafOnly:H=!1,checkStrategy:R="all",allowNotLoaded:P=!1}=_;return Ct({checkedKeys:xt(S),indeterminateKeys:wt(S),keysToCheck:w==null?[]:Ao(w),cascade:x,leafOnly:H,checkStrategy:R,allowNotLoaded:P},E)},uncheck(w,S,_={}){const{cascade:x=!0,leafOnly:H=!1,checkStrategy:R="all",allowNotLoaded:P=!1}=_;return Ct({checkedKeys:xt(S),indeterminateKeys:wt(S),keysToUncheck:w==null?[]:Ao(w),cascade:x,leafOnly:H,checkStrategy:R,allowNotLoaded:P},E)},getNonLeafKeys(w={}){return gl(u,w)}};return E}const{cubicBezierEaseIn:ko,cubicBezierEaseOut:_o}=Ko;function Bt({transformOrigin:e="inherit",duration:t=".2s",enterScale:o=".9",originalTransform:n="",originalTransition:r=""}={}){return[A("&.fade-in-scale-up-transition-leave-active",{transformOrigin:e,transition:`opacity ${t} ${ko}, transform ${t} ${ko} ${r&&`,${r}`}`}),A("&.fade-in-scale-up-transition-enter-active",{transformOrigin:e,transition:`opacity ${t} ${_o}, transform ${t} ${_o} ${r&&`,${r}`}`}),A("&.fade-in-scale-up-transition-enter-from, &.fade-in-scale-up-transition-leave-to",{opacity:0,transform:`${n} scale(${o})`}),A("&.fade-in-scale-up-transition-leave-from, &.fade-in-scale-up-transition-enter-to",{opacity:1,transform:`${n} scale(1)`})]}const Ll={space:"6px",spaceArrow:"10px",arrowOffset:"10px",arrowOffsetVertical:"10px",arrowHeight:"6px",padding:"8px 14px"};function Kl(e){const{boxShadow2:t,popoverColor:o,textColor2:n,borderRadius:r,fontSize:i,dividerColor:l}=e;return Object.assign(Object.assign({},Ll),{fontSize:i,borderRadius:r,color:o,dividerColor:l,textColor:n,boxShadow:t})}const qt={name:"Popover",common:Ce,self:Kl},St={top:"bottom",bottom:"top",left:"right",right:"left"},ee="var(--n-arrow-height) * 1.414",Dl=A([C("popover",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 position: relative;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 box-shadow: var(--n-box-shadow);
 word-break: break-word;
 `,[A(">",[C("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),fe("raw",`
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 `,[fe("scrollable",[fe("show-header-or-footer","padding: var(--n-padding);")])]),O("header",`
 padding: var(--n-padding);
 border-bottom: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `),O("footer",`
 padding: var(--n-padding);
 border-top: 1px solid var(--n-divider-color);
 transition: border-color .3s var(--n-bezier);
 `),T("scrollable, show-header-or-footer",[O("content",`
 padding: var(--n-padding);
 `)])]),C("popover-shared",`
 transform-origin: inherit;
 `,[C("popover-arrow-wrapper",`
 position: absolute;
 overflow: hidden;
 pointer-events: none;
 `,[C("popover-arrow",`
 transition: background-color .3s var(--n-bezier);
 position: absolute;
 display: block;
 width: calc(${ee});
 height: calc(${ee});
 box-shadow: 0 0 8px 0 rgba(0, 0, 0, .12);
 transform: rotate(45deg);
 background-color: var(--n-color);
 pointer-events: all;
 `)]),A("&.popover-transition-enter-from, &.popover-transition-leave-to",`
 opacity: 0;
 transform: scale(.85);
 `),A("&.popover-transition-enter-to, &.popover-transition-leave-from",`
 transform: scale(1);
 opacity: 1;
 `),A("&.popover-transition-enter-active",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-out),
 transform .15s var(--n-bezier-ease-out);
 `),A("&.popover-transition-leave-active",`
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier),
 opacity .15s var(--n-bezier-ease-in),
 transform .15s var(--n-bezier-ease-in);
 `)]),se("top-start",`
 top: calc(${ee} / -2);
 left: calc(${ge("top-start")} - var(--v-offset-left));
 `),se("top",`
 top: calc(${ee} / -2);
 transform: translateX(calc(${ee} / -2)) rotate(45deg);
 left: 50%;
 `),se("top-end",`
 top: calc(${ee} / -2);
 right: calc(${ge("top-end")} + var(--v-offset-left));
 `),se("bottom-start",`
 bottom: calc(${ee} / -2);
 left: calc(${ge("bottom-start")} - var(--v-offset-left));
 `),se("bottom",`
 bottom: calc(${ee} / -2);
 transform: translateX(calc(${ee} / -2)) rotate(45deg);
 left: 50%;
 `),se("bottom-end",`
 bottom: calc(${ee} / -2);
 right: calc(${ge("bottom-end")} + var(--v-offset-left));
 `),se("left-start",`
 left: calc(${ee} / -2);
 top: calc(${ge("left-start")} - var(--v-offset-top));
 `),se("left",`
 left: calc(${ee} / -2);
 transform: translateY(calc(${ee} / -2)) rotate(45deg);
 top: 50%;
 `),se("left-end",`
 left: calc(${ee} / -2);
 bottom: calc(${ge("left-end")} + var(--v-offset-top));
 `),se("right-start",`
 right: calc(${ee} / -2);
 top: calc(${ge("right-start")} - var(--v-offset-top));
 `),se("right",`
 right: calc(${ee} / -2);
 transform: translateY(calc(${ee} / -2)) rotate(45deg);
 top: 50%;
 `),se("right-end",`
 right: calc(${ee} / -2);
 bottom: calc(${ge("right-end")} + var(--v-offset-top));
 `),...pl({top:["right-start","left-start"],right:["top-end","bottom-end"],bottom:["right-end","left-end"],left:["top-start","bottom-start"]},(e,t)=>{const o=["right","left"].includes(t),n=o?"width":"height";return e.map(r=>{const i=r.split("-")[1]==="end",s=`calc((${`var(--v-target-${n}, 0px)`} - ${ee}) / 2)`,a=ge(r);return A(`[v-placement="${r}"] >`,[C("popover-shared",[T("center-arrow",[C("popover-arrow",`${t}: calc(max(${s}, ${a}) ${i?"+":"-"} var(--v-offset-${o?"left":"top"}));`)])])])})})]);function ge(e){return["top","bottom"].includes(e.split("-")[0])?"var(--n-arrow-offset)":"var(--n-arrow-offset-vertical)"}function se(e,t){const o=e.split("-")[0],n=["top","bottom"].includes(o)?"height: var(--n-space-arrow);":"width: var(--n-space-arrow);";return A(`[v-placement="${e}"] >`,[C("popover-shared",`
 margin-${St[o]}: var(--n-space);
 `,[T("show-arrow",`
 margin-${St[o]}: var(--n-space-arrow);
 `),T("overlap",`
 margin: 0;
 `),Zn("popover-arrow-wrapper",`
 right: 0;
 left: 0;
 top: 0;
 bottom: 0;
 ${o}: 100%;
 ${St[o]}: auto;
 ${n}
 `,[C("popover-arrow",t)])])])}const vn=Object.assign(Object.assign({},J.props),{to:Te.propTo,show:Boolean,trigger:String,showArrow:Boolean,delay:Number,duration:Number,raw:Boolean,arrowPointToCenter:Boolean,arrowClass:String,arrowStyle:[String,Object],arrowWrapperClass:String,arrowWrapperStyle:[String,Object],displayDirective:String,x:Number,y:Number,flip:Boolean,overlap:Boolean,placement:String,width:[Number,String],keepAliveOnHover:Boolean,scrollable:Boolean,contentClass:String,contentStyle:[Object,String],headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],internalDeactivateImmediately:Boolean,animated:Boolean,onClickoutside:Function,internalTrapFocus:Boolean,internalOnAfterLeave:Function,minWidth:Number,maxWidth:Number});function pn({arrowClass:e,arrowStyle:t,arrowWrapperClass:o,arrowWrapperStyle:n,clsPrefix:r}){return f("div",{key:"__popover-arrow__",style:n,class:[`${r}-popover-arrow-wrapper`,o]},f("div",{class:[`${r}-popover-arrow`,e],style:t}))}const jl=j({name:"PopoverBody",inheritAttrs:!1,props:vn,setup(e,{slots:t,attrs:o}){const{namespaceRef:n,mergedClsPrefixRef:r,inlineThemeDisabled:i}=pe(e),l=J("Popover","-popover",Dl,qt,e,r),s=F(null),a=Z("NPopover"),d=F(null),c=F(e.show),v=F(!1);Fe(()=>{const{show:x}=e;x&&!Qr()&&!e.internalDeactivateImmediately&&(v.value=!0)});const u=$(()=>{const{trigger:x,onClickoutside:H}=e,R=[],{positionManuallyRef:{value:P}}=a;return P||(x==="click"&&!H&&R.push([uo,w,void 0,{capture:!0}]),x==="hover"&&R.push([Rr,E])),H&&R.push([uo,w,void 0,{capture:!0}]),(e.displayDirective==="show"||e.animated&&v.value)&&R.push([Jn,e.show]),R}),b=$(()=>{const{common:{cubicBezierEaseInOut:x,cubicBezierEaseIn:H,cubicBezierEaseOut:R},self:{space:P,spaceArrow:V,padding:B,fontSize:G,textColor:L,dividerColor:I,color:W,boxShadow:M,borderRadius:U,arrowHeight:te,arrowOffset:Q,arrowOffsetVertical:N}}=l.value;return{"--n-box-shadow":M,"--n-bezier":x,"--n-bezier-ease-in":H,"--n-bezier-ease-out":R,"--n-font-size":G,"--n-text-color":L,"--n-color":W,"--n-divider-color":I,"--n-border-radius":U,"--n-arrow-height":te,"--n-arrow-offset":Q,"--n-arrow-offset-vertical":N,"--n-padding":B,"--n-space":P,"--n-space-arrow":V}}),g=$(()=>{const x=e.width==="trigger"?void 0:Ie(e.width),H=[];x&&H.push({width:x});const{maxWidth:R,minWidth:P}=e;return R&&H.push({maxWidth:Ie(R)}),P&&H.push({maxWidth:Ie(P)}),i||H.push(b.value),H}),m=i?ye("popover",void 0,b,e):void 0;a.setBodyInstance({syncPosition:p}),ze(()=>{a.setBodyInstance(null)}),de(q(e,"show"),x=>{e.animated||(x?c.value=!0:c.value=!1)});function p(){var x;(x=s.value)===null||x===void 0||x.syncPosition()}function h(x){e.trigger==="hover"&&e.keepAliveOnHover&&e.show&&a.handleMouseEnter(x)}function k(x){e.trigger==="hover"&&e.keepAliveOnHover&&a.handleMouseLeave(x)}function E(x){e.trigger==="hover"&&!S().contains(At(x))&&a.handleMouseMoveOutside(x)}function w(x){(e.trigger==="click"&&!S().contains(At(x))||e.onClickoutside)&&a.handleClickOutside(x)}function S(){return a.getTriggerElement()}ne(dt,d),ne(Wt,null),ne(Vt,null);function _(){if(m==null||m.onRender(),!(e.displayDirective==="show"||e.show||e.animated&&v.value))return null;let H;const R=a.internalRenderBodyRef.value,{value:P}=r;if(R)H=R([`${P}-popover-shared`,m==null?void 0:m.themeClass.value,e.overlap&&`${P}-popover-shared--overlap`,e.showArrow&&`${P}-popover-shared--show-arrow`,e.arrowPointToCenter&&`${P}-popover-shared--center-arrow`],d,g.value,h,k);else{const{value:V}=a.extraClassRef,{internalTrapFocus:B}=e,G=!Pt(t.header)||!Pt(t.footer),L=()=>{var I,W;const M=G?f(Ke,null,vt(t.header,Q=>Q?f("div",{class:[`${P}-popover__header`,e.headerClass],style:e.headerStyle},Q):null),vt(t.default,Q=>Q?f("div",{class:[`${P}-popover__content`,e.contentClass],style:e.contentStyle},t):null),vt(t.footer,Q=>Q?f("div",{class:[`${P}-popover__footer`,e.footerClass],style:e.footerStyle},Q):null)):e.scrollable?(I=t.default)===null||I===void 0?void 0:I.call(t):f("div",{class:[`${P}-popover__content`,e.contentClass],style:e.contentStyle},t),U=e.scrollable?f(Vo,{contentClass:G?void 0:`${P}-popover__content ${(W=e.contentClass)!==null&&W!==void 0?W:""}`,contentStyle:G?void 0:e.contentStyle},{default:()=>M}):M,te=e.showArrow?pn({arrowClass:e.arrowClass,arrowStyle:e.arrowStyle,arrowWrapperClass:e.arrowWrapperClass,arrowWrapperStyle:e.arrowWrapperStyle,clsPrefix:P}):null;return[U,te]};H=f("div",je({class:[`${P}-popover`,`${P}-popover-shared`,m==null?void 0:m.themeClass.value,V.map(I=>`${P}-${I}`),{[`${P}-popover--scrollable`]:e.scrollable,[`${P}-popover--show-header-or-footer`]:G,[`${P}-popover--raw`]:e.raw,[`${P}-popover-shared--overlap`]:e.overlap,[`${P}-popover-shared--show-arrow`]:e.showArrow,[`${P}-popover-shared--center-arrow`]:e.arrowPointToCenter}],ref:d,style:g.value,onKeydown:a.handleKeydown,onMouseenter:h,onMouseleave:k},o),B?f(Jr,{active:e.show,autoFocus:!0},{default:L}):L())}return rt(H,u.value)}return{displayed:v,namespace:n,isMounted:a.isMountedRef,zIndex:a.zIndexRef,followerRef:s,adjustedTo:Te(e),followerEnabled:c,renderContentNode:_}},render(){return f(on,{ref:"followerRef",zIndex:this.zIndex,show:this.show,enabled:this.followerEnabled,to:this.adjustedTo,x:this.x,y:this.y,flip:this.flip,placement:this.placement,containerClass:this.namespace,overlap:this.overlap,width:this.width==="trigger"?"target":void 0,teleportDisabled:this.adjustedTo===Te.tdkey},{default:()=>this.animated?f(De,{name:"popover-transition",appear:this.isMounted,onEnter:()=>{this.followerEnabled=!0},onAfterLeave:()=>{var e;(e=this.internalOnAfterLeave)===null||e===void 0||e.call(this),this.followerEnabled=!1,this.displayed=!1}},{default:this.renderContentNode}):this.renderContentNode()})}}),Wl=Object.keys(vn),Vl={focus:["onFocus","onBlur"],click:["onClick"],hover:["onMouseenter","onMouseleave"],manual:[],nested:["onFocus","onBlur","onMouseenter","onMouseleave","onClick"]};function Gl(e,t,o){Vl[t].forEach(n=>{e.props?e.props=Object.assign({},e.props):e.props={};const r=e.props[n],i=o[n];r?e.props[n]=(...l)=>{r(...l),i(...l)}:e.props[n]=i})}const ct={show:{type:Boolean,default:void 0},defaultShow:Boolean,showArrow:{type:Boolean,default:!0},trigger:{type:String,default:"hover"},delay:{type:Number,default:100},duration:{type:Number,default:100},raw:Boolean,placement:{type:String,default:"top"},x:Number,y:Number,arrowPointToCenter:Boolean,disabled:Boolean,getDisabled:Function,displayDirective:{type:String,default:"if"},arrowClass:String,arrowStyle:[String,Object],arrowWrapperClass:String,arrowWrapperStyle:[String,Object],flip:{type:Boolean,default:!0},animated:{type:Boolean,default:!0},width:{type:[Number,String],default:void 0},overlap:Boolean,keepAliveOnHover:{type:Boolean,default:!0},zIndex:Number,to:Te.propTo,scrollable:Boolean,contentClass:String,contentStyle:[Object,String],headerClass:String,headerStyle:[Object,String],footerClass:String,footerStyle:[Object,String],onClickoutside:Function,"onUpdate:show":[Function,Array],onUpdateShow:[Function,Array],internalDeactivateImmediately:Boolean,internalSyncTargetWithParent:Boolean,internalInheritedEventHandlers:{type:Array,default:()=>[]},internalTrapFocus:Boolean,internalExtraClass:{type:Array,default:()=>[]},onShow:[Function,Array],onHide:[Function,Array],arrow:{type:Boolean,default:void 0},minWidth:Number,maxWidth:Number},Ul=Object.assign(Object.assign(Object.assign({},J.props),ct),{internalOnAfterLeave:Function,internalRenderBody:Function}),mn=j({name:"Popover",inheritAttrs:!1,props:Ul,slots:Object,__popover__:!0,setup(e){const t=Ro(),o=F(null),n=$(()=>e.show),r=F(e.defaultShow),i=Le(n,r),l=ce(()=>e.disabled?!1:i.value),s=()=>{if(e.disabled)return!0;const{getDisabled:I}=e;return!!(I!=null&&I())},a=()=>s()?!1:i.value,d=jt(e,["arrow","showArrow"]),c=$(()=>e.overlap?!1:d.value);let v=null;const u=F(null),b=F(null),g=ce(()=>e.x!==void 0&&e.y!==void 0);function m(I){const{"onUpdate:show":W,onUpdateShow:M,onShow:U,onHide:te}=e;r.value=I,W&&oe(W,I),M&&oe(M,I),I&&U&&oe(U,!0),I&&te&&oe(te,!1)}function p(){v&&v.syncPosition()}function h(){const{value:I}=u;I&&(window.clearTimeout(I),u.value=null)}function k(){const{value:I}=b;I&&(window.clearTimeout(I),b.value=null)}function E(){const I=s();if(e.trigger==="focus"&&!I){if(a())return;m(!0)}}function w(){const I=s();if(e.trigger==="focus"&&!I){if(!a())return;m(!1)}}function S(){const I=s();if(e.trigger==="hover"&&!I){if(k(),u.value!==null||a())return;const W=()=>{m(!0),u.value=null},{delay:M}=e;M===0?W():u.value=window.setTimeout(W,M)}}function _(){const I=s();if(e.trigger==="hover"&&!I){if(h(),b.value!==null||!a())return;const W=()=>{m(!1),b.value=null},{duration:M}=e;M===0?W():b.value=window.setTimeout(W,M)}}function x(){_()}function H(I){var W;a()&&(e.trigger==="click"&&(h(),k(),m(!1)),(W=e.onClickoutside)===null||W===void 0||W.call(e,I))}function R(){if(e.trigger==="click"&&!s()){h(),k();const I=!a();m(I)}}function P(I){e.internalTrapFocus&&I.key==="Escape"&&(h(),k(),m(!1))}function V(I){r.value=I}function B(){var I;return(I=o.value)===null||I===void 0?void 0:I.targetRef}function G(I){v=I}return ne("NPopover",{getTriggerElement:B,handleKeydown:P,handleMouseEnter:S,handleMouseLeave:_,handleClickOutside:H,handleMouseMoveOutside:x,setBodyInstance:G,positionManuallyRef:g,isMountedRef:t,zIndexRef:q(e,"zIndex"),extraClassRef:q(e,"internalExtraClass"),internalRenderBodyRef:q(e,"internalRenderBody")}),Fe(()=>{i.value&&s()&&m(!1)}),{binderInstRef:o,positionManually:g,mergedShowConsideringDisabledProp:l,uncontrolledShow:r,mergedShowArrow:c,getMergedShow:a,setShow:V,handleClick:R,handleMouseEnter:S,handleMouseLeave:_,handleFocus:E,handleBlur:w,syncPosition:p}},render(){var e;const{positionManually:t,$slots:o}=this;let n,r=!1;if(!t&&(n=oi(o,"trigger"),n)){n=Qn(n),n=n.type===er?f("span",[n]):n;const i={onClick:this.handleClick,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onFocus:this.handleFocus,onBlur:this.handleBlur};if(!((e=n.type)===null||e===void 0)&&e.__popover__)r=!0,n.props||(n.props={internalSyncTargetWithParent:!0,internalInheritedEventHandlers:[]}),n.props.internalSyncTargetWithParent=!0,n.props.internalInheritedEventHandlers?n.props.internalInheritedEventHandlers=[i,...n.props.internalInheritedEventHandlers]:n.props.internalInheritedEventHandlers=[i];else{const{internalInheritedEventHandlers:l}=this,s=[i,...l],a={onBlur:d=>{s.forEach(c=>{c.onBlur(d)})},onFocus:d=>{s.forEach(c=>{c.onFocus(d)})},onClick:d=>{s.forEach(c=>{c.onClick(d)})},onMouseenter:d=>{s.forEach(c=>{c.onMouseenter(d)})},onMouseleave:d=>{s.forEach(c=>{c.onMouseleave(d)})}};Gl(n,l?"nested":t?"manual":this.trigger,a)}}return f(Jo,{ref:"binderInstRef",syncTarget:!r,syncTargetWithParent:this.internalSyncTargetWithParent},{default:()=>{this.mergedShowConsideringDisabledProp;const i=this.getMergedShow();return[this.internalTrapFocus&&i?rt(f("div",{style:{position:"fixed",top:0,right:0,bottom:0,left:0}}),[[en,{enabled:i,zIndex:this.zIndex}]]):null,t?null:f(Qo,null,{default:()=>n}),f(jl,He(this.$props,Wl,Object.assign(Object.assign({},this.$attrs),{showArrow:this.mergedShowArrow,show:i})),{default:()=>{var l,s;return(s=(l=this.$slots).default)===null||s===void 0?void 0:s.call(l)},header:()=>{var l,s;return(s=(l=this.$slots).header)===null||s===void 0?void 0:s.call(l)},footer:()=>{var l,s;return(s=(l=this.$slots).footer)===null||s===void 0?void 0:s.call(l)}})]}})}}),Oo=j({name:"SlotMachineNumber",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],required:!0},oldOriginalNumber:{type:Number,default:void 0},newOriginalNumber:{type:Number,default:void 0}},setup(e){const t=F(null),o=F(e.value),n=F(e.value),r=F("up"),i=F(!1),l=$(()=>i.value?`${e.clsPrefix}-base-slot-machine-current-number--${r.value}-scroll`:null),s=$(()=>i.value?`${e.clsPrefix}-base-slot-machine-old-number--${r.value}-scroll`:null);de(q(e,"value"),(c,v)=>{o.value=v,n.value=c,Qe(a)});function a(){const c=e.newOriginalNumber,v=e.oldOriginalNumber;v===void 0||c===void 0||(c>v?d("up"):v>c&&d("down"))}function d(c){r.value=c,i.value=!1,Qe(()=>{var v;(v=t.value)===null||v===void 0||v.offsetWidth,i.value=!0})}return()=>{const{clsPrefix:c}=e;return f("span",{ref:t,class:`${c}-base-slot-machine-number`},o.value!==null?f("span",{class:[`${c}-base-slot-machine-old-number ${c}-base-slot-machine-old-number--top`,s.value]},o.value):null,f("span",{class:[`${c}-base-slot-machine-current-number`,l.value]},f("span",{ref:"numberWrapper",class:[`${c}-base-slot-machine-current-number__inner`,typeof e.value!="number"&&`${c}-base-slot-machine-current-number__inner--not-number`]},n.value)),o.value!==null?f("span",{class:[`${c}-base-slot-machine-old-number ${c}-base-slot-machine-old-number--bottom`,s.value]},o.value):null)}}}),{cubicBezierEaseOut:ke}=Ko;function Yl({duration:e=".2s"}={}){return[A("&.fade-up-width-expand-transition-leave-active",{transition:`
 opacity ${e} ${ke},
 max-width ${e} ${ke},
 transform ${e} ${ke}
 `}),A("&.fade-up-width-expand-transition-enter-active",{transition:`
 opacity ${e} ${ke},
 max-width ${e} ${ke},
 transform ${e} ${ke}
 `}),A("&.fade-up-width-expand-transition-enter-to",{opacity:1,transform:"translateX(0) translateY(0)"}),A("&.fade-up-width-expand-transition-enter-from",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"}),A("&.fade-up-width-expand-transition-leave-from",{opacity:1,transform:"translateY(0)"}),A("&.fade-up-width-expand-transition-leave-to",{maxWidth:"0 !important",opacity:0,transform:"translateY(60%)"})]}const ql=A([A("@keyframes n-base-slot-machine-fade-up-in",`
 from {
 transform: translateY(60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),A("@keyframes n-base-slot-machine-fade-down-in",`
 from {
 transform: translateY(-60%);
 opacity: 0;
 }
 to {
 transform: translateY(0);
 opacity: 1;
 }
 `),A("@keyframes n-base-slot-machine-fade-up-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(-60%);
 opacity: 0;
 }
 `),A("@keyframes n-base-slot-machine-fade-down-out",`
 from {
 transform: translateY(0%);
 opacity: 1;
 }
 to {
 transform: translateY(60%);
 opacity: 0;
 }
 `),C("base-slot-machine",`
 overflow: hidden;
 white-space: nowrap;
 display: inline-block;
 height: 18px;
 line-height: 18px;
 `,[C("base-slot-machine-number",`
 display: inline-block;
 position: relative;
 height: 18px;
 width: .6em;
 max-width: .6em;
 `,[Yl({duration:".2s"}),mr({duration:".2s",delay:"0s"}),C("base-slot-machine-old-number",`
 display: inline-block;
 opacity: 0;
 position: absolute;
 left: 0;
 right: 0;
 `,[T("top",{transform:"translateY(-100%)"}),T("bottom",{transform:"translateY(100%)"}),T("down-scroll",{animation:"n-base-slot-machine-fade-down-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),T("up-scroll",{animation:"n-base-slot-machine-fade-up-out .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1})]),C("base-slot-machine-current-number",`
 display: inline-block;
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 right: 0;
 opacity: 1;
 transform: translateY(0);
 width: .6em;
 `,[T("down-scroll",{animation:"n-base-slot-machine-fade-down-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),T("up-scroll",{animation:"n-base-slot-machine-fade-up-in .2s cubic-bezier(0, 0, .2, 1)",animationIterationCount:1}),O("inner",`
 display: inline-block;
 position: absolute;
 right: 0;
 top: 0;
 width: .6em;
 `,[T("not-number",`
 right: unset;
 left: 0;
 `)])])])])]),Xl=j({name:"BaseSlotMachine",props:{clsPrefix:{type:String,required:!0},value:{type:[Number,String],default:0},max:{type:Number,default:void 0},appeared:{type:Boolean,required:!0}},setup(e){tr("-base-slot-machine",ql,q(e,"clsPrefix"));const t=F(),o=F(),n=$(()=>{if(typeof e.value=="string")return[];if(e.value<1)return[0];const r=[];let i=e.value;for(e.max!==void 0&&(i=Math.min(e.max,i));i>=1;)r.push(i%10),i/=10,i=Math.floor(i);return r.reverse(),r});return de(q(e,"value"),(r,i)=>{typeof r=="string"?(o.value=void 0,t.value=void 0):typeof i=="string"?(o.value=r,t.value=void 0):(o.value=r,t.value=i)}),()=>{const{value:r,clsPrefix:i}=e;return typeof r=="number"?f("span",{class:`${i}-base-slot-machine`},f(or,{name:"fade-up-width-expand-transition",tag:"span"},{default:()=>n.value.map((l,s)=>f(Oo,{clsPrefix:i,key:n.value.length-s-1,oldOriginalNumber:t.value,newOriginalNumber:o.value,value:l}))}),f(Do,{key:"+",width:!0},{default:()=>e.max!==void 0&&e.max<r?f(Oo,{clsPrefix:i,value:"+"}):null})):f("span",{class:`${i}-base-slot-machine`},r)}}});function Zl(e){const{errorColor:t,infoColor:o,successColor:n,warningColor:r,fontFamily:i}=e;return{color:t,colorInfo:o,colorSuccess:n,colorError:t,colorWarning:r,fontSize:"12px",fontFamily:i}}const Jl={common:Ce,self:Zl},Ql=A([A("@keyframes badge-wave-spread",{from:{boxShadow:"0 0 0.5px 0px var(--n-ripple-color)",opacity:.6},to:{boxShadow:"0 0 0.5px 4.5px var(--n-ripple-color)",opacity:0}}),C("badge",`
 display: inline-flex;
 position: relative;
 vertical-align: middle;
 font-family: var(--n-font-family);
 `,[T("as-is",[C("badge-sup",{position:"static",transform:"translateX(0)"},[Bt({transformOrigin:"left bottom",originalTransform:"translateX(0)"})])]),T("dot",[C("badge-sup",`
 height: 8px;
 width: 8px;
 padding: 0;
 min-width: 8px;
 left: 100%;
 bottom: calc(100% - 4px);
 `,[A("::before","border-radius: 4px;")])]),C("badge-sup",`
 background: var(--n-color);
 transition:
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
 color: #FFF;
 position: absolute;
 height: 18px;
 line-height: 18px;
 border-radius: 9px;
 padding: 0 6px;
 text-align: center;
 font-size: var(--n-font-size);
 transform: translateX(-50%);
 left: 100%;
 bottom: calc(100% - 9px);
 font-variant-numeric: tabular-nums;
 z-index: 2;
 display: flex;
 align-items: center;
 `,[Bt({transformOrigin:"left bottom",originalTransform:"translateX(-50%)"}),C("base-wave",{zIndex:1,animationDuration:"2s",animationIterationCount:"infinite",animationDelay:"1s",animationTimingFunction:"var(--n-ripple-bezier)",animationName:"badge-wave-spread"}),A("&::before",`
 opacity: 0;
 transform: scale(1);
 border-radius: 9px;
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)])])]),ea=Object.assign(Object.assign({},J.props),{value:[String,Number],max:Number,dot:Boolean,type:{type:String,default:"default"},show:{type:Boolean,default:!0},showZero:Boolean,processing:Boolean,color:String,offset:Array}),ta=j({name:"Badge",props:ea,setup(e,{slots:t}){const{mergedClsPrefixRef:o,inlineThemeDisabled:n,mergedRtlRef:r}=pe(e),i=J("Badge","-badge",Ql,Jl,e,o),l=F(!1),s=()=>{l.value=!0},a=()=>{l.value=!1},d=$(()=>e.show&&(e.dot||e.value!==void 0&&!(!e.showZero&&Number(e.value)<=0)||!Pt(t.value)));Ne(()=>{d.value&&(l.value=!0)});const c=nr("Badge",r,o),v=$(()=>{const{type:g,color:m}=e,{common:{cubicBezierEaseInOut:p,cubicBezierEaseOut:h},self:{[be("color",g)]:k,fontFamily:E,fontSize:w}}=i.value;return{"--n-font-size":w,"--n-font-family":E,"--n-color":m||k,"--n-ripple-color":m||k,"--n-bezier":p,"--n-ripple-bezier":h}}),u=n?ye("badge",$(()=>{let g="";const{type:m,color:p}=e;return m&&(g+=m[0]),p&&(g+=yr(p)),g}),v,e):void 0,b=$(()=>{const{offset:g}=e;if(!g)return;const[m,p]=g,h=typeof m=="number"?`${m}px`:m,k=typeof p=="number"?`${p}px`:p;return{transform:`translate(calc(${c!=null&&c.value?"50%":"-50%"} + ${h}), ${k})`}});return{rtlEnabled:c,mergedClsPrefix:o,appeared:l,showBadge:d,handleAfterEnter:s,handleAfterLeave:a,cssVars:n?void 0:v,themeClass:u==null?void 0:u.themeClass,onRender:u==null?void 0:u.onRender,offsetStyle:b}},render(){var e;const{mergedClsPrefix:t,onRender:o,themeClass:n,$slots:r}=this;o==null||o();const i=(e=r.default)===null||e===void 0?void 0:e.call(r);return f("div",{class:[`${t}-badge`,this.rtlEnabled&&`${t}-badge--rtl`,n,{[`${t}-badge--dot`]:this.dot,[`${t}-badge--as-is`]:!i}],style:this.cssVars},i,f(De,{name:"fade-in-scale-up-transition",onAfterEnter:this.handleAfterEnter,onAfterLeave:this.handleAfterLeave},{default:()=>this.showBadge?f("sup",{class:`${t}-badge-sup`,title:ei(this.value),style:this.offsetStyle},gr(r.value,()=>[this.dot?null:f(Xl,{clsPrefix:t,appeared:this.appeared,max:this.max,value:this.value})]),this.processing?f(br,{clsPrefix:t}):null):null}))}}),oa={padding:"4px 0",optionIconSizeSmall:"14px",optionIconSizeMedium:"16px",optionIconSizeLarge:"16px",optionIconSizeHuge:"18px",optionSuffixWidthSmall:"14px",optionSuffixWidthMedium:"14px",optionSuffixWidthLarge:"16px",optionSuffixWidthHuge:"16px",optionIconSuffixWidthSmall:"32px",optionIconSuffixWidthMedium:"32px",optionIconSuffixWidthLarge:"36px",optionIconSuffixWidthHuge:"36px",optionPrefixWidthSmall:"14px",optionPrefixWidthMedium:"14px",optionPrefixWidthLarge:"16px",optionPrefixWidthHuge:"16px",optionIconPrefixWidthSmall:"36px",optionIconPrefixWidthMedium:"36px",optionIconPrefixWidthLarge:"40px",optionIconPrefixWidthHuge:"40px"};function na(e){const{primaryColor:t,textColor2:o,dividerColor:n,hoverColor:r,popoverColor:i,invertedColor:l,borderRadius:s,fontSizeSmall:a,fontSizeMedium:d,fontSizeLarge:c,fontSizeHuge:v,heightSmall:u,heightMedium:b,heightLarge:g,heightHuge:m,textColor3:p,opacityDisabled:h}=e;return Object.assign(Object.assign({},oa),{optionHeightSmall:u,optionHeightMedium:b,optionHeightLarge:g,optionHeightHuge:m,borderRadius:s,fontSizeSmall:a,fontSizeMedium:d,fontSizeLarge:c,fontSizeHuge:v,optionTextColor:o,optionTextColorHover:o,optionTextColorActive:t,optionTextColorChildActive:t,color:i,dividerColor:n,suffixColor:o,prefixColor:o,optionColorHover:r,optionColorActive:Ze(t,{alpha:.1}),groupHeaderTextColor:p,optionTextColorInverted:"#BBB",optionTextColorHoverInverted:"#FFF",optionTextColorActiveInverted:"#FFF",optionTextColorChildActiveInverted:"#FFF",colorInverted:l,dividerColorInverted:"#BBB",suffixColorInverted:"#BBB",prefixColorInverted:"#BBB",optionColorHoverInverted:t,optionColorActiveInverted:t,groupHeaderTextColorInverted:"#AAA",optionOpacityDisabled:h})}const gn=at({name:"Dropdown",common:Ce,peers:{Popover:qt},self:na}),ra={padding:"8px 14px"};function ia(e){const{borderRadius:t,boxShadow2:o,baseColor:n}=e;return Object.assign(Object.assign({},ra),{borderRadius:t,boxShadow:o,color:$t(n,"rgba(0, 0, 0, .85)"),textColor:n})}const bn=at({name:"Tooltip",common:Ce,peers:{Popover:qt},self:ia}),la=Object.assign(Object.assign({},ct),J.props),aa=j({name:"Tooltip",props:la,slots:Object,__popover__:!0,setup(e){const{mergedClsPrefixRef:t}=pe(e),o=J("Tooltip","-tooltip",void 0,bn,e,t),n=F(null);return Object.assign(Object.assign({},{syncPosition(){n.value.syncPosition()},setShow(i){n.value.setShow(i)}}),{popoverRef:n,mergedTheme:o,popoverThemeOverrides:$(()=>o.value.self)})},render(){const{mergedTheme:e,internalExtraClass:t}=this;return f(mn,Object.assign(Object.assign({},this.$props),{theme:e.peers.Popover,themeOverrides:e.peerOverrides.Popover,builtinThemeOverrides:this.popoverThemeOverrides,internalExtraClass:t.concat("tooltip"),ref:"popoverRef"}),this.$slots)}}),Xt=ue("n-dropdown-menu"),ut=ue("n-dropdown"),To=ue("n-dropdown-option"),yn=j({name:"DropdownDivider",props:{clsPrefix:{type:String,required:!0}},render(){return f("div",{class:`${this.clsPrefix}-dropdown-divider`})}}),sa=j({name:"DropdownGroupHeader",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0}},setup(){const{showIconRef:e,hasSubmenuRef:t}=Z(Xt),{renderLabelRef:o,labelFieldRef:n,nodePropsRef:r,renderOptionRef:i}=Z(ut);return{labelField:n,showIcon:e,hasSubmenu:t,renderLabel:o,nodeProps:r,renderOption:i}},render(){var e;const{clsPrefix:t,hasSubmenu:o,showIcon:n,nodeProps:r,renderLabel:i,renderOption:l}=this,{rawNode:s}=this.tmNode,a=f("div",Object.assign({class:`${t}-dropdown-option`},r==null?void 0:r(s)),f("div",{class:`${t}-dropdown-option-body ${t}-dropdown-option-body--group`},f("div",{"data-dropdown-option":!0,class:[`${t}-dropdown-option-body__prefix`,n&&`${t}-dropdown-option-body__prefix--show-icon`]},he(s.icon)),f("div",{class:`${t}-dropdown-option-body__label`,"data-dropdown-option":!0},i?i(s):he((e=s.title)!==null&&e!==void 0?e:s[this.labelField])),f("div",{class:[`${t}-dropdown-option-body__suffix`,o&&`${t}-dropdown-option-body__suffix--has-submenu`],"data-dropdown-option":!0})));return l?l({node:a,option:s}):a}});function da(e){const{textColorBase:t,opacity1:o,opacity2:n,opacity3:r,opacity4:i,opacity5:l}=e;return{color:t,opacity1Depth:o,opacity2Depth:n,opacity3Depth:r,opacity4Depth:i,opacity5Depth:l}}const ca={common:Ce,self:da},ua=C("icon",`
 height: 1em;
 width: 1em;
 line-height: 1em;
 text-align: center;
 display: inline-block;
 position: relative;
 fill: currentColor;
 transform: translateZ(0);
`,[T("color-transition",{transition:"color .3s var(--n-bezier)"}),T("depth",{color:"var(--n-color)"},[A("svg",{opacity:"var(--n-opacity)",transition:"opacity .3s var(--n-bezier)"})]),A("svg",{height:"1em",width:"1em"})]),fa=Object.assign(Object.assign({},J.props),{depth:[String,Number],size:[Number,String],color:String,component:[Object,Function]}),xn=j({_n_icon__:!0,name:"Icon",inheritAttrs:!1,props:fa,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=pe(e),n=J("Icon","-icon",ua,ca,e,t),r=$(()=>{const{depth:l}=e,{common:{cubicBezierEaseInOut:s},self:a}=n.value;if(l!==void 0){const{color:d,[`opacity${l}Depth`]:c}=a;return{"--n-bezier":s,"--n-color":d,"--n-opacity":c}}return{"--n-bezier":s,"--n-color":"","--n-opacity":""}}),i=o?ye("icon",$(()=>`${e.depth||"d"}`),r,e):void 0;return{mergedClsPrefix:t,mergedStyle:$(()=>{const{size:l,color:s}=e;return{fontSize:Ie(l),color:s}}),cssVars:o?void 0:r,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e;const{$parent:t,depth:o,mergedClsPrefix:n,component:r,onRender:i,themeClass:l}=this;return!((e=t==null?void 0:t.$options)===null||e===void 0)&&e._n_icon__&&et("icon","don't wrap `n-icon` inside `n-icon`"),i==null||i(),f("i",je(this.$attrs,{role:"img",class:[`${n}-icon`,l,{[`${n}-icon--depth`]:o,[`${n}-icon--color-transition`]:o!==void 0}],style:[this.cssVars,this.mergedStyle]}),r?f(r):this.$slots)}});function Ht(e,t){return e.type==="submenu"||e.type===void 0&&e[t]!==void 0}function ha(e){return e.type==="group"}function wn(e){return e.type==="divider"}function va(e){return e.type==="render"}const Cn=j({name:"DropdownOption",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null},placement:{type:String,default:"right-start"},props:Object,scrollable:Boolean},setup(e){const t=Z(ut),{hoverKeyRef:o,keyboardKeyRef:n,lastToggledSubmenuKeyRef:r,pendingKeyPathRef:i,activeKeyPathRef:l,animatedRef:s,mergedShowRef:a,renderLabelRef:d,renderIconRef:c,labelFieldRef:v,childrenFieldRef:u,renderOptionRef:b,nodePropsRef:g,menuPropsRef:m}=t,p=Z(To,null),h=Z(Xt),k=Z(dt),E=$(()=>e.tmNode.rawNode),w=$(()=>{const{value:M}=u;return Ht(e.tmNode.rawNode,M)}),S=$(()=>{const{disabled:M}=e.tmNode;return M}),_=$(()=>{if(!w.value)return!1;const{key:M,disabled:U}=e.tmNode;if(U)return!1;const{value:te}=o,{value:Q}=n,{value:N}=r,{value:K}=i;return te!==null?K.includes(M):Q!==null?K.includes(M)&&K[K.length-1]!==M:N!==null?K.includes(M):!1}),x=$(()=>n.value===null&&!s.value),H=Mr(_,300,x),R=$(()=>!!(p!=null&&p.enteringSubmenuRef.value)),P=F(!1);ne(To,{enteringSubmenuRef:P});function V(){P.value=!0}function B(){P.value=!1}function G(){const{parentKey:M,tmNode:U}=e;U.disabled||a.value&&(r.value=M,n.value=null,o.value=U.key)}function L(){const{tmNode:M}=e;M.disabled||a.value&&o.value!==M.key&&G()}function I(M){if(e.tmNode.disabled||!a.value)return;const{relatedTarget:U}=M;U&&!so({target:U},"dropdownOption")&&!so({target:U},"scrollbarRail")&&(o.value=null)}function W(){const{value:M}=w,{tmNode:U}=e;a.value&&!M&&!U.disabled&&(t.doSelect(U.key,U.rawNode),t.doUpdateShow(!1))}return{labelField:v,renderLabel:d,renderIcon:c,siblingHasIcon:h.showIconRef,siblingHasSubmenu:h.hasSubmenuRef,menuProps:m,popoverBody:k,animated:s,mergedShowSubmenu:$(()=>H.value&&!R.value),rawNode:E,hasSubmenu:w,pending:ce(()=>{const{value:M}=i,{key:U}=e.tmNode;return M.includes(U)}),childActive:ce(()=>{const{value:M}=l,{key:U}=e.tmNode,te=M.findIndex(Q=>U===Q);return te===-1?!1:te<M.length-1}),active:ce(()=>{const{value:M}=l,{key:U}=e.tmNode,te=M.findIndex(Q=>U===Q);return te===-1?!1:te===M.length-1}),mergedDisabled:S,renderOption:b,nodeProps:g,handleClick:W,handleMouseMove:L,handleMouseEnter:G,handleMouseLeave:I,handleSubmenuBeforeEnter:V,handleSubmenuAfterEnter:B}},render(){var e,t;const{animated:o,rawNode:n,mergedShowSubmenu:r,clsPrefix:i,siblingHasIcon:l,siblingHasSubmenu:s,renderLabel:a,renderIcon:d,renderOption:c,nodeProps:v,props:u,scrollable:b}=this;let g=null;if(r){const k=(e=this.menuProps)===null||e===void 0?void 0:e.call(this,n,n.children);g=f(Sn,Object.assign({},k,{clsPrefix:i,scrollable:this.scrollable,tmNodes:this.tmNode.children,parentKey:this.tmNode.key}))}const m={class:[`${i}-dropdown-option-body`,this.pending&&`${i}-dropdown-option-body--pending`,this.active&&`${i}-dropdown-option-body--active`,this.childActive&&`${i}-dropdown-option-body--child-active`,this.mergedDisabled&&`${i}-dropdown-option-body--disabled`],onMousemove:this.handleMouseMove,onMouseenter:this.handleMouseEnter,onMouseleave:this.handleMouseLeave,onClick:this.handleClick},p=v==null?void 0:v(n),h=f("div",Object.assign({class:[`${i}-dropdown-option`,p==null?void 0:p.class],"data-dropdown-option":!0},p),f("div",je(m,u),[f("div",{class:[`${i}-dropdown-option-body__prefix`,l&&`${i}-dropdown-option-body__prefix--show-icon`]},[d?d(n):he(n.icon)]),f("div",{"data-dropdown-option":!0,class:`${i}-dropdown-option-body__label`},a?a(n):he((t=n[this.labelField])!==null&&t!==void 0?t:n.title)),f("div",{"data-dropdown-option":!0,class:[`${i}-dropdown-option-body__suffix`,s&&`${i}-dropdown-option-body__suffix--has-submenu`]},this.hasSubmenu?f(xn,null,{default:()=>f(un,null)}):null)]),this.hasSubmenu?f(Jo,null,{default:()=>[f(Qo,null,{default:()=>f("div",{class:`${i}-dropdown-offset-container`},f(on,{show:this.mergedShowSubmenu,placement:this.placement,to:b&&this.popoverBody||void 0,teleportDisabled:!b},{default:()=>f("div",{class:`${i}-dropdown-menu-wrapper`},o?f(De,{onBeforeEnter:this.handleSubmenuBeforeEnter,onAfterEnter:this.handleSubmenuAfterEnter,name:"fade-in-scale-up-transition",appear:!0},{default:()=>g}):g)}))})]}):null);return c?c({node:h,option:n}):h}}),pa=j({name:"NDropdownGroup",props:{clsPrefix:{type:String,required:!0},tmNode:{type:Object,required:!0},parentKey:{type:[String,Number],default:null}},render(){const{tmNode:e,parentKey:t,clsPrefix:o}=this,{children:n}=e;return f(Ke,null,f(sa,{clsPrefix:o,tmNode:e,key:e.key}),n==null?void 0:n.map(r=>{const{rawNode:i}=r;return i.show===!1?null:wn(i)?f(yn,{clsPrefix:o,key:r.key}):r.isGroup?(et("dropdown","`group` node is not allowed to be put in `group` node."),null):f(Cn,{clsPrefix:o,tmNode:r,parentKey:t,key:r.key})}))}}),ma=j({name:"DropdownRenderOption",props:{tmNode:{type:Object,required:!0}},render(){const{rawNode:{render:e,props:t}}=this.tmNode;return f("div",t,[e==null?void 0:e()])}}),Sn=j({name:"DropdownMenu",props:{scrollable:Boolean,showArrow:Boolean,arrowStyle:[String,Object],clsPrefix:{type:String,required:!0},tmNodes:{type:Array,default:()=>[]},parentKey:{type:[String,Number],default:null}},setup(e){const{renderIconRef:t,childrenFieldRef:o}=Z(ut);ne(Xt,{showIconRef:$(()=>{const r=t.value;return e.tmNodes.some(i=>{var l;if(i.isGroup)return(l=i.children)===null||l===void 0?void 0:l.some(({rawNode:a})=>r?r(a):a.icon);const{rawNode:s}=i;return r?r(s):s.icon})}),hasSubmenuRef:$(()=>{const{value:r}=o;return e.tmNodes.some(i=>{var l;if(i.isGroup)return(l=i.children)===null||l===void 0?void 0:l.some(({rawNode:a})=>Ht(a,r));const{rawNode:s}=i;return Ht(s,r)})})});const n=F(null);return ne(Vt,null),ne(Wt,null),ne(dt,n),{bodyRef:n}},render(){const{parentKey:e,clsPrefix:t,scrollable:o}=this,n=this.tmNodes.map(r=>{const{rawNode:i}=r;return i.show===!1?null:va(i)?f(ma,{tmNode:r,key:r.key}):wn(i)?f(yn,{clsPrefix:t,key:r.key}):ha(i)?f(pa,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key}):f(Cn,{clsPrefix:t,tmNode:r,parentKey:e,key:r.key,props:i.props,scrollable:o})});return f("div",{class:[`${t}-dropdown-menu`,o&&`${t}-dropdown-menu--scrollable`],ref:"bodyRef"},o?f(Vo,{contentClass:`${t}-dropdown-menu__content`},{default:()=>n}):n,this.showArrow?pn({clsPrefix:t,arrowStyle:this.arrowStyle,arrowClass:void 0,arrowWrapperClass:void 0,arrowWrapperStyle:void 0}):null)}}),ga=C("dropdown-menu",`
 transform-origin: var(--v-transform-origin);
 background-color: var(--n-color);
 border-radius: var(--n-border-radius);
 box-shadow: var(--n-box-shadow);
 position: relative;
 transition:
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier);
`,[Bt(),C("dropdown-option",`
 position: relative;
 `,[A("a",`
 text-decoration: none;
 color: inherit;
 outline: none;
 `,[A("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),C("dropdown-option-body",`
 display: flex;
 cursor: pointer;
 position: relative;
 height: var(--n-option-height);
 line-height: var(--n-option-height);
 font-size: var(--n-font-size);
 color: var(--n-option-text-color);
 transition: color .3s var(--n-bezier);
 `,[A("&::before",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 left: 4px;
 right: 4px;
 transition: background-color .3s var(--n-bezier);
 border-radius: var(--n-border-radius);
 `),fe("disabled",[T("pending",`
 color: var(--n-option-text-color-hover);
 `,[O("prefix, suffix",`
 color: var(--n-option-text-color-hover);
 `),A("&::before","background-color: var(--n-option-color-hover);")]),T("active",`
 color: var(--n-option-text-color-active);
 `,[O("prefix, suffix",`
 color: var(--n-option-text-color-active);
 `),A("&::before","background-color: var(--n-option-color-active);")]),T("child-active",`
 color: var(--n-option-text-color-child-active);
 `,[O("prefix, suffix",`
 color: var(--n-option-text-color-child-active);
 `)])]),T("disabled",`
 cursor: not-allowed;
 opacity: var(--n-option-opacity-disabled);
 `),T("group",`
 font-size: calc(var(--n-font-size) - 1px);
 color: var(--n-group-header-text-color);
 `,[O("prefix",`
 width: calc(var(--n-option-prefix-width) / 2);
 `,[T("show-icon",`
 width: calc(var(--n-option-icon-prefix-width) / 2);
 `)])]),O("prefix",`
 width: var(--n-option-prefix-width);
 display: flex;
 justify-content: center;
 align-items: center;
 color: var(--n-prefix-color);
 transition: color .3s var(--n-bezier);
 z-index: 1;
 `,[T("show-icon",`
 width: var(--n-option-icon-prefix-width);
 `),C("icon",`
 font-size: var(--n-option-icon-size);
 `)]),O("label",`
 white-space: nowrap;
 flex: 1;
 z-index: 1;
 `),O("suffix",`
 box-sizing: border-box;
 flex-grow: 0;
 flex-shrink: 0;
 display: flex;
 justify-content: flex-end;
 align-items: center;
 min-width: var(--n-option-suffix-width);
 padding: 0 8px;
 transition: color .3s var(--n-bezier);
 color: var(--n-suffix-color);
 z-index: 1;
 `,[T("has-submenu",`
 width: var(--n-option-icon-suffix-width);
 `),C("icon",`
 font-size: var(--n-option-icon-size);
 `)]),C("dropdown-menu","pointer-events: all;")]),C("dropdown-offset-container",`
 pointer-events: none;
 position: absolute;
 left: 0;
 right: 0;
 top: -4px;
 bottom: -4px;
 `)]),C("dropdown-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 4px 0;
 `),C("dropdown-menu-wrapper",`
 transform-origin: var(--v-transform-origin);
 width: fit-content;
 `),A(">",[C("scrollbar",`
 height: inherit;
 max-height: inherit;
 `)]),fe("scrollable",`
 padding: var(--n-padding);
 `),T("scrollable",[O("content",`
 padding: var(--n-padding);
 `)])]),ba={animated:{type:Boolean,default:!0},keyboard:{type:Boolean,default:!0},size:{type:String,default:"medium"},inverted:Boolean,placement:{type:String,default:"bottom"},onSelect:[Function,Array],options:{type:Array,default:()=>[]},menuProps:Function,showArrow:Boolean,renderLabel:Function,renderIcon:Function,renderOption:Function,nodeProps:Function,labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},value:[String,Number]},ya=Object.keys(ct),xa=Object.assign(Object.assign(Object.assign({},ct),ba),J.props),wa=j({name:"Dropdown",inheritAttrs:!1,props:xa,setup(e){const t=F(!1),o=Le(q(e,"show"),t),n=$(()=>{const{keyField:B,childrenField:G}=e;return Je(e.options,{getKey(L){return L[B]},getDisabled(L){return L.disabled===!0},getIgnored(L){return L.type==="divider"||L.type==="render"},getChildren(L){return L[G]}})}),r=$(()=>n.value.treeNodes),i=F(null),l=F(null),s=F(null),a=$(()=>{var B,G,L;return(L=(G=(B=i.value)!==null&&B!==void 0?B:l.value)!==null&&G!==void 0?G:s.value)!==null&&L!==void 0?L:null}),d=$(()=>n.value.getPath(a.value).keyPath),c=$(()=>n.value.getPath(e.value).keyPath),v=ce(()=>e.keyboard&&o.value);Nr({keydown:{ArrowUp:{prevent:!0,handler:S},ArrowRight:{prevent:!0,handler:w},ArrowDown:{prevent:!0,handler:_},ArrowLeft:{prevent:!0,handler:E},Enter:{prevent:!0,handler:x},Escape:k}},v);const{mergedClsPrefixRef:u,inlineThemeDisabled:b}=pe(e),g=J("Dropdown","-dropdown",ga,gn,e,u);ne(ut,{labelFieldRef:q(e,"labelField"),childrenFieldRef:q(e,"childrenField"),renderLabelRef:q(e,"renderLabel"),renderIconRef:q(e,"renderIcon"),hoverKeyRef:i,keyboardKeyRef:l,lastToggledSubmenuKeyRef:s,pendingKeyPathRef:d,activeKeyPathRef:c,animatedRef:q(e,"animated"),mergedShowRef:o,nodePropsRef:q(e,"nodeProps"),renderOptionRef:q(e,"renderOption"),menuPropsRef:q(e,"menuProps"),doSelect:m,doUpdateShow:p}),de(o,B=>{!e.animated&&!B&&h()});function m(B,G){const{onSelect:L}=e;L&&oe(L,B,G)}function p(B){const{"onUpdate:show":G,onUpdateShow:L}=e;G&&oe(G,B),L&&oe(L,B),t.value=B}function h(){i.value=null,l.value=null,s.value=null}function k(){p(!1)}function E(){R("left")}function w(){R("right")}function S(){R("up")}function _(){R("down")}function x(){const B=H();B!=null&&B.isLeaf&&o.value&&(m(B.key,B.rawNode),p(!1))}function H(){var B;const{value:G}=n,{value:L}=a;return!G||L===null?null:(B=G.getNode(L))!==null&&B!==void 0?B:null}function R(B){const{value:G}=a,{value:{getFirstAvailableNode:L}}=n;let I=null;if(G===null){const W=L();W!==null&&(I=W.key)}else{const W=H();if(W){let M;switch(B){case"down":M=W.getNext();break;case"up":M=W.getPrev();break;case"right":M=W.getChild();break;case"left":M=W.getParent();break}M&&(I=M.key)}}I!==null&&(i.value=null,l.value=I)}const P=$(()=>{const{size:B,inverted:G}=e,{common:{cubicBezierEaseInOut:L},self:I}=g.value,{padding:W,dividerColor:M,borderRadius:U,optionOpacityDisabled:te,[be("optionIconSuffixWidth",B)]:Q,[be("optionSuffixWidth",B)]:N,[be("optionIconPrefixWidth",B)]:K,[be("optionPrefixWidth",B)]:y,[be("fontSize",B)]:D,[be("optionHeight",B)]:Y,[be("optionIconSize",B)]:ft}=I,X={"--n-bezier":L,"--n-font-size":D,"--n-padding":W,"--n-border-radius":U,"--n-option-height":Y,"--n-option-prefix-width":y,"--n-option-icon-prefix-width":K,"--n-option-suffix-width":N,"--n-option-icon-suffix-width":Q,"--n-option-icon-size":ft,"--n-divider-color":M,"--n-option-opacity-disabled":te};return G?(X["--n-color"]=I.colorInverted,X["--n-option-color-hover"]=I.optionColorHoverInverted,X["--n-option-color-active"]=I.optionColorActiveInverted,X["--n-option-text-color"]=I.optionTextColorInverted,X["--n-option-text-color-hover"]=I.optionTextColorHoverInverted,X["--n-option-text-color-active"]=I.optionTextColorActiveInverted,X["--n-option-text-color-child-active"]=I.optionTextColorChildActiveInverted,X["--n-prefix-color"]=I.prefixColorInverted,X["--n-suffix-color"]=I.suffixColorInverted,X["--n-group-header-text-color"]=I.groupHeaderTextColorInverted):(X["--n-color"]=I.color,X["--n-option-color-hover"]=I.optionColorHover,X["--n-option-color-active"]=I.optionColorActive,X["--n-option-text-color"]=I.optionTextColor,X["--n-option-text-color-hover"]=I.optionTextColorHover,X["--n-option-text-color-active"]=I.optionTextColorActive,X["--n-option-text-color-child-active"]=I.optionTextColorChildActive,X["--n-prefix-color"]=I.prefixColor,X["--n-suffix-color"]=I.suffixColor,X["--n-group-header-text-color"]=I.groupHeaderTextColor),X}),V=b?ye("dropdown",$(()=>`${e.size[0]}${e.inverted?"i":""}`),P,e):void 0;return{mergedClsPrefix:u,mergedTheme:g,tmNodes:r,mergedShow:o,handleAfterLeave:()=>{e.animated&&h()},doUpdateShow:p,cssVars:b?void 0:P,themeClass:V==null?void 0:V.themeClass,onRender:V==null?void 0:V.onRender}},render(){const e=(n,r,i,l,s)=>{var a;const{mergedClsPrefix:d,menuProps:c}=this;(a=this.onRender)===null||a===void 0||a.call(this);const v=(c==null?void 0:c(void 0,this.tmNodes.map(b=>b.rawNode)))||{},u={ref:ti(r),class:[n,`${d}-dropdown`,this.themeClass],clsPrefix:d,tmNodes:this.tmNodes,style:[...i,this.cssVars],showArrow:this.showArrow,arrowStyle:this.arrowStyle,scrollable:this.scrollable,onMouseenter:l,onMouseleave:s};return f(Sn,je(this.$attrs,u,v))},{mergedTheme:t}=this,o={show:this.mergedShow,theme:t.peers.Popover,themeOverrides:t.peerOverrides.Popover,internalOnAfterLeave:this.handleAfterLeave,internalRenderBody:e,onUpdateShow:this.doUpdateShow,"onUpdate:show":void 0};return f(mn,Object.assign({},He(this.$props,ya),o),{trigger:()=>{var n,r;return(r=(n=this.$slots).default)===null||r===void 0?void 0:r.call(n)}})}});function Ca(e){const{baseColor:t,textColor2:o,bodyColor:n,cardColor:r,dividerColor:i,actionColor:l,scrollbarColor:s,scrollbarColorHover:a,invertedColor:d}=e;return{textColor:o,textColorInverted:"#FFF",color:n,colorEmbedded:l,headerColor:r,headerColorInverted:d,footerColor:l,footerColorInverted:d,headerBorderColor:i,headerBorderColorInverted:d,footerBorderColor:i,footerBorderColorInverted:d,siderBorderColor:i,siderBorderColorInverted:d,siderColor:r,siderColorInverted:d,siderToggleButtonBorder:`1px solid ${i}`,siderToggleButtonColor:t,siderToggleButtonIconColor:o,siderToggleButtonIconColorInverted:o,siderToggleBarColor:$t(n,s),siderToggleBarColorHover:$t(n,a),__invertScrollbar:"true"}}const Zt=at({name:"Layout",common:Ce,peers:{Scrollbar:xr},self:Ca});function Sa(e,t,o,n){return{itemColorHoverInverted:"#0000",itemColorActiveInverted:t,itemColorActiveHoverInverted:t,itemColorActiveCollapsedInverted:t,itemTextColorInverted:e,itemTextColorHoverInverted:o,itemTextColorChildActiveInverted:o,itemTextColorChildActiveHoverInverted:o,itemTextColorActiveInverted:o,itemTextColorActiveHoverInverted:o,itemTextColorHorizontalInverted:e,itemTextColorHoverHorizontalInverted:o,itemTextColorChildActiveHorizontalInverted:o,itemTextColorChildActiveHoverHorizontalInverted:o,itemTextColorActiveHorizontalInverted:o,itemTextColorActiveHoverHorizontalInverted:o,itemIconColorInverted:e,itemIconColorHoverInverted:o,itemIconColorActiveInverted:o,itemIconColorActiveHoverInverted:o,itemIconColorChildActiveInverted:o,itemIconColorChildActiveHoverInverted:o,itemIconColorCollapsedInverted:e,itemIconColorHorizontalInverted:e,itemIconColorHoverHorizontalInverted:o,itemIconColorActiveHorizontalInverted:o,itemIconColorActiveHoverHorizontalInverted:o,itemIconColorChildActiveHorizontalInverted:o,itemIconColorChildActiveHoverHorizontalInverted:o,arrowColorInverted:e,arrowColorHoverInverted:o,arrowColorActiveInverted:o,arrowColorActiveHoverInverted:o,arrowColorChildActiveInverted:o,arrowColorChildActiveHoverInverted:o,groupTextColorInverted:n}}function Ia(e){const{borderRadius:t,textColor3:o,primaryColor:n,textColor2:r,textColor1:i,fontSize:l,dividerColor:s,hoverColor:a,primaryColorHover:d}=e;return Object.assign({borderRadius:t,color:"#0000",groupTextColor:o,itemColorHover:a,itemColorActive:Ze(n,{alpha:.1}),itemColorActiveHover:Ze(n,{alpha:.1}),itemColorActiveCollapsed:Ze(n,{alpha:.1}),itemTextColor:r,itemTextColorHover:r,itemTextColorActive:n,itemTextColorActiveHover:n,itemTextColorChildActive:n,itemTextColorChildActiveHover:n,itemTextColorHorizontal:r,itemTextColorHoverHorizontal:d,itemTextColorActiveHorizontal:n,itemTextColorActiveHoverHorizontal:n,itemTextColorChildActiveHorizontal:n,itemTextColorChildActiveHoverHorizontal:n,itemIconColor:i,itemIconColorHover:i,itemIconColorActive:n,itemIconColorActiveHover:n,itemIconColorChildActive:n,itemIconColorChildActiveHover:n,itemIconColorCollapsed:i,itemIconColorHorizontal:i,itemIconColorHoverHorizontal:d,itemIconColorActiveHorizontal:n,itemIconColorActiveHoverHorizontal:n,itemIconColorChildActiveHorizontal:n,itemIconColorChildActiveHoverHorizontal:n,itemHeight:"42px",arrowColor:r,arrowColorHover:r,arrowColorActive:n,arrowColorActiveHover:n,arrowColorChildActive:n,arrowColorChildActiveHover:n,colorInverted:"#0000",borderColorHorizontal:"#0000",fontSize:l,dividerColor:s},Sa("#BBB",n,"#FFF","#AAA"))}const za=at({name:"Menu",common:Ce,peers:{Tooltip:bn,Dropdown:gn},self:Ia});function $a(e){const{opacityDisabled:t,heightTiny:o,heightSmall:n,heightMedium:r,heightLarge:i,heightHuge:l,primaryColor:s,fontSize:a}=e;return{fontSize:a,textColor:s,sizeTiny:o,sizeSmall:n,sizeMedium:r,sizeLarge:i,sizeHuge:l,color:s,opacitySpinning:t}}const Aa={common:Ce,self:$a},In=ue("n-layout-sider"),Jt={type:String,default:"static"},Pa=C("layout",`
 color: var(--n-text-color);
 background-color: var(--n-color);
 box-sizing: border-box;
 position: relative;
 z-index: auto;
 flex: auto;
 overflow: hidden;
 transition:
 box-shadow .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 color .3s var(--n-bezier);
`,[C("layout-scroll-container",`
 overflow-x: hidden;
 box-sizing: border-box;
 height: 100%;
 `),T("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),ka={embedded:Boolean,position:Jt,nativeScrollbar:{type:Boolean,default:!0},scrollbarProps:Object,onScroll:Function,contentClass:String,contentStyle:{type:[String,Object],default:""},hasSider:Boolean,siderPlacement:{type:String,default:"left"}},zn=ue("n-layout");function _a(e){return j({name:"Layout",props:Object.assign(Object.assign({},J.props),ka),setup(t){const o=F(null),n=F(null),{mergedClsPrefixRef:r,inlineThemeDisabled:i}=pe(t),l=J("Layout","-layout",Pa,Zt,t,r);function s(m,p){if(t.nativeScrollbar){const{value:h}=o;h&&(p===void 0?h.scrollTo(m):h.scrollTo(m,p))}else{const{value:h}=n;h&&h.scrollTo(m,p)}}ne(zn,t);let a=0,d=0;const c=m=>{var p;const h=m.target;a=h.scrollLeft,d=h.scrollTop,(p=t.onScroll)===null||p===void 0||p.call(t,m)};Uo(()=>{if(t.nativeScrollbar){const m=o.value;m&&(m.scrollTop=d,m.scrollLeft=a)}});const v={display:"flex",flexWrap:"nowrap",width:"100%",flexDirection:"row"},u={scrollTo:s},b=$(()=>{const{common:{cubicBezierEaseInOut:m},self:p}=l.value;return{"--n-bezier":m,"--n-color":t.embedded?p.colorEmbedded:p.color,"--n-text-color":p.textColor}}),g=i?ye("layout",$(()=>t.embedded?"e":""),b,t):void 0;return Object.assign({mergedClsPrefix:r,scrollableElRef:o,scrollbarInstRef:n,hasSiderStyle:v,mergedTheme:l,handleNativeElScroll:c,cssVars:i?void 0:b,themeClass:g==null?void 0:g.themeClass,onRender:g==null?void 0:g.onRender},u)},render(){var t;const{mergedClsPrefix:o,hasSider:n}=this;(t=this.onRender)===null||t===void 0||t.call(this);const r=n?this.hasSiderStyle:void 0,i=[this.themeClass,e,`${o}-layout`,`${o}-layout--${this.position}-positioned`];return f("div",{class:i,style:this.cssVars},this.nativeScrollbar?f("div",{ref:"scrollableElRef",class:[`${o}-layout-scroll-container`,this.contentClass],style:[this.contentStyle,r],onScroll:this.handleNativeElScroll},this.$slots):f(Go,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,contentClass:this.contentClass,contentStyle:[this.contentStyle,r]}),this.$slots))}})}const Oa=_a(!1),Ta=C("layout-header",`
 transition:
 color .3s var(--n-bezier),
 background-color .3s var(--n-bezier),
 box-shadow .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 box-sizing: border-box;
 width: 100%;
 background-color: var(--n-color);
 color: var(--n-text-color);
`,[T("absolute-positioned",`
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 `),T("bordered",`
 border-bottom: solid 1px var(--n-border-color);
 `)]),Na={position:Jt,inverted:Boolean,bordered:{type:Boolean,default:!1}},Ea=j({name:"LayoutHeader",props:Object.assign(Object.assign({},J.props),Na),setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=pe(e),n=J("Layout","-layout-header",Ta,Zt,e,t),r=$(()=>{const{common:{cubicBezierEaseInOut:l},self:s}=n.value,a={"--n-bezier":l};return e.inverted?(a["--n-color"]=s.headerColorInverted,a["--n-text-color"]=s.textColorInverted,a["--n-border-color"]=s.headerBorderColorInverted):(a["--n-color"]=s.headerColor,a["--n-text-color"]=s.textColor,a["--n-border-color"]=s.headerBorderColor),a}),i=o?ye("layout-header",$(()=>e.inverted?"a":"b"),r,e):void 0;return{mergedClsPrefix:t,cssVars:o?void 0:r,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e;const{mergedClsPrefix:t}=this;return(e=this.onRender)===null||e===void 0||e.call(this),f("div",{class:[`${t}-layout-header`,this.themeClass,this.position&&`${t}-layout-header--${this.position}-positioned`,this.bordered&&`${t}-layout-header--bordered`],style:this.cssVars},this.$slots)}}),Ma=C("layout-sider",`
 flex-shrink: 0;
 box-sizing: border-box;
 position: relative;
 z-index: 1;
 color: var(--n-text-color);
 transition:
 color .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 min-width .3s var(--n-bezier),
 max-width .3s var(--n-bezier),
 transform .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 background-color: var(--n-color);
 display: flex;
 justify-content: flex-end;
`,[T("bordered",[O("border",`
 content: "";
 position: absolute;
 top: 0;
 bottom: 0;
 width: 1px;
 background-color: var(--n-border-color);
 transition: background-color .3s var(--n-bezier);
 `)]),O("left-placement",[T("bordered",[O("border",`
 right: 0;
 `)])]),T("right-placement",`
 justify-content: flex-start;
 `,[T("bordered",[O("border",`
 left: 0;
 `)]),T("collapsed",[C("layout-toggle-button",[C("base-icon",`
 transform: rotate(180deg);
 `)]),C("layout-toggle-bar",[A("&:hover",[O("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),O("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])])]),C("layout-toggle-button",`
 left: 0;
 transform: translateX(-50%) translateY(-50%);
 `,[C("base-icon",`
 transform: rotate(0);
 `)]),C("layout-toggle-bar",`
 left: -28px;
 transform: rotate(180deg);
 `,[A("&:hover",[O("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),O("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})])])]),T("collapsed",[C("layout-toggle-bar",[A("&:hover",[O("top",{transform:"rotate(-12deg) scale(1.15) translateY(-2px)"}),O("bottom",{transform:"rotate(12deg) scale(1.15) translateY(2px)"})])]),C("layout-toggle-button",[C("base-icon",`
 transform: rotate(0);
 `)])]),C("layout-toggle-button",`
 transition:
 color .3s var(--n-bezier),
 right .3s var(--n-bezier),
 left .3s var(--n-bezier),
 border-color .3s var(--n-bezier),
 background-color .3s var(--n-bezier);
 cursor: pointer;
 width: 24px;
 height: 24px;
 position: absolute;
 top: 50%;
 right: 0;
 border-radius: 50%;
 display: flex;
 align-items: center;
 justify-content: center;
 font-size: 18px;
 color: var(--n-toggle-button-icon-color);
 border: var(--n-toggle-button-border);
 background-color: var(--n-toggle-button-color);
 box-shadow: 0 2px 4px 0px rgba(0, 0, 0, .06);
 transform: translateX(50%) translateY(-50%);
 z-index: 1;
 `,[C("base-icon",`
 transition: transform .3s var(--n-bezier);
 transform: rotate(180deg);
 `)]),C("layout-toggle-bar",`
 cursor: pointer;
 height: 72px;
 width: 32px;
 position: absolute;
 top: calc(50% - 36px);
 right: -28px;
 `,[O("top, bottom",`
 position: absolute;
 width: 4px;
 border-radius: 2px;
 height: 38px;
 left: 14px;
 transition: 
 background-color .3s var(--n-bezier),
 transform .3s var(--n-bezier);
 `),O("bottom",`
 position: absolute;
 top: 34px;
 `),A("&:hover",[O("top",{transform:"rotate(12deg) scale(1.15) translateY(-2px)"}),O("bottom",{transform:"rotate(-12deg) scale(1.15) translateY(2px)"})]),O("top, bottom",{backgroundColor:"var(--n-toggle-bar-color)"}),A("&:hover",[O("top, bottom",{backgroundColor:"var(--n-toggle-bar-color-hover)"})])]),O("border",`
 position: absolute;
 top: 0;
 right: 0;
 bottom: 0;
 width: 1px;
 transition: background-color .3s var(--n-bezier);
 `),C("layout-sider-scroll-container",`
 flex-grow: 1;
 flex-shrink: 0;
 box-sizing: border-box;
 height: 100%;
 opacity: 0;
 transition: opacity .3s var(--n-bezier);
 max-width: 100%;
 `),T("show-content",[C("layout-sider-scroll-container",{opacity:1})]),T("absolute-positioned",`
 position: absolute;
 left: 0;
 top: 0;
 bottom: 0;
 `)]),Ba=j({props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return f("div",{onClick:this.onClick,class:`${e}-layout-toggle-bar`},f("div",{class:`${e}-layout-toggle-bar__top`}),f("div",{class:`${e}-layout-toggle-bar__bottom`}))}}),Ha=j({name:"LayoutToggleButton",props:{clsPrefix:{type:String,required:!0},onClick:Function},render(){const{clsPrefix:e}=this;return f("div",{class:`${e}-layout-toggle-button`,onClick:this.onClick},f(jo,{clsPrefix:e},{default:()=>f(un,null)}))}}),Ra={position:Jt,bordered:Boolean,collapsedWidth:{type:Number,default:48},width:{type:[Number,String],default:272},contentClass:String,contentStyle:{type:[String,Object],default:""},collapseMode:{type:String,default:"transform"},collapsed:{type:Boolean,default:void 0},defaultCollapsed:Boolean,showCollapsedContent:{type:Boolean,default:!0},showTrigger:{type:[Boolean,String],default:!1},nativeScrollbar:{type:Boolean,default:!0},inverted:Boolean,scrollbarProps:Object,triggerClass:String,triggerStyle:[String,Object],collapsedTriggerClass:String,collapsedTriggerStyle:[String,Object],"onUpdate:collapsed":[Function,Array],onUpdateCollapsed:[Function,Array],onAfterEnter:Function,onAfterLeave:Function,onExpand:[Function,Array],onCollapse:[Function,Array],onScroll:Function},Fa=j({name:"LayoutSider",props:Object.assign(Object.assign({},J.props),Ra),setup(e){const t=Z(zn),o=F(null),n=F(null),r=F(e.defaultCollapsed),i=Le(q(e,"collapsed"),r),l=$(()=>Ie(i.value?e.collapsedWidth:e.width)),s=$(()=>e.collapseMode!=="transform"?{}:{minWidth:Ie(e.width)}),a=$(()=>t?t.siderPlacement:"left");function d(S,_){if(e.nativeScrollbar){const{value:x}=o;x&&(_===void 0?x.scrollTo(S):x.scrollTo(S,_))}else{const{value:x}=n;x&&x.scrollTo(S,_)}}function c(){const{"onUpdate:collapsed":S,onUpdateCollapsed:_,onExpand:x,onCollapse:H}=e,{value:R}=i;_&&oe(_,!R),S&&oe(S,!R),r.value=!R,R?x&&oe(x):H&&oe(H)}let v=0,u=0;const b=S=>{var _;const x=S.target;v=x.scrollLeft,u=x.scrollTop,(_=e.onScroll)===null||_===void 0||_.call(e,S)};Uo(()=>{if(e.nativeScrollbar){const S=o.value;S&&(S.scrollTop=u,S.scrollLeft=v)}}),ne(In,{collapsedRef:i,collapseModeRef:q(e,"collapseMode")});const{mergedClsPrefixRef:g,inlineThemeDisabled:m}=pe(e),p=J("Layout","-layout-sider",Ma,Zt,e,g);function h(S){var _,x;S.propertyName==="max-width"&&(i.value?(_=e.onAfterLeave)===null||_===void 0||_.call(e):(x=e.onAfterEnter)===null||x===void 0||x.call(e))}const k={scrollTo:d},E=$(()=>{const{common:{cubicBezierEaseInOut:S},self:_}=p.value,{siderToggleButtonColor:x,siderToggleButtonBorder:H,siderToggleBarColor:R,siderToggleBarColorHover:P}=_,V={"--n-bezier":S,"--n-toggle-button-color":x,"--n-toggle-button-border":H,"--n-toggle-bar-color":R,"--n-toggle-bar-color-hover":P};return e.inverted?(V["--n-color"]=_.siderColorInverted,V["--n-text-color"]=_.textColorInverted,V["--n-border-color"]=_.siderBorderColorInverted,V["--n-toggle-button-icon-color"]=_.siderToggleButtonIconColorInverted,V.__invertScrollbar=_.__invertScrollbar):(V["--n-color"]=_.siderColor,V["--n-text-color"]=_.textColor,V["--n-border-color"]=_.siderBorderColor,V["--n-toggle-button-icon-color"]=_.siderToggleButtonIconColor),V}),w=m?ye("layout-sider",$(()=>e.inverted?"a":"b"),E,e):void 0;return Object.assign({scrollableElRef:o,scrollbarInstRef:n,mergedClsPrefix:g,mergedTheme:p,styleMaxWidth:l,mergedCollapsed:i,scrollContainerStyle:s,siderPlacement:a,handleNativeElScroll:b,handleTransitionend:h,handleTriggerClick:c,inlineThemeDisabled:m,cssVars:E,themeClass:w==null?void 0:w.themeClass,onRender:w==null?void 0:w.onRender},k)},render(){var e;const{mergedClsPrefix:t,mergedCollapsed:o,showTrigger:n}=this;return(e=this.onRender)===null||e===void 0||e.call(this),f("aside",{class:[`${t}-layout-sider`,this.themeClass,`${t}-layout-sider--${this.position}-positioned`,`${t}-layout-sider--${this.siderPlacement}-placement`,this.bordered&&`${t}-layout-sider--bordered`,o&&`${t}-layout-sider--collapsed`,(!o||this.showCollapsedContent)&&`${t}-layout-sider--show-content`],onTransitionend:this.handleTransitionend,style:[this.inlineThemeDisabled?void 0:this.cssVars,{maxWidth:this.styleMaxWidth,width:Ie(this.width)}]},this.nativeScrollbar?f("div",{class:[`${t}-layout-sider-scroll-container`,this.contentClass],onScroll:this.handleNativeElScroll,style:[this.scrollContainerStyle,{overflow:"auto"},this.contentStyle],ref:"scrollableElRef"},this.$slots):f(Go,Object.assign({},this.scrollbarProps,{onScroll:this.onScroll,ref:"scrollbarInstRef",style:this.scrollContainerStyle,contentStyle:this.contentStyle,contentClass:this.contentClass,theme:this.mergedTheme.peers.Scrollbar,themeOverrides:this.mergedTheme.peerOverrides.Scrollbar,builtinThemeOverrides:this.inverted&&this.cssVars.__invertScrollbar==="true"?{colorHover:"rgba(255, 255, 255, .4)",color:"rgba(255, 255, 255, .3)"}:void 0}),this.$slots),n?n==="bar"?f(Ba,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):f(Ha,{clsPrefix:t,class:o?this.collapsedTriggerClass:this.triggerClass,style:o?this.collapsedTriggerStyle:this.triggerStyle,onClick:this.handleTriggerClick}):null,this.bordered?f("div",{class:`${t}-layout-sider__border`}):null)}}),Ve=ue("n-menu"),Qt=ue("n-submenu"),eo=ue("n-menu-item-group"),No=[A("&::before","background-color: var(--n-item-color-hover);"),O("arrow",`
 color: var(--n-arrow-color-hover);
 `),O("icon",`
 color: var(--n-item-icon-color-hover);
 `),C("menu-item-content-header",`
 color: var(--n-item-text-color-hover);
 `,[A("a",`
 color: var(--n-item-text-color-hover);
 `),O("extra",`
 color: var(--n-item-text-color-hover);
 `)])],Eo=[O("icon",`
 color: var(--n-item-icon-color-hover-horizontal);
 `),C("menu-item-content-header",`
 color: var(--n-item-text-color-hover-horizontal);
 `,[A("a",`
 color: var(--n-item-text-color-hover-horizontal);
 `),O("extra",`
 color: var(--n-item-text-color-hover-horizontal);
 `)])],La=A([C("menu",`
 background-color: var(--n-color);
 color: var(--n-item-text-color);
 overflow: hidden;
 transition: background-color .3s var(--n-bezier);
 box-sizing: border-box;
 font-size: var(--n-font-size);
 padding-bottom: 6px;
 `,[T("horizontal",`
 max-width: 100%;
 width: 100%;
 display: flex;
 overflow: hidden;
 padding-bottom: 0;
 `,[C("submenu","margin: 0;"),C("menu-item","margin: 0;"),C("menu-item-content",`
 padding: 0 20px;
 border-bottom: 2px solid #0000;
 `,[A("&::before","display: none;"),T("selected","border-bottom: 2px solid var(--n-border-color-horizontal)")]),C("menu-item-content",[T("selected",[O("icon","color: var(--n-item-icon-color-active-horizontal);"),C("menu-item-content-header",`
 color: var(--n-item-text-color-active-horizontal);
 `,[A("a","color: var(--n-item-text-color-active-horizontal);"),O("extra","color: var(--n-item-text-color-active-horizontal);")])]),T("child-active",`
 border-bottom: 2px solid var(--n-border-color-horizontal);
 `,[C("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-horizontal);
 `,[A("a",`
 color: var(--n-item-text-color-child-active-horizontal);
 `),O("extra",`
 color: var(--n-item-text-color-child-active-horizontal);
 `)]),O("icon",`
 color: var(--n-item-icon-color-child-active-horizontal);
 `)]),fe("disabled",[fe("selected, child-active",[A("&:focus-within",Eo)]),T("selected",[Se(null,[O("icon","color: var(--n-item-icon-color-active-hover-horizontal);"),C("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover-horizontal);
 `,[A("a","color: var(--n-item-text-color-active-hover-horizontal);"),O("extra","color: var(--n-item-text-color-active-hover-horizontal);")])])]),T("child-active",[Se(null,[O("icon","color: var(--n-item-icon-color-child-active-hover-horizontal);"),C("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover-horizontal);
 `,[A("a","color: var(--n-item-text-color-child-active-hover-horizontal);"),O("extra","color: var(--n-item-text-color-child-active-hover-horizontal);")])])]),Se("border-bottom: 2px solid var(--n-border-color-horizontal);",Eo)]),C("menu-item-content-header",[A("a","color: var(--n-item-text-color-horizontal);")])])]),fe("responsive",[C("menu-item-content-header",`
 overflow: hidden;
 text-overflow: ellipsis;
 `)]),T("collapsed",[C("menu-item-content",[T("selected",[A("&::before",`
 background-color: var(--n-item-color-active-collapsed) !important;
 `)]),C("menu-item-content-header","opacity: 0;"),O("arrow","opacity: 0;"),O("icon","color: var(--n-item-icon-color-collapsed);")])]),C("menu-item",`
 height: var(--n-item-height);
 margin-top: 6px;
 position: relative;
 `),C("menu-item-content",`
 box-sizing: border-box;
 line-height: 1.75;
 height: 100%;
 display: grid;
 grid-template-areas: "icon content arrow";
 grid-template-columns: auto 1fr auto;
 align-items: center;
 cursor: pointer;
 position: relative;
 padding-right: 18px;
 transition:
 background-color .3s var(--n-bezier),
 padding-left .3s var(--n-bezier),
 border-color .3s var(--n-bezier);
 `,[A("> *","z-index: 1;"),A("&::before",`
 z-index: auto;
 content: "";
 background-color: #0000;
 position: absolute;
 left: 8px;
 right: 8px;
 top: 0;
 bottom: 0;
 pointer-events: none;
 border-radius: var(--n-border-radius);
 transition: background-color .3s var(--n-bezier);
 `),T("disabled",`
 opacity: .45;
 cursor: not-allowed;
 `),T("collapsed",[O("arrow","transform: rotate(0);")]),T("selected",[A("&::before","background-color: var(--n-item-color-active);"),O("arrow","color: var(--n-arrow-color-active);"),O("icon","color: var(--n-item-icon-color-active);"),C("menu-item-content-header",`
 color: var(--n-item-text-color-active);
 `,[A("a","color: var(--n-item-text-color-active);"),O("extra","color: var(--n-item-text-color-active);")])]),T("child-active",[C("menu-item-content-header",`
 color: var(--n-item-text-color-child-active);
 `,[A("a",`
 color: var(--n-item-text-color-child-active);
 `),O("extra",`
 color: var(--n-item-text-color-child-active);
 `)]),O("arrow",`
 color: var(--n-arrow-color-child-active);
 `),O("icon",`
 color: var(--n-item-icon-color-child-active);
 `)]),fe("disabled",[fe("selected, child-active",[A("&:focus-within",No)]),T("selected",[Se(null,[O("arrow","color: var(--n-arrow-color-active-hover);"),O("icon","color: var(--n-item-icon-color-active-hover);"),C("menu-item-content-header",`
 color: var(--n-item-text-color-active-hover);
 `,[A("a","color: var(--n-item-text-color-active-hover);"),O("extra","color: var(--n-item-text-color-active-hover);")])])]),T("child-active",[Se(null,[O("arrow","color: var(--n-arrow-color-child-active-hover);"),O("icon","color: var(--n-item-icon-color-child-active-hover);"),C("menu-item-content-header",`
 color: var(--n-item-text-color-child-active-hover);
 `,[A("a","color: var(--n-item-text-color-child-active-hover);"),O("extra","color: var(--n-item-text-color-child-active-hover);")])])]),T("selected",[Se(null,[A("&::before","background-color: var(--n-item-color-active-hover);")])]),Se(null,No)]),O("icon",`
 grid-area: icon;
 color: var(--n-item-icon-color);
 transition:
 color .3s var(--n-bezier),
 font-size .3s var(--n-bezier),
 margin-right .3s var(--n-bezier);
 box-sizing: content-box;
 display: inline-flex;
 align-items: center;
 justify-content: center;
 `),O("arrow",`
 grid-area: arrow;
 font-size: 16px;
 color: var(--n-arrow-color);
 transform: rotate(180deg);
 opacity: 1;
 transition:
 color .3s var(--n-bezier),
 transform 0.2s var(--n-bezier),
 opacity 0.2s var(--n-bezier);
 `),C("menu-item-content-header",`
 grid-area: content;
 transition:
 color .3s var(--n-bezier),
 opacity .3s var(--n-bezier);
 opacity: 1;
 white-space: nowrap;
 color: var(--n-item-text-color);
 `,[A("a",`
 outline: none;
 text-decoration: none;
 transition: color .3s var(--n-bezier);
 color: var(--n-item-text-color);
 `,[A("&::before",`
 content: "";
 position: absolute;
 left: 0;
 right: 0;
 top: 0;
 bottom: 0;
 `)]),O("extra",`
 font-size: .93em;
 color: var(--n-group-text-color);
 transition: color .3s var(--n-bezier);
 `)])]),C("submenu",`
 cursor: pointer;
 position: relative;
 margin-top: 6px;
 `,[C("menu-item-content",`
 height: var(--n-item-height);
 `),C("submenu-children",`
 overflow: hidden;
 padding: 0;
 `,[rr({duration:".2s"})])]),C("menu-item-group",[C("menu-item-group-title",`
 margin-top: 6px;
 color: var(--n-group-text-color);
 cursor: default;
 font-size: .93em;
 height: 36px;
 display: flex;
 align-items: center;
 transition:
 padding-left .3s var(--n-bezier),
 color .3s var(--n-bezier);
 `)])]),C("menu-tooltip",[A("a",`
 color: inherit;
 text-decoration: none;
 `)]),C("menu-divider",`
 transition: background-color .3s var(--n-bezier);
 background-color: var(--n-divider-color);
 height: 1px;
 margin: 6px 18px;
 `)]);function Se(e,t){return[T("hover",e,t),A("&:hover",e,t)]}const $n=j({name:"MenuOptionContent",props:{collapsed:Boolean,disabled:Boolean,title:[String,Function],icon:Function,extra:[String,Function],showArrow:Boolean,childActive:Boolean,hover:Boolean,paddingLeft:Number,selected:Boolean,maxIconSize:{type:Number,required:!0},activeIconSize:{type:Number,required:!0},iconMarginRight:{type:Number,required:!0},clsPrefix:{type:String,required:!0},onClick:Function,tmNode:{type:Object,required:!0},isEllipsisPlaceholder:Boolean},setup(e){const{props:t}=Z(Ve);return{menuProps:t,style:$(()=>{const{paddingLeft:o}=e;return{paddingLeft:o&&`${o}px`}}),iconStyle:$(()=>{const{maxIconSize:o,activeIconSize:n,iconMarginRight:r}=e;return{width:`${o}px`,height:`${o}px`,fontSize:`${n}px`,marginRight:`${r}px`}})}},render(){const{clsPrefix:e,tmNode:t,menuProps:{renderIcon:o,renderLabel:n,renderExtra:r,expandIcon:i}}=this,l=o?o(t.rawNode):he(this.icon);return f("div",{onClick:s=>{var a;(a=this.onClick)===null||a===void 0||a.call(this,s)},role:"none",class:[`${e}-menu-item-content`,{[`${e}-menu-item-content--selected`]:this.selected,[`${e}-menu-item-content--collapsed`]:this.collapsed,[`${e}-menu-item-content--child-active`]:this.childActive,[`${e}-menu-item-content--disabled`]:this.disabled,[`${e}-menu-item-content--hover`]:this.hover}],style:this.style},l&&f("div",{class:`${e}-menu-item-content__icon`,style:this.iconStyle,role:"none"},[l]),f("div",{class:`${e}-menu-item-content-header`,role:"none"},this.isEllipsisPlaceholder?this.title:n?n(t.rawNode):he(this.title),this.extra||r?f("span",{class:`${e}-menu-item-content-header__extra`}," ",r?r(t.rawNode):he(this.extra)):null),this.showArrow?f(jo,{ariaHidden:!0,class:`${e}-menu-item-content__arrow`,clsPrefix:e},{default:()=>i?i(t.rawNode):f(ml,null)}):null)}}),Ye=8;function to(e){const t=Z(Ve),{props:o,mergedCollapsedRef:n}=t,r=Z(Qt,null),i=Z(eo,null),l=$(()=>o.mode==="horizontal"),s=$(()=>l.value?o.dropdownPlacement:"tmNodes"in e?"right-start":"right"),a=$(()=>{var u;return Math.max((u=o.collapsedIconSize)!==null&&u!==void 0?u:o.iconSize,o.iconSize)}),d=$(()=>{var u;return!l.value&&e.root&&n.value&&(u=o.collapsedIconSize)!==null&&u!==void 0?u:o.iconSize}),c=$(()=>{if(l.value)return;const{collapsedWidth:u,indent:b,rootIndent:g}=o,{root:m,isGroup:p}=e,h=g===void 0?b:g;return m?n.value?u/2-a.value/2:h:i&&typeof i.paddingLeftRef.value=="number"?b/2+i.paddingLeftRef.value:r&&typeof r.paddingLeftRef.value=="number"?(p?b/2:b)+r.paddingLeftRef.value:0}),v=$(()=>{const{collapsedWidth:u,indent:b,rootIndent:g}=o,{value:m}=a,{root:p}=e;return l.value||!p||!n.value?Ye:(g===void 0?b:g)+m+Ye-(u+m)/2});return{dropdownPlacement:s,activeIconSize:d,maxIconSize:a,paddingLeft:c,iconMarginRight:v,NMenu:t,NSubmenu:r}}const oo={internalKey:{type:[String,Number],required:!0},root:Boolean,isGroup:Boolean,level:{type:Number,required:!0},title:[String,Function],extra:[String,Function]},Ka=j({name:"MenuDivider",setup(){const e=Z(Ve),{mergedClsPrefixRef:t,isHorizontalRef:o}=e;return()=>o.value?null:f("div",{class:`${t.value}-menu-divider`})}}),An=Object.assign(Object.assign({},oo),{tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function}),Da=Dt(An),ja=j({name:"MenuOption",props:An,setup(e){const t=to(e),{NSubmenu:o,NMenu:n}=t,{props:r,mergedClsPrefixRef:i,mergedCollapsedRef:l}=n,s=o?o.mergedDisabledRef:{value:!1},a=$(()=>s.value||e.disabled);function d(v){const{onClick:u}=e;u&&u(v)}function c(v){a.value||(n.doSelect(e.internalKey,e.tmNode.rawNode),d(v))}return{mergedClsPrefix:i,dropdownPlacement:t.dropdownPlacement,paddingLeft:t.paddingLeft,iconMarginRight:t.iconMarginRight,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,mergedTheme:n.mergedThemeRef,menuProps:r,dropdownEnabled:ce(()=>e.root&&l.value&&r.mode!=="horizontal"&&!a.value),selected:ce(()=>n.mergedValueRef.value===e.internalKey),mergedDisabled:a,handleClick:c}},render(){const{mergedClsPrefix:e,mergedTheme:t,tmNode:o,menuProps:{renderLabel:n,nodeProps:r}}=this,i=r==null?void 0:r(o.rawNode);return f("div",Object.assign({},i,{role:"menuitem",class:[`${e}-menu-item`,i==null?void 0:i.class]}),f(aa,{theme:t.peers.Tooltip,themeOverrides:t.peerOverrides.Tooltip,trigger:"hover",placement:this.dropdownPlacement,disabled:!this.dropdownEnabled||this.title===void 0,internalExtraClass:["menu-tooltip"]},{default:()=>n?n(o.rawNode):he(this.title),trigger:()=>f($n,{tmNode:o,clsPrefix:e,paddingLeft:this.paddingLeft,iconMarginRight:this.iconMarginRight,maxIconSize:this.maxIconSize,activeIconSize:this.activeIconSize,selected:this.selected,title:this.title,extra:this.extra,disabled:this.mergedDisabled,icon:this.icon,onClick:this.handleClick})}))}}),Pn=Object.assign(Object.assign({},oo),{tmNode:{type:Object,required:!0},tmNodes:{type:Array,required:!0}}),Wa=Dt(Pn),Va=j({name:"MenuOptionGroup",props:Pn,setup(e){ne(Qt,null);const t=to(e);ne(eo,{paddingLeftRef:t.paddingLeft});const{mergedClsPrefixRef:o,props:n}=Z(Ve);return function(){const{value:r}=o,i=t.paddingLeft.value,{nodeProps:l}=n,s=l==null?void 0:l(e.tmNode.rawNode);return f("div",{class:`${r}-menu-item-group`,role:"group"},f("div",Object.assign({},s,{class:[`${r}-menu-item-group-title`,s==null?void 0:s.class],style:[(s==null?void 0:s.style)||"",i!==void 0?`padding-left: ${i}px;`:""]}),he(e.title),e.extra?f(Ke,null," ",he(e.extra)):null),f("div",null,e.tmNodes.map(a=>no(a,n))))}}});function Rt(e){return e.type==="divider"||e.type==="render"}function Ga(e){return e.type==="divider"}function no(e,t){const{rawNode:o}=e,{show:n}=o;if(n===!1)return null;if(Rt(o))return Ga(o)?f(Ka,Object.assign({key:e.key},o.props)):null;const{labelField:r}=t,{key:i,level:l,isGroup:s}=e,a=Object.assign(Object.assign({},o),{title:o.title||o[r],extra:o.titleExtra||o.extra,key:i,internalKey:i,level:l,root:l===0,isGroup:s});return e.children?e.isGroup?f(Va,He(a,Wa,{tmNode:e,tmNodes:e.children,key:i})):f(Ft,He(a,Ua,{key:i,rawNodes:o[t.childrenField],tmNodes:e.children,tmNode:e})):f(ja,He(a,Da,{key:i,tmNode:e}))}const kn=Object.assign(Object.assign({},oo),{rawNodes:{type:Array,default:()=>[]},tmNodes:{type:Array,default:()=>[]},tmNode:{type:Object,required:!0},disabled:Boolean,icon:Function,onClick:Function,domId:String,virtualChildActive:{type:Boolean,default:void 0},isEllipsisPlaceholder:Boolean}),Ua=Dt(kn),Ft=j({name:"Submenu",props:kn,setup(e){const t=to(e),{NMenu:o,NSubmenu:n}=t,{props:r,mergedCollapsedRef:i,mergedThemeRef:l}=o,s=$(()=>{const{disabled:u}=e;return n!=null&&n.mergedDisabledRef.value||r.disabled?!0:u}),a=F(!1);ne(Qt,{paddingLeftRef:t.paddingLeft,mergedDisabledRef:s}),ne(eo,null);function d(){const{onClick:u}=e;u&&u()}function c(){s.value||(i.value||o.toggleExpand(e.internalKey),d())}function v(u){a.value=u}return{menuProps:r,mergedTheme:l,doSelect:o.doSelect,inverted:o.invertedRef,isHorizontal:o.isHorizontalRef,mergedClsPrefix:o.mergedClsPrefixRef,maxIconSize:t.maxIconSize,activeIconSize:t.activeIconSize,iconMarginRight:t.iconMarginRight,dropdownPlacement:t.dropdownPlacement,dropdownShow:a,paddingLeft:t.paddingLeft,mergedDisabled:s,mergedValue:o.mergedValueRef,childActive:ce(()=>{var u;return(u=e.virtualChildActive)!==null&&u!==void 0?u:o.activePathRef.value.includes(e.internalKey)}),collapsed:$(()=>r.mode==="horizontal"?!1:i.value?!0:!o.mergedExpandedKeysRef.value.includes(e.internalKey)),dropdownEnabled:$(()=>!s.value&&(r.mode==="horizontal"||i.value)),handlePopoverShowChange:v,handleClick:c}},render(){var e;const{mergedClsPrefix:t,menuProps:{renderIcon:o,renderLabel:n}}=this,r=()=>{const{isHorizontal:l,paddingLeft:s,collapsed:a,mergedDisabled:d,maxIconSize:c,activeIconSize:v,title:u,childActive:b,icon:g,handleClick:m,menuProps:{nodeProps:p},dropdownShow:h,iconMarginRight:k,tmNode:E,mergedClsPrefix:w,isEllipsisPlaceholder:S,extra:_}=this,x=p==null?void 0:p(E.rawNode);return f("div",Object.assign({},x,{class:[`${w}-menu-item`,x==null?void 0:x.class],role:"menuitem"}),f($n,{tmNode:E,paddingLeft:s,collapsed:a,disabled:d,iconMarginRight:k,maxIconSize:c,activeIconSize:v,title:u,extra:_,showArrow:!l,childActive:b,clsPrefix:w,icon:g,hover:h,onClick:m,isEllipsisPlaceholder:S}))},i=()=>f(Do,null,{default:()=>{const{tmNodes:l,collapsed:s}=this;return s?null:f("div",{class:`${t}-submenu-children`,role:"menu"},l.map(a=>no(a,this.menuProps)))}});return this.root?f(wa,Object.assign({size:"large",trigger:"hover"},(e=this.menuProps)===null||e===void 0?void 0:e.dropdownProps,{themeOverrides:this.mergedTheme.peerOverrides.Dropdown,theme:this.mergedTheme.peers.Dropdown,builtinThemeOverrides:{fontSizeLarge:"14px",optionIconSizeLarge:"18px"},value:this.mergedValue,disabled:!this.dropdownEnabled,placement:this.dropdownPlacement,keyField:this.menuProps.keyField,labelField:this.menuProps.labelField,childrenField:this.menuProps.childrenField,onUpdateShow:this.handlePopoverShowChange,options:this.rawNodes,onSelect:this.doSelect,inverted:this.inverted,renderIcon:o,renderLabel:n}),{default:()=>f("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},r(),this.isHorizontal?null:i())}):f("div",{class:`${t}-submenu`,role:"menu","aria-expanded":!this.collapsed,id:this.domId},r(),i())}}),Ya=Object.assign(Object.assign({},J.props),{options:{type:Array,default:()=>[]},collapsed:{type:Boolean,default:void 0},collapsedWidth:{type:Number,default:48},iconSize:{type:Number,default:20},collapsedIconSize:{type:Number,default:24},rootIndent:Number,indent:{type:Number,default:32},labelField:{type:String,default:"label"},keyField:{type:String,default:"key"},childrenField:{type:String,default:"children"},disabledField:{type:String,default:"disabled"},defaultExpandAll:Boolean,defaultExpandedKeys:Array,expandedKeys:Array,value:[String,Number],defaultValue:{type:[String,Number],default:null},mode:{type:String,default:"vertical"},watchProps:{type:Array,default:void 0},disabled:Boolean,show:{type:Boolean,default:!0},inverted:Boolean,"onUpdate:expandedKeys":[Function,Array],onUpdateExpandedKeys:[Function,Array],onUpdateValue:[Function,Array],"onUpdate:value":[Function,Array],expandIcon:Function,renderIcon:Function,renderLabel:Function,renderExtra:Function,dropdownProps:Object,accordion:Boolean,nodeProps:Function,dropdownPlacement:{type:String,default:"bottom"},responsive:Boolean,items:Array,onOpenNamesChange:[Function,Array],onSelect:[Function,Array],onExpandedNamesChange:[Function,Array],expandedNames:Array,defaultExpandedNames:Array}),qa=j({name:"Menu",inheritAttrs:!1,props:Ya,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=pe(e),n=J("Menu","-menu",La,za,e,t),r=Z(In,null),i=$(()=>{var N;const{collapsed:K}=e;if(K!==void 0)return K;if(r){const{collapseModeRef:y,collapsedRef:D}=r;if(y.value==="width")return(N=D.value)!==null&&N!==void 0?N:!1}return!1}),l=$(()=>{const{keyField:N,childrenField:K,disabledField:y}=e;return Je(e.items||e.options,{getIgnored(D){return Rt(D)},getChildren(D){return D[K]},getDisabled(D){return D[y]},getKey(D){var Y;return(Y=D[N])!==null&&Y!==void 0?Y:D.name}})}),s=$(()=>new Set(l.value.treeNodes.map(N=>N.key))),{watchProps:a}=e,d=F(null);a!=null&&a.includes("defaultValue")?Fe(()=>{d.value=e.defaultValue}):d.value=e.defaultValue;const c=q(e,"value"),v=Le(c,d),u=F([]),b=()=>{u.value=e.defaultExpandAll?l.value.getNonLeafKeys():e.defaultExpandedNames||e.defaultExpandedKeys||l.value.getPath(v.value,{includeSelf:!1}).keyPath};a!=null&&a.includes("defaultExpandedKeys")?Fe(b):b();const g=jt(e,["expandedNames","expandedKeys"]),m=Le(g,u),p=$(()=>l.value.treeNodes),h=$(()=>l.value.getPath(v.value).keyPath);ne(Ve,{props:e,mergedCollapsedRef:i,mergedThemeRef:n,mergedValueRef:v,mergedExpandedKeysRef:m,activePathRef:h,mergedClsPrefixRef:t,isHorizontalRef:$(()=>e.mode==="horizontal"),invertedRef:q(e,"inverted"),doSelect:k,toggleExpand:w});function k(N,K){const{"onUpdate:value":y,onUpdateValue:D,onSelect:Y}=e;D&&oe(D,N,K),y&&oe(y,N,K),Y&&oe(Y,N,K),d.value=N}function E(N){const{"onUpdate:expandedKeys":K,onUpdateExpandedKeys:y,onExpandedNamesChange:D,onOpenNamesChange:Y}=e;K&&oe(K,N),y&&oe(y,N),D&&oe(D,N),Y&&oe(Y,N),u.value=N}function w(N){const K=Array.from(m.value),y=K.findIndex(D=>D===N);if(~y)K.splice(y,1);else{if(e.accordion&&s.value.has(N)){const D=K.findIndex(Y=>s.value.has(Y));D>-1&&K.splice(D,1)}K.push(N)}E(K)}const S=N=>{const K=l.value.getPath(N??v.value,{includeSelf:!1}).keyPath;if(!K.length)return;const y=Array.from(m.value),D=new Set([...y,...K]);e.accordion&&s.value.forEach(Y=>{D.has(Y)&&!K.includes(Y)&&D.delete(Y)}),E(Array.from(D))},_=$(()=>{const{inverted:N}=e,{common:{cubicBezierEaseInOut:K},self:y}=n.value,{borderRadius:D,borderColorHorizontal:Y,fontSize:ft,itemHeight:X,dividerColor:_n}=y,z={"--n-divider-color":_n,"--n-bezier":K,"--n-font-size":ft,"--n-border-color-horizontal":Y,"--n-border-radius":D,"--n-item-height":X};return N?(z["--n-group-text-color"]=y.groupTextColorInverted,z["--n-color"]=y.colorInverted,z["--n-item-text-color"]=y.itemTextColorInverted,z["--n-item-text-color-hover"]=y.itemTextColorHoverInverted,z["--n-item-text-color-active"]=y.itemTextColorActiveInverted,z["--n-item-text-color-child-active"]=y.itemTextColorChildActiveInverted,z["--n-item-text-color-child-active-hover"]=y.itemTextColorChildActiveInverted,z["--n-item-text-color-active-hover"]=y.itemTextColorActiveHoverInverted,z["--n-item-icon-color"]=y.itemIconColorInverted,z["--n-item-icon-color-hover"]=y.itemIconColorHoverInverted,z["--n-item-icon-color-active"]=y.itemIconColorActiveInverted,z["--n-item-icon-color-active-hover"]=y.itemIconColorActiveHoverInverted,z["--n-item-icon-color-child-active"]=y.itemIconColorChildActiveInverted,z["--n-item-icon-color-child-active-hover"]=y.itemIconColorChildActiveHoverInverted,z["--n-item-icon-color-collapsed"]=y.itemIconColorCollapsedInverted,z["--n-item-text-color-horizontal"]=y.itemTextColorHorizontalInverted,z["--n-item-text-color-hover-horizontal"]=y.itemTextColorHoverHorizontalInverted,z["--n-item-text-color-active-horizontal"]=y.itemTextColorActiveHorizontalInverted,z["--n-item-text-color-child-active-horizontal"]=y.itemTextColorChildActiveHorizontalInverted,z["--n-item-text-color-child-active-hover-horizontal"]=y.itemTextColorChildActiveHoverHorizontalInverted,z["--n-item-text-color-active-hover-horizontal"]=y.itemTextColorActiveHoverHorizontalInverted,z["--n-item-icon-color-horizontal"]=y.itemIconColorHorizontalInverted,z["--n-item-icon-color-hover-horizontal"]=y.itemIconColorHoverHorizontalInverted,z["--n-item-icon-color-active-horizontal"]=y.itemIconColorActiveHorizontalInverted,z["--n-item-icon-color-active-hover-horizontal"]=y.itemIconColorActiveHoverHorizontalInverted,z["--n-item-icon-color-child-active-horizontal"]=y.itemIconColorChildActiveHorizontalInverted,z["--n-item-icon-color-child-active-hover-horizontal"]=y.itemIconColorChildActiveHoverHorizontalInverted,z["--n-arrow-color"]=y.arrowColorInverted,z["--n-arrow-color-hover"]=y.arrowColorHoverInverted,z["--n-arrow-color-active"]=y.arrowColorActiveInverted,z["--n-arrow-color-active-hover"]=y.arrowColorActiveHoverInverted,z["--n-arrow-color-child-active"]=y.arrowColorChildActiveInverted,z["--n-arrow-color-child-active-hover"]=y.arrowColorChildActiveHoverInverted,z["--n-item-color-hover"]=y.itemColorHoverInverted,z["--n-item-color-active"]=y.itemColorActiveInverted,z["--n-item-color-active-hover"]=y.itemColorActiveHoverInverted,z["--n-item-color-active-collapsed"]=y.itemColorActiveCollapsedInverted):(z["--n-group-text-color"]=y.groupTextColor,z["--n-color"]=y.color,z["--n-item-text-color"]=y.itemTextColor,z["--n-item-text-color-hover"]=y.itemTextColorHover,z["--n-item-text-color-active"]=y.itemTextColorActive,z["--n-item-text-color-child-active"]=y.itemTextColorChildActive,z["--n-item-text-color-child-active-hover"]=y.itemTextColorChildActiveHover,z["--n-item-text-color-active-hover"]=y.itemTextColorActiveHover,z["--n-item-icon-color"]=y.itemIconColor,z["--n-item-icon-color-hover"]=y.itemIconColorHover,z["--n-item-icon-color-active"]=y.itemIconColorActive,z["--n-item-icon-color-active-hover"]=y.itemIconColorActiveHover,z["--n-item-icon-color-child-active"]=y.itemIconColorChildActive,z["--n-item-icon-color-child-active-hover"]=y.itemIconColorChildActiveHover,z["--n-item-icon-color-collapsed"]=y.itemIconColorCollapsed,z["--n-item-text-color-horizontal"]=y.itemTextColorHorizontal,z["--n-item-text-color-hover-horizontal"]=y.itemTextColorHoverHorizontal,z["--n-item-text-color-active-horizontal"]=y.itemTextColorActiveHorizontal,z["--n-item-text-color-child-active-horizontal"]=y.itemTextColorChildActiveHorizontal,z["--n-item-text-color-child-active-hover-horizontal"]=y.itemTextColorChildActiveHoverHorizontal,z["--n-item-text-color-active-hover-horizontal"]=y.itemTextColorActiveHoverHorizontal,z["--n-item-icon-color-horizontal"]=y.itemIconColorHorizontal,z["--n-item-icon-color-hover-horizontal"]=y.itemIconColorHoverHorizontal,z["--n-item-icon-color-active-horizontal"]=y.itemIconColorActiveHorizontal,z["--n-item-icon-color-active-hover-horizontal"]=y.itemIconColorActiveHoverHorizontal,z["--n-item-icon-color-child-active-horizontal"]=y.itemIconColorChildActiveHorizontal,z["--n-item-icon-color-child-active-hover-horizontal"]=y.itemIconColorChildActiveHoverHorizontal,z["--n-arrow-color"]=y.arrowColor,z["--n-arrow-color-hover"]=y.arrowColorHover,z["--n-arrow-color-active"]=y.arrowColorActive,z["--n-arrow-color-active-hover"]=y.arrowColorActiveHover,z["--n-arrow-color-child-active"]=y.arrowColorChildActive,z["--n-arrow-color-child-active-hover"]=y.arrowColorChildActiveHover,z["--n-item-color-hover"]=y.itemColorHover,z["--n-item-color-active"]=y.itemColorActive,z["--n-item-color-active-hover"]=y.itemColorActiveHover,z["--n-item-color-active-collapsed"]=y.itemColorActiveCollapsed),z}),x=o?ye("menu",$(()=>e.inverted?"a":"b"),_,e):void 0,H=Fo(),R=F(null),P=F(null);let V=!0;const B=()=>{var N;V?V=!1:(N=R.value)===null||N===void 0||N.sync({showAllItemsBeforeCalculate:!0})};function G(){return document.getElementById(H)}const L=F(-1);function I(N){L.value=e.options.length-N}function W(N){N||(L.value=-1)}const M=$(()=>{const N=L.value;return{children:N===-1?[]:e.options.slice(N)}}),U=$(()=>{const{childrenField:N,disabledField:K,keyField:y}=e;return Je([M.value],{getIgnored(D){return Rt(D)},getChildren(D){return D[N]},getDisabled(D){return D[K]},getKey(D){var Y;return(Y=D[y])!==null&&Y!==void 0?Y:D.name}})}),te=$(()=>Je([{}]).treeNodes[0]);function Q(){var N;if(L.value===-1)return f(Ft,{root:!0,level:0,key:"__ellpisisGroupPlaceholder__",internalKey:"__ellpisisGroupPlaceholder__",title:"···",tmNode:te.value,domId:H,isEllipsisPlaceholder:!0});const K=U.value.treeNodes[0],y=h.value,D=!!(!((N=K.children)===null||N===void 0)&&N.some(Y=>y.includes(Y.key)));return f(Ft,{level:0,root:!0,key:"__ellpisisGroup__",internalKey:"__ellpisisGroup__",title:"···",virtualChildActive:D,tmNode:K,domId:H,rawNodes:K.rawNode.children||[],tmNodes:K.children||[],isEllipsisPlaceholder:!0})}return{mergedClsPrefix:t,controlledExpandedKeys:g,uncontrolledExpanededKeys:u,mergedExpandedKeys:m,uncontrolledValue:d,mergedValue:v,activePath:h,tmNodes:p,mergedTheme:n,mergedCollapsed:i,cssVars:o?void 0:_,themeClass:x==null?void 0:x.themeClass,overflowRef:R,counterRef:P,updateCounter:()=>{},onResize:B,onUpdateOverflow:W,onUpdateCount:I,renderCounter:Q,getCounter:G,onRender:x==null?void 0:x.onRender,showOption:S,deriveResponsiveState:B}},render(){const{mergedClsPrefix:e,mode:t,themeClass:o,onRender:n}=this;n==null||n();const r=()=>this.tmNodes.map(a=>no(a,this.$props)),l=t==="horizontal"&&this.responsive,s=()=>f("div",je(this.$attrs,{role:t==="horizontal"?"menubar":"menu",class:[`${e}-menu`,o,`${e}-menu--${t}`,l&&`${e}-menu--responsive`,this.mergedCollapsed&&`${e}-menu--collapsed`],style:this.cssVars}),l?f(Xr,{ref:"overflowRef",onUpdateOverflow:this.onUpdateOverflow,getCounter:this.getCounter,onUpdateCount:this.onUpdateCount,updateCounter:this.updateCounter,style:{width:"100%",display:"flex",overflow:"hidden"}},{default:r,counter:this.renderCounter}):r());return l?f(wr,{onResize:this.onResize},{default:s}):s()}}),Xa=A([A("@keyframes spin-rotate",`
 from {
 transform: rotate(0);
 }
 to {
 transform: rotate(360deg);
 }
 `),C("spin-container",`
 position: relative;
 `,[C("spin-body",`
 position: absolute;
 top: 50%;
 left: 50%;
 transform: translateX(-50%) translateY(-50%);
 `,[Cr()])]),C("spin-body",`
 display: inline-flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;
 `),C("spin",`
 display: inline-flex;
 height: var(--n-size);
 width: var(--n-size);
 font-size: var(--n-size);
 color: var(--n-color);
 `,[T("rotate",`
 animation: spin-rotate 2s linear infinite;
 `)]),C("spin-description",`
 display: inline-block;
 font-size: var(--n-font-size);
 color: var(--n-text-color);
 transition: color .3s var(--n-bezier);
 margin-top: 8px;
 `),C("spin-content",`
 opacity: 1;
 transition: opacity .3s var(--n-bezier);
 pointer-events: all;
 `,[T("spinning",`
 user-select: none;
 -webkit-user-select: none;
 pointer-events: none;
 opacity: var(--n-opacity-spinning);
 `)])]),Za={small:20,medium:18,large:16},Ja=Object.assign(Object.assign({},J.props),{contentClass:String,contentStyle:[Object,String],description:String,stroke:String,size:{type:[String,Number],default:"medium"},show:{type:Boolean,default:!0},strokeWidth:Number,rotate:{type:Boolean,default:!0},spinning:{type:Boolean,validator:()=>!0,default:void 0},delay:Number}),Qa=j({name:"Spin",props:Ja,slots:Object,setup(e){const{mergedClsPrefixRef:t,inlineThemeDisabled:o}=pe(e),n=J("Spin","-spin",Xa,Aa,e,t),r=$(()=>{const{size:a}=e,{common:{cubicBezierEaseInOut:d},self:c}=n.value,{opacitySpinning:v,color:u,textColor:b}=c,g=typeof a=="number"?Sr(a):c[be("size",a)];return{"--n-bezier":d,"--n-opacity-spinning":v,"--n-size":g,"--n-color":u,"--n-text-color":b}}),i=o?ye("spin",$(()=>{const{size:a}=e;return typeof a=="number"?String(a):a[0]}),r,e):void 0,l=jt(e,["spinning","show"]),s=F(!1);return Fe(a=>{let d;if(l.value){const{delay:c}=e;if(c){d=window.setTimeout(()=>{s.value=!0},c),a(()=>{clearTimeout(d)});return}}s.value=l.value}),{mergedClsPrefix:t,active:s,mergedStrokeWidth:$(()=>{const{strokeWidth:a}=e;if(a!==void 0)return a;const{size:d}=e;return Za[typeof d=="number"?"medium":d]}),cssVars:o?void 0:r,themeClass:i==null?void 0:i.themeClass,onRender:i==null?void 0:i.onRender}},render(){var e,t;const{$slots:o,mergedClsPrefix:n,description:r}=this,i=o.icon&&this.rotate,l=(r||o.description)&&f("div",{class:`${n}-spin-description`},r||((e=o.description)===null||e===void 0?void 0:e.call(o))),s=o.icon?f("div",{class:[`${n}-spin-body`,this.themeClass]},f("div",{class:[`${n}-spin`,i&&`${n}-spin--rotate`],style:o.default?"":this.cssVars},o.icon()),l):f("div",{class:[`${n}-spin-body`,this.themeClass]},f(ir,{clsPrefix:n,style:o.default?"":this.cssVars,stroke:this.stroke,"stroke-width":this.mergedStrokeWidth,class:`${n}-spin`}),l);return(t=this.onRender)===null||t===void 0||t.call(this),o.default?f("div",{class:[`${n}-spin-container`,this.themeClass],style:this.cssVars},f("div",{class:[`${n}-spin-content`,this.active&&`${n}-spin-content--spinning`,this.contentClass],style:this.contentStyle},o),f(De,{name:"fade-in-transition"},{default:()=>this.active?s:null})):s}}),es={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},qe=j({name:"BookOutline",render:function(t,o){return We(),st("svg",es,o[0]||(o[0]=[ve("path",{d:"M256 160c16-63.16 76.43-95.41 208-96a15.94 15.94 0 0 1 16 16v288a16 16 0 0 1-16 16c-128 0-177.45 25.81-208 64c-30.37-38-80-64-208-64c-9.88 0-16-8.05-16-17.93V80a15.94 15.94 0 0 1 16-16c131.57.59 192 32.84 208 96z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),ve("path",{fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32",d:"M256 160v288"},null,-1)]))}}),ts={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},os=j({name:"NotificationsOutline",render:function(t,o){return We(),st("svg",ts,o[0]||(o[0]=[ve("path",{d:"M427.68 351.43C402 320 383.87 304 383.87 217.35C383.87 138 343.35 109.73 310 96c-4.43-1.82-8.6-6-9.95-10.55C294.2 65.54 277.8 48 256 48s-38.21 17.55-44 37.47c-1.35 4.6-5.52 8.71-9.95 10.53c-33.39 13.75-73.87 41.92-73.87 121.35C128.13 304 110 320 84.32 351.43C73.68 364.45 83 384 101.61 384h308.88c18.51 0 27.77-19.61 17.19-32.57z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),ve("path",{d:"M320 384v16a64 64 0 0 1-128 0v-16",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1)]))}}),ns={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},Mo=j({name:"PersonOutline",render:function(t,o){return We(),st("svg",ns,o[0]||(o[0]=[ve("path",{d:"M344 144c-3.92 52.87-44 96-88 96s-84.15-43.12-88-96c-4-55 35-96 88-96s92 42 88 96z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1),ve("path",{d:"M256 304c-87 0-175.3 48-191.64 138.6C62.39 453.52 68.57 464 80 464h352c11.44 0 17.62-10.48 15.65-21.4C431.3 352 343 304 256 304z",fill:"none",stroke:"currentColor","stroke-miterlimit":"10","stroke-width":"32"},null,-1)]))}}),rs={xmlns:"http://www.w3.org/2000/svg","xmlns:xlink":"http://www.w3.org/1999/xlink",viewBox:"0 0 512 512"},is=j({name:"SettingsOutline",render:function(t,o){return We(),st("svg",rs,o[0]||(o[0]=[ve("path",{d:"M262.29 192.31a64 64 0 1 0 57.4 57.4a64.13 64.13 0 0 0-57.4-57.4zM416.39 256a154.34 154.34 0 0 1-1.53 20.79l45.21 35.46a10.81 10.81 0 0 1 2.45 13.75l-42.77 74a10.81 10.81 0 0 1-13.14 4.59l-44.9-18.08a16.11 16.11 0 0 0-15.17 1.75A164.48 164.48 0 0 1 325 400.8a15.94 15.94 0 0 0-8.82 12.14l-6.73 47.89a11.08 11.08 0 0 1-10.68 9.17h-85.54a11.11 11.11 0 0 1-10.69-8.87l-6.72-47.82a16.07 16.07 0 0 0-9-12.22a155.3 155.3 0 0 1-21.46-12.57a16 16 0 0 0-15.11-1.71l-44.89 18.07a10.81 10.81 0 0 1-13.14-4.58l-42.77-74a10.8 10.8 0 0 1 2.45-13.75l38.21-30a16.05 16.05 0 0 0 6-14.08c-.36-4.17-.58-8.33-.58-12.5s.21-8.27.58-12.35a16 16 0 0 0-6.07-13.94l-38.19-30A10.81 10.81 0 0 1 49.48 186l42.77-74a10.81 10.81 0 0 1 13.14-4.59l44.9 18.08a16.11 16.11 0 0 0 15.17-1.75A164.48 164.48 0 0 1 187 111.2a15.94 15.94 0 0 0 8.82-12.14l6.73-47.89A11.08 11.08 0 0 1 213.23 42h85.54a11.11 11.11 0 0 1 10.69 8.87l6.72 47.82a16.07 16.07 0 0 0 9 12.22a155.3 155.3 0 0 1 21.46 12.57a16 16 0 0 0 15.11 1.71l44.89-18.07a10.81 10.81 0 0 1 13.14 4.58l42.77 74a10.8 10.8 0 0 1-2.45 13.75l-38.21 30a16.05 16.05 0 0 0-6.05 14.08c.33 4.14.55 8.3.55 12.47z",fill:"none",stroke:"currentColor","stroke-linecap":"round","stroke-linejoin":"round","stroke-width":"32"},null,-1)]))}}),ls={class:"flex items-center gap-4"},as=j({__name:"PageLayoutView",setup(e){const t=lr(),o=ar(),n=vr(),r=F(!1),i=[{label:"首页",key:"/home",icon:()=>f(qe,null,{default:()=>f(qe)})},{label:"仪器管理",key:"/instrument",icon:()=>f(qe,null,{default:()=>f(Mo)}),children:[{label:"开机自检",key:"/powercheck"},{label:"仪器配置",key:"/instrumentconfig"},{label:"自动进样器配置",key:"/autolabconfig",children:[{label:"进样器参数盘配置",key:"/autolabconfig-1"}]},{label:"仪器校准",key:"/instrumentcalibration"},{label:"仪器使用统计详情",key:"/instrumentstatistics",children:[{label:"检测任务详细信息",key:"/instrumentstatistics-1"}]},{label:"仪器使用记录详情",key:"/instrumentrecord"}]},{label:"仪器管理",key:"/instrument",icon:()=>f(qe,null,{default:()=>f(Mo)}),children:[{label:"开机自检",key:"/powercheck"},{label:"仪器配置",key:"/instrumentconfig"},{label:"自动进样器配置",key:"/autolabconfig",children:[{label:"进样器参数盘配置",key:"/autolabconfig-1"}]},{label:"仪器校准",key:"/instrumentcalibration"},{label:"仪器使用统计详情",key:"/instrumentstatistics",children:[{label:"检测任务详细信息",key:"/instrumentstatistics-1"}]},{label:"仪器使用记录详情",key:"/instrumentrecord"}]}];console.log(t.getRoutes(),"route"),$(()=>o.matched.map(s=>s.meta.title||s.name));const l=s=>{console.log(s,"key"),t.push({name:s})};return(s,a)=>{const d=xn,c=Ir,v=ta,u=Ea,b=qa,g=Fa,m=sr("router-view"),p=Qa,h=Oa;return We(),dr(h,{style:{height:"100vh"}},{default:ae(()=>[ie(u,{class:"layout-header",bordered:""},{default:ae(()=>[a[2]||(a[2]=ve("div",{class:"h-full flex items-center"},[ve("img",{src:hr,alt:"Logo",class:"h-8"})],-1)),ve("div",ls,[ie(v,{value:5,dot:""},{default:ae(()=>[ie(c,{circle:""},{icon:ae(()=>[ie(d,{size:"20"},{default:ae(()=>[ie(ht(os))]),_:1})]),_:1})]),_:1}),ie(c,{circle:""},{icon:ae(()=>[ie(d,{size:"20"},{default:ae(()=>[ie(ht(is))]),_:1})]),_:1})])]),_:1,__:[2]}),ie(h,{position:"absolute",style:{top:"60px",bottom:"0px"},"has-sider":""},{default:ae(()=>[ie(g,{"native-scrollbar":!1,bordered:"","collapse-mode":"width","collapsed-width":64,width:240,collapsed:r.value,"show-trigger":"",class:"h-full transition-all duration-300",onCollapse:a[0]||(a[0]=k=>r.value=!0),onExpand:a[1]||(a[1]=k=>r.value=!1)},{default:ae(()=>[ie(b,{options:i,collapsed:r.value,"collapsed-width":64,"collapsed-icon-size":20,"onUpdate:value":l},null,8,["collapsed"])]),_:1},8,["collapsed"]),ie(h,{"content-style":"padding: 24px;","native-scrollbar":!1},{default:ae(()=>[ie(p,{size:"large",show:ht(n).isLoading},{default:ae(()=>[ie(De,{name:"fade-slide",mode:"out-in",appear:""},{default:ae(()=>[ie(m)]),_:1})]),_:1},8,["show"])]),_:1})]),_:1})]),_:1})}}}),hs=zr(as,[["__scopeId","data-v-0493727b"]]);export{hs as default};
