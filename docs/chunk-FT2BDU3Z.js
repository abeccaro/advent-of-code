import"./chunk-B2MOJN65.js";var u=()=>{function o(e){let t=[];for(let n=0;n<1e3;n++)t.push(new Array(1e3).fill(e));return t}function l(e){return e.split(`
`).map(t=>{t=t.replace("turn ","turn_");let n=t.split(" ");return{description:n[0],rangeStart:n[1].split(",").map(r=>parseInt(r,10)),rangeEnd:n[3].split(",").map(r=>parseInt(r,10))}})}function f(e,t,n){for(let r=e.rangeStart[0];r<=e.rangeEnd[0];r++)for(let s=e.rangeStart[1];s<=e.rangeEnd[1];s++)t[r][s]=n(e.description,t[r][s])}function p(e){let t=o(!1);l(e).forEach(r=>f(r,t,(s,a)=>s==="toggle"?!a:r.description==="turn_on"));let n=0;return t.forEach(r=>n+=r.filter(Boolean).length),n}function i(e){let t=o(0);l(e).forEach(r=>f(r,t,(s,a)=>s==="turn_off"?Math.max(0,a-1):a+(s==="toggle"?2:1)));let n=0;return t.forEach(r=>r.forEach(s=>n+=s)),n}};export{u as solver};
