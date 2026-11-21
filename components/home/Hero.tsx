'use client';

import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { GALLERY } from './data';

type Ring = { goTo: (i: number) => void; dispose: () => void };

const PROOF = [
  '100% Job Success on Upwork',
  '80+ websites shipped',
  '5.0 from verified clients',
  'Replies within 4 hours',
];

/* Hero: tone-split field. Left holds the claim and the action; right holds the
   live thing, a WebGL ring of real shipped sites lit like exhibits in a dark room.
   Drag to turn it, use the buttons or arrow keys, click the front site to open it. */
export default function Hero() {
  const [active, setActive] = useState(0);
  const [ready, setReady] = useState(false);
  const mountRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<Ring | null>(null);
  const activeRef = useRef(0);

  useEffect(() => {
    activeRef.current = active;
  }, [active]);

  useEffect(() => {
    let disposed = false;
    const mount = mountRef.current;
    if (!mount) return;
    (async () => {
      const ring = await createRing(mount, {
        onActive: (i) => setActive(i),
        onOpen: (i) => (window.location.href = GALLERY[i].href),
      });
      if (disposed) return ring?.dispose();
      if (ring) {
        ringRef.current = ring;
        setReady(true);
      }
    })();
    return () => {
      disposed = true;
      ringRef.current?.dispose();
      ringRef.current = null;
    };
  }, []);

  const go = (d: number) => {
    const n = (activeRef.current + d + GALLERY.length) % GALLERY.length;
    if (ringRef.current) ringRef.current.goTo(n);
    else setActive(n);
  };

  const item = GALLERY[active];

  return (
    <section className="relative grid grid-cols-1 min-h-[100svh] lg:grid-cols-2" aria-labelledby="hero-title">
      {/* Right half: the exhibit. On phones it follows the claim so the action stays above the fold. */}
      <div className="relative order-2 flex flex-col" style={{ background: 'var(--surface)' }}>
        <div
          ref={mountRef}
          className="relative h-[46svh] min-h-[300px] lg:h-auto lg:flex-1 touch-pan-y cursor-grab active:cursor-grabbing"
          role="group"
          aria-roledescription="carousel"
          aria-label="Websites I have built. Drag to browse."
          tabIndex={0}
          onKeyDown={(e) => {
            if (e.key === 'ArrowRight') { e.preventDefault(); go(1); }
            if (e.key === 'ArrowLeft') { e.preventDefault(); go(-1); }
            if (e.key === 'Enter') window.location.href = item.href;
          }}
        >
          {/* Plain fallback and first paint: the real screenshot, replaced by the ring once WebGL is up. */}
          <img
            src={item.texture}
            alt={`${item.title} website on desktop, laptop and phone`}
            width={1280}
            height={720}
            fetchPriority="high"
            className="absolute inset-0 m-auto w-[86%] h-auto transition-opacity duration-700"
            style={{ opacity: ready ? 0 : 1, top: '6%' }}
          />
        </div>

        <div className="px-5 md:px-10 pb-6 lg:pb-10 pt-2 grid grid-cols-[1fr_auto] items-end gap-4" aria-live="polite">
          <div className="min-w-0">
            <p className="text-[13px]" style={{ color: 'var(--muted)' }}>
              {item.kind} · {item.year}
            </p>
            <Link href={item.href} className="group mt-1 inline-flex items-baseline gap-2 text-[20px] md:text-[22px] text-bone">
              <span className="truncate">{item.title}</span>
              <span className="text-jade transition-transform duration-300 group-hover:translate-x-1" aria-hidden="true">→</span>
              <span className="sr-only">Open case study</span>
            </Link>
          </div>
          <div className="flex gap-2">
            {[-1, 1].map((d) => (
              <button
                key={d}
                type="button"
                onClick={() => go(d)}
                aria-label={d < 0 ? 'Previous site' : 'Next site'}
                className="grid h-11 w-11 place-items-center text-bone transition-colors hover:bg-[#2c3734] active:scale-95"
                style={{ background: 'var(--surface-2)' }}
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden="true">
                  <path d={d < 0 ? 'M15 18l-6-6 6-6' : 'M9 18l6-6-6-6'} />
                </svg>
              </button>
            ))}
          </div>
        </div>
      </div>

      <div className="relative order-1 flex flex-col justify-end px-5 md:px-10 pt-24 pb-10 lg:pt-32 lg:pb-14">
        <h1 id="hero-title" className="font-wide text-bone whitespace-nowrap text-[clamp(1.5rem,7.2vw,3.25rem)] lg:text-[clamp(2rem,3.55vw,4.4rem)]">
          <span className="mask-line"><span>Freelance web</span></span>
          <span className="mask-line"><span>developer</span></span>
        </h1>
        <p className="fade-up-late mt-5 lg:mt-7 max-w-[44ch] text-bone" style={{ fontSize: 'var(--step-lead)', lineHeight: 1.4 }}>
          I build fast WordPress and Next.js websites for growing businesses, then automate the busywork behind them with n8n.
        </p>
        <div className="fade-up-late mt-7 lg:mt-9 flex flex-wrap items-center gap-x-6 gap-y-4">
          <Link href="/contact" className="btn-lime text-[16px]">
            Book a free 20-minute call
          </Link>
          <Link href="#work" className="text-[16px] text-bone underline decoration-[#9FC7B8] underline-offset-[6px] hover:text-jade">
            See the work
          </Link>
        </div>
        <ul className="fade-up-late mt-8 lg:mt-10 grid grid-cols-2 gap-x-6 gap-y-2 max-w-[520px] text-[15px]" style={{ color: 'var(--muted)' }}>
          {PROOF.map((p) => (
            <li key={p}>{p}</li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ───────────────────────── WebGL ring ───────────────────────── */

async function createRing(
  mount: HTMLDivElement,
  cb: { onActive: (i: number) => void; onOpen: (i: number) => void },
): Promise<Ring | null> {
  const THREE = await import('three');
  const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const N = GALLERY.length;
  const STEP = (Math.PI * 2) / N;
  const W = 3.2, H = 1.8, R = 6.1;

  let renderer: InstanceType<typeof THREE.WebGLRenderer>;
  try {
    renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  } catch {
    return null;
  }
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.setClearColor(0x000000, 0);
  const canvas = renderer.domElement;
  canvas.style.cssText = 'position:absolute;inset:0;width:100%;height:100%;display:block;opacity:0;transition:opacity .9s cubic-bezier(.16,1,.3,1)';
  mount.appendChild(canvas);

  const scene = new THREE.Scene();
  scene.fog = new THREE.Fog(0x1f2725, 9, 19);
  const camera = new THREE.PerspectiveCamera(34, 1, 0.1, 60);
  const world = new THREE.Group();
  const ring = new THREE.Group();
  world.add(ring);
  scene.add(world);

  /* Panels are bent onto the ring's radius so the sites read as one curved wall. */
  const geo = new THREE.PlaneGeometry(W, H, 24, 1);
  const pos = geo.attributes.position;
  for (let i = 0; i < pos.count; i++) {
    const x = pos.getX(i);
    const a = x / R;
    pos.setX(i, Math.sin(a) * R);
    pos.setZ(i, Math.cos(a) * R - R);
  }
  geo.computeVertexNormals();

  const loader = new THREE.TextureLoader();
  const mats: InstanceType<typeof THREE.MeshBasicMaterial>[] = [];
  const meshes: InstanceType<typeof THREE.Mesh>[] = [];
  let loaded = 0;
  GALLERY.forEach((g, i) => {
    const mat = new THREE.MeshBasicMaterial({ color: 0x555555, side: THREE.DoubleSide, transparent: true });
    const tex = loader.load(g.texture, () => {
      loaded++;
      if (loaded === 1) canvas.style.opacity = '1';
    });
    tex.colorSpace = THREE.SRGBColorSpace;
    tex.anisotropy = 4;
    mat.map = tex;
    const m = new THREE.Mesh(geo, mat);
    const a = -i * STEP;
    m.position.set(Math.sin(a) * R, 0, Math.cos(a) * R);
    m.rotation.y = a;
    m.userData.index = i;
    ring.add(m);
    mats.push(mat);
    meshes.push(m);
  });

  // A floor that catches the light of the front exhibit.
  const floor = new THREE.Mesh(
    new THREE.CircleGeometry(R * 1.4, 64),
    new THREE.MeshBasicMaterial({ color: 0x161c1a, transparent: true, opacity: 0.55 }),
  );
  floor.rotation.x = -Math.PI / 2;
  floor.position.y = -H * 0.72;
  world.add(floor);

  // State
  let target = 0; // ring rotation target (radians)
  let current = 0;
  let activeIdx = 0;
  let dragging = false;
  let dragStartX = 0;
  let dragStartTarget = 0;
  let moved = 0;
  let lastInteract = performance.now();
  const ptr = { x: 0, y: 0, tx: 0, ty: 0 };

  const layout = () => {
    const w = mount.clientWidth, h = mount.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    const narrow = w / h < 1.1;
    camera.position.set(0, 0.45, R + (narrow ? 7.4 : 4.7));
    camera.lookAt(0, 0.05, R - 1);
    camera.updateProjectionMatrix();
  };
  layout();
  const ro = new ResizeObserver(layout);
  ro.observe(mount);

  const goTo = (i: number) => {
    // shortest path to index i
    const want = i * STEP;
    const k = Math.round((target - want) / (Math.PI * 2));
    target = want + k * Math.PI * 2;
    lastInteract = performance.now();
  };

  const ray = new THREE.Raycaster();
  const ndc = new THREE.Vector2();
  const onDown = (e: PointerEvent) => {
    dragging = true;
    moved = 0;
    dragStartX = e.clientX;
    dragStartTarget = target;
    lastInteract = performance.now();
  };
  const onMove = (e: PointerEvent) => {
    const r = mount.getBoundingClientRect();
    ptr.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
    ptr.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    if (!dragging) return;
    const dx = e.clientX - dragStartX;
    moved = Math.max(moved, Math.abs(dx));
    target = dragStartTarget + (dx / r.width) * Math.PI * 0.9;
    lastInteract = performance.now();
  };
  const onUp = (e: PointerEvent) => {
    if (!dragging) return;
    dragging = false;
    if (moved < 6) {
      const r = mount.getBoundingClientRect();
      ndc.set(((e.clientX - r.left) / r.width) * 2 - 1, -((e.clientY - r.top) / r.height) * 2 + 1);
      ray.setFromCamera(ndc, camera);
      const hit = ray.intersectObjects(meshes)[0];
      if (hit) {
        const idx = hit.object.userData.index as number;
        if (idx === activeIdx) cb.onOpen(idx);
        else goTo(idx);
      }
      return;
    }
    // snap to nearest panel
    target = Math.round(target / STEP) * STEP;
  };
  mount.addEventListener('pointerdown', onDown);
  window.addEventListener('pointermove', onMove, { passive: true });
  window.addEventListener('pointerup', onUp);

  // Pause when off screen or hidden.
  let visible = true;
  const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
  io.observe(mount);

  let raf = 0;
  let last = performance.now();
  const tick = (now: number) => {
    raf = requestAnimationFrame(tick);
    const dt = Math.min((now - last) / 1000, 0.05);
    last = now;
    if (!visible || document.hidden) return;

    // Slow drift to the next site after a few idle seconds.
    if (!reduce && !dragging && now - lastInteract > 4200) {
      target = (Math.round(target / STEP) + 1) * STEP;
      lastInteract = now;
    }
    current += (target - current) * (1 - Math.pow(0.0025, dt));
    ring.rotation.y = current;

    ptr.x += (ptr.tx - ptr.x) * 0.05;
    ptr.y += (ptr.ty - ptr.y) * 0.05;
    if (!reduce) {
      world.rotation.x = 0.06 + ptr.y * 0.05;
      world.rotation.z = -ptr.x * 0.015;
      world.position.x = -ptr.x * 0.25;
    }

    // Light: the front exhibit is the brightest thing in the room.
    const norm = ((current / STEP) % N + N) % N;
    const idx = Math.round(norm) % N;
    if (idx !== activeIdx) {
      activeIdx = idx;
      cb.onActive(idx);
    }
    mats.forEach((m, i) => {
      let d = Math.abs(i - norm);
      d = Math.min(d, N - d);
      const lum = Math.max(0.16, 1 - d * 0.62);
      m.color.setScalar(lum);
      m.opacity = Math.max(0.35, 1 - d * 0.3);
    });
    renderer.render(scene, camera);
  };
  raf = requestAnimationFrame(tick);

  return {
    goTo,
    dispose: () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mount.removeEventListener('pointerdown', onDown);
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerup', onUp);
      mats.forEach((m) => {
        m.map?.dispose();
        m.dispose();
      });
      geo.dispose();
      renderer.dispose();
      canvas.remove();
    },
  };
}
