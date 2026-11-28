import pathlib, datetime
root = pathlib.Path(__file__).resolve().parent.parent
today = datetime.date.today().isoformat()
skip = {"404.html", "merci.html"}
pages = []
for p in sorted(root.glob("*.html")):
    if p.name in skip or p.name.startswith('google'):
        continue
    pages.append(p.name)

def prio(name):
    if name == "index.html":
        return "1.0"
    if name in ("tarifs.html", "conseils.html"):
        return "0.9"
    if name.startswith("electricien-"):
        return "0.8"
    if name.startswith("conseil-"):
        return "0.7"
    return "0.5"

lines = ['<?xml version="1.0" encoding="UTF-8"?>', '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">']
for name in pages:
    loc = "https://ungelec.fr/" + ("" if name == "index.html" else name)
    lines.append(f"  <url><loc>{loc}</loc></url>")
lines.append("</urlset>")
(root / "sitemap.xml").write_text("\n".join(lines) + "\n", encoding="utf-8")
print("sitemap: %d urls" % len(pages))