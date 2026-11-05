/* DIVINE SHADOW — accueil. Les fiches sont désormais des pages, pas des fenêtres modales. */
const menu=document.querySelector("#menu"),links=document.querySelector("#links");
if(menu&&links){menu.addEventListener("click",()=>{const open=links.classList.toggle("open");menu.setAttribute("aria-expanded",String(open))});links.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{links.classList.remove("open");menu.setAttribute("aria-expanded","false")}))}
const lines=[
 [["CHAYAH VEHUHIA","« Tu analyses encore ? Moi, j’allais improviser. »"],["AETHER","« C’est précisément ce qui rend ton existence statistiquement inquiétante. »"]],
 [["CHAYAH VEHUHIA","« Si je change les règles, est-ce que ça compte comme tricher ? »"],["AETHER","« Seulement si tu prétends ensuite avoir gagné honnêtement. »"]],
 [["CHAYAH VEHUHIA","« Et si on sauvait le monde avant le déjeuner ? »"],["AETHER","« Ton calendrier est presque aussi irréaliste que tes pouvoirs. »"]]
];
let index=0;const next=document.querySelector("#next-dialogue");if(next)next.addEventListener("click",()=>{index=(index+1)%lines.length;document.querySelectorAll(".dialogue div").forEach((el,i)=>{el.querySelector("span").textContent=lines[index][i][0];el.querySelector("p").textContent=lines[index][i][1]})});const year=document.querySelector("#year");if(year)year.textContent=new Date().getFullYear();
