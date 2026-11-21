'use client';

import { createElement, useEffect, useRef, type CSSProperties, type ReactNode, type HTMLAttributes } from 'react';

/* Adds `dr-in` once the element enters view; children with `dr-reveal` rise in, staggered.
   Content is visible without JS because the class is only applied after hydration sets `data-armed`. */
export default function Reveal({
  as = 'div',
  children,
  className = '',
  style,
  ...rest
}: { as?: string; children: ReactNode; className?: string; style?: CSSProperties } & HTMLAttributes<HTMLElement>) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    el.dataset.armed = '';
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          el.classList.add('dr-in');
          io.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -8% 0px' },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return createElement(as, { ref, className: `dr-reveal ${className}`, style, ...rest }, children);
}
