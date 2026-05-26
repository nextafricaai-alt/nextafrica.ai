#!/usr/bin/env python3
"""
NEXT AI Website — Pre-push Validator
====================================================================
Catches the patterns that have repeatedly broken the live site:
  1. Null bytes appended to files (file-system corruption)
  2. Truncation mid-line (file doesn't end with proper export)
  3. Missing Object.assign exports in HTML
  4. Required JSX components not present in HTML

Run BEFORE every git push:
    python3 validate.py

Exit code 0 = safe to push.
Exit code 1 = DO NOT PUSH. See errors above.
====================================================================
"""
import os, sys, re

ROOT = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(ROOT, "src")
NUL = b"\x00"

# JSX source files and their REQUIRED final export line
REQUIRED_EXPORTS = {
    "chrome.jsx":  "Object.assign(window, { Nav,",
    "home.jsx":    "Object.assign(window, { Home,",
    "pages-a.jsx": "Object.assign(window, { WhatWeDo,",
    "pages-b.jsx": "Object.assign(window, { Training,",
    "app.jsx":     "ReactDOM.createRoot",
}

errors = []
warnings = []

# ---------- 1. JSX source integrity ----------
for fname, expected_end in REQUIRED_EXPORTS.items():
    path = os.path.join(SRC, fname)
    if not os.path.exists(path):
        errors.append(f"src/{fname}: FILE MISSING")
        continue
    data = open(path, "rb").read()
    text = data.decode("utf-8", errors="replace")
    if data.count(NUL) > 0:
        errors.append(f"src/{fname}: contains {data.count(NUL)} NULL bytes — file is corrupted")
    if not text.rstrip().endswith((");", "});")):
        errors.append(f"src/{fname}: does not end with proper closing — likely truncated")
    if expected_end not in text:
        errors.append(f"src/{fname}: missing required export '{expected_end}'")
    # Sanity size check (truncation usually drops file way below original)
    min_size = {
        "chrome.jsx": 20000, "home.jsx": 23000, "pages-a.jsx": 20000,
        "pages-b.jsx": 38000, "app.jsx": 1000,
    }.get(fname, 100)
    if len(data) < min_size:
        errors.append(f"src/{fname}: only {len(data)} bytes (expected ≥ {min_size}) — likely truncated")

# ---------- 2. HTML output integrity ----------
html_files = [f for f in os.listdir(ROOT) if f.endswith(".html") and f != "404.html"]
for fname in sorted(html_files):
    path = os.path.join(ROOT, fname)
    data = open(path, "rb").read()
    text = data.decode("utf-8", errors="replace")
    if data.count(NUL) > 0:
        errors.append(f"{fname}: contains {data.count(NUL)} NULL bytes")
    # Each required export must appear in the inlined HTML
    for jsx, ending in REQUIRED_EXPORTS.items():
        if ending not in text:
            errors.append(f"{fname}: missing inlined '{ending}' — chrome/home/pages-a/pages-b/app got truncated during build")
    # Each <script type="text/babel"> block must close
    babel_opens = len(re.findall(r'<script type="text/babel"', text))
    babel_closes = text[text.find('<script type="text/babel"'):].count("</script>") if babel_opens > 0 else 0
    if babel_opens != 5:
        warnings.append(f"{fname}: {babel_opens} babel scripts (expected 5)")

# ---------- Print report ----------
print()
print("=" * 60)
print("  NEXT AI Website — Validation Report")
print("=" * 60)
if errors:
    print(f"\n❌ {len(errors)} ERROR(S) — DO NOT PUSH:\n")
    for e in errors:
        print(f"   {e}")
if warnings:
    print(f"\n⚠️  {len(warnings)} warning(s):\n")
    for w in warnings:
        print(f"   {w}")
if not errors and not warnings:
    print("\n✅ All checks passed. Safe to push.\n")
elif not errors:
    print("\n✅ No blocking errors. Safe to push (warnings shown above).\n")
else:
    print("\n❌ DO NOT PUSH. Fix errors above first.\n")

sys.exit(1 if errors else 0)
