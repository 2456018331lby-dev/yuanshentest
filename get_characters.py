import re

with open('C:/Users/24560/Desktop/study/yuanshentest/js/data.js', 'r', encoding='utf-8') as f:
    content = f.read()

# Find all character names
names = re.findall(r'name:\s*"([^"]+)"', content)
for n in names[:40]:
    print(n)
