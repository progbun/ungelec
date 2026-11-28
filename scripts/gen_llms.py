import pathlib, re, html
root = pathlib.Path(__file__).resolve().parent.parent

# llms.txt
llms = root / "llms.txt"
# (llms.txt is maintained manually; this script only regenerates llms-full.txt)

# llms-full.txt
skip = {"404.html", "merci.html"}
out = ["# UNGÉLEC — Contenu complet du site (llms-full.txt)", "", "> Document consolidé pour les assistants IA. Source : https://ungelec.fr/", ""]

def strip_tags(s):
    s = re.sub(r"<script.*?</script>", "", s, flags=re.S|re.I)
    s = re.sub(r"<style.*?</style>", "", s, flags=re.S|re.I)
    s = re.sub(r"<[^>]+>", " ", s)
    s = html.unescape(s)
    s = re.sub(r"\s+", " ", s).strip()
    return s

for p in sorted(root.glob("*.html")):
    if p.name in skip or p.name.startswith('google'):
        continue
    raw = p.read_text(encoding="utf-8")
    m = re.search(r"<title>(.*?)</title>", raw, re.S|re.I)
    title = html.unescape(m.group(1).strip()) if m else p.name
    text = strip_tags(raw)
    out.append(f"## {title}")
    out.append(f"URL : https://ungelec.fr/{'' if p.name=='index.html' else p.name}")
    out.append("")
    out.append(text)
    out.append("")
    out.append("---")
    out.append("")

(root / "llms-full.txt").write_text("\n".join(out), encoding="utf-8")
print("llms-full.txt: %d chars" % len("\n".join(out)))