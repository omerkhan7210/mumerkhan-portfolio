"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";
import HeroDotGrid from "./HeroDotGrid";

const HEADING_LINES = [
  [
    { text: "Websites", lime: false },
    { text: "that", lime: false },
  ],
  [
    { text: "get", lime: false },
    { text: "trade", lime: false },
  ],
  [
    { text: "businesses", lime: false },
  ],
  [{ text: "more jobs.", lime: true }],
];

export default function AnimatedHero() {
  const sectionRef = useRef<HTMLElement>(null);
  const ranRef = useRef(false);
  const orb1Ref = useRef<HTMLDivElement>(null);
  const orb2Ref = useRef<HTMLDivElement>(null);
  const orb3Ref = useRef<HTMLDivElement>(null);
  const spotRef = useRef<HTMLDivElement>(null);

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
      const tl = gsap.timeline({ defaults: { ease: "power4.out" } });
      tl.to(".h-pill", { y: 0, opacity: 1, duration: 0.35 }, 0)
        .to(".h-word", { y: 0, opacity: 1, duration: 0.5, stagger: 0.04 }, 0.08)
        .to(".h-sub", { y: 0, opacity: 1, duration: 0.35 }, 0.22)
        .to(".h-cta", { y: 0, opacity: 1, duration: 0.3, stagger: 0.06 }, 0.32);
    };
    run();
  }, []);

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
      <HeroDotGrid />
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
      <div className="max-w-[1360px] mx-auto px-6 md:px-10 relative z-10 w-full">
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
        <div
          style={{
            width: "100%",
            height: 1,
            background:
              "linear-gradient(90deg, rgba(255,255,255,0.08) 0%, transparent 70%)",
            marginBottom: 36,
          }}
        />
        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-8 md:gap-20">
          <p
            className="h-sub font-body text-muted leading-relaxed"
            style={{ fontSize: "clamp(1rem, 1.35vw, 1.2rem)", maxWidth: 460 }}
          >
            I help roofing, plumbing, HVAC, cleaning, and local service
            businesses turn more visitors into booked jobs — with clearer
            quote paths, project proof, and WordPress sites that convert.
          </p>
          <div className="flex flex-col gap-4 flex-shrink-0 items-end">
            <div className="flex items-center gap-4 flex-wrap">
              <Link href="/work" className="h-cta btn-lime text-base">
                See trade &amp; local work
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                  <path d="M7 17L17 7M17 7H7M17 7v10" />
                </svg>
              </Link>
              <Link href="/contact" className="h-cta btn-outline text-base">
                Get a free site review
              </Link>
            </div>
            <div className="h-cta flex items-center gap-5">
              <a href="https://github.com/omerkhan7210" target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                GitHub
              </a>
              <a href="https://www.linkedin.com/in/muhammad-umer-khan-7998a8266" target="_blank" rel="noopener noreferrer" className="social-link" style={{ fontSize: "0.75rem", letterSpacing: "0.06em" }}>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2" style={{ opacity: 0.3 }}>
        <span className="font-body text-xs text-muted uppercase tracking-[0.15em]">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-muted to-transparent" />
      </div>
    </section>
  );
}
