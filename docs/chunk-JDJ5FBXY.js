import"./chunk-B2MOJN65.js";var h=()=>{let n="a".charCodeAt(0),a="i".charCodeAt(0),d="l".charCodeAt(0),u="o".charCodeAt(0),s="z".charCodeAt(0)-n+1;function c(t){let e=RegExp(/[ilo]/).exec(t)?.index;return e?t.substring(0,e+1)+new Array(t.length-e-1).fill("z").join(""):t}function i(t){let e=t.split("").map(r=>r.charCodeAt(0));for(let r=e.length-1;r>=0;r--)if(e[r]=(e[r]-n+1)%s+n,e[r]!==n){(e[r]===a||e[r]===d||e[r]===u)&&e[r]++;break}return String.fromCharCode(...e)}function l(t){return!!(RegExp(/abc|bcd|cde|def|efg|fgh|pqr|qrs|rst|stu|tuv|uvw|vwx|wxy|xyz/).exec(t)&&RegExp(/(([a-z])\2.*){2,}/).exec(t))}function o(t){let e=i(t);for(;!l(e);)e=i(e);return e}function f(t){return o(c(t))}function x(t){return o(o(c(t)))}};export{h as solver};
