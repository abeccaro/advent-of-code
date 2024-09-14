import"./chunk-B2MOJN65.js";var c=()=>{function r(o,n,t){return t<0?[]:n.length===0?t===0?[o]:[]:[...r(o,n.slice(1),t),...r([...o,n[0]],n.slice(1),t-n[0])]}function u(o){let n=0,t=1/0;for(let s of o)s.length<t?(t=s.length,n=1):s.length===t&&n++;return n}function e(o){let n=o.split(`
`).map(t=>parseInt(t,10));return r([],n,150).length}function i(o){let n=o.split(`
`).map(s=>parseInt(s,10)),t=r([],n,150);return u(t)}};export{c as solver};
