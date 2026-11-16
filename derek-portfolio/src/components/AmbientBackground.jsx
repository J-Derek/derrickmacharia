import { useEffect, useRef } from 'react';

const SPACING = 34; // px between dots
const DOT = 1.6; // dot size in px
const BASE_ALPHA = 0.12;
const POINTER_RADIUS = 150; // px of cursor influence
const MAX_DPR = 2;

/** Reads a CSS colour variable as an [r, g, b] triple (supports #rgb, #rrggbb and rgb()). */
function readColor(name, fallback) {
  const raw = getComputedStyle(document.documentElement).getPropertyValue(name).trim();
  if (raw.startsWith('#')) {
    let h = raw.slice(1);
    if (h.length === 3) h = h.split('').map((c) => c + c).join('');
    const n = parseInt(h.slice(0, 6), 16);
    if (!Number.isNaN(n)) return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
  }
  const m = raw.match(/[\d.]+/g);
  return m && m.length >= 3 ? [Number(m[0]), Number(m[1]), Number(m[2])] : fallback;
}

/**
 * Fixed full-screen field of dots. A slow diagonal wave of light drifts across it so the page
 * feels alive without a pointer, and dots near the cursor (or finger) swell and take the accent
 * colour. Costs one small canvas: it pauses when the tab is hidden, draws once for reduced
 * motion, and skips frames on slow devices.
 */
const AmbientBackground = () => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
    const dpr = Math.min(window.devicePixelRatio || 1, MAX_DPR);

    let W = 0;
    let H = 0;
    let fg = [18, 18, 17];
    let accent = [124, 45, 18];
    let raf = 0;
    let running = false;
    let last = 0;
    const pointer = { x: -9999, y: -9999, active: 0 }; // active eases 0..1

    const readColors = () => {
      fg = readColor('--foreground', fg);
      accent = readColor('--accent', accent);
    };

    const resize = () => {
      W = window.innerWidth;
      H = window.innerHeight;
      canvas.width = Math.round(W * dpr);
      canvas.height = Math.round(H * dpr);
      canvas.style.width = `${W}px`;
      canvas.style.height = `${H}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, W, H);
      const cols = Math.ceil(W / SPACING) + 1;
      const rows = Math.ceil(H / SPACING) + 1;
      const offX = (W - (cols - 1) * SPACING) / 2;
      const offY = (H - (rows - 1) * SPACING) / 2;
      const time = t / 1000;
      const px = pointer.x;
      const py = pointer.y;
      const reach = POINTER_RADIUS * pointer.active;

      for (let r = 0; r < rows; r++) {
        const y = offY + r * SPACING;
        for (let c = 0; c < cols; c++) {
          const x = offX + c * SPACING;

          // Two slow waves of light travelling in different directions
          const w1 = Math.sin((x + y) * 0.006 - time * 0.9) * 0.5 + 0.5;
          const w2 = Math.sin((x - y * 0.6) * 0.004 + time * 0.35) * 0.5 + 0.5;
          const wave = (w1 + w2) / 2;
          let alpha = BASE_ALPHA + wave * wave * 0.4;
          let size = DOT;
          let color = fg;
          let dx = 0;
          let dy = 0;

          if (reach > 1) {
            const ddx = x - px;
            const ddy = y - py;
            const d = Math.hypot(ddx, ddy);
            if (d < reach) {
              const k = 1 - d / reach;
              const e = k * k * (3 - 2 * k); // smoothstep
              size = DOT + e * 2.6;
              alpha = Math.min(1, alpha + e * 0.7);
              color = accent;
              // gentle push away from the cursor
              const push = e * 7;
              dx = (ddx / (d || 1)) * push;
              dy = (ddy / (d || 1)) * push;
            }
          }

          ctx.fillStyle = `rgba(${color[0]},${color[1]},${color[2]},${alpha.toFixed(3)})`;
          ctx.fillRect(x + dx - size / 2, y + dy - size / 2, size, size);
        }
      }
    };

    const frame = (t) => {
      raf = requestAnimationFrame(frame);
      if (t - last < 32) return; // cap at ~30 fps: plenty for slow motion, kinder to batteries
      last = t;
      pointer.active += ((pointer.x > -9000 ? 1 : 0) - pointer.active) * 0.12;
      draw(t);
    };

    const start = () => {
      if (running || reduced.matches || document.hidden) return;
      running = true;
      raf = requestAnimationFrame(frame);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(raf);
    };

    const onMove = (e) => {
      pointer.x = e.clientX;
      pointer.y = e.clientY;
    };
    const onLeave = () => {
      pointer.x = -9999;
      pointer.y = -9999;
    };
    const onVisibility = () => (document.hidden ? stop() : start());
    const onResize = () => {
      resize();
      if (reduced.matches) draw(0);
    };
    const onMotionChange = () => {
      if (reduced.matches) {
        stop();
        draw(0);
      } else {
        start();
      }
    };

    readColors();
    resize();
    if (reduced.matches) draw(0);
    else start();

    // Re-read colours when the theme flips
    const themeObserver = new MutationObserver(() => {
      readColors();
      if (reduced.matches) draw(0);
    });
    themeObserver.observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    window.addEventListener('pointermove', onMove, { passive: true });
    window.addEventListener('pointerdown', onMove, { passive: true });
    document.documentElement.addEventListener('pointerleave', onLeave);
    window.addEventListener('resize', onResize);
    document.addEventListener('visibilitychange', onVisibility);
    reduced.addEventListener('change', onMotionChange);

    return () => {
      stop();
      themeObserver.disconnect();
      window.removeEventListener('pointermove', onMove);
      window.removeEventListener('pointerdown', onMove);
      document.documentElement.removeEventListener('pointerleave', onLeave);
      window.removeEventListener('resize', onResize);
      document.removeEventListener('visibilitychange', onVisibility);
      reduced.removeEventListener('change', onMotionChange);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none fixed inset-0 z-0"
    />
  );
};

export default AmbientBackground;
