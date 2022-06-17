import re
from pathlib import Path
from typing import Match


LINK_PATTERN = re.compile(r"\[(.*?)\]\(\s*(.+?)\s*\)")

ROOT = Path(__file__).resolve().parents[1]
FILES = list(ROOT.glob("docs/**/*.md"))

def link_callback(match: Match[str]):
    text = match.group(1).strip()
    link = match.group(2).strip()
    print("*", text, "---", link)
    if link.startswith("/docs"):
        link = f"{{{{ \"{link}\" | relative_url }}}}"
    return f"[{text}]({link})"

def main():
    for file in FILES:
        content = file.read_text(encoding="UTF-8")
        content = LINK_PATTERN.sub(link_callback, content)
        file.write_text(content, encoding="UTF-8")


main()