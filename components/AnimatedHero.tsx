"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import HeroDotGrid from "./HeroDotGrid";

const HEADING_LINES = [
  [
    { text: "I", lime: false },
    { text: "build", lime: false },
    { text: "things", lime: false },
  ],
  [
    { text: "people", lime: false },
    { text: "don't", lime: false },
  ],
  [{ text: "forget.", lime: true }],
];

export default function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ranRef = useRef(false);

  /* Parallax orb refs — direct DOM, no React re-renders */
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

  /* ── GSAP entrance ─────────────────────────────────────────── */
  useEffect(() => {
    if (ranRef.current) return;
    ranRef.current = true;

    const run = async () => {
      const { default: gsap } = await import("gsap");
      if (!sectionRef.current) return;

      gsap.set(".h-pill", { y: -24, opacity: 0 });
      gsap.set(".h-word", { y: 110, opacity: 0 });
      gsap.set(".h-sub", { y: 28, opacity: 0 });
      gsap.set(".h-cta", { y: 20, opacity: 0 });

      /* Timings kept tight on purpose — the subtitle is the page's LCP
         element, and the original schedule (subtitle starting at 0.78s)
         was adding ~1.5s of pure render delay to Core Web Vitals with
         no real visual benefit over a faster reveal. */
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".h-pill", { y: 0, opacity: 1, duration: 0.35 }, 0)
        .to(".h-word", { y: 0, opacity: 1, duration: 0.5, stagger: 0.04 }, 0.08)
        .to(".h-sub", { y: 0, opacity: 1, duration: 0.35 }, 0.22)
        .to(".h-cta", { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 }, 0.32);
    };

    run();
  }, []);

  /* ── Multi-orb mouse parallax ──────────────────────────────── */
  useEffect(() => {
    const target = { x: 0, y: 0 };
    const lerped = { x: 0, y: 0 };
    let raf: number;

    const onMouse = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;

      if (spotRef.current) {
        spotRef.current.style.left = `${e.clientX}px`;
        spotRef.current.style.top = `${e.clientY}px`;
        spotRef.current.style.opacity = "1";
      }
    };

    const tick = () => {
      lerped.x += (target.x - lerped.x) * 0.04;
      lerped.y += (target.y - lerped.y) * 0.04;

      if (orb1Ref.current)
        orb1Ref.current.style.transform = `translate(${lerped.x * 90}px, ${lerped.y * 65}px)`;
      if (orb2Ref.current)
        orb2Ref.current.style.transform = `translate(${lerped.x * -140}px, ${lerped.y * -100}px)`;
      if (orb3Ref.current)
        orb3Ref.current.style.transform = `translate(${lerped.x * 180}px, ${lerped.y * 140}px)`;

      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMouse, { passive: true });
    raf = requestAnimationFrame(tick);
    return () => {
      window.removeEventListener("mousemove", onMouse);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-ink overflow-hidden flex flex-col justify-center pt-28 pb-24"
    >
      {/* ── Interactive dot grid background ─────────────────── */}
      <HeroDotGrid />

      {/* Orb 1 — lime, top-right */}
      <div
        ref={orb1Ref}
        className="absolute pointer-events-none"
        style={{
          right: -80,
          top: "-10%",
          width: 1100,
          height: 1100,
          background:
            "radial-gradient(circle at 35% 35%, rgba(200,255,0,0.10) 0%, rgba(200,255,0,0.03) 40%, transparent 65%)",
        }}
      />

      {/* Orb 2 — purple, bottom-left, drifts opposite */}
      <div
        ref={orb2Ref}
        className="absolute pointer-events-none"
        style={{
          left: -200,
          bottom: -100,
          width: 800,
          height: 800,
          background:
            "radial-gradient(circle at 55% 55%, rgba(139,92,246,0.10) 0%, rgba(139,92,246,0.03) 40%, transparent 65%)",
        }}
      />

      {/* Orb 3 — sky-blue, center */}
      <div
        ref={orb3Ref}
        className="absolute pointer-events-none"
        style={{
          left: "50%",
          top: "45%",
          width: 520,
          height: 520,
          background:
            "radial-gradient(circle, rgba(56,189,248,0.07) 0%, transparent 65%)",
        }}
      />

      {/* Cursor spotlight */}
      <div
        ref={spotRef}
        className="absolute pointer-events-none"
        style={{
          width: 640,
          height: 640,
          borderRadius: "50%",
          background:
            "radial-gradient(circle, rgba(200,255,0,0.055) 0%, transparent 65%)",
          transform: "translate(-50%, -50%)",
          left: "50%",
          top: "50%",
          opacity: 0,
          transition: "opacity 0.4s ease",
        }}
      />

      {/* ── Content ─────────────────────────────────────────────── */}
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 relative z-10 w-full">
        {/* Status pill */}
        <div
          className="h-pill inline-flex items-center gap-2.5 rounded-full px-4 py-2 mb-10 font-body text-sm"
          style={{
            border: "1px solid rgba(var(--fg-rgb),0.1)",
            color: "var(--color-muted)",
          }}
        >
          <span className="status-dot w-2 h-2 bg-lime rounded-full" />
          Available for freelance projects
        </div>

        {/* Heading — full-width, very large */}
        <h1 className="mb-10" style={{ letterSpacing: "-0.03em" }}>
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
                    fontSize: "clamp(3rem, 6.5vw, 7rem)",
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

        {/* Divider line */}
        <div
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 70%)",
            marginBottom: 36,
          }}
        />

        {/* Sub-text + CTAs: two-column editorial layout */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-20">
          <p
            className="h-sub font-body text-muted leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.35vw, 1.2rem)", maxWidth: 460 }}
          >
            Full Stack Developer specialising in WordPress, MERN Stack &amp; n8n
            Automation. Turning designs into high-performing websites since
            2020.
          </p>

          <div className="flex flex-col gap-4 flex-shrink-0 items-end">
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/work" className="h-cta btn-lime text-base">
                View My Work
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                >
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
              <Link href="/contact" className="h-cta btn-outline text-base">
                Let&apos;s Talk
              </Link>
            </div>
            {/* Social links */}
            <div className="h-cta flex items-center gap-5">
              <a
                href="https://github.com/omerkhan7210"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ fontSize: "0.75rem", letterSpacing: "0.06em" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
                </svg>
                GitHub
              </a>
              <a
                href="https://www.linkedin.com/in/muhammad-umer-khan-7998a8266"
                target="_blank"
                rel="noopener noreferrer"
                className="social-link"
                style={{ fontSize: "0.75rem", letterSpacing: "0.06em" }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ opacity: 0.3 }}
      >
        <span className="font-body text-xs text-muted uppercase tracking-[0.15em]">
          Scroll
        </span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}
