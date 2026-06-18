"use client";

import { useEffect, useRef, useState } from "react";

/**
 * FitToParent — renders a FIXED-size stage (default 1280×720, the TV design
 * canvas) and scales it with a CSS transform to fit its parent box, preserving
 * aspect ratio and centering.
 *
 * Why: the mosque display is designed in absolute px on a 720p canvas. Scaling
 * the whole stage means the REAL TV (full screen) and the admin preview (a small
 * aspect-video box) render pixel-identically — fonts, spacing, everything — with
 * zero per-browser unit quirks (no vw/vh/cq dependency on old TV browsers).
 *
 * The parent must be a sized, `position: relative` box.
 */
export default function FitToParent({ width = 1280, height = 720, children, className = "" }) {
  const hostRef = useRef(null);
  const [scale, setScale] = useState(0);

  useEffect(() => {
    const host = hostRef.current;
    const parent = host?.parentElement;
    if (!parent) return;
    const update = () => {
      const r = parent.getBoundingClientRect();
      if (!r.width || !r.height) return;
      setScale(Math.min(r.width / width, r.height / height));
    };
    update();
    const ro = new ResizeObserver(update);
    ro.observe(parent);
    return () => ro.disconnect();
  }, [width, height]);

  return (
    <div
      ref={hostRef}
      className={`absolute left-1/2 top-1/2 ${className}`}
      style={{
        width,
        height,
        transform: `translate(-50%, -50%) scale(${scale || 0})`,
        transformOrigin: "center center",
        // Avoid a flash of full-size content before the first measure.
        visibility: scale ? "visible" : "hidden",
      }}
    >
      {children}
    </div>
  );
}
