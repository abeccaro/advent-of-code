import"./chunk-B2MOJN65.js";var i=()=>{importScripts(`${self.location.origin}/workers/message-manager.js`);function a(t){return t.split(`
`).filter(e=>/([aeiou]).*([aeiou]).*([aeiou])/.exec(e)&&/([a-z])(\1)/.exec(e)&&!/ab|cd|pq|xy/.exec(e)).length}function r(t){return t.split(`
`).filter(e=>/([a-z])[a-z](\1)/.exec(e)&&/([a-z]{2}).*(\1)/.exec(e)).length}(void 0).onmessage=t=>calculate(a,r,t.data)};export{i as solver};
