#!/usr/bin/env python3
"""
NEXT AI Website — Build Step
----------------------------
Re-inlines every src/*.jsx into the inline <script type="text/babel">
blocks of every HTML page. Run this whenever you edit a .jsx file.

Usage:
    python3 build.py

No dependencies. Pure Python 3.
"""
import os, re

JSX_FILES = ["chrome.jsx", "home.jsx", "pages-a.jsx", "pages-b.jsx", "app.jsx"]
ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")

jsx_contents = {}
for name in JSX_FILES:
    with open(os.path.join(SRC, name), "r", encoding="utf-8") as f:
        jsx_contents[name] = f.read()

html_files = [f for f in os.listdir(ROOT) if f.endswith(".html") and f != "404.html"]
for html_name in html_files:
    path = os.path.join(ROOT, html_name)
    with open(path, "r", encoding="utf-8") as f:
        html = f.read()
    for jsx_name in JSX_FILES:
        pattern = r'<script type="text/babel" data-source="' + re.escape(jsx_name) + r'">.*?</script>'
        inline = (
            f'<script type="text/babel" data-source="{jsx_name}">\n'
            f'/* ===== {jsx_name} ===== */\n'
            f'{jsx_contents[jsx_name]}\n'
            f'</script>'
        )
        # Use a lambda so re.sub doesn't try to interpret backslash escapes
        # (like \u, \1, \g) inside the replacement JSX content.
        html = re.sub(pattern, lambda m, _inline=inline: _inline, html, count=1, flags=re.DOTALL)
    with open(path, "w", encoding="utf-8") as f:
        f.write(html)
    print(f"Rebuilt {html_name}")

print(f"\nDone. {len(html_files)} HTML files updated from src/.")
