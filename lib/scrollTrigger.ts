/**
 * Loads GSAP + ScrollTrigger on demand and exposes ScrollTrigger on `window`
 * so SmoothScroll (Lenis) can keep it in sync while scrolling.
 */
export async function loadScrollTrigger() {
  const [{ default: gsap }, { ScrollTrigger }] = await Promise.all([
    import('gsap'),
    import('gsap/ScrollTrigger'),
  ]);
  gsap.registerPlugin(ScrollTrigger);
  (window as unknown as { __GSAP_ScrollTrigger?: typeof ScrollTrigger }).__GSAP_ScrollTrigger = ScrollTrigger;
  return { gsap, ScrollTrigger };
}
