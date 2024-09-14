import"./chunk-B2MOJN65.js";var l=()=>{let e;function f(t,o){let n=t.reduce((s,u)=>s+u)/o;e=1/0;let r=c([],t,0,n);return Math.min(...r.map(s=>s.reduce((u,p)=>u*p)))}function c(t,o,n,r){if(n===r)return e=Math.min(e,t.length),[t];if(n>r||o.length===0||t.length>=e)return[];let s=[];for(let u of o){let p=c([...t,u],o.slice(1+o.findIndex(i=>i===u)),n+u,r);p&&s.push(...p)}return s}function m(t){let o=t.split(`
`).map(n=>parseInt(n,10)).sort((n,r)=>n-r);return f(o,3)}function d(t){let o=t.split(`
`).map(n=>parseInt(n,10)).sort((n,r)=>n-r);return f(o,4)}};export{l as solver};
