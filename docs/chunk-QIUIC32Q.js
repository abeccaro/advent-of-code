import"./chunk-B2MOJN65.js";var m=()=>{function i(s,n){let r=s.split(`
`).map(e=>e.split("x").map(o=>parseInt(o,10))),t=0;for(let[e,o,c]of r)t+=n(e,o,c);return t}function a(s){return i(s,(n,r,t)=>{let e=n*r,o=r*t,c=n*t;return 2*(e+o+c)+Math.min(e,o,c)})}function u(s){return i(s,(n,r,t)=>2*(n+r+t-Math.max(n,r,t))+n*r*t)}};export{m as solver};
