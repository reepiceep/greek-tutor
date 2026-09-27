#!/usr/bin/env python3
"""Build src/data/readings.ts: New Testament passages for the reader, word by word with lemma and parsing.

Sources (downloaded into scripts/.cache on first run):
  - MorphGNT SBLGNT (github.com/morphgnt/sblgnt): SBLGNT text (CC BY 4.0) with MorphGNT parsing and lemmas (CC BY-SA 3.0).
  - Dodson's Greek lexicon (github.com/biblicalhumanities/Dodson-Greek-Lexicon), public domain: short English glosses.

Run: python3 scripts/build-readings.py   (then check `git diff src/data/readings.ts`)
To add a passage, add a line to PASSAGES.
"""
import json
import re
import unicodedata
import urllib.request
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
CACHE = ROOT / 'scripts' / '.cache'
MORPHGNT = 'https://raw.githubusercontent.com/morphgnt/sblgnt/master/{}-morphgnt.txt'
DODSON = 'https://raw.githubusercontent.com/biblicalhumanities/Dodson-Greek-Lexicon/master/dodson.xml'

# MorphGNT file name per book, and the book's display name.
BOOKS = {
    'Mt': ('61-Mt', 'Matthew'), 'Mk': ('62-Mk', 'Mark'), 'Lk': ('63-Lk', 'Luke'), 'Jn': ('64-Jn', 'John'),
    'Ro': ('66-Ro', 'Romans'), '1Co': ('67-1Co', '1 Corinthians'), 'Eph': ('70-Eph', 'Ephesians'),
    'Php': ('71-Php', 'Philippians'), '1Jn': ('83-1Jn', '1 John'),
}

# (id, book, chapter, first verse, last verse, title)
PASSAGES = [
    ('jn1', 'Jn', 1, 1, 18, 'In the beginning was the Word'),
    ('1jn1', '1Jn', 1, 1, 10, 'What was from the beginning'),
    ('1jn4', '1Jn', 4, 1, 6, 'Test the spirits'),
    ('mk1', 'Mk', 1, 1, 15, 'The beginning of the gospel'),
    ('mt5', 'Mt', 5, 3, 12, 'The Beatitudes'),
    ('mt6', 'Mt', 6, 9, 13, 'The Lord’s Prayer'),
    ('jn3', 'Jn', 3, 16, 21, 'God so loved the world'),
    ('lk1', 'Lk', 1, 1, 4, 'To Theophilus'),
    ('php2', 'Php', 2, 5, 11, 'He emptied himself'),
    ('eph2', 'Eph', 2, 1, 10, 'By grace you have been saved'),
    ('1co13', '1Co', 13, 1, 13, 'Love is patient'),
]


# MorphGNT lemmas that the lexicon lists under another spelling or form.
ALIASES = {
    'Μωϋσῆς': 'Μωσῆς', 'οὕτω(ς)': 'οὕτως', 'τεσσεράκοντα': 'τεσσαράκοντα', 'ἐλεάω': 'ἐλεέω', 'ἔσθω': 'ἐσθίω', 'παροξύνομαι': 'παροξύνω',
}


def fetch(url: str, name: str) -> str:
    CACHE.mkdir(parents=True, exist_ok=True)
    path = CACHE / name
    if not path.exists():
        with urllib.request.urlopen(url) as r:
            path.write_bytes(r.read())
    return path.read_text(encoding='utf-8')


def norm(s: str) -> str:
    return unicodedata.normalize('NFC', s)


def bare(s: str) -> str:
    """Lowercase, no accents or breathings: for matching a lemma to a headword that differs only in marks."""
    return ''.join(c for c in unicodedata.normalize('NFD', s.lower()) if not unicodedata.combining(c))


def third_declension(orth: str) -> bool:
    """From a headword like "φῶς, φωτός, τό": a genitive that isn't -ου (second) or -ας/-ης (first declension)."""
    parts = [p.strip() for p in orth.split(',')]
    if len(parts) < 3:
        return False  # No genitive given: indeclinable, or not a noun.
    gen = bare(parts[1])
    return not gen.endswith(('ου', 'ας', 'ης'))


def lexicon() -> tuple[dict[str, tuple[str, bool]], dict[str, tuple[str, bool]]]:
    """Headword -> (brief gloss, whether a noun is third declension)."""
    xml = fetch(DODSON, 'dodson.xml')
    exact, loose = {}, {}
    pattern = r'<entry n="([^"|]+?) \| \d+">\s*<orth>(.*?)</orth>.*?<def role="brief">(.*?)</def>'
    for head, orth, brief in re.findall(pattern, xml, re.S):
        entry = (' '.join(brief.split()), third_declension(norm(orth)))
        head = norm(head.strip())
        exact.setdefault(head, entry)
        loose.setdefault(bare(head), entry)
    return exact, loose


def main():
    exact, loose = lexicon()
    readings, glosses, missing, third = [], {}, set(), set()
    for pid, book, ch, first, last, title in PASSAGES:
        file, name = BOOKS[book]
        verses: dict[int, list] = {}
        for line in fetch(MORPHGNT.format(file), f'{file}.txt').splitlines():
            bcv, pos, parse, text, _word, _normalized, lemma = line.split(' ')
            c, v = int(bcv[2:4]), int(bcv[4:6])
            if c == ch and first <= v <= last:
                lemma = norm(lemma)
                # The SBLGNT marks variant readings with signs (⸀ ⸂ ⸃ ⸄ ⸅) that mean nothing without its apparatus.
                text = re.sub('[\u2e00-\u2e05]', '', norm(text))
                verses.setdefault(v, []).append([text, lemma, pos.rstrip('-'), parse])
                # "μέχρι(ς)": the headword has no optional letters.
                key = ALIASES.get(lemma, re.sub(r'\(.*?\)', '', lemma))
                entry = exact.get(key) or loose.get(bare(key))
                if entry:
                    glosses[lemma] = entry[0]
                    if entry[1] and pos.startswith('N'):
                        third.add(lemma)
                else:
                    missing.add(lemma)
        assert sorted(verses) == list(range(first, last + 1)), f'{pid}: verses missing'
        readings.append({
            'id': pid, 'ref': f'{name} {ch}:{first}–{last}', 'title': title,
            'verses': [{'n': v, 'words': verses[v]} for v in sorted(verses)],
        })

    out = ROOT / 'src' / 'data' / 'readings.ts'
    with out.open('w', encoding='utf-8') as f:
        f.write('// Generated by scripts/build-readings.py; do not edit by hand.\n')
        f.write('// Greek text: SBL Greek New Testament (CC BY 4.0, Society of Biblical Literature and Logos Bible Software).\n')
        f.write('// Parsing and lemmas: MorphGNT (github.com/morphgnt/sblgnt), CC BY-SA 3.0; this file is shared under the same licence.\n')
        f.write('// Glosses: Dodson’s Greek lexicon, public domain.\n')
        f.write("import type { Reading } from './types'\n\n")
        f.write('/** Each word: [as printed, lemma, part of speech, MorphGNT parse code]. */\n')
        f.write('export const READINGS: Reading[] = ')
        f.write(json.dumps(readings, ensure_ascii=False, separators=(',', ':')))
        f.write('\n\n/** Short English glosses by lemma (Mounce’s own glosses are used instead for course vocabulary). */\n')
        f.write('export const GLOSSES: Record<string, string> = ')
        f.write(json.dumps(dict(sorted(glosses.items())), ensure_ascii=False, indent=0).replace('\n', ' '))
        f.write('\n\n/** Third-declension nouns in the passages (their genitive, in the lexicon, shows it). */\n')
        f.write('export const THIRD_DECLENSION: string[] = ')
        f.write(json.dumps(sorted(third), ensure_ascii=False))
        f.write('\n')
    words = sum(len(v['words']) for r in readings for v in r['verses'])
    print(f'{len(readings)} passages, {words} words, {len(glosses)} glossed lemmas -> {out.relative_to(ROOT)}')
    if missing:
        print('No gloss for:', ' '.join(sorted(missing)))


if __name__ == '__main__':
    main()
