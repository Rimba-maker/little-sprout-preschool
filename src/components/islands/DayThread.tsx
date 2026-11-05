import { useEffect, useRef, useState } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * Red thread that runs down the day timeline and draws as the visitor scrolls.
 * Renders into the absolutely positioned `.day__thread` container, so the
 * timeline markup stays static HTML and works without this island.
 */
export default function DayThread({ targetId }: { targetId: string }) {
  const reduce = useReducedMotion();
  const ref = useRef<SVGSVGElement>(null);
  const [h, setH] = useState(800);

  useEffect(() => {
    const el = document.getElementById(targetId);
    if (!el) return;
    const measure = () => setH(Math.max(200, el.getBoundingClientRect().height));
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(el);
    return () => ro.disconnect();
  }, [targetId]);

  const target = useRef<HTMLElement | null>(null);
  useEffect(() => {
    target.current = document.getElementById(targetId);
  }, [targetId]);

  const { scrollYProgress } = useScroll({ target, offset: ['start 70%', 'end 60%'] });
  const progress = useSpring(scrollYProgress, { stiffness: 90, damping: 24, mass: 0.6 });

  // A hand-pulled thread: gentle sway around the centre line.
  const steps = Math.max(6, Math.round(h / 140));
  let d = `M22 0`;
  for (let i = 1; i <= steps; i++) {
    const y = (h / steps) * i;
    const x = 22 + (i % 2 === 0 ? -9 : 9);
    const cy = y - h / steps / 2;
    d += ` Q ${i % 2 === 0 ? 40 : 4} ${cy} ${x} ${y}`;
  }

  return (
    <svg ref={ref} viewBox={`0 0 44 ${h}`} preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="rgba(255,255,255,0.14)" strokeWidth="2" strokeLinecap="round" strokeDasharray="2 7" />
      <motion.path
        d={d}
        fill="none"
        stroke="#ff5a36"
        strokeWidth="3"
        strokeLinecap="round"
        style={{ pathLength: reduce ? 1 : progress, filter: 'drop-shadow(0 2px 2px rgba(0,0,0,.4))' }}
      />
    </svg>
  );
}
