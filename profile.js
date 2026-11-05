/* Source unique pour les quatre fiches : même structure et même comportement */
const characters={
 chayah:{name:"CHAYAH VEHUHIA",short:"CHAYAH",title:"LE RÉÉCRIVAIN",kind:"ENTITÉ / 001",accent:"#d84b67",image:"chayah-exact-capture.png",intro:"Divinité capable de réécrire les lois du réel, et meilleur ami d'AETHER.",story:"CHAYAH choisit de vivre au rythme des humains malgré sa puissance. Imprévisible et indépendant, il est profondément attaché à MAILEIZ, mais hésite encore à s'engager.",traits:["Réécriture du réel","Void Step","Création divine","Libre arbitre"],relation:"AETHER : meilleur ami et égal en dignité. MAILEIZ : amour réciproque, engagement incertain."},
 aether:{name:"AETHER",short:"AETHER",title:"L'ARCHIVISTE",kind:"ENTITÉ / 002",accent:"#66c3e6",image:"aether-exact-capture.png",intro:"Divinité indépendante, réfléchi et stratégique, meilleur ami de CHAYAH.",story:"AETHER partage une amitié profonde avec CHAYAH, sans être son serviteur ni son subordonné. Sa loyauté n'empêche ni les désaccords ni la liberté de ses propres choix.",traits:["Analyse dimensionnelle","Archives des réalités","Architecture d'énergie","Libre arbitre"],relation:"CHAYAH : meilleurs amis, deux divinités indépendantes et égales en dignité."},
 maileiz:{name:"MAILEIZ",short:"MAILEIZ",title:"LA FLAMME ÉCARLATE",kind:"PERSONNAGE / 003 — MORTELLE",accent:"#f06e62",image:"Guerrière de feu dans les ruines en flammes.png",intro:"Guerrière mortelle de DIVINE SHADOW, passionnée, déterminée, maîtresse de la Pyro-Genesis.",story:"MAILEIZ est mortelle : ses flammes ne la rendent ni immortelle ni invulnérable. Elle aime CHAYAH sans renoncer à sa volonté propre. CHAYAH partage ses sentiments, mais hésite à s'engager.",traits:["Pyro-Genesis","Maîtrise des flammes","Mortelle","Libre arbitre"],relation:"CHAYAH : amour réciproque et engagement non établi."},
 seraphyra:{name:"SERAPHYRA",short:"SERAPHYRA",title:"LA SILENCIEUSE",kind:"DIVINITÉ / 004",accent:"#b79cdb",image:"Image ChatGPT 5 nov. 2026, 17_14_06.png",intro:"Une divinité de la famille céleste de CHAYAH, à la courtoisie impeccable.",story:"SERAPHYRA appartient à la même famille divine que CHAYAH, sans parenté biologique. Elle dissimule certaines émotions et garde ses distances en public. Son histoire et ses pouvoirs exacts restent sous l'autorité du créateur.",traits:["Nature divine","Pouvoirs à définir","Indépendance","Libre arbitre"],relation:"Ses relations restent complexes. Les autres personnages n'ont pas automatiquement accès à ses secrets."}
};
const key=document.body.dataset.character;const p=characters[key]||characters.chayah;
document.documentElement.style.setProperty("--accent",p.accent);
const $=id=>document.getElementById(id);
$("profile-kind").textContent=p.kind;$("profile-name").textContent=p.short;$("profile-title").textContent=p.title;
$("profile-intro").textContent=p.intro;$("profile-story").textContent=p.story;$("profile-relations").textContent=p.relation;
$("profile-image").src="./assets/"+encodeURIComponent(p.image);$("profile-image").alt="Portrait de "+p.name;
$("profile-attributes").replaceChildren(...p.traits.map(v=>{const e=document.createElement("span");e.textContent=v;return e}));
document.title=p.name+" — DIVINE SHADOW";
const nav=document.querySelector("#links"),menu=document.querySelector("#menu");
menu.addEventListener("click",()=>{const opened=nav.classList.toggle("open");menu.setAttribute("aria-expanded",String(opened))});
nav.querySelectorAll("a").forEach(a=>a.addEventListener("click",()=>{nav.classList.remove("open");menu.setAttribute("aria-expanded","false")}));
