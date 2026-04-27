#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Generate placeholder character images using SVG
Since we don't have API keys for image generation, we'll create stylized SVG placeholders
"""

import os

# Character data: (chinese_name, filename, element, element_color)
characters = [
    ("阿贝多", "albedo", "岩", "#d4a843"),
    ("琴", "jean", "风", "#7fb069"),
    ("芭芭拉", "barbara", "水", "#4fc3f7"),
    ("诺艾尔", "noelle", "岩", "#d4a843"),
    ("温迪", "venti", "风", "#7fb069"),
    ("珊瑚宫心海", "kokomi", "水", "#4fc3f7"),
    ("艾尔海森", "alhaitham", "草", "#a5d6a7"),
    ("八重神子", "yae_miko", "雷", "#ba68c8"),
    ("枫原万叶", "kazuha", "风", "#7fb069"),
    ("赛诺", "cyno", "雷", "#ba68c8"),
    ("神里绫华", "ayaka", "冰", "#90caf9"),
    ("柯莱", "collei", "草", "#a5d6a7"),
    ("流浪者", "wanderer", "风", "#7fb069"),
    ("菲谢尔", "fischl", "雷", "#ba68c8"),
    ("砂糖", "sucrose", "风", "#7fb069"),
    ("莫娜", "mona", "水", "#4fc3f7"),
    ("达达利亚", "tartaglia", "水", "#4fc3f7"),
    ("荒泷一斗", "itto", "岩", "#d4a843"),
    ("宵宫", "yoimiya", "火", "#ff7043"),
    ("多莉", "dori", "雷", "#ba68c8"),
    ("可莉", "klee", "火", "#ff7043"),
    ("安柏", "amber", "火", "#ff7043"),
    ("凯亚", "kaeya", "冰", "#90caf9"),
    ("鹿野院平藏", "heizou", "风", "#7fb069"),
    ("迪卢克", "diluc", "火", "#ff7043"),
    ("九条裟罗", "sara", "雷", "#ba68c8"),
    ("托马", "thoma", "火", "#ff7043"),
    ("云堇", "yunjin", "岩", "#d4a843"),
    ("旅行者", "traveler", "风", "#7fb069"),
    ("妮露", "nilou", "水", "#4fc3f7"),
    ("雷电将军", "raiden", "雷", "#ba68c8"),
    ("凝光", "ningguang", "岩", "#d4a843"),
]

def generate_svg(name, element, color):
    """Generate a stylized SVG avatar"""
    # Get first character for display
    display_char = name[0] if name else "?"

    svg = f'''<?xml version="1.0" encoding="UTF-8"?>
<svg width="200" height="200" viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <radialGradient id="bgGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="#1a1a2e"/>
      <stop offset="100%" stop-color="#0c0c14"/>
    </radialGradient>
    <radialGradient id="elementGrad" cx="50%" cy="50%" r="50%">
      <stop offset="0%" stop-color="{color}" stop-opacity="0.3"/>
      <stop offset="100%" stop-color="{color}" stop-opacity="0"/>
    </radialGradient>
  </defs>

  <!-- Background circle -->
  <circle cx="100" cy="100" r="95" fill="url(#bgGrad)" stroke="{color}" stroke-width="3"/>

  <!-- Element glow -->
  <circle cx="100" cy="100" r="80" fill="url(#elementGrad)"/>

  <!-- Decorative ring -->
  <circle cx="100" cy="100" r="70" fill="none" stroke="{color}" stroke-width="1" stroke-opacity="0.5"/>
  <circle cx="100" cy="100" r="60" fill="none" stroke="{color}" stroke-width="1" stroke-opacity="0.3"/>

  <!-- Character initial -->
  <text x="100" y="115" font-family="Noto Sans SC, Microsoft YaHei, sans-serif" font-size="72"
        font-weight="bold" fill="{color}" text-anchor="middle">{display_char}</text>

  <!-- Element symbol at bottom -->
  <circle cx="100" cy="165" r="15" fill="#0c0c14" stroke="{color}" stroke-width="2"/>
  <text x="100" y="171" font-family="sans-serif" font-size="14" fill="{color}" text-anchor="middle">{element}</text>
</svg>'''
    return svg

def main():
    output_dir = "C:/Users/24560/Desktop/study/yuanshentest/images/characters"
    os.makedirs(output_dir, exist_ok=True)

    for name, filename, element, color in characters:
        svg_content = generate_svg(name, element, color)
        filepath = os.path.join(output_dir, f"{filename}.svg")
        with open(filepath, 'w', encoding='utf-8') as f:
            f.write(svg_content)
        print(f"Generated: {filename}.svg ({name})")

    print(f"\nGenerated {len(characters)} SVG character images in {output_dir}")

if __name__ == "__main__":
    main()
