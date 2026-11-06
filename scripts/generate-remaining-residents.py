"""Generate genuinely distinct fictional resident portraits using the public volunteer AI Horde.

No user accounts or secrets are sent. Each prompt names only a fictional character.
Only store checked 512px+ portraits, preserving the exact 12..39 identity index.
"""
import urllib.request,urllib.error,json,time,random,sys
from pathlib import Path
from PIL import Image,ImageEnhance
from io import BytesIO
from concurrent.futures import ThreadPoolExecutor,as_completed
ROOT="https://stablehorde.net/api"
HEAD={"apikey":"0000000000","Client-Agent":"DivineShadow:1.0:github","Content-Type":"application/json"}
CHARACTERS=[[12,"MATEO","Hispanic man age 35, wiry rugged caravan driver, dark curly hair, worn travel cloak, leather shoulder straps, friendly but watchful eyes, sunlit trade road"],[13,"AYAKA","Japanese woman age 29, village healer, tied black hair, cream linen robes, medicinal herbs and bandage pouch, gentle confident eyes, rural infirmary"],[14,"KOFI","West African Ghanaian man age 38, strong lumberjack with short cropped hair, dark skin, simple brown work tunic, forest in soft daylight"],[15,"ÉLISE","French European woman age 42, village baker, freckles, braided auburn hair, linen apron with flour, warm oven light, calm intelligent face"],[16,"RASHID","Arab Middle Eastern man age 47, traveling merchant, thick trimmed beard, patterned indigo head scarf and modest trade robe, caravan market, composed gaze"],[17,"SURI","South Asian Indian woman age 32, shepherd and animal keeper, warm brown skin, long black braid, indigo shawl, pastoral farm fence, determined gentle face"],[18,"JAVIER","Hispanic man age 43, skilled carpenter, salt and pepper beard, dark curly hair, practical linen shirt, wood chips, artisan workbench in background"],[19,"NALA","East African woman age 26, fisherwoman, dark brown skin, short twisted braids, practical weathered blue clothing, river fishing nets, proud lively eyes"],[20,"DRISS","North African Amazigh man age 36, city guard, dark beard, simple bronze shoulder guard and maroon scarf, old sandstone city gate, watchful disciplined face"],[21,"MEI","East Asian Chinese woman age 28, textile weaver, dark hair neatly tied, lavender linen blouse, colored silk looms behind, thoughtful and hopeful expression"],[22,"CÉSAR","Hispanic man age 39, stonemason, strong broad hands, stubble, dusty work vest, stone walls and chisel, olive skin, weary blue-grey eyes"],[23,"BINTA","Sahelian West African woman age 45, market vendor, dark skin, bright patterned headwrap, modest ochre dress, woven baskets of vegetables, welcoming serious face"],[24,"LUKAS","young European man age 24, day laborer with light brown unkempt hair, worn brown tunic, humble weathered face, ordinary medieval village lane"],[25,"FARAH","older Arab woman age 62, wise village counselor, olive skin, silver hair under embroidered shawl, dignified intelligent face, village courtyard"],[26,"CHEN","East Asian Chinese man age 56, scholarly teacher, neat salt-and-pepper beard, dark tied hair, simple embroidered robe, library books and daylight"],[27,"ILIAS","European orphan boy age 13, brown short hair, plain patched wool tunic, modest village street, curious cautious expression, fully clothed age-appropriate portrait"],[28,"SAMIRA","North African Berber woman age 31, village seamstress, curly brown hair in red headwrap, terracotta dress, sewing tools and folded fabrics, lively intelligent face"],[29,"RAÚL","Hispanic man age 36, huntsman, short dark beard, green-brown travel cloak, forest pathway and leather strap, intense friendly eyes"],[30,"KEMI","West African man age 48, unhoused village wanderer, deep brown skin, scruffy beard, worn unadorned clothes, thoughtful proud eyes, no dehumanizing portrayal"],[31,"ZHANG","East Asian Chinese man age 42, blacksmith armorer, cropped black hair, rugged face, soot-marked shirt, armor plates on workshop table, confident maker"],[32,"VALÉRIA","Hispanic woman age 27, musician and porter, dark wavy hair, red-brown scarf, traditional stringed instrument and travel sack, humorous resilient face"],[33,"BAKARI","East African man age 34, laborer and dock porter, deep brown skin, tightly coiled hair, strong build, practical linen tunic, river market docks, determined expression"],[34,"NYA","Central African girl age 12, village orphan, natural braided hair, dark brown skin, simple modest fully covered dress, peaceful and hopeful expression, welcoming village courtyard"],[35,"EREN","European man age 41, displaced refugee, worn but clean wool cloak, dark blond hair, tired grey eyes, quiet medieval shelter background, dignified and human"],[36,"KAZU","Japanese man age 49, weather-beaten fisherman, black hair with grey strands, indigo working clothes, straw hat on his back, river boats and nets, calm face"],[37,"THAROG","non-human fantasy orc male age 36, green-grey skin and small tusks, broad nose, dignified hardworking mine laborer not warrior, miner jacket and lantern, photorealistic fantasy prosthetic effects"],[38,"LYRA","female sylvan elf age 110 appearing adult 30, elongated pointed ears, bronze skin, long dark braided hair, herbalist carrying botanical leaves, ancient forest light, realistic fantasy costume"],[39,"DREK","male drake humanoid fantasy caravan guide, warm rust red reptilian scales, short horns and expressive amber eyes, traveler cloak, desert caravan backdrop, high-end practical-creature-effects realism"]]
OUT=Path("assets/population/new");OUT.mkdir(parents=True,exist_ok=True)
def get_json(url,post=None):
  req=urllib.request.Request(url,data=json.dumps(post).encode() if post is not None else None,headers=HEAD,method="POST" if post is not None else "GET")
  with urllib.request.urlopen(req,timeout=48) as response:return json.load(response)
def process(row):
  i,name,features=row
  target=OUT/f"portrait-{i:02d}.webp"
  if target.exists() and target.stat().st_size>18000:return (i,"already")
  prompt="cinematic photorealistic medieval dark fantasy film portrait of one unique fictional character, "+features+", sharp eyes, anatomically correct face, textured realistic skin, shot on 85mm lens, detailed hair, chest-up portrait, simple natural cinematic daylight, sophisticated movie costumes, no text, no logos, high quality, solo person"
  job=None
  for attempt in range(4):
    try:
      response=get_json(ROOT+"/v2/generate/async",{"prompt":prompt,"params":{"width":512,"height":512,"steps":24,"n":1,"cfg_scale":6.5},"nsfw":False,"censor_nsfw":True})
      job=response.get("id")
      if job:break
    except Exception as e:
      print("START_RETRY",i,str(e)[:150],flush=True)
    time.sleep(12*(attempt+1))
  if not job:return (i,"start-failed")
  for poll in range(50):
    time.sleep(7)
    try:
      status=get_json(ROOT+"/v2/generate/check/"+job)
    except Exception as e:
      print("POLL_RETRY",i,str(e)[:120],flush=True)
      continue
    if status.get("faulted"):return (i,"faulted")
    if status.get("done"):break
  else:return (i,"timeout")
  complete=get_json(ROOT+"/v2/generate/status/"+job)
  generations=complete.get("generations") or []
  if not generations:return (i,"no-image")
  result=generations[0]
  if result.get("censored"):return (i,"censored")
  link=result.get("img","")
  if not link.startswith("https://"):return (i,"bad-url")
  with urllib.request.urlopen(link,timeout=55) as response:binary=response.read()
  image=Image.open(BytesIO(binary)).convert("RGB")
  if min(image.size)<480: return(i,"image-small")
  # Never blend the face with any other character's image.
  image=ImageEnhance.Contrast(image).enhance(1.025)
  image.save(target,"WEBP",quality=90,method=6)
  print("IMPORTED",i,name,image.size,target.stat().st_size,flush=True)
  return (i,"success")
def main():
  import argparse
  parser=argparse.ArgumentParser();parser.add_argument("--start",type=int,default=12);parser.add_argument("--end",type=int,default=40);args=parser.parse_args()
  tasks=[r for r in CHARACTERS if args.start<=r[0]<args.end]
  outcomes=[]
  with ThreadPoolExecutor(max_workers=4) as pool:
    futures=[pool.submit(process,r) for r in tasks]
    for f in as_completed(futures):
      try:o=f.result()
      except Exception as e:o=(-1,"exception:"+str(e)[:140])
      outcomes.append(o);print("RESULT",o,flush=True)
  print("SUMMARY",len([o for o in outcomes if o[1] in ("success","already")]),"of",len(tasks),flush=True)
  return 0
if __name__=="__main__":sys.exit(main())
