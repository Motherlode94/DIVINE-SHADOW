#!/usr/bin/env python3
"""FSRCNN x4 super-resolution for legacy 150x200 Canva thumbnails.

Does not claim to reconstruct the original 1086x1448 images.
Outputs independent 600x800+ images while preserving subject-to-file identity.
"""
from pathlib import Path
import urllib.request
import cv2
from PIL import Image,ImageEnhance,ImageFilter
NAMES=["isha","lucien","samira","ren","amaka","diego","hana","youssef","alina","kwame","general","eleaonor","brother","miren","selma","tomas","nadir"]
SOURCE=Path("assets/cast")
DEST=SOURCE/"hd"
DEST.mkdir(parents=True, exist_ok=True)
MODEL=Path("/tmp/FSRCNN_x4.pb")
MODEL_URL="https://raw.githubusercontent.com/Saafke/FSRCNN_Tensorflow/master/models/FSRCNN_x4.pb"
if not MODEL.exists():
    with urllib.request.urlopen(MODEL_URL,timeout=50) as resp:
        MODEL.write_bytes(resp.read())
assert MODEL.stat().st_size>30000, "Unexpected super-resolution model"
sr=cv2.dnn_superres.DnnSuperResImpl_create()
sr.readModel(str(MODEL))
sr.setModel("fsrcnn",4)
done=[]
for key in NAMES:
    src=SOURCE/(key+".webp")
    assert src.is_file(),f"Missing character asset {src}"
    bgr=cv2.imread(str(src),cv2.IMREAD_COLOR)
    assert bgr is not None and bgr.shape[0]>=180 and bgr.shape[1]>=135,f"Invalid input: {src}"
    recovered=sr.upsample(bgr)
    image=Image.fromarray(cv2.cvtColor(recovered,cv2.COLOR_BGR2RGB))
    image=ImageEnhance.Contrast(image).enhance(1.035)
    image=image.filter(ImageFilter.UnsharpMask(radius=1.05,percent=112,threshold=3))
    output=DEST/(key+".webp")
    image.save(output,"WEBP",quality=92,method=6)
    with Image.open(output) as check:
       check.verify()
    assert image.width>=540 and image.height>=720, (key,image.size)
    print(f"{key}: {bgr.shape[1]}x{bgr.shape[0]} → {image.width}x{image.height}; {output.stat().st_size:,} bytes")
    done.append(output)
assert len(done)==len(NAMES)
print("SUCCESS",len(done),"separate super-resolution portraits")
