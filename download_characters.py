#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Download character portrait images from Enka Network CDN
"""

import os
import urllib.request
import urllib.error
import time

# Character mapping: (filename, enka_name)
characters = [
    ("albedo", "Albedo"),
    ("jean", "Qin"),
    ("barbara", "Barbara"),
    ("noelle", "Noel"),
    ("venti", "Venti"),
    ("kokomi", "Kokomi"),
    ("alhaitham", "Alhatham"),
    ("yae_miko", "Miko"),
    ("kazuha", "Kazuha"),
    ("cyno", "Cyno"),
    ("ayaka", "Ayaka"),
    ("collei", "Collei"),
    ("wanderer", "Wanderer"),
    ("fischl", "Fischl"),
    ("sucrose", "Sucrose"),
    ("mona", "Mona"),
    ("tartaglia", "Tartaglia"),
    ("itto", "Itto"),
    ("yoimiya", "Yoimiya"),
    ("dori", "Dori"),
    ("klee", "Klee"),
    ("amber", "Ambor"),
    ("kaeya", "Kaeya"),
    ("heizou", "Heizou"),
    ("diluc", "Diluc"),
    ("sara", "Sara"),
    ("thoma", "Thoma"),
    ("yunjin", "Yunjin"),
    ("traveler", "PlayerBoy"),
    ("nilou", "Nilou"),
    ("raiden", "Shougun"),
    ("ningguang", "Ningguang"),
]

output_dir = "C:/Users/24560/Desktop/study/yuanshentest/images/characters"
os.makedirs(output_dir, exist_ok=True)

def download_image(filename, enka_name):
    url = f"https://enka.network/ui/UI_AvatarIcon_Side_{enka_name}.png"
    output_path = os.path.join(output_dir, f"{filename}.png")

    try:
        req = urllib.request.Request(url, headers={
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        })
        with urllib.request.urlopen(req, timeout=15) as response:
            data = response.read()
            # Check if it's actually a PNG
            if data[:4] == b'\x89PNG':
                with open(output_path, 'wb') as f:
                    f.write(data)
                print(f"OK: {filename}.png ({len(data)} bytes)")
                return True
            else:
                print(f"FAIL: Not PNG: {filename}")
                return False
    except Exception as e:
        print(f"FAIL: {filename} - {str(e)}")
        return False

# Download all characters
success_count = 0
for filename, enka_name in characters:
    if download_image(filename, enka_name):
        success_count += 1
    time.sleep(0.5)  # Be nice to the server

print(f"\nDownloaded {success_count}/{len(characters)} character images")
