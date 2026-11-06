#!/usr/bin/env python3
"""Extract 40 residents in original atlas order, run 4x FSRCNN reconstruction."""
from pathlib import Path
from PIL import Image, ImageEnhance, ImageFilter
import cv2, urllib.request
src=Path("assets/population/population-atlas.webp")
out=src.parent/"hd"
out.mkdir(parents=True,exist_ok=True)
im=Image.open(src).convert("RGB")
w,h=im.size
assert w>=450 and h>=260, f"Atlas unexpected dimensions: {im.size}"
print("SOURCE ATLAS", im.size,src.stat().st_size)
model=Path("/tmp/FSRCNN_x4.pb")
if not model.exists():
 with urllib.request.urlopen("https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x4.pb",timeout=50) as resp:model.write_bytes(resp.read())
assert model.stat().st_size>30000
sr=cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(str(model));sr.setModel("fsrcnn",4)
for i in range(40):
 col=i%10; row=i//10
 x0=round(col*w/10);x1=round((col+1)*w/10)
 y0=round(row*h/4);y1=round((row+1)*h/4)
 crop=im.crop((x0,y0,x1,y1))
 import numpy as np
 expanded=sr.upsample(cv2.cvtColor(np.asarray(crop),cv2.COLOR_RGB2BGR))
 enhanced=Image.fromarray(cv2.cvtColor(expanded,cv2.COLOR_BGR2RGB))
 enhanced=ImageEnhance.Contrast(enhanced).enhance(1.04)
 enhanced=enhanced.filter(ImageFilter.UnsharpMask(radius=0.9,percent=110,threshold=3))
 dest=out/f"portrait-{i:02d}.webp"
 enhanced.save(dest,"WEBP",quality=91,method=6)
 assert dest.stat().st_size>2000
 print(f"{i:02d} source={crop.size} output={enhanced.size} bytes={dest.stat().st_size}")
assert len(list(out.glob("portrait-*.webp")))==40
