import"./chunk-B2MOJN65.js";var l=()=>{importScripts(`${self.location.origin}/workers/message-manager.js`);function e(o,t,n){return n<0?[]:t.length===0?n===0?[o]:[]:[...e(o,t.slice(1),n),...e([...o,t[0]],t.slice(1),n-t[0])]}function r(o){let t=0,n=1/0;for(let s of o)s.length<n?(n=s.length,t=1):s.length===n&&t++;return t}function i(o){let t=o.split(`
`).map(n=>parseInt(n,10));return e([],t,150).length}function c(o){let t=o.split(`
`).map(s=>parseInt(s,10)),n=e([],t,150);return r(n)}(void 0).onmessage=o=>calculate(i,c,o.data)};export{l as solver};
