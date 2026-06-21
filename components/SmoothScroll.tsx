'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

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

      /* Exposed so other code (e.g. route-change scroll reset below) can
         reach the single shared Lenis instance instead of creating its own. */
      (window as any).__lenis = lenis;

      let rafId: number;
      const tick = (time: number) => {
        lenis.raf(time);
        rafId = requestAnimationFrame(tick);
      };
      rafId = requestAnimationFrame(tick);

      cleanup = () => {
        cancelAnimationFrame(rafId);
        lenis.destroy();
        (window as any).__lenis = null;
      };
    };

    init();
    return () => cleanup?.();
  }, []);

  /* Reset scroll position on every route change — Lenis intercepts native
     scrolling, so Next.js's default scroll-to-top on navigation never
     reaches it, and the new page otherwise opens at the old scroll offset. */
  useEffect(() => {
    const lenis = (window as any).__lenis;
    if (lenis) {
      lenis.scrollTo(0, { immediate: true });
    } else {
      window.scrollTo(0, 0);
    }
  }, [pathname]);

  return <>{children}</>;
}
