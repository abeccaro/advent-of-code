import"./chunk-B2MOJN65.js";var o=()=>{importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`),importScripts("https://cdn.jsdelivr.net/npm/md5-jkmyers@0.0.1/md5.min.js");function r(t,s){let n=1;for(;!md5(`${t}${n}`).startsWith(s);)n++;return n}function e(t){return r(t,"00000")}function i(t){return r(t,"000000")}(void 0).onmessage=t=>calculate(e,i,t.data)};export{o as solver};
