/* Original 2D SVG character stances. Props and pose correspond to each character's actual profession.
   These are concept illustrations, NOT approved canonical portraits. */
(()=>{
"use strict";
const presets={
 command:{pose:"command",prop:"banner",outfit:"armor"},
 captain:{pose:"command",prop:"sword",outfit:"armor"},
 guard:{pose:"defense",prop:"shield",outfit:"armor"},
 archer:{pose:"aim",prop:"bow",outfit:"leather"},
 scout:{pose:"scout",prop:"spear",outfit:"leather"},
 navigator:{pose:"scout",prop:"map",outfit:"travel"},
 courier:{pose:"run",prop:"letter",outfit:"travel"},
 medic:{pose:"heal",prop:"satchel",outfit:"robe"},
 healer:{pose:"heal",prop:"vial",outfit:"robe"},
 crafter:{pose:"work",prop:"hammer",outfit:"leather"},
 scholar:{pose:"read",prop:"book",outfit:"robe"},
 diplomat:{pose:"talk",prop:"scroll",outfit:"robe"},
 merchant:{pose:"talk",prop:"pouch",outfit:"travel"},
 ritual:{pose:"cast",prop:"sigil",outfit:"robe"},
 beast:{pose:"cast",prop:"beast",outfit:"armor"},
 unknown:{pose:"watch",prop:"none",outfit:"travel"}
};
const resolve=(item,category)=>{
 const t=(item.role+" "+item.description).toLowerCase();
 if(/général|générale|commandant|commandante|capitaine des ponts|cheffe des sentinelles|commandement/.test(t))return presets.command;
 if(/maudit|mystique|prélat|serment/.test(t))return presets.ritual;
 if(/meute|monstre/.test(t))return presets.beast;
 if(/archer/.test(t))return presets.archer;
 if(/éclaireur|éclaireuse|navigatrice|frontière|maître des éclaireurs/.test(t))return presets.scout;
 if(/messager/.test(t))return presets.courier;
 if(/médecin|apothicaire|secours|soins/.test(t))return presets.medic;
 if(/forgeron|ingénieur|intendant|réserves/.test(t))return presets.crafter;
 if(/cartographe|archiviste|chroniqueuse|érudit/.test(t))return presets.scholar;
 if(/juge|diplomate|conseil|autorité|tribunal|bienfaitrice/.test(t))return presets.diplomat;
 if(/marchand|banquier|aubergiste/.test(t))return presets.merchant;
 if(/gardien|gardienne|soldat/.test(t))return presets.guard;
 if(/frère|entité|pactes/.test(t))return presets.ritual;
 return category==="enemy"?presets.command:presets.unknown;
};
const gear={
 sword:'<path d="M179 176 L205 85" stroke="#e2e4f3" stroke-width="6"/><path d="M174 150l23 8" stroke="#ba9c69" stroke-width="9"/>',
 banner:'<path d="M189 46v223" stroke="#9d7a6e" stroke-width="7"/><path d="M192 50l-55 1 11 30 44 7z" fill="#a85665" stroke="#dba8a0" stroke-width="2"/>',
 shield:'<path d="M172 153l37 9-5 59-32 18-25-23 0-51z" fill="#354654" stroke="#b8cbd6" stroke-width="5"/><path d="M174 161v64M153 183l52 7" stroke="#d9dae6" stroke-width="4"/>',
 bow:'<path d="M192 82Q144 152 196 250" stroke="#d9b379" stroke-width="5" fill="none"/><path d="M192 82L196 250" stroke="#f6e0be" stroke-width="2"/><path d="M102 167L215 174" stroke="#ccd8de" stroke-width="4"/><path d="M200 168l19 6-19 8" fill="#a6c2cf"/>',
 spear:'<path d="M180 30L167 265" stroke="#b4b7c8" stroke-width="5"/><path d="M180 29l-11 36 23-25-9-18z" fill="#e4e8f5"/>',
 map:'<path d="M74 154l62 12-7 51-62-9z" fill="#e1ca9f" stroke="#7c6650" stroke-width="3"/><path d="M85 174l17 9 19-6m-33 17l18-2" fill="none" stroke="#786f69" stroke-width="2"/>',
 letter:'<path d="M155 127l48 11-8 41-48-10z" fill="#d9c2a4" stroke="#7d5a4e" stroke-width="3"/><path d="M153 135l21 26 25-20" fill="none" stroke="#926d66" stroke-width="2"/>',
 satchel:'<path d="M153 183l51 6-8 48-48-7z" fill="#ead8cb" stroke="#8d6864" stroke-width="3"/><path d="M176 193l-4 28m-10-16l27 3" stroke="#b66a78" stroke-width="6"/>',
 vial:'<path d="M183 132v20l-10 16q11 14 23 0l-10-16v-20z" fill="#7dcab5" stroke="#d5eeef" stroke-width="3"/><path d="M178 130h12" stroke="#e6f4f5" stroke-width="5"/>',
 hammer:'<path d="M182 124l-34 92" stroke="#c4a77e" stroke-width="7"/><path d="M165 108l39 15-9 23-39-15z" fill="#b1b8c1" stroke="#e1e3ea" stroke-width="3"/>',
 book:'<path d="M57 162q31-16 55 10 30-24 57-10v55q-32-12-57 10-26-20-55-10z" fill="#cbbaa1" stroke="#f8e6c9" stroke-width="3"/><path d="M112 171v55M68 180l30 4m25-2l30-4" stroke="#876f6b" stroke-width="2"/>',
 scroll:'<path d="M170 125l29-6 9 75-29 8z" fill="#e9d6b4" stroke="#9d805a" stroke-width="3"/><path d="M178 150l21-4m-20 13l22-5m-20 15l20-5" stroke="#af937c" stroke-width="2"/>',
 pouch:'<path d="M171 175q-15 11-9 40 31 19 47-5-2-22-14-33z" fill="#9d7a56" stroke="#ddc7aa" stroke-width="3"/><path d="M170 184l33 0" stroke="#d6bb9d" stroke-width="4"/>',
 sigil:'<circle cx="182" cy="136" r="36" fill="none" stroke="#bd80ef" stroke-width="3"/><circle cx="182" cy="136" r="26" fill="none" stroke="#e9cdfc" stroke-width="2"/><path d="M182 101l24 51h-48zM146 136h72" fill="none" stroke="#d7aafa" stroke-width="2"/>',
 beast:'<path d="M176 168Q219 108 215 58Q191 107 168 107Q138 82 126 114L157 167z" fill="#623d62" stroke="#cc93c0" stroke-width="3"/><circle cx="197" cy="105" r="4" fill="#fb6f91"/>',
 none:''
};
function arms(p){
 switch(p){
 case "command":return '<path d="M100 137L69 177 58 216" stroke="var(--coat)" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M145 137L171 117 184 65" stroke="var(--coat)" stroke-width="20" stroke-linecap="round" fill="none"/>';
 case "defense":return '<path d="M101 135L78 166 52 193" stroke="var(--coat)" stroke-width="21" stroke-linecap="round"/><path d="M146 136L161 171 169 202" stroke="var(--coat)" stroke-width="20" stroke-linecap="round"/>';
 case "aim":return '<path d="M95 135L126 143 171 165" stroke="var(--coat)" stroke-width="19" stroke-linecap="round" fill="none"/><path d="M144 133L173 116 187 131" stroke="var(--coat)" stroke-width="19" stroke-linecap="round" fill="none"/>';
 case "scout":return '<path d="M100 139L76 156 58 199" stroke="var(--coat)" stroke-width="19" stroke-linecap="round" fill="none"/><path d="M144 136L175 143 178 174" stroke="var(--coat)" stroke-width="19" stroke-linecap="round" fill="none"/>';
 case "run":return '<path d="M93 136L69 155 96 169" stroke="var(--coat)" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M143 132L170 112 189 132" stroke="var(--coat)" stroke-width="19" stroke-linecap="round" fill="none"/>';
 case "heal":return '<path d="M99 136L79 168 117 205" stroke="var(--coat)" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M148 138L173 185 151 214" stroke="var(--coat)" stroke-width="18" stroke-linecap="round" fill="none"/>';
 case "read":return '<path d="M100 140L88 159 106 190" stroke="var(--coat)" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M145 140L149 161 128 189" stroke="var(--coat)" stroke-width="18" stroke-linecap="round" fill="none"/>';
 case "work":return '<path d="M100 135L84 177 120 190" stroke="var(--coat)" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M144 134L175 149 192 127" stroke="var(--coat)" stroke-width="20" stroke-linecap="round" fill="none"/>';
 case "talk":return '<path d="M101 137L75 169 70 201" stroke="var(--coat)" stroke-width="18" stroke-linecap="round" fill="none"/><path d="M146 136L169 117 201 109" stroke="var(--coat)" stroke-width="18" stroke-linecap="round" fill="none"/>';
 case "cast":return '<path d="M102 138L72 108 53 82" stroke="var(--coat)" stroke-width="21" stroke-linecap="round" fill="none"/><path d="M146 138L166 113 183 129" stroke="var(--coat)" stroke-width="21" stroke-linecap="round" fill="none"/>';
 default:return '<path d="M100 137L76 181 79 224" stroke="var(--coat)" stroke-width="20" stroke-linecap="round" fill="none"/><path d="M145 138L171 184 172 216" stroke="var(--coat)" stroke-width="20" stroke-linecap="round" fill="none"/>';
 }
}
function legs(p){
 return p==="run"?'<path d="M109 219L84 258 52 271" stroke="#2d303e" stroke-width="21" stroke-linecap="round" fill="none"/><path d="M139 218L164 251 187 248" stroke="#282936" stroke-width="21" stroke-linecap="round" fill="none"/>':
 p==="heal"?'<path d="M111 222L91 254 57 261" stroke="#35313f" stroke-width="23" stroke-linecap="round" fill="none"/><path d="M141 222L159 257 201 262" stroke="#302f40" stroke-width="21" stroke-linecap="round" fill="none"/>':
 p==="scout"?'<path d="M109 218L89 263 61 272" stroke="#343746" stroke-width="21" stroke-linecap="round" fill="none"/><path d="M139 217L165 241 172 277" stroke="#292a39" stroke-width="21" stroke-linecap="round" fill="none"/>':
 '<path d="M112 217L105 275" stroke="#333344" stroke-width="22" stroke-linecap="round"/><path d="M139 217L148 275" stroke="#282837" stroke-width="22" stroke-linecap="round"/>';
}
window.DS_renderPose=(item,category)=>{
 const preset=resolve(item,category);
 const i=Array.from(item.id).reduce((a,c)=>a+c.charCodeAt(0),0);
 const hue=category==="enemy"?334:category==="civic"?198:32;
 const tone=[hue,(hue+22)%360,(hue+330)%360][i%3];
 const robe=preset.outfit==="robe";
 const coat=robe?'#4b405c':category==="enemy"?'#45313d':category==="civic"?'#3d5261':'#4b4655';
 const skin=['#b57c60','#dcaf8d','#93604c','#e2bfa5'][i%4];
 const hair=['#2a2936','#745145','#d5c3ac','#4b3c50'][i%4];
 const body=preset.pose==="heal"?'<path d="M93 137Q118 126 149 143L165 232Q125 248 86 218Z"':'<path d="M97 136Q123 125 149 138L158 218Q124 238 87 217Z"';
 const costume=body+' fill="var(--coat)" stroke="#aa9aa8" stroke-width="2"/>';
 const face='<path d="M108 76Q107 47 129 49Q151 50 153 79L150 104Q139 119 120 111L108 98Z" fill="'+skin+'" stroke="#5c4140" stroke-width="2"/><path d="M106 72Q100 40 119 40Q145 29 159 63L153 73Q137 53 112 79Z" fill="'+hair+'"/><path d="M118 84l8-2m13 1l8 1" stroke="#312a33" stroke-width="2"/><path d="M128 105q8 3 13-2" fill="none" stroke="#865956" stroke-width="2"/>';
 const light='<circle cx="118" cy="96" r="60" fill="url(#halo)" opacity=".2"/>';
 const armor=preset.outfit==="armor"?'<path d="M96 147l23 10 26-12 8 55-28 15-32-13z" fill="#86909d" opacity=".42"/><path d="M93 157h61m-31 2v56" stroke="#d8c7bc" opacity=".35" stroke-width="3"/>':robe?'<path d="M97 142q26 26 54 1M89 218q39-24 72 0" stroke="#ad95ba" opacity=".5" fill="none" stroke-width="3"/>':'<path d="M99 140L151 204" stroke="#bb977c" stroke-width="8" opacity=".65"/>';
 const symbols=gear[preset.prop]||'';
 return '<svg class="cast-pose-svg" viewBox="0 0 240 300" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Illustration conceptuelle : '+preset.pose+'"><defs><radialGradient id="halo"><stop stop-color="#eedbe9"/><stop offset="1" stop-color="#5b3c64" stop-opacity="0"/></radialGradient></defs><g style="--coat:'+coat+'"><ellipse cx="126" cy="275" rx="76" ry="11" fill="#05040b" opacity=".6"/>'+light+legs(preset.pose)+costume+armor+arms(preset.pose)+face+symbols+'<path d="M101 136L121 144 150 135" fill="none" stroke="#e0c2aa" opacity=".35" stroke-width="3"/></g></svg>';
};
})();