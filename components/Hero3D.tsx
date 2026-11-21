'use client';

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { loadScrollTrigger } from '@/lib/scrollTrigger';

/* Labels pinned to points on the model (house-local coordinates). dx/dy is the label offset in px. */
const HOTSPOTS = [
  { key: 'roof', anchor: [0, 2.55, 0.2], dx: 46, dy: -38, side: 'r', title: 'Roofing', sub: 'Quote paths that convert' },
  { key: 'pipe', anchor: [1.55, 0.42, 0.5], dx: -50, dy: 46, side: 'l', title: 'Plumbing', sub: 'Service pages that rank' },
  { key: 'hvac', anchor: [2.65, 0.86, 0.35], dx: 40, dy: 44, side: 'r', title: 'HVAC', sub: 'After-hours lead capture' },
] as const;

const LIME = 0xc8ff00;

/**
 * Trade-business scene: a house (roofing), a pipe run (plumbing) and an
 * outdoor unit with a spinning fan (HVAC), built from primitives so there is
 * no model file to load and the whole thing stays a few KB.
 */
export default function Hero3D() {
  const mountRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isMobile = window.innerWidth < 768;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: !isMobile, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return; // no WebGL: the hero still reads fine without the scene
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));
    renderer.setClearColor(0x000000, 0);
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.domElement.style.display = 'block';
    mount.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;
    scene.environmentIntensity = 0.35;

    const camera = new THREE.PerspectiveCamera(32, 1, 0.1, 100);
    camera.position.set(0, 4.4, 11);
    camera.lookAt(0, 0.9, 0);

    // ---------- materials ----------
    const dark = new THREE.MeshStandardMaterial({ color: 0x17181a, roughness: 0.55, metalness: 0.2 });
    const darker = new THREE.MeshStandardMaterial({ color: 0x0e0f10, roughness: 0.6, metalness: 0.3 });
    const lime = new THREE.MeshStandardMaterial({ color: LIME, roughness: 0.42, metalness: 0.05 });
    const glow = new THREE.MeshStandardMaterial({
      color: 0x0b0c0a,
      emissive: LIME,
      emissiveIntensity: 1.1,
      roughness: 0.5,
    });
    const metal = new THREE.MeshStandardMaterial({ color: 0x9a9d99, roughness: 0.3, metalness: 0.9 });
    const edgeMat = new THREE.LineBasicMaterial({ color: 0xffffff, transparent: true, opacity: 0.16 });

    const withEdges = (mesh: THREE.Mesh) => {
      mesh.add(new THREE.LineSegments(new THREE.EdgesGeometry(mesh.geometry), edgeMat));
      return mesh;
    };
    const box = (w: number, h: number, d: number, m: THREE.Material, x: number, y: number, z: number) => {
      const mesh = new THREE.Mesh(new THREE.BoxGeometry(w, h, d), m);
      mesh.position.set(x, y, z);
      return mesh;
    };

    const root = new THREE.Group(); // positioned/scaled by layout()
    scene.add(root);
    const spin = new THREE.Group(); // idle + pointer rotation
    root.add(spin);

    // ---------- platform ----------
    const platform = new THREE.Mesh(new THREE.CylinderGeometry(3.5, 3.6, 0.16, 72), darker);
    platform.position.y = -0.08;
    spin.add(platform);
    const rimMat = new THREE.MeshBasicMaterial({ color: LIME });
    const rim = new THREE.Mesh(new THREE.TorusGeometry(3.52, 0.014, 8, 140), rimMat);
    rim.rotation.x = Math.PI / 2;
    spin.add(rim);
    const grid = new THREE.PolarGridHelper(6.2, 10, 8, 96, 0xffffff, 0xffffff);
    const gridMat = grid.material as THREE.LineBasicMaterial;
    gridMat.transparent = true;
    gridMat.opacity = 0.07;
    grid.position.y = -0.17;
    root.add(grid);

    // ---------- house ----------
    const house = new THREE.Group();
    house.position.x = -0.7;
    spin.add(house);

    house.add(withEdges(box(2.4, 1.5, 1.8, dark, 0, 0.75, 0)));

    const roofShape = new THREE.Shape();
    roofShape.moveTo(-1.5, 0);
    roofShape.lineTo(1.5, 0);
    roofShape.lineTo(0, 1.05);
    roofShape.closePath();
    const roofGeo = new THREE.ExtrudeGeometry(roofShape, { depth: 2.3, bevelEnabled: false });
    roofGeo.translate(0, 0, -1.15);
    const roof = new THREE.Mesh(roofGeo, lime);
    roof.position.y = 1.5;
    house.add(roof);

    house.add(withEdges(box(0.28, 0.62, 0.28, darker, 0.7, 2.28, -0.3)));
    house.add(box(0.44, 0.84, 0.06, lime, -0.55, 0.42, 0.91)); // door
    house.add(box(0.5, 0.42, 0.06, glow, 0.6, 0.85, 0.91)); // window
    house.add(box(0.5, 0.42, 0.06, glow, -0.55, 1.05, -0.91)); // rear window

    // ---------- plumbing ----------
    const pipeCurve = new THREE.CatmullRomCurve3([
      new THREE.Vector3(0.9, 0.42, 0.5),
      new THREE.Vector3(2.15, 0.42, 0.5),
    ]);
    house.add(new THREE.Mesh(new THREE.TubeGeometry(pipeCurve, 24, 0.055, 12, false), metal));
    for (const px of [1.2, 1.95]) {
      const joint = new THREE.Mesh(new THREE.TorusGeometry(0.075, 0.025, 8, 20), lime);
      joint.position.set(px, 0.42, 0.5);
      joint.rotation.y = Math.PI / 2;
      house.add(joint);
    }
    const stack = new THREE.Mesh(new THREE.CylinderGeometry(0.05, 0.05, 1.3, 12), metal);
    stack.position.set(1.05, 0.85, 0.5);
    house.add(stack);

    // ---------- HVAC ----------
    const hvac = new THREE.Group();
    hvac.position.set(2.65, 0, 0.35);
    house.add(hvac);
    hvac.add(withEdges(box(0.95, 0.8, 0.95, dark, 0, 0.4, 0)));
    const grill = new THREE.Mesh(new THREE.TorusGeometry(0.33, 0.018, 8, 40), rimMat);
    grill.rotation.x = Math.PI / 2;
    grill.position.y = 0.815;
    hvac.add(grill);
    const fan = new THREE.Group();
    fan.position.y = 0.805;
    for (let i = 0; i < 4; i++) {
      const blade = new THREE.Mesh(new THREE.BoxGeometry(0.3, 0.012, 0.09), metal);
      blade.position.x = 0.15;
      const holder = new THREE.Group();
      holder.rotation.y = (i * Math.PI) / 2;
      holder.add(blade);
      fan.add(holder);
    }
    hvac.add(fan);

    // ---------- lights ----------
    scene.add(new THREE.AmbientLight(0xffffff, 0.5));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(4, 7, 6);
    scene.add(key);
    const limeRim = new THREE.PointLight(LIME, 55, 22, 2);
    limeRim.position.set(-5, 2.5, -3);
    scene.add(limeRim);

    // ---------- layout ----------
    let wide = true;
    let halfW = 6;
    const layout = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = '100%';
      renderer.domElement.style.height = '100%';
      camera.aspect = w / h;
      wide = w >= 900;
      halfW = Math.tan((camera.fov * Math.PI) / 360) * 11.85 * camera.aspect;
      camera.updateProjectionMatrix();
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(mount);

    // ---------- pointer ----------
    const target = { x: 0, y: 0 };
    const cur = { x: 0, y: 0 };
    const onMouse = (e: MouseEvent) => {
      target.x = e.clientX / window.innerWidth - 0.5;
      target.y = e.clientY / window.innerHeight - 0.5;
    };
    if (!reduceMotion) window.addEventListener('mousemove', onMouse, { passive: true });

    // ---------- scroll (ScrollTrigger, no raw scroll listener) ----------
    let scrollP = 0;
    let killTrigger: (() => void) | undefined;
    let disposed = false;
    (async () => {
      const { ScrollTrigger } = await loadScrollTrigger();
      if (disposed) return;
      const st = ScrollTrigger.create({
        trigger: mount.parentElement ?? mount,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
        onUpdate: (self) => {
          scrollP = self.progress;
        },
      });
      killTrigger = () => st.kill();
    })();

    const hsEls = Array.from(mount.querySelectorAll<HTMLElement>('[data-hs]'));
    const hsVec = new THREE.Vector3();
    const updateHotspots = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      root.updateMatrixWorld(true);
      hsEls.forEach((el, i) => {
        const hs = HOTSPOTS[i];
        hsVec.set(hs.anchor[0], hs.anchor[1], hs.anchor[2]);
        house.localToWorld(hsVec);
        hsVec.project(camera);
        const x = (hsVec.x * 0.5 + 0.5) * w;
        const y = (-hsVec.y * 0.5 + 0.5) * h;
        el.style.transform = `translate3d(${x}px, ${y}px, 0)`;
        el.style.display = wide ? 'block' : 'none';
        if (!wide) return;
        const line = el.children[1] as HTMLElement;
        const label = el.children[2] as HTMLElement;
        const lw = label.offsetWidth;
        // keep the label inside the canvas, then redraw the leader line to it
        const left =
          hs.side === 'r' ? Math.min(hs.dx, w - 12 - x - lw) : Math.max(hs.dx, lw - x + 12);
        label.style.left = `${left}px`;
        line.style.width = `${Math.hypot(left, hs.dy)}px`;
        line.style.transform = `rotate(${(Math.atan2(hs.dy, left) * 180) / Math.PI}deg)`;
      });
    };

    let visible = true;
    const io = new IntersectionObserver(([e]) => (visible = e.isIntersecting), { threshold: 0 });
    io.observe(mount);

    const start = performance.now();
    let raf = 0;
    const render = () => {
      raf = requestAnimationFrame(render);
      if (!visible) return;
      const t = (performance.now() - start) / 1000;
      const k = reduceMotion ? 0 : 1;
      const intro = reduceMotion ? 1 : 1 - Math.pow(1 - Math.min(t / 1.4, 1), 4); // ease-out entry

      cur.x += (target.x - cur.x) * 0.05;
      cur.y += (target.y - cur.y) * 0.05;

      spin.rotation.y = -0.55 + t * 0.14 * k + cur.x * 0.9 + (1 - intro) * 1.4 + scrollP * 1.2;
      spin.rotation.x = cur.y * 0.16;
      spin.position.y = Math.sin(t * 0.9) * 0.06 * k;
      fan.rotation.y = t * 9 * k;
      grid.rotation.y = -t * 0.03 * k;

      const base = wide ? Math.min(0.72, 0.42 * camera.aspect) : 0.62;
      root.scale.setScalar(base * (0.88 + 0.12 * intro));
      root.position.set(wide ? halfW * 0.43 : 0, (wide ? -0.3 : -0.9) + scrollP * 1.4, 0);

      mount.style.opacity = String(intro * (wide ? 1 : 0.5) * (1 - scrollP * 0.9));
      updateHotspots();
      renderer.render(scene, camera);
    };
    render();

    return () => {
      disposed = true;
      killTrigger?.();
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      window.removeEventListener('mousemove', onMouse);
      scene.traverse((o) => {
        (o as THREE.Mesh).geometry?.dispose?.();
      });
      [dark, darker, lime, glow, metal, edgeMat, rimMat, gridMat].forEach((m) => m.dispose());
      envTex.dispose();
      pmrem.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return (
    <div ref={mountRef} aria-hidden="true" className="absolute inset-0 pointer-events-none" style={{ opacity: 0 }}>
      {HOTSPOTS.map((h) => {
        const len = Math.hypot(h.dx, h.dy);
        const ang = (Math.atan2(h.dy, h.dx) * 180) / Math.PI;
        return (
          <div key={h.key} data-hs className="absolute left-0 top-0 will-change-transform" style={{ display: 'none' }}>
            <span
              className="absolute w-2.5 h-2.5 rounded-full bg-lime"
              style={{ left: -5, top: -5, boxShadow: '0 0 0 5px rgba(159,199,184,0.16)' }}
            />
            <span
              className="absolute h-px bg-lime/45"
              style={{ left: 0, top: 0, width: len, transformOrigin: '0 50%', transform: `rotate(${ang}deg)` }}
            />
            <div
              className="absolute whitespace-nowrap rounded-lg px-3 py-2 border border-white/10"
              style={{
                left: h.dx,
                top: h.dy,
                transform: h.side === 'l' ? 'translate(-100%, -50%)' : 'translate(0, -50%)',
                background: 'rgba(10,10,10,0.72)',
                backdropFilter: 'blur(10px)',
              }}
            >
              <p className="font-sans font-semibold text-sm text-white leading-tight">{h.title}</p>
              <p className="font-body text-xs text-muted mt-0.5">{h.sub}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
