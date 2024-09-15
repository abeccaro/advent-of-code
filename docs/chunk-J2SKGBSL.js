import"./chunk-B2MOJN65.js";var o=()=>{importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);function a(t){return t.split(`
`).filter(e=>/([aeiou]).*([aeiou]).*([aeiou])/.exec(e)&&/([a-z])(\1)/.exec(e)&&!/ab|cd|pq|xy/.exec(e)).length}function n(t){return t.split(`
`).filter(e=>/([a-z])[a-z](\1)/.exec(e)&&/([a-z]{2}).*(\1)/.exec(e)).length}(void 0).onmessage=t=>calculate(a,n,t.data)};export{o as solver};
