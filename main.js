(()=>{"use strict";class t{#t;#e;constructor(){this.#t=this.#s(),this.#e=null,this.ships=[]}#s(){return new Array(10).fill().map((()=>new Array(10).fill("empty")))}placeShip(t,e){e.some((([t,e])=>"empty"!==this.#t[t][e]))||(e.forEach((([e,s])=>this.#t[e][s]=t.class)),this.ships.push(t))}receiveAttack(t){const[e,s]=t;if("empty"===this.#t[e][s])return this.#t[e][s]="miss",void(this.#e=!1);for(const t of this.ships)if(this.#t[e][s]===t.class){const i=`!${t.class}`;this.#t[e][s]=i,this.#e=!0,t.hit()}}isAllShipsSunk(){return this.ships.every((t=>t.isSunk()))}get remainingShips(){return this.ships.filter((t=>!t.isSunk())).length}get isShipHit(){return this.#e}get board(){return this.#t}}class e{constructor(t,e){this.name=t,this.gameboard=e}}class s{constructor(t,e){this.size=t,this.hits=0,this.class=e}hit(){this.isSunk()||this.hits++}isSunk(){return this.size===this.hits}}const i=[{class:"Carrier",size:5},{class:"Battleship",size:4},{class:"Destroyer",size:3},{class:"Submarine",size:3},{class:"Patrol Boat",size:2}],r=new class{#i;#r;#a;#n;constructor(){this.#i=[],this.#r=null,this.#a=!1,this.#n=null}setPlayer(t){2!==this.#i.length&&(this.#i.push(t),this.#o(t))}reset(){this.#i=[],this.#r=null,this.#a=!1,this.#n=null}#o(t){this.#i.length>1||(this.#r=t)}#l(){this.#r=this.#r===this.#i[0]?this.#i[1]:this.#i[0]}playTurn(t){const e=this.#r===this.#i[0]?this.#i[1]:this.#i[0];e.gameboard.receiveAttack(t),this.#h(e.name),this.#c(this.#r.gameboard.isAllShipsSunk()),this.#l()}#h(t){this.#n=t}#c(t){this.#a=t}get activePlayer(){return this.#r}get winner(){return this.#a?this.#n:null}get isGameOver(){return this.#a}},a={player:o(),computer:o()};function n(t,s){return new e(t,s)}function o(){return new t}function l(t){return t.map((t=>new s(t.size,t.class)))}function h(t,e){const s=function(t,e){const s=c(10),i=[];for(const t of e){const e=[],[r,a]=p(s,t.size);for(let i=0;i<t.size;i++)r<a?(e.push([r,a+i]),s.delete(`${r}, ${a+i}`)):(e.push([r+i,a]),s.delete(`${r+i}, ${a}`));for(const[t,i]of e)d(s,[t,i]);i.push(e)}return i}(0,e);for(let i=0;i<s.length;i++)t.placeShip(e[i],s[i])}function c(t){const e=new Map;for(let s=0;s<t*t;s++){const[i,r]=[s%t,Math.floor(s/t)];e.set(`${i}, ${r}`,[i,r])}return e}function u(t){const e=Array.from(t.values());return e[Math.floor(Math.random()*e.length)]}function p(t,e,s){let i,r;do{[i,r]=u(t)}while(!t.has(`${i+e}, ${r}`)||!t.has(`${i}, ${r+e}`));return[i,r]}function d(t,e){const s=function(t,e){const s=[[-1,0],[1,0],[0,-1],[0,1]],i=[];for(const r of s){const[s,a]=[r[0]+e[0],r[1]+e[1]];t.has(`${s}, ${a}`)&&i.push([s,a])}return i}(t,e);for(const[e,i]of s)t.delete(`${e}, ${i}`)}h(a.player,l(i)),h(a.computer,l(i));const y=new class{#u;#p;#d;#y;#m;#S;#f;#v;constructor(){this.#u=10,this.#p=c(this.#u),this.#d=[],this.#S=[],this.#y=null,this.#m={isHit:null,position:null},this.#f={previous:null,current:null},this.#v=[["vertical",[-1,0]],["vertical",[1,0]],["horizontal",[0,-1]],["horizontal",[0,1]]]}set isLastAttackHit(t){this.#m.isHit=t}set playersCurrentShipCount(t){this.#f.previous=this.#f.current,this.#f.current=t}get target(){return this.#m.isHit&&(this.#S.push(this.#m.position),this.#g()),this.#P()&&(this.#k(),this.#b()),this.#S.length>1&&this.#A(),this.#d.length?this.#$():this.#w()}reset(){this.#p=c(this.#u),this.#m={isHit:null,position:null},this.#f={previous:null,current:null},this.#b()}#w(){const[t,e]=u(this.#p);return this.#O(t,e),this.#j(t,e),[t,e]}#$(){let[t,e]=this.#d[0][1];for(let s=0;s<this.#d.length&&this.#y;s++)if(this.#d[s][0]===this.#y){[t,e]=this.#d[s][1],this.#d=this.#d.slice(s);break}return this.#O(t,e),this.#j(t,e),this.#d.shift()[1]}#b(){this.#y=null,this.#S=[],this.#d=[]}#O(t,e){this.#p.delete(`${t}, ${e}`)}#k(){for(const t of this.#S)d(this.#p,t)}#A(){const[t,e]=this.#S[0],[s,i]=this.#S[1];for(const[r,[a,n]]of this.#v)if(t-s===a||e-i===n){this.#y=r;break}}#P(){return this.#f.previous>this.#f.current}#j(t,e){this.#m.position=[t,e]}#g(){const[t,e]=this.#m.position;for(const[s,[i,r]]of this.#v)this.#p.has(`${t+i}, ${e+r}`)&&this.#d.push([s,[t+i,e+r]])}};function m(t,e){const s=function(t,e){const s=document.createDocumentFragment();return t.board.forEach(((t,i)=>t.forEach(((t,r)=>{t=t.toLowerCase().replace(" ","-");const a=document.createElement("div");a.dataset.position=`${i}${r}`,"!"===t[0]?a.classList.add("hit"):a.classList.add(t,e,"slot"),s.appendChild(a)})))),s}(t,e);document.querySelector(`.${e}`).appendChild(s)}function S(t){for(;t.firstChild;)t.firstChild.remove()}function f(t){v("#buttons"),v(".popup"),document.querySelector(".winner").textContent=t}function v(t){document.querySelector(t).classList.toggle("hide")}m(a.player,"player"),document.querySelector("#buttons").addEventListener("click",(function(t){if("button"!==t.target.type)return;const e=Object.keys(t.target.dataset)[0];"start"===e&&(m(a.computer,"computer"),function(){const t=n("player",a.player),e=n("computer",a.computer);r.setPlayer(t),r.setPlayer(e),a.player=null,a.computer=null}(),v("#buttons"),v("#computerBoard")),"shuffle"===e&&(a.player=o(),h(a.player,l(i)),S(document.querySelector(".player")),m(a.player,"player")),"restart"===e&&(r.reset(),y.reset(),v(".popup"),v("#computerBoard"),a.player=o(),a.computer=o(),h(a.player,l(i)),h(a.computer,l(i)),S(document.querySelector("#playerBoard")),S(document.querySelector("#computerBoard")),m(a.player,"player"))})),document.querySelector("#computerBoard").addEventListener("click",(function(t){var e;t.target.matches(".slot")&&"player"===r.activePlayer.name&&(e=t.target.dataset.position.split(""),r.playTurn(e),S(document.querySelector("#computerBoard")),m(r.activePlayer.gameboard,"computer"),r.isGameOver&&f(r.winner),r.playTurn(y.target),y.isLastAttackHit=r.activePlayer.gameboard.isShipHit,y.playersCurrentShipCount=r.activePlayer.gameboard.remainingShips,S(document.querySelector("#playerBoard")),m(r.activePlayer.gameboard,"player"),r.isGameOver&&f(r.winner))}))})();
//# sourceMappingURL=main.js.map