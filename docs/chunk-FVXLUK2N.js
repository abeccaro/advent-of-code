import"./chunk-B2MOJN65.js";var l=()=>{importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);function c(e){let n=e.split(`
`),t=n.join("").length,s=n.map(o=>o.replaceAll(/\\{2}|\\"|\\x.{2}/g,"#")).join("").length-2*n.length;return t-s}function r(e){let n=e.split(`
`),t=n.join("").length;return n.map(o=>`"${o.replaceAll(/([\\"])/g,"##")}"`).join("").length-t}(void 0).onmessage=e=>calculate(c,r,e.data)};export{l as solver};
