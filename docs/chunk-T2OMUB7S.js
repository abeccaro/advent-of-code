import"./chunk-B2MOJN65.js";var l=()=>{importScripts(`${self.location.origin}/advent-of-code/workers/message-manager.js`);function p(e,t){let n=JSON.parse(JSON.stringify(e));for(let s=0;s<n.length;s++)for(let u=0;u<n[s].length;u++){let a=m(e,s,u,t);n[s][u]=a===3||a===2&&e[s][u]}return n}function m(e,t,n,s){return[n>0&&t>0&&e[t-1][n-1],t>0&&e[t-1][n],n<s-1&&t>0&&e[t-1][n+1],n>0&&e[t][n-1],n<s-1&&e[t][n+1],n>0&&t<s-1&&e[t+1][n-1],t<s-1&&e[t+1][n],n<s-1&&t<s-1&&e[t+1][n+1]].map(Number).reduce((u,a)=>u+a)}function f(e){return e.reduce((t,n)=>t+n.reduce((s,u)=>s+Number(u),0),0)}function r(e,t){e[0][0]=!0,e[0][t-1]=!0,e[t-1][0]=!0,e[t-1][t-1]=!0}function c(e){let t=e.split(`
`).map(n=>n.split("").map(s=>s==="#"));for(let n=0;n<100;n++)t=p(t,t.length);return f(t)}function h(e){let t=e.split(`
`).map(s=>s.split("").map(u=>u==="#")),n=t.length;r(t,n);for(let s=0;s<100;s++)t=p(t,n),r(t,n);return f(t)}(void 0).onmessage=e=>calculate(c,h,e.data)};export{l as solver};
