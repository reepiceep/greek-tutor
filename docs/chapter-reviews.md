# Chapter reviews

Each chapter is checked against three sources: Mounce's *Basics of Biblical Greek* (4th ed.), its workbook, and Merkle & Plummer's *Beginning with New Testament Greek*. For Merkle & Plummer, only the parts relevant to the chapter are used; the rest is noted under the chapter it belongs to. Gaps are listed, planned, then built.

We don't copy any book's wording or exercises. Verses come from the SBLGNT (checked against MorphGNT), and the drills are our own.

## Where we are (2026-09-27)

- **Built, committed and pushed:**
  - chapter 8 (`1856a83`, plus the εἰμί reference and flashcards in `ddd6d0b` and `edb08c7`);
  - chapter 9 (`ddd6d0b`);
  - chapter 10 (`b64ed1a`);
  - chapter 11 (`357ca38`);
  - chapter 12 (`fd48dab`);
  - chapter 13 (built 2026-09-28, not yet committed).
- **Not reviewed yet:** chapters 14–36, and chapters 4 and 6 (vocabulary only). Chapters 1–3 (alphabet) still aren't in the app; chapter 5 is skipped by choice.
- **The routine per chapter:**
  1. Read Mounce's chapter, the workbook exercise, and the relevant part of Merkle & Plummer in Logos (limited view mode).
  2. Compare with the app and list the gaps with their sources.
  3. Write a plan; build once the user says yes (verses checked against MorphGNT; tests, lint, build, a browser check).
  4. Update this file, the README and the memory notes.
  5. Commit and push to main.
- **Waiting for later reviews:** notes under each chapter's "Left for later" (for example, Merkle & Plummer's relative pronouns → chapter 14; comparatives → chapters 17/19).

| Chapter | Reviewed | Status |
|---|---|---|
| 8. Prepositions and εἰμί | 2026-09-27 | Gaps built (see below) |
| 9. Adjectives | 2026-09-27 | Gaps built (see below) |
| 10. Third declension | 2026-09-27 | Gaps built (see below) |
| 11. First and second person pronouns | 2026-09-27 | Gaps built (see below) |
| 12. αὐτός | 2026-09-27 | Gaps built (see below) |
| 13. Demonstratives | 2026-09-28 | Gaps built (see below) |

## Chapter 8: Prepositions and εἰμί

**Sources:** workbook Exercise 8 (parsing, warm-up, translation 1–10, additional 11–20, summary); Mounce §8.1–8.19; Merkle & Plummer ch. 8 (§8.1–8.7).

**Already covered before the review:**
- meaning by case, with a reference chart;
- phrases and highlighted phrases in NT sentences;
- the spatial diagram and elision;
- the εἰμί paradigm, subject vs. predicate nominative, and enclitics.

**Gaps found, and what was built:**

| Gap | Source | Built |
|---|---|---|
| No full-sentence translation | Workbook translation and additional sentences | *Read verses* tab: 15 verses, each ending with "translate the whole sentence" (`src/data/chapter08Readings.ts`) |
| What the phrase modifies (adverbial, adjectival, standing as a noun) | Workbook instructions, Mounce §8.16, Merkle & Plummer §8.6 | Read verses asks for the object and then the word the phrase modifies, including Jn 5:44 and Mt 6:9 (adjectival) and 1 Jn 2:15 and Mk 1:36 (standing as a noun) |
| No lesson on the Prepositions screen | Mounce §8.3–8.8 and §8.17, workbook summary, Merkle & Plummer §8.3 and §8.6 | "How Greek prepositions work" lesson: case decides meaning, the full case explanation, no key words, the article often dropped, what a phrase modifies, compound verbs repeating their preposition, glosses as a starting point |
| No parsing of chapter 8's nouns | Workbook parsing grid | *Noun forms* tab: parse ἡμέρα, θάλασσα, οἰκία, παραβολή, θάνατος, οἶκος, ὄχλος, Ἰωάννης, and pick a preposition that could take each form |
| Movable ν not explained | Mounce §8.13 | "The present of εἰμί" lesson on the εἰμί chart and identify tabs |
| ἵνα and dependent clauses | Mounce §8.9 | Jn 3:17 and Jn 1:7 in Read verses ask "which is the main verb?"; a tip in "How to take a verse apart" |

**Progress and test:**
- Both new drills are tracked as skills: "Prepositions: reading verses" and "Prepositions: noun forms."
- Read verses is also in the All prepositions review.
- The chapter 8 test's Phrases area now has 2 phrases and 2 verse questions.

**Added later at the user's request (2026-09-27):**
- A *Reference* tab on the εἰμί screen with the present forms and ἦν. You can choose to hide the Greek or the English, then click a cell to check it.
- Flashcards get a card for each present form of εἰμί (ἐσμέν "we are"), in both directions, whenever chapter 8 is in the deck. They count as verbs for the word-type filter, can be switched off with "Forms of εἰμί," and share progress with the εἰμί identify/produce drills.

**Not built (possible later):**
- English → Greek phrases (Merkle & Plummer part D).
- Phrasing layouts (Mounce §8.18–8.19): indenting phrases under the word they modify.
- More adjectival and noun-like verses once chapter 9 (adjectives) is reviewed.

## Chapter 9: Adjectives

**Sources:**
- workbook Exercise 9 (parsing, warm-up α–η, translation 1–10, additional 11–20, summary), plus the Chapters 6–9 Review #2 that follows it;
- Mounce §9.1–9.20 and the Exegesis section on the article;
- Merkle & Plummer ch. 16, the adjective parts only (§16.3–16.6 and practice A–D). The adverbs section (§16.7) is skipped.

**Already covered before the review:**
- *Forms*: charts for ἀγαθός, πονηρός, ἅγιος and αἰώνιος, with a lesson on agreement, 2-1-2 vs 2-2, and α after ε, ι, ρ.
- *Parse*: those four adjectives only.
- *Agreement*: adjective + noun phrase.
- *Uses*: attributive, predicate or substantival, with the reason, and a translation for some items. About 25 items, all with an article, from verses and practice phrases.

**Gaps found:**

| # | Gap | Source |
|---|---|---|
| 1 | No full-sentence translation. Nothing asks which noun an adjective goes with inside a verse. | Workbook translation 1–10 and additional 11–20; Mounce §9.18 |
| 2 | Only 4 of the chapter's adjectives can be parsed. κακός, νεκρός, πιστός, πρῶτος, τρίτος, ἀγαπητός, ἐμός, ἄλλος (neuter ἄλλο), ἔσχατος and ἀλλήλων are missing. | Workbook parsing (πιστάς, κακῷ, νεκρόν, ἐσχάτους, ἐμά, πρώτῃ, ἀλλήλας); Mounce vocabulary |
| 3 | No lexical-form question. The lexical form is the masculine nominative singular (ἀγαθαῖς → ἀγαθός). | Mounce §9.7; workbook parsing grid |
| 4 | Substantival adjectives: no practice supplying "man," "woman," "thing" from gender and number (ἀγαθαί "good women," τὰ ἀγαθά "the good things"). | Mounce §9.9; Merkle & Plummer §16.5 |
| 5 | No adjectives without an article, where context decides between "a good man" and "a man is good" (1 Jn 2:18 ἐσχάτη ὥρα ἐστίν, Eph 2:10 ἔργοις ἀγαθοῖς). | Mounce §9.13; Merkle & Plummer §16.5 |
| 6 | Third attributive position (ἄνθρωπος ὁ ἀγαθός) not taught. | Mounce §9.20 |
| 7 | Neuter plural subject with a singular verb not taught. | Mounce §9.17 |
| 8 | Article + prepositional phrase, translated as a relative clause, not mentioned in chapter 9. It is drilled in chapter 8's Read verses. | Mounce §9.15 |
| 9 | Small lesson points: -ας is genitive singular or accusative plural in α-type feminines, but only accusative plural in η-type (νεκράς vs ἀγαθάς); ἐμός vs μου; find the main subject first. | Mounce §9.19 and vocabulary notes; workbook summary |

**What was built (2026-09-27):**
1. **Read verses for adjectives** (gaps 1, 5–8): about 14 SBLGNT verses, many of them the workbook's references. Each verse asks, in order:
   - which word the adjective goes with (or none, for a substantival one);
   - attributive, predicate or substantival;
   - the whole sentence in English.

   Candidates: Jn 12:48, Mk 15:25, Jn 5:21, Mt 20:16, Rom 12:21, Jn 15:9, Eph 2:10, Mt 12:35, 1 Jn 2:18, Jn 18:36, Jn 14:15, Jn 3:36, Mk 12:6, 1 Cor 10:13, Jn 14:27 (third attributive), Mt 2:16 (article + phrase), 1 Jn 4:1 (neuter plural subject).
2. **Parse every chapter 9 adjective, and ask for the lexical form** (gaps 2 and 3): add charts for the missing adjectives (ἀλλήλων plural only, without a nominative), and a "what is the lexical form?" question.
3. **Substantival translation drill** (gap 4): a form with or without the article → "a good man," "the good women," "good things."
4. **Uses tab and lesson updates** (gaps 5, 6, 9): add items without an article, where context decides, and third-position items. Extend the lessons with the rules from gap 9.
5. **Chapter 9 test:** include verse questions and the new forms.

Details of what shipped:
- **Read verses tab:** 17 verses in `src/data/chapter09Readings.ts`, with the questions in `src/lib/adjReadingQuestions.tsx`. The use question is labelled by what the adjective does rather than by the article, because several verses have no article at all.
- **Parse tab:** now covers all 13 adjectives (the new charts sit under "The chapter's other adjectives" on the Forms tab) and mixes in lexical-form questions. Agreement still uses the 4 main adjectives.
- **As nouns tab:** substantival translation for ἀγαθός, πονηρός, κακός, πιστός, νεκρός, with and without the article.
- **Uses tab:** adds the third attributive position (Jn 14:27 and a practice phrase). The lessons cover articleless adjectives, the third position, neuter plural subjects, -ας, ἐμός vs μου, ἄλλο, and ἀλλήλων.
- **Skills:** "Adjectives: lexical form," "Adjectives: as nouns" and "Adjectives: reading verses." The chapter 9 test has 1 lexical-form question and 3 verse questions in its areas, still 30 in total.
- **Handled differently from the plan:**
  - Articleless items went into Read verses rather than the Uses tab, because the Uses answers are worded around the article.
  - ἀλλήλων isn't parsed, because it has no nominative and the charts need one. It is explained in the Forms lesson instead.

**Left for later:**
- Merkle & Plummer's other adjective material belongs to later chapters and should be picked up in their reviews:
  - πᾶς by position ("all," "whole," "every") → chapter 10;
  - μέγας and πολύς forms → chapter 13;
  - comparative and superlative (-τερος, μείζων, -ιστος, -τατος, the genitive of comparison, ἤ "than," the elative) → chapters 17 and 19, where πλείων and μείζων arrive.
- Mounce's Exegesis section (seven ways the article is used): possibly a reference page.
- Workbook Chapters 6–9 Review #2 (case functions, noun rules, the article and ending charts): possibly a review quiz.
- English → Greek sentences (Merkle & Plummer part E).

## Chapter 10: Third declension

**Sources:**
- Mounce §10.1–10.26;
- workbook Exercise 10 (master chart from memory, parsing, warm-up α–η, translation 1–10, additional 11–20, summary), plus the Chapters 6–9 Review #2 passage (1 John 4:1–6);
- Merkle & Plummer ch. 14 (third declension nouns), relevant parts only.

**Already covered before the review:**
- *Forms*: charts for σάρξ, ὄνομα, πᾶς, τίς and εἷς. The lesson covers the 3rd-declension endings, stem from the genitive, the Square of Stops, τ dropping, ντ + σ, and the -ος / -α look-alikes.
- *Stops & stems*: stop + σ items and "find the stem" from the lexical form.
- *Parse*: the five charts.
- *πᾶς agreement*: πᾶς with nouns of all three declensions.
- *τίς or τις?*: 16 verses.

**Gaps found:**

| # | Gap | Source |
|---|---|---|
| 1 | No full-sentence translation, as in chapters 8–9 before their reviews. | Workbook translation 1–10 and additional 11–20; Merkle & Plummer practice C |
| 2 | Parsing lacks σῶμα, πνεῦμα (a previous word whose genitive must now be learned), Σίμων, the indefinite τις (accented differently from τίς) and οὐδείς. | Workbook parsing (σῶμα, πνεύματα, τινες…); Mounce vocabulary and previous words |
| 3 | No drill telling 3rd-declension forms from 1st/2nd, or reading a form through its article (-ος: ὁ λόγος vs τῆς σαρκός vs τὸ ἔθνος). | Merkle & Plummer §14.5 #7 and practice B; Mounce §10.16 |
| 4 | Gender of 3rd-declension nouns isn't drilled: learn the article with the lexical form; -μα nouns are always neuter. | Mounce §10.15; Merkle & Plummer §14.3 and §14.5 #6 |
| 5 | The Master Case Ending Chart (1st/2nd beside 3rd) is never written out from memory. The lesson shows only the 3rd declension. | Mounce §10.14; workbook Exercise 10 opener |
| 6 | πᾶς by position isn't taught beyond one line: without the article "every," before the article "all," after it "whole," alone "all (people/things)." | Mounce §10.23; Merkle & Plummer ch. 16 (set aside in the chapter 9 review) |
| 7 | Look-alikes: εἷς/ἕν ("one") vs the prepositions εἰς/ἐν (breathing and accent), and εἰ ("if") vs εἶ ("you are"). | Mounce §10.12 and vocabulary notes |
| 8 | Lesson points missing: all four hints spelled out (ν drops before σ: τιν + ς → τίς); the adjective categories 2-1-2, 3-1-3, 2-2, 3-3; ὁ δέ "but he"; the εἰ μή "except" idiom; double accusatives. | Mounce §10.6, §10.24–25, vocabulary; workbook summary |

**What was built (2026-09-27):**
1. **Read verses for chapter 10** (gaps 1, 7, 8): about 14 SBLGNT verses, mostly the workbook's and Merkle & Plummer's references. Candidates: Mk 9:37, Mt 19:5, Mt 12:48, Jn 3:26, Lk 1:49, Jn 2:21, Mk 10:18 (εἰ μή; double accusative), 1 Cor 12:3, Mt 16:13, 1 Cor 9:22, Lk 7:35, Rom 8:9, 1 Cor 2:12, Col 1:18, Eph 1:15. Each verse asks, in order: parse the highlighted third-declension word, say what it is doing (or which word πᾶς goes with), then translate the whole sentence.
2. **More parsing** (gap 2): charts for σῶμα, πνεῦμα, Σίμων, τις and οὐδείς, plus a lexical-form question as in chapter 9.
3. **Declension and gender drill** (gaps 3 and 4): "Which declension?" for mixed forms, "What case is it? Use the article" for -ος, -α and -ι look-alikes, and "What gender is ὄνομα / σάρξ / Σίμων?"
4. **Master Case Ending Chart** (gap 5): fill it in from memory, 1st/2nd and 3rd side by side, like the εἰμί chart.
5. **πᾶς uses** (gap 6): verses and phrases with πᾶς by position ("every," "all," "whole," "all things"), treated as a guideline, as both books say.
6. **Look-alikes** (gap 7): quick questions on εἷς/εἰς, ἕν/ἐν, εἰ/εἶ (and the existing τίς/τις).
7. **Lesson updates** (gap 8), and the **chapter 10 test** updated to include the new drills.
8. *Optional:* add 1 John 4:1–6 (the workbook's Review #2 passage) to the Reader.

Details of what shipped (all 8 steps):
- **Read verses tab:** 16 verses in `src/data/chapter10Extras.ts`, with the questions in `src/lib/d3ReadingQuestions.tsx`. Each asks you to parse the word in context (other parsings of the same form are never wrong answers; the explanation lists them), then, for πᾶς with a noun, which word it agrees with, then to translate.
- **Parse tab:** now includes σῶμα, πνεῦμα, Σίμων, τις and οὐδείς (collapsed charts on Forms), plus lexical-form questions. The chapter 9 lexical-form question was generalised to nouns.
- **Declension & gender tab:** 20 rule items (which declension, case through the article, gender).
- **Case ending chart tab:** type the chart from memory, as Mounce's true endings or with the stem vowel. A dash means "no ending" (a blank never counts). Each cell is a progress item.
- **πᾶς tab** (was "πᾶς agreement"): agreement mixed with 10 meaning items, plus a lesson on position.
- **Look-alikes tab:** εἷς/εἰς, ἕν/ἐν, ἕνα, εἰ/εἶ, τί/τι.
- **Lessons:** the four hints in full, adjective patterns, ὁ δέ, double accusative. The Square of Stops items gain τιν + ς and τιν + σι.
- **Skills:** lexical form, case ending chart, declension & gender, πᾶς meaning, look-alikes, reading verses.
- **Chapter 10 test:** "Third declension" adds a chart cell and a declension/gender item; the second area became "πᾶς, τίς and verses" with a verse to parse and translate. Still 30 questions.
- **Reader:** 1 John 4:1–6, "Test the spirits," added via `scripts/build-readings.py`.

**Left for later (from Merkle & Plummer ch. 14):**
- Noun variations χάρις (acc χάριν), πίστις (-εως), liquid nouns (πατήρ, ἀνήρ) → chapter 11 review, where those nouns arrive.
- ἔθνος (-ους, ἔθνη) and βασιλεύς (-έως) → the chapters where Mounce introduces them.
- Merkle & Plummer's ch. 14 vocabulary (αἷμα, πούς, ὕδωρ, φῶς, χείρ…) is spread over later Mounce chapters.
- English → Greek sentences (practice D).

## Chapter 11: First and second person personal pronouns

**Sources:**
- Mounce §11.1–11.15 (pronouns, then more third declension);
- workbook Exercise 11 (parsing, warm-up α–η, translation 1–10, additional 11–20, English → Greek 1–10, summary);
- Merkle & Plummer ch. 9 (personal and relative pronouns), first- and second-person parts only, at the user's request. Relative pronouns belong to the chapter 14 review, and αὐτός to chapter 12.

**Already covered before the review:**
- *Forms*: the ἐγώ/σύ/ἡμεῖς/ὑμεῖς chart with a lesson on the emphatic and enclitic forms, nominative pronouns for emphasis, and the possessive genitive.
- *Parse*, *Meaning* (Greek → English), and emphatic vs. enclitic.
- *In verses*: about 22 verse items asking who (person/number) and which case.
- *New nouns*: πατήρ, ἀνήρ, πίστις, χάρις.

**Built at the user's request (2026-09-27):** the Forms chart is now a **reference chart**. You can hide the Greek (both forms where there are two) or the English, reveal cells one at a time, and use Show all / Hide all, like the εἰμί reference.

**Gaps found:**

| # | Gap | Source |
|---|---|---|
| 1 | The paradigm is never written out from memory. | Merkle & Plummer practice A; Mounce §11.7 ("should still memorize this paradigm") |
| 2 | No English → Greek: "to me," "our," "you (plural)" → the Greek form; or a description ("1st person dative plural") → the form. | Workbook English → Greek 1–10; Merkle & Plummer practice B |
| 3 | Verses only ask who and which case; nothing translates the whole sentence, and the workbook's longer verses aren't there (Mk 1:8, Jn 5:43, Mt 23:8, Mk 2:5, Mt 11:27; Merkle & Plummer: Mt 5:23, Jn 20:17, Mt 10:38). | Workbook translation 1–10; Merkle & Plummer practice D |
| 4 | Emphasis isn't drilled in context: a nominative pronoun the verb doesn't need usually marks emphasis or contrast (Mk 1:8 ἐγώ … αὐτός; English may add "myself," "himself"). | Mounce §11.8; Merkle & Plummer §9.6 |
| 5 | Lesson points missing: a pronoun agrees with its antecedent in person and number but takes its case from its own job; the plurals differ only in the first letter (ἡμ-/ὑμ-); the genitive -ου and dative -ι echo the noun endings; μου/σου usually follow their noun; an enclitic can put an accent on the word before it (τὸ ὄνομά μου); parse person, case and number, not gender. | Mounce §11.3, §11.7–11.10; Merkle & Plummer §9.3, §9.5 |
| 6 | More third declension: the charts lack φῶς, ἐλπίς, ὕδωρ and μήτηρ (the workbook parses ὕδατα, πίστιν, πίστεις, πατρός). Not explained: χάρις's accusative χάριν; the πίστις type (ε before vowel endings, all feminine); πατήρ's stem shifting η/ε/∅ with dative plural πατράσι; ὕδωρ's ρ/τ. | Mounce §11.11–11.15; Merkle & Plummer ch. 14 (set aside in the chapter 10 review) |

**What was built (2026-09-27):**
1. **Fill in the chart** from memory (typed), like the εἰμί chart.
2. **English → Greek** drill: from an English gloss or a description (1st/2nd person, case, number) to the form.
3. **Read verses:** add a whole-sentence translation step, plus the workbook's and Merkle & Plummer's longer verses.
4. **Emphasis in context:** for verses with an unneeded nominative pronoun, ask why it is there (emphasis or contrast), with Mk 1:8 as the model.
5. **Lesson updates** for gap 5.
6. **More third-declension nouns:** charts and parsing for φῶς, ἐλπίς, ὕδωρ, μήτηρ, and a lesson on the χάρις, πίστις, πατήρ and ὕδωρ patterns.
7. **Chapter 11 test** updated with the new drills.

Details of what shipped (all 7 steps):
- **Fill the chart tab:** 16 typed cells; either form counts where there are two (μου or ἐμοῦ). Results share progress with the description → Greek items.
- **English → Greek tab:** from an English gloss or a description ("2nd person genitive plural"). The enclitic form is the answer, and the same slot's emphatic form is never offered as a wrong one.
- **In verses tab:** 9 new verses (Mk 1:8, Jn 5:43, Mt 23:8, Mk 2:5, Mk 10:28, Jn 20:17, Mt 5:23, Mt 10:38, Jn 20:28) with whole-sentence translation. 7 verses flagged `stress` ask why the nominative pronoun is written out.
- **New nouns tab:** adds μήτηρ (singular only), ἐλπίς, φῶς, ὕδωρ and θέλημα, with lesson lines on dental stems, the πίστις type, ὕδωρ and μήτηρ.
- **Lessons:** antecedent vs. case, ending echoes and ἡμ-/ὑμ-, μου/σου after the noun with the enclitic accent, parsing by person.
- **Skills:** "Pronouns: English → Greek"; the verse skill adds stress and translate items.
- **Chapter 11 test:** forms 3 parse + 3 meaning + 2 produce; verses 4 who/case + 1 emphasis + 1 translation. Still 30 questions.

**Left for later:** Merkle & Plummer §9.7–9.9 (relative pronouns) → chapter 14 review; intensive and identical αὐτός → chapter 12 review. The workbook summary's μή/οὐ questions and the subject inside a participial phrase belong to later chapters.

## Chapter 12: αὐτός

**Sources:**
- Mounce §12.1–12.12;
- workbook Exercise 12 (parsing, warm-up α–η, translation 1–10, additional 11–20, English → Greek 1–10, summary);
- Merkle & Plummer ch. 9, third-person parts (§9.3–9.4 chart, §9.5, emphatic, intensive and identical uses).

**Already covered before the review:**
- *Forms*: the αὐτός chart (plus αἰών, πούς), with a lesson on the three uses.
- *Parse*: those charts.
- *Uses*: about 25 items (11 personal pronoun, 7 intensive, 7+ identical) asking the use with its reason and how to translate the highlighted αὐτός.

**Gaps found:**

| # | Gap | Source |
|---|---|---|
| 1 | No reference chart with English (he/his/him, she/her, it/its, they/their/them) that can hide the Greek or the English, as chapters 8 and 11 now have. There is also no single chart of all the personal pronouns, 1st, 2nd and 3rd person. | Mounce §12.1, §12.4; Merkle & Plummer §9.4 |
| 2 | No English → Greek for the third person: "him," "its," "to them," "their," "her (possessive)"… | Workbook English → Greek 1–10 |
| 3 | No whole-sentence translation, and the workbook's and Merkle & Plummer's verses aren't there (Mk 9:20 αὐτὸν πρὸς αὐτόν, Jn 4:2, Jn 14:11, 1 Cor 1:10, Mt 17:8, Jn 2:24, Lk 6:23, Acts 2:36; Acts 20:35, Phil 2:24, Acts 10:26, Rom 2:1). | Workbook translation and additional; Merkle & Plummer practice D |
| 4 | Gender in translation isn't drilled: with a personal antecedent follow natural gender ("her"); with a thing follow English sense ("it"), even for a masculine or feminine form (αὐτήν = the gate, Mt 7:14). | Mounce §12.7, §12.9 |
| 5 | After a preposition the genitive is not possessive: πρὸ αὐτῶν is "before them," not "before their." | Mounce §12.9 |
| 6 | Intensive rules not fully taught: αὐτός has no article while its noun usually does; it can intensify ἐγώ/σύ or a subject that is only in the verb (καὶ ἐγὼ αὐτὸς ἄνθρωπός εἰμι, Acts 10:26; καὶ αὐτὸς … ἐλεύσομαι, Phil 2:24); αὐτός alone in the nominative adds emphasis ("he himself," Acts 20:35). | Mounce §12.10–12.11; Merkle & Plummer, intensive and emphatic use |
| 7 | Identical rule not stated as a test: the article directly before αὐτός means "same" (Merkle & Plummer); usually attributive but not always (Ἐν αὐτῇ τῇ ὥρᾳ, "in that very hour," Lk 13:31); αὐτός alone as a noun (ὁ αὐτός, τὸ αὐτό). | Mounce §12.12; Merkle & Plummer, identical use |
| 8 | Workbook points: the dative tells *when* (τῇ τρίτῃ ἡμέρᾳ), the accusative *how long* (πάσας τὰς ἡμέρας, Mt 28:20); μέν … δέ; μόνον used as an adverb; μηδείς declines like οὐδείς; πούς is like ἐλπίς but lengthens ο to ου (dative ποσί). | Workbook summary; Mounce vocabulary notes |

**What was built (2026-09-28):**
1. **Reference charts:**
   - αὐτός with English, hide the Greek or the English, reveal by cell;
   - an **all personal pronouns** reference (1st, 2nd, 3rd person) on the same screen, with the same hiding.
2. **English → Greek** for αὐτός, from an English pronoun (with its gender) or a description ("3rd person feminine genitive singular").
3. **Read verses:** about 14 SBLGNT verses taken apart: which use (pronoun, intensive, identical); how to translate αὐτός here ("him," "it," "himself," "the same"); the whole sentence. Includes the gender, preposition, 1st-person intensive, emphatic αὐτός, predicate-position "same" and time-expression cases.
4. **Lesson updates** for gaps 4–8.
5. **Nouns:** add μηδείς to the charts; note the ποσί pattern.
6. **Chapter 12 test** updated with the new drills.

Details of what shipped (all 6 steps):
- **Forms tab:** an αὐτός reference chart (gender columns, singular and plural) and an *All the personal pronouns* chart (1st, 2nd, 3rd masc/fem/neut). Each hides the Greek or the English on its own, cell by cell. Both use a new shared `ReferenceChart` component, which the chapter 11 pronoun chart now uses too.
- **English → Greek tab:** 24 slots, from English ("her (possessive)", "to them (feminine)") or a description ("3rd person feminine dative plural"). Only forms other than the answer are offered as wrong.
- **Read verses tab:** 16 SBLGNT verses (Mk 9:20, Mt 7:14, Jn 10:4 twice, Acts 2:36, Acts 20:35, Jn 4:2, Jn 2:24, Jn 14:11, Mt 17:8, Phil 2:24, Acts 10:26, 1 Cor 1:10, Lk 6:23, Rom 2:1, Lk 13:31), each asked in three steps: use, the highlighted word, the whole sentence. All checked word for word against MorphGNT. Lk 13:31 is the one allowed exception to the test that "identical" means an article right before αὐτός.
- **Lessons:** "Translating αὐτός well" (gender in English, the genitive after a preposition, intensive with ἐγώ/σύ or a verb's subject, emphatic nominative, identical alone and Luke's "that very") and "Also in this chapter" (time expressions, μέν … δέ, μόνον, μηδείς, πούς). The rule labels now say that with a 1st/2nd-person verb αὐτός is "myself," and that a nominative αὐτός with a 3rd-person verb is emphatic "he himself."
- **Nouns:** μηδείς added to the charts and parsing.
- **Skills:** "αὐτός: English → Greek" and "αὐτός: read verses".
- **Chapter 12 test:** forms 4 parse + 2 English → Greek; uses 3 use + 2 translate + 1 verse use + 1 verse word + 1 whole sentence. Still 30 questions.

**Left for later:**
- The workbook's Exercise 12 parsing grid is mostly demonstratives (τούτων, ἐκείνας, αὕτη), which belong to chapter 13 → chapter 13 review.
- English → Greek sentences (Merkle & Plummer practice E).

## Chapter 13: Demonstrative pronouns and adjectives

**Sources:**
- Mounce §13.1–13.13 (demonstratives, the vocative, degrees of adjectives, crasis, πολύς) and the vocabulary notes;
- workbook Exercise 13 (parsing, warm-up α–η, translation 1–10, additional 11–20, summary);
- Merkle & Plummer ch. 20, "Other Pronouns," the demonstrative parts only (§20.2–20.3 and practice items on demonstratives).

**Already covered before the review:**
- *Forms*: charts for οὗτος, ἐκεῖνος, μέγας, πολύς, γυνή, πόλις, with a lesson (breathing/τ, αυ/ου, no ν in the neuter, pronoun vs. adjective).
- *Parse* those charts; *Agreement* of οὗτος/ἐκεῖνος with nouns.
- *Uses*: 23 items, pronoun or adjective with the reason, and how to translate the highlighted word.

**Gaps found:**

| # | Gap | Source |
|---|---|---|
| 1 | No reference chart with English that can hide the Greek or the English, as chapters 8, 11 and 12 now have. As a pronoun the English needs a helping word by natural gender: οὗτος "this man," αὕτη "this woman," τοῦτο "this thing," ταῦτα "these things." | Mounce §13.7; Merkle & Plummer §20.3 |
| 2 | Look-alikes aren't drilled: αὕτη/αὗται (demonstrative, rough breathing, accent on the first syllable) vs. αὐτή/αὐταί (personal pronoun, smooth breathing, accent on the last); ταῦτα vs. αὐτά; ἤ ("or, than") vs. ἡ (the article); κἀγώ as καί + ἐγώ (crasis, also κἀμέ, κἀμοί). | Mounce §13.6, §13.12, vocabulary notes; Merkle & Plummer §20.3 point 4 |
| 3 | The **vocative** isn't taught anywhere: the plural is the same as the nominative; first-declension singular is the same as the nominative; second-declension singular usually ends in ε (κύριε, ἄνθρωπε); third-declension singular is usually the bare stem (πάτερ, γύναι). Verses: Matt 7:21, Acts 1:11, Luke 12:19, Luke 5:20, Matt 6:9; workbook warm-up δ and translation 7, 10. | Mounce §13.10; workbook |
| 4 | No whole-sentence translation, and the workbook's and Merkle & Plummer's verses aren't there (John 10:18, Matt 22:38, John 13:17, John 4:39, John 8:47, John 1:7–8, 1 John 3:3, Mark 11:28, Matt 6:33, John 11:47, Matt 10:2, John 14:20, Mark 13:32; Mark 15:39, Rom 8:9, John 2:21, John 4:42, Matt 13:34, Mark 14:71, John 9:28, Rom 7:24, Acts 9:36, Luke 15:3, Luke 20:18). | Workbook translation and additional; Merkle & Plummer practice C |
| 5 | No English → Greek: "these things," "to that woman," "of this (masc.)" → the form. | Merkle & Plummer practice B and D |
| 6 | Lesson points missing: the difference between οὗτος and ἐκεῖνος is often not distance but "just mentioned" vs. "mentioned earlier"; John often uses them where English says "he"; ἐκεῖνος can be disparaging or contrastive ("*that* man," Jas 1:7); διὰ τοῦτο = "for this reason"; the noun with a demonstrative always has the article. | Mounce §13.8–13.9; Merkle & Plummer §20.2–20.3; workbook summary |
| 7 | Degrees of adjectives aren't mentioned: positive, comparative, superlative (μέγας, μείζων, μέγιστος); in Koine the comparative often does the superlative's job. An adjective can work as an adverb, usually in the neuter accusative (πολύ, πολλά "much, often"; πρῶτον "first"). | Mounce §13.11; workbook summary; Merkle & Plummer ch. 16 (set aside in the chapter 9 review) |
| 8 | πολύς and μέγας: the exact exceptions aren't stated (πολύς, πολύν, πολύ with one λ and υ; μέγας, μέγαν, μέγα). ἑαυτοῦ is only vocabulary: it has no nominative, declines like αὐτός, and in the plural can be "ourselves, yourselves." | Mounce §13.13, vocabulary notes |

**What was built (2026-09-28):**
1. **Reference chart** for οὗτος and ἐκεῖνος with English as a pronoun ("this man / this woman / this thing"), hide the Greek or the English, reveal by cell (the shared `ReferenceChart`).
2. **Look-alikes** drill: αὕτη vs. αὐτή, αὗται vs. αὐταί, ταῦτα vs. αὐτά, ἤ vs. ἡ, κἀγώ/κἀμοί, each in a short phrase or verse: which word is it, and what does it mean?
3. **Vocative**: a lesson with the four rules, a chart of vocatives for nouns already learned (κύριε, ἄνθρωπε, ἀδελφέ, υἱέ, διδάσκαλε, πάτερ, γύναι, and plural ἄνδρες), and a drill: spot the vocative in a verse, and noun → vocative. Every form checked against MorphGNT.
4. **Read verses:** about 16 SBLGNT verses from the workbook and Merkle & Plummer, each in three steps: pronoun or adjective, the highlighted word, the whole sentence (the same format as chapter 12).
5. **English → Greek** for οὗτος and ἐκεῖνος, from English with gender or a description.
6. **Lesson updates** for gaps 6–8, with ἑαυτοῦ added to the charts.
7. **Chapter 13 test** updated with the new drills.

Details of what shipped (all 7 steps):
- **Forms tab:** reference charts for οὗτος and ἐκεῖνος ("this man / of this woman / these things"), each hiding the Greek or the English on its own. Lessons "Translating demonstratives" and "Also in this chapter" (πολύς/μέγας exceptions, adjectives as adverbs, degrees, crasis, ἑαυτοῦ with a genitive/dative/accusative chart). Shared helpers: `numberRows` (src/lib/chartRows.ts) and `nearbyForms` (declensionQuestions), which chapter 12 now uses too.
- **English → Greek tab:** οὗτος and ἐκεῖνος, 24 slots each, from English with a helping word ("to that woman", "these men (subject)") or a description.
- **Read verses tab:** 17 SBLGNT verses (John 10:18, Matt 22:38, John 13:17, John 4:39, John 8:47, 1 John 3:3, Mark 11:28, John 11:47, Matt 10:2, John 14:20, Mark 15:39, Rom 8:9, John 2:21, Mark 14:71, John 9:28, Acts 9:36, Rom 7:24) in three steps, like chapter 12. They pass the same test as the Uses items: adjective exactly when an agreeing article is next to the demonstrative.
- **Look-alikes tab:** 12 items (αὕτη/αὐτή/αὗται, ταῦτα/αὐτά, ἤ "or"/"than"/ἡ, κἀγώ/κἀμοί/κἀμέ) with a short lesson.
- **Vocative tab:** the four rules, a chart of 14 vocatives (every one found as a vocative in MorphGNT), noun → vocative, and "which case?" in 14 verses (12 vocatives, 2 nominatives as contrast). Some wrong options are made-up forms that follow the wrong rule (ψυχέ, τέκνε, Ἰησέ).
- **Skills:** English → Greek, read verses, look-alikes, vocative.
- **Chapter 13 test:** vocab 10, forms 5 (3 parse + 2 English → Greek), in use 7, look-alikes 2, vocative 3, agreement 1, review 2. Still 30 questions.

**Left for later:**
- Exercise 13's parsing grid is mostly relative pronouns (ἅ, ᾧ, ἥν…), which belong to chapter 14 → chapter 14 review.
- Merkle & Plummer §20.4–20.8 (reflexive, reciprocal, interrogative/indefinite pronouns, pronominal adjectives) beyond the ἑαυτοῦ note; comparative forms in detail → chapters 17/19 review.
