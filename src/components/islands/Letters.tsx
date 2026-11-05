import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

export interface LetterItem {
  quote: string;
  who: string;
  detail: string;
  src: string;
  alt: string;
}

const AUTOPLAY_MS = 9000;

/** Long-form parent letters. Slow auto-rotate for reading, paused on hover or focus. */
export default function Letters({ items }: { items: LetterItem[] }) {
  const reduce = useReducedMotion();
  const [i, setI] = useState(0);
  const [paused, setPaused] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  const go = (n: number) => setI((n + items.length) % items.length);

  useEffect(() => {
    if (reduce || paused) return;
    const t = window.setTimeout(() => go(i + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(t);
  }, [i, paused, reduce]);

  const item = items[i];
  const dur = reduce ? 0 : 0.6;

  return (
    <div
      className="letters"
      ref={wrapRef}
      role="region"
      aria-roledescription="carousel"
      aria-label="Cerita orangtua"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <div style={{ minHeight: 'min(380px, 70vh)' }} aria-live={paused ? 'polite' : 'off'}>
        <AnimatePresence mode="wait" initial={false}>
          <motion.div
            key={i}
            className="letter"
            initial={{ opacity: 0, y: reduce ? 0 : 24 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: reduce ? 0 : -16 }}
            transition={{ duration: dur, ease: [0.16, 1, 0.3, 1] }}
          >
            <figure className="print letter__photo" data-tape>
              <img src={item.src} alt={item.alt} width="900" height="675" />
            </figure>
            <div className="letter__paper">
              <blockquote>“{item.quote}”</blockquote>
              <p className="letter__who">
                <b>{item.who}</b>
                <span>{item.detail}</span>
              </p>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="letters__controls">
        <button type="button" className="letters__btn" onClick={() => go(i - 1)} aria-label="Cerita sebelumnya">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M15 5l-7 7 7 7" /></svg>
        </button>
        <div className="letters__dots" role="group" aria-label="Pilih cerita">
          {items.map((_, n) => (
            <button
              key={n}
              type="button"
              className="letters__dot"
              aria-label={`Cerita ${n + 1} dari ${items.length}`}
              aria-current={n === i}
              onClick={() => go(n)}
            />
          ))}
        </div>
        <button type="button" className="letters__btn" onClick={() => go(i + 1)} aria-label="Cerita berikutnya">
          <svg className="icon" viewBox="0 0 24 24" aria-hidden="true"><path d="M9 5l7 7-7 7" /></svg>
        </button>
      </div>
    </div>
  );
}
