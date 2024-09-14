import"./chunk-B2MOJN65.js";var t=()=>{function a(e,c){let r=0;for(;r>=0&&r<c.length;){let[p,...n]=c[r].split(" ").map(l=>l.replaceAll(",",""));switch(p){case"hlf":{e[n[0]]=Math.floor(e[n[0]]/2),r++;break}case"tpl":{e[n[0]]*=3,r++;break}case"inc":{e[n[0]]+=1,r++;break}case"jmp":{r+=parseInt(n[0],10);break}case"jie":{r+=e[n[0]]%2===0?parseInt(n[1],10):1;break}case"jio":{r+=e[n[0]]===1?parseInt(n[1],10):1;break}}}return e}function i(e){return a({a:0,b:0},e.split(`
`)).b}function o(e){return a({a:1,b:0},e.split(`
`)).b}};export{t as solver};
