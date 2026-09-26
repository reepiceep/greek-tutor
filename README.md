# Θεόφιλος · Theophilus

*“…so that you may know the certainty of the things you have been taught.”* (Luke 1:4). Theophilus, “friend of God,” is the reader Luke wrote his Gospel and Acts for.

A study app for Mounce, *Basics of Biblical Greek* (4th ed.). Covers chapter 8 (prepositions and εἰμί), chapter 9 (adjectives), chapter 10 (third declension), chapter 11 (first and second person pronouns), chapter 12 (αὐτός), chapter 13 (demonstratives), chapter 14 (relative pronoun), chapter 15 (introduction to verbs), chapter 16 (present active indicative) and chapter 17 (contract verbs); pick the chapter at the top of the page. Light (Manuscript) and dark (Aegean) themes: use the button next to the chapter picker.

```sh
npm install
npm run dev      # http://localhost:5173
npm test         # vitest
```

- **Today** (daily review): everything due from every chapter, most fragile first (up to 20 a session), plus a few new items from the current chapter. Spaced repetition: after a right answer an item comes back in 1, 3, 7, 16, 35, then 90 days; a miss brings it back at once. Finishing a session counts toward a daily streak. The nav shows how many are due.
- **Nouns** are always shown in their full lexical form, as in Mounce: nominative, genitive ending and article (θάνατος, -ου, ὁ).
- **Flashcards**: the chapter’s words, both directions, or pick a range of chapters (e.g. 8–14) for rounds of the 30 cards you know least; each card still counts toward its own chapter. Missed cards come back until you know them. Tick “one card per case” to split prepositions (μετά + gen → with, μετά + acc → after); English → Greek cards add a first-letter hint when the meaning and case could be another preposition.
- **Memory hooks**: 62 vocabulary words (plus all 17 prepositions) have an English derivative or relative shown under the meaning on flashcards and in quiz feedback (θάνατος → euthanasia, ὀφθαλμός → ophthalmology, ὁδός → exodus). Words without a genuine one have no hook. Add or edit them with the `hook` field in `src/data/chapterNN.ts`.
- **Vocab quiz**: multiple choice or typed answers, weakest words first. Choose a chapter range (e.g. Ch 8 to 14, or “All”) to mix vocabulary from several chapters; each word still counts toward its own chapter. 10, 20 or 50 questions.
- **εἰμί drill**: fill in the present paradigm, or identify person and number from a form. Plus:
  - *Subject & predicate*: which nominative is the subject (pronoun → article → proper name; word order never decides) and which translation is right, using verses like θεὸς ἦν ὁ λόγος and ὁ θεὸς ἀγάπη ἐστίν.
  - *Enclitics*: which forms of εἰμί are enclitic (all but εἶ), how host + enclitic are accented, and which accent rule explains a real verse (ἄνθρωπός εἰμι, ἀγάπη ἐστίν, Ἐγώ εἰμι, οὐκ ἔστιν…).
- **Prepositions**:
  - *Meaning & case*: "μετά + acc = ?" and "which case gives διά 'on account of'?"
  - *Phrases*: translate phrases like διὰ τὸν θάνατον by reading the object's case.
  - *Diagram*: pictures of the spatial prepositions (explore, then quiz).
  - *Elision*: how ἀπό, διά, ἐκ, μετά, παρά, ὑπό change before vowels and rough breathing, and recognizing ἀφ᾽, μεθ᾽, ὑφ᾽, etc.

- **All prepositions**: every preposition from chapters 6–14 (ἐν, εἰς, the chapter 8 set, περί, σύν, ἐπί, ἔξω, ἕως, ὑπέρ, ἐνώπιον, κατά), limited to "through chapter N". Tabs: a reference chart (with hide-and-reveal), meaning & case, phrases, sentences, diagram, elision.
- **Preposition games** (Games tab in both preposition views): *Match* (pair preposition + case with its meaning against the clock), *Memory* (the same pairs face down), and a 60-second *Speed round* with streak bonuses. Best results are saved; games don't change progress. Each preposition has a memory hook (ὑπό → hypodermic), shown in the Reference chart and game feedback.
- **Sentences** (in both preposition views): real NT verses from the SBLGNT with the preposition phrase highlighted; pick the English that fills the blank in a literal translation.
- **Adjectives** (chapter 9): paradigm charts for ἀγαθός, πονηρός, ἅγιος (2-1-2) and αἰώνιος (2-2); parsing (ambiguous forms never have another valid reading as a wrong answer); agreement with a noun phrase; attributive / predicate / substantival use with the reason, from NT verses and practice phrases.
- **3rd declension** (chapter 10): endings chart and Square of Stops lesson; charts for σάρξ, ὄνομα, πᾶς, τίς, εἷς; stop + σ and stem + ending drills; finding the stem from the genitive; parsing; πᾶς agreement with nouns of every declension; τίς (who?) vs τις (someone) in NT verses.
- **Pronouns** (chapter 11): chart of ἐγώ/σύ/ἡμεῖς/ὑμεῖς with emphatic and enclitic forms; parsing; meaning (the ἡμ-/ὑμ- counterpart is always a distractor); who and which case in 22 NT verses; the new nouns πατήρ, ἀνήρ, πίστις, χάρις.
- **αὐτός** (chapter 12): chart and lesson on its three uses; parsing (plus αἰών, πούς); personal pronoun / intensive / identical with the reason, and how to translate it, in 22 verses and practice phrases.
- **Demonstratives** (chapter 13): charts for οὗτος, ἐκεῖνος, μέγας, πολύς, γυνή, πόλις; parsing; agreement with nouns of every declension; pronoun or adjective (the trap: outside the article but still “this word”), from 20 NT verses.
- **Relative pronoun** (chapter 14): chart of ὅς, ἥ, ὅ (plus χείρ, ῥῆμα); parsing; article or relative (ὁ/ὅ, ἡ/ἥ/ἤ, οὐ/οὗ); in 13 NT verses and practice phrases: find the antecedent, explain the case (the trap: “it copies its antecedent’s case”), translate who/whom/which/whose.
- **Verbs** (chapter 15, no new vocabulary): lesson and reference table of verb terms (person, number, agreement, tense = aspect + time, voice, mood, lexical form, stem, connecting vowel, personal ending, parsing); term ↔ definition quiz; analysing English verbs (person/number, time, aspect, voice, mood); splitting Greek verbs into stem + connecting vowel + ending (λυ + ο + μεν).
- **Present tense** (chapter 16): lesson with the endings ω, εις, ει, ομεν, ετε, ουσι(ν) on λύω; type the full chart for λύω, ἀκούω, βλέπω, ἔχω, λέγω or πιστεύω; parse, translate and pick forms of all six (generated from each verb's stem); endings ↔ person; present verbs in SBLGNT verses (person and number, lexical form).
- **Contract verbs** (chapter 17, same screen as chapter 16): lesson with the contraction rules and the ἀγαπάω / ποιέω / πληρόω charts (and a note on οἶδα); type the chart for any of seven contract verbs; parse, translate and pick forms; contraction drills (α + ει → ᾳ, and which kind of contract verb a form comes from, asked only when the form shows it); contract verbs in SBLGNT verses.
- **Test**: 30 mixed questions per chapter (ch 8: vocab 10, εἰμί 6, prepositions 7, phrases 4, elision 3; ch 9: vocab 10, adjective forms 8, adjective use 8, chapter 8 review 4; ch 10: vocab 10, third declension 10, πᾶς and τίς 6, review 4; ch 11: vocab 10, pronoun forms 8, pronouns in verses 6, new nouns 3, review 3; ch 12: vocab 10, αὐτός forms 6, αὐτός uses 8, new nouns 2, review 4; ch 13: vocab 10, demonstrative forms 6, demonstratives in use 8, agreement 3, review 3; ch 14: vocab 10, relative forms 6, relative clauses 10, review 4), answers revealed at the end. You're *ready* for the next chapter at ≥90% in every area.
- **Home**: readiness from your latest test, learned % per skill, your most-missed items, and backup.

Progress is stored in the browser (`localStorage`). An item counts as "learned" once it reaches Leitner box 3 (two correct in a row); boxes go up to 7 for the review spacing. Use **Export progress** on the home page to save a JSON backup, and **Import progress** to restore it or move it to another browser.

## Pronunciation
Every vocabulary word has a speaker button (flashcards, vocab quiz, daily review and word details), and the recording plays automatically when the Greek appears (turn this off in Settings). Recordings are Bill Mounce's, played straight from `greek.billmounce.com`, so they need an internet connection. Choose **Erasmian** (Mounce, as taught in BBG) or **Modern Greek** on the home page, and optionally turn on autoplay. In flashcards, press **P** to hear the word. The URLs are in `src/data/audio.ts`; `src/data/audio.test.ts` checks every vocabulary word has both recordings.

## Typing Greek
Latin letters become Greek (`a b g d e z h q i k l m n c o p r s t u f x y w`). Put diacritics after the letter:
`)` smooth, `(` rough, `/` acute, `\` grave, `=` circumflex, `|` iota subscript, `'` elision. Example: `h(me/ra` → ἡμέρα.

## Sources
Greek sentences are from the [SBL Greek New Testament](https://github.com/LogosBible/SBLGNT) (CC BY 4.0, Society of Biblical Literature and Logos Bible Software). English translations are written for this app. Preposition data lives in `src/data/prepositions.ts`.

## Adding a chapter
Add `src/data/chapterNN.ts` (see `chapter08.ts` and `chapter09.ts`), register it in `src/data/chapters.ts`, list its practice screens in `topics`, and add its test layout to `SPECS` in `src/lib/chapterTest.ts`. Chapter files hold vocab (with `accept` glosses) plus optional sections such as `phrases`, `predicates` or `adjectives`; `chapter08.test.ts` and `chapter09.test.ts` show the consistency checks to copy.

## Deploying to Vercel

The app is a static Vite build with no server and no environment variables, so Vercel needs no special setup.

1. Push the repo to GitHub, GitLab or Bitbucket.
2. In Vercel choose **Add New → Project**, import the repo. The repo root is the app, so leave **Root Directory** as it is.
3. Deploy. `vercel.json` sets the framework (Vite), build command (`npm run build`, which type-checks then builds) and output folder (`dist`), and adds long-lived caching for the hashed files in `/assets` plus a few basic security headers. Node 24 is requested in `package.json`.

Or from the terminal: `npx vercel` (preview) and `npx vercel --prod`.

Notes:
- Progress is saved in each browser's localStorage, so it is per device and per address. Use the backup export on the dashboard to move it between devices or to a new domain.
- Fonts come from Google Fonts and the pronunciation audio streams from `greek.billmounce.com`, so the deployed site needs internet access for both.
- There is no client-side routing, so no rewrite rules are needed.
