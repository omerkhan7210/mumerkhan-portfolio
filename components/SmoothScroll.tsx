'use client';

import { useEffect } from 'react';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    let cleanup: (() => void) | undefined;

    const init = async () => {
      const { default: Lenis } = await import('lenis');

      const lenis = new Lenis({
        duration: 1.2,
        easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        smoothWheel: true,
      });

      /* Sync Lenis with GSAP ScrollTrigger if it's been loaded */
      lenis.on('scroll', () => {
        const st = (window as any).__GSAP_ScrollTrigger;
        if (st) st.update();
      });

      let rafId: number;
      const tick = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
      };
    };

    init();
    return () => cleanup?.();
  }, []);

  return <>{children}</>;
}
