import json
import sys
import os

# Map of files to create
files = json.loads(sys.stdin.read())

for filepath, content in files.items():
    os.makedirs(os.path.dirname(filepath), exist_ok=True)
    with open(filepath, 'w') as f:
        f.write(content)
    print(f"Created: {filepath}")
