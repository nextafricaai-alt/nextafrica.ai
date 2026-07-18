import os, glob
html_files = glob.glob("*.html")

old_str = """      function startTypewriter() {
        var el = document.getElementById('tw-target');
        if (!el) { setTimeout(startTypewriter, 200); return; }
        var i = 0, direction = 1;
        function tick() {"""

new_str = """      function startTypewriter() {
        var i = 0, direction = 1;
        function tick() {
          var el = document.getElementById('tw-target');
          if (!el) { setTimeout(tick, 200); return; }"""

for file in html_files:
    if file == 'index.html': continue
    with open(file, 'r') as f:
        content = f.read()
    if old_str in content:
        content = content.replace(old_str, new_str)
        with open(file, 'w') as f:
            f.write(content)
        print("Fixed " + file)
