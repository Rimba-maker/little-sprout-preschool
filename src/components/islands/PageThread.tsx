import { motion, useScroll, useSpring, useReducedMotion } from 'framer-motion';

/**
 * One red thread down the right edge of the wall. It draws with scroll progress
 * and reaches the booking form at the end of the page. Wide screens only, decorative.
 */
export default function PageThread() {
  const reduce = useReducedMotion();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 80, damping: 26, mass: 0.7 });
  const d = Array.from({ length: 24 }, (_, i) => {
    const y = (1000 / 24) * (i + 1);
    const x = 12 + (i % 2 ? 5 : -5);
    return `${i === 0 ? 'M12 0 ' : ''}Q ${i % 2 ? 20 : 4} ${y - 20} ${x} ${y}`;
  }).join(' ');
  return (
    <svg className="page-thread" viewBox="0 0 24 1000" preserveAspectRatio="none" aria-hidden="true" focusable="false">
      <path d={d} fill="none" stroke="rgba(255,255,255,0.35)" strokeWidth="2" strokeDasharray="3 7" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
      <motion.path d={d} fill="none" stroke="#ff5a36" strokeWidth="4.5" strokeLinecap="round" vectorEffect="non-scaling-stroke" style={{ pathLength: reduce ? 1 : progress, filter: 'drop-shadow(0 0 1.5px rgba(0,0,0,.7))' }} />
    </svg>
  );
}
