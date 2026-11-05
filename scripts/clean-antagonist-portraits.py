#!/usr/bin/env python3
"""Produire des portraits sans lettrage à partir des affiches d'origine.
Le cadrage conserve les pixels du visage, sans retouche générative.
"""
from pathlib import Path
from PIL import Image

ROOT = Path(__file__).resolve().parents[1]
for name in ("vaelkor", "nyssara", "orvann"):
    source = ROOT / "assets" / f"{name}_portrait.png"
    output = ROOT / "assets" / f"{name}_clean.png"
    with Image.open(source) as image:
        image = image.convert("RGB")
        width, height = image.size
        # Les inscriptions sont dans la bande inférieure (> 72 %).
        # Un seul cadrage commun, validé pour les trois affiches.
        crop_height = round(height * 520 / 724)
        image.crop((0, 0, width, crop_height)).save(output, "PNG", optimize=True)
        print(f"{source.name} {width}x{height} -> {output.name} {width}x{crop_height}")
