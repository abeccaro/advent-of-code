import"./chunk-B2MOJN65.js";var u=()=>{importScripts(`${self.location.origin}/workers/message-manager.js`);function i(e){let[a,n]=e.split(`
`).map(r=>parseInt(r.split(":")[1],10));return{playerHp:50,playerMana:500,bossHp:a,bossDamage:n,manaSpent:0,shield:0,poison:0,recharge:0}}function l(e){let a=[];return e.playerMana>53&&a.push({name:"Magic Missile",cost:53}),e.playerMana>73&&a.push({name:"Drain",cost:73}),e.playerMana>113&&e.shield<=0&&a.push({name:"Shield",cost:113}),e.playerMana>173&&e.poison<=0&&a.push({name:"Poison",cost:173}),e.playerMana>229&&e.recharge<=0&&a.push({name:"Recharge",cost:229}),a}function o(e,a=!1){let n=[e],r=1/0;for(let s=n.shift();s;s=n.shift()){if(s.manaSpent>r||s.playerHp<=0)continue;if(p(s),s.bossHp<=0){r=Math.min(s.manaSpent,r);continue}let m=l(s);for(let g of m){let c=f(s,g);a&&c.playerHp--,n.push(c)}}return r}function f(e,a){let n=Object.assign({},e);switch(n.playerMana-=a.cost,n.manaSpent+=a.cost,a.name){case"Magic Missile":{n.bossHp-=4;break}case"Drain":{n.bossHp-=2,n.playerHp+=2;break}case"Shield":{n.shield=6;break}case"Poison":{n.poison=6;break}case"Recharge":{n.recharge=5;break}}return p(n),n.bossHp<=0||(n.playerHp-=Math.max(1,n.bossDamage-(n.shield>0?7:0))),n}function p(e){e.poison>0&&(e.bossHp-=3),e.recharge>0&&(e.playerMana+=101),e.shield--,e.poison--,e.recharge--}function h(e){return o(i(e))}function t(e){return o(i(e),!0)}(void 0).onmessage=e=>calculate(h,t,e.data)};export{u as solver};
