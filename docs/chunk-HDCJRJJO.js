import"./chunk-B2MOJN65.js";var c=()=>{importScripts(`${self.location.origin}/workers/message-manager.js`);function e(t){let n=t.split(`
`),s=n.join("").length,r=n.map(a=>a.replaceAll(/\\{2}|\\"|\\x.{2}/g,"#")).join("").length-2*n.length;return s-r}function o(t){}(void 0).onmessage=t=>calculate(e,o,t.data)};export{c as solver};
