# Script de surveillance des citations IA — check-ai-citations.py
# Usage : python scripts/check-ai-citations.py
# Nécessite : pip install requests (optionnel, pour fetch)

import json, datetime, pathlib

queries = [
    "électricien à Malafretaz",
    "électricien à Bourg-en-Bresse",
    "électricien multi-services Ain",
    "mise en conformité électrique 01340",
    "dépannage électrique Malafretaz",
]

# URLs à tester manuellement (copier-coller dans le navigateur)
test_urls = {
    "Perplexity": "https://www.perplexity.ai/search?q=",
    "ChatGPT": "https://chat.openai.com/?q=",
    "Claude": "https://claude.ai/new?q=",
    "Gemini": "https://gemini.google.com/app?q=",
    "Copilot": "https://copilot.microsoft.com/?q=",
}

print("=" * 60)
print("SURVEILLANCE CITATIONS IA — UNGÉLEC")
print("Date :", datetime.date.today().isoformat())
print("=" * 60)
print()
print("Requêtes à tester :")
for q in queries:
    print(f"  - {q}")
print()
print("URLs de test (copier-coller dans le navigateur) :")
for name, base in test_urls.items():
    print(f"\n  {name}:")
    for q in queries:
        print(f"    {base}{q.replace(' ', '+')}")
print()
print("Critères de succès :")
print("  - UNGÉLEC est cité dans la réponse")
print("  - Le lien https://ungelec.fr/ est présent")
print("  - Les informations (tél, zone, tarifs) sont correctes")
print()
print("Fréquence recommandée : 1 fois par semaine")
print("Noter les résultats dans un fichier de suivi (ex. ai-citations-log.md)")