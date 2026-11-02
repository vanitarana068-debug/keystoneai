import { useEffect } from "react";

const clamp = (v: number) => Math.min(1, Math.max(0, v));

/**
 * One rAF loop that feeds CSS variables to the 3D effects in styles.css:
 * - :root --mx/--my  smoothed pointer position (-1..1) for parallax layers
 * - [data-scroll3d]  --enter (0→1 as it rises into view), --p (0→1 through the viewport), --exit (0→1 as it leaves the top)
 * - .tilt            --rx/--ry/--gx/--gy pointer tilt and glare, mouse only
 */
export function Motion3D() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const root = document.documentElement;
    let tx = 0, ty = 0, mx = 0, my = 0, raf = 0;
    let active: HTMLElement | null = null;

    const release = (el: HTMLElement) => {
      el.classList.remove("is-tilting");
      el.style.setProperty("--rx", "0deg");
      el.style.setProperty("--ry", "0deg");
    };

    const onMove = (e: PointerEvent) => {
      tx = (e.clientX / window.innerWidth) * 2 - 1;
      ty = (e.clientY / window.innerHeight) * 2 - 1;
      const card = e.pointerType === "mouse" ? ((e.target as Element).closest?.(".tilt") as HTMLElement | null) : null;
      if (active && active !== card) { release(active); active = null; }
      if (!card) return;
      const r = card.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width, py = (e.clientY - r.top) / r.height;
      card.style.setProperty("--ry", `${(px - 0.5) * 9}deg`);
      card.style.setProperty("--rx", `${(0.5 - py) * 9}deg`);
      card.style.setProperty("--gx", `${px * 100}%`);
      card.style.setProperty("--gy", `${py * 100}%`);
      card.classList.add("is-tilting");
      active = card;
    };
    const onLeave = () => { if (active) { release(active); active = null; } tx = ty = 0; };

    const frame = () => {
      mx += (tx - mx) * 0.08;
      my += (ty - my) * 0.08;
      root.style.setProperty("--mx", mx.toFixed(4));
      root.style.setProperty("--my", my.toFixed(4));
      const vh = window.innerHeight;
      document.querySelectorAll<HTMLElement>("[data-scroll3d]").forEach((el) => {
        const r = el.getBoundingClientRect();
        if (r.bottom < -vh || r.top > vh * 2) return;
        el.style.setProperty("--enter", clamp((vh - r.top) / (vh * 0.75)).toFixed(4));
        el.style.setProperty("--p", clamp((vh - r.top) / (vh + r.height)).toFixed(4));
        el.style.setProperty("--exit", clamp(-r.top / r.height).toFixed(4));
      });
      raf = requestAnimationFrame(frame);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    document.addEventListener("pointerleave", onLeave);
    raf = requestAnimationFrame(frame);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("pointermove", onMove);
      document.removeEventListener("pointerleave", onLeave);
    };
  }, []);
  return null;
}
