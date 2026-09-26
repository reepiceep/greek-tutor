import type { ChoiceQuestion } from '../components/ChoiceQuiz'
import { ENCLITIC_FORMS, ENCLITIC_RULES, SUBJECT_RULES } from '../data/chapter08Eimi'
import type { Chapter, EncliticItem, EncliticRule, PredicateItem } from '../data/types'
import { encliticFormItemId, encliticItemId, predicateItemId } from './items'
import { shuffle } from './progress'

// Questions for the εἰμί topics: subject vs predicate nominative, and enclitics.

const ARTICLE = /^(ὁ|ἡ|τὸ|τό|οἱ|αἱ|τὰ|τά)\s/

function predicateSentence(p: PredicateItem) {
  return (
    <>
      <p className="sentence greek">{p.text}</p>
      <p className="muted small">{p.ref ?? 'practice sentence'}{p.help && <> · <span className="greek">{p.help}</span></>}</p>
    </>
  )
}

function predicateExplain(p: PredicateItem) {
  return (
    <>
      <p>{SUBJECT_RULES[p.rule].explain}</p>
      <p>
        Subject: <strong className="greek">{p.subject}</strong> · Predicate nominative: <strong className="greek">{p.predicate}</strong>
      </p>
      <p className="english">“{p.translation}”</p>
    </>
  )
}

const withWord = (word: string, reason: string) => ({ key: `${word} — ${reason}`, label: <><span className="greek">{word}</span> — {reason}</> })

/** Which word is the subject, and why? Wrong options use word order, which never decides it. */
export function predicateSubjectQuestion(ch: Chapter, p: PredicateItem): ChoiceQuestion {
  const correct = withWord(p.subject, SUBJECT_RULES[p.rule].reason)
  const subjAt = p.text.indexOf(p.subject)
  const predAt = p.text.indexOf(p.predicate)
  const position = (at: number, other: number) => (at < other ? 'it comes first' : 'it comes last')
  const wrong = p.rule === 'implied'
    ? [
        withWord(p.predicate, 'it is the only nominative'),
        withWord(p.predicate, 'it comes first'),
        withWord(p.predicate, 'it has no article'),
      ]
    : [
        withWord(p.predicate, position(predAt, subjAt)),
        withWord(p.subject, position(subjAt, predAt)),
        withWord(p.predicate, ARTICLE.test(p.predicate) ? 'it has the article' : 'it has no article'),
      ]
  return {
    id: predicateItemId(ch.number, p, 'subject'),
    prompt: <>{predicateSentence(p)}<p className="muted">Which is the subject, and why?</p></>,
    options: shuffle([correct, ...wrong]),
    answer: correct.key,
    explain: predicateExplain(p),
    review: <><span className="greek">{p.text}</span> — subject <span className="greek">{p.subject}</span> ({SUBJECT_RULES[p.rule].reason})</>,
  }
}

export function predicateTranslateQuestion(ch: Chapter, p: PredicateItem): ChoiceQuestion {
  return {
    id: predicateItemId(ch.number, p, 'translate'),
    prompt: <>{predicateSentence(p)}<p className="muted">Which translation is right?</p></>,
    options: shuffle([p.translation, ...p.wrong.slice(0, 3)]).map((t) => ({ key: t, label: t })),
    answer: p.translation,
    explain: predicateExplain(p),
    review: <><span className="greek">{p.text}</span> — {p.translation}</>,
  }
}

export function encliticFormQuestion(ch: Chapter, f: (typeof ENCLITIC_FORMS)[number]): ChoiceQuestion {
  return {
    id: encliticFormItemId(ch.number, f.form),
    prompt: <><span className="greek big">{f.form}</span><p className="muted">“{f.label}” — is it enclitic?</p></>,
    options: [{ key: 'yes', label: 'Enclitic' }, { key: 'no', label: 'Not enclitic' }],
    answer: f.enclitic ? 'yes' : 'no',
    explain: <p>Every present form of <span className="greek">εἰμί</span> is enclitic except <span className="greek">εἶ</span>. The imperfect <span className="greek">ἦν</span> is not enclitic either.</p>,
    review: <><span className="greek">{f.form}</span> is {f.enclitic ? '' : 'not '}enclitic</>,
  }
}

function encliticExplain(e: EncliticItem) {
  return (
    <>
      <p>{ENCLITIC_RULES[e.rule].explain}</p>
      <p className="greek">{e.text} <span className="muted small">({e.ref})</span></p>
    </>
  )
}

/** Which spelling of host + enclitic is accented correctly? */
export function encliticAccentQuestion(ch: Chapter, e: EncliticItem): ChoiceQuestion {
  return {
    id: encliticItemId(ch.number, e, 'accent'),
    prompt: <><span className="greek big">{e.host} + {e.enclitic}</span><p className="muted">How are they accented together?</p></>,
    options: shuffle(e.options).map((o) => ({ key: o, label: o, greek: true })),
    answer: e.options[0],
    explain: encliticExplain(e),
    review: <><span className="greek">{e.host} + {e.enclitic} → {e.options[0]}</span></>,
  }
}

/** In a real verse, which rule explains the accents on host + enclitic? */
export function encliticRuleQuestion(ch: Chapter, e: EncliticItem): ChoiceQuestion {
  const others = shuffle((Object.keys(ENCLITIC_RULES) as EncliticRule[]).filter((r) => r !== e.rule)).slice(0, 3)
  const at = e.text.indexOf(e.pair)
  return {
    id: encliticItemId(ch.number, e, 'rule'),
    prompt: (
      <>
        <p className="sentence greek">{e.text.slice(0, at)}<mark>{e.pair}</mark>{e.text.slice(at + e.pair.length)}</p>
        <p className="muted small">{e.ref}</p>
        <p className="muted">Why are the highlighted words accented this way?</p>
      </>
    ),
    options: shuffle([e.rule, ...others]).map((r) => ({ key: r, label: ENCLITIC_RULES[r].name })),
    answer: e.rule,
    explain: encliticExplain(e),
    review: <><span className="greek">{e.pair}</span>: {ENCLITIC_RULES[e.rule].name.toLowerCase()}</>,
  }
}
