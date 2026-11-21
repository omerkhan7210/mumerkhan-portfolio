"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const Hero3D = dynamic(() => import("./Hero3D"), { ssr: false });

const HEADING_LINES = [
  [
    { text: "Websites", lime: false },
    { text: "that", lime: false },
    { text: "get", lime: false },
  ],
  [
    { text: "trade", lime: false },
    { text: "businesses", lime: false },
  ],
  [{ text: "more jobs.", lime: true }],
];

export default function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ranRef = useRef(false);

  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) return;
    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (!sectionRef.current) return;
      gsap.set(".h-pill", { y: -24, opacity: 0 });
      gsap.set(".h-word", { y: 110, opacity: 0 });
      gsap.set(".h-sub", { y: 28, opacity: 0 });
      gsap.set(".h-cta", { y: 20, opacity: 0 });
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".h-pill", { y: 0, opacity: 1, duration: 0.35 }, 0)
        .to(".h-word", { y: 0, opacity: 1, duration: 0.5, stagger: 0.04 }, 0.08)
        .to(".h-sub", { y: 0, opacity: 1, duration: 0.35 }, 0.22)
        .to(".h-cta", { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 }, 0.32);
    };
    run();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-[100dvh] bg-ink overflow-hidden flex flex-col justify-center pt-24 pb-20"
    >
      <Hero3D />
      <div
        className="absolute pointer-events-none"
        style={{
          right: "-8%",
          top: "8%",
          width: "62vw",
          height: "62vw",
          maxWidth: 980,
          maxHeight: 980,
          background:
            "radial-gradient(circle at 50% 50%, rgba(159,199,184,0.085) 0%, rgba(159,199,184,0.02) 45%, transparent 68%)",
        }}
      />
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 relative z-10 w-full">
        <div className="lg:max-w-[62%]">
          <div
            className="h-pill inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-8 font-body text-sm"
            style={{
              border: "1px solid rgba(var(--fg-rgb),0.1)",
              color: "var(--color-muted)",
            }}
          >
            <span className="status-dot w-2 h-2 bg-lime rounded-full" />
            Available for freelance projects
          </div>
          <h1 className="mb-8" style={{ letterSpacing: "-0.03em" }}>
            {HEADING_LINES.map((line, li) => (
              <div
                key={li}
                style={{
                  overflow: "hidden",
                  paddingTop: "0.12em",
                  paddingBottom: "0.22em",
                }}
              >
                {line.map(({ text, lime }, wi) => (
                  <span
                    key={wi}
                    className="h-word inline-block font-sans"
                    style={{
                      fontSize: "clamp(2.75rem, 5.4vw, 5.75rem)",
                      fontWeight: 800,
                      lineHeight: 1,
                      color: lime ? "var(--color-lime)" : "var(--color-fg)",
                      marginRight: "0.22em",
                    }}
                  >
                    {text}
                  </span>
                ))}
              </div>
            ))}
          </h1>
          <p
            className="h-sub font-body text-muted leading-relaxed mb-10"
            style={{ fontSize: "clamp(1rem, 1.35vw, 1.2rem)", maxWidth: 520 }}
          >
            I build roofing, plumbing, HVAC and cleaning websites that turn
            visitors into booked jobs.
          </p>
          <div className="flex items-center gap-4 flex-wrap">
            <Link href="/work" className="h-cta btn-lime text-base">
              See trade &amp; local work
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M7 17L17 7M17 7H7M17 7v10" />
              </svg>
            </Link>
            <Link href="/redesign" className="h-cta btn-outline text-base">
              Get my free site fix
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
