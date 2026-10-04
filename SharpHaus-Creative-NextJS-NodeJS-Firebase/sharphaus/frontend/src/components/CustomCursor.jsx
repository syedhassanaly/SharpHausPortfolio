"use client";

import { useEffect, useRef } from "react";
import { ArrowUpRight } from "lucide-react";

/**
 * A small dot-and-ring custom cursor. Over interactive elements the ring
 * smoothly grows and fills in; if the element carries a `data-cursor-text`
 * attribute (e.g. "View", "Open"), that word fades in inside the ring —
 * otherwise a small arrow glyph appears. Both the label and the arrow are
 * always in the DOM (rendered once via JSX) and simply toggled with plain
 * style/text updates in the event handlers, so hovering never triggers a
 * React re-render and stays perfectly smooth.
 */
export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);
  const labelRef = useRef(null);
  const arrowRef = useRef(null);
  const pos = useRef({ x: 0, y: 0 });
  const ring = useRef({ x: 0, y: 0 });
  const raf = useRef(null);

  useEffect(() => {
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine) return; // skip entirely on touch devices

    document.body.classList.add("custom-cursor-active");

    const interactiveSelector =
      'a, button, [role="button"], input, textarea, [data-cursor-hover]';

    const onMove = (e) => {
      pos.current.x = e.clientX;
      pos.current.y = e.clientY;
      if (dotRef.current) {
        dotRef.current.style.transform = `translate(${e.clientX}px, ${e.clientY}px) translate(-50%, -50%)`;
      }
    };

    const setLabel = (target) => {
      const text = target?.dataset?.cursorText;
      if (labelRef.current) {
        labelRef.current.textContent = text || "";
      }
      if (labelRef.current) labelRef.current.style.display = text ? "block" : "none";
      if (arrowRef.current) arrowRef.current.style.display = text ? "none" : "flex";
    };

    const onOver = (e) => {
      const target = e.target.closest && e.target.closest(interactiveSelector);
      if (target) {
        setLabel(target);
        ringRef.current?.classList.add("hovering");
      }
    };
    const onOut = (e) => {
      if (e.target.closest && e.target.closest(interactiveSelector)) {
        ringRef.current?.classList.remove("hovering");
      }
    };

    const tick = () => {
      ring.current.x += (pos.current.x - ring.current.x) * 0.2;
      ring.current.y += (pos.current.y - ring.current.y) * 0.2;
      if (ringRef.current) {
        ringRef.current.style.transform = `translate(${ring.current.x}px, ${ring.current.y}px) translate(-50%, -50%)`;
      }
      raf.current = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      if (raf.current) cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <>
      <div ref={dotRef} className="cursor-dot cursor-dot-inner" aria-hidden="true" />
      <div ref={ringRef} className="cursor-ring" aria-hidden="true">
        <span ref={labelRef} className="cursor-label" style={{ display: "none" }} />
        <span ref={arrowRef} className="cursor-arrow" style={{ display: "flex" }}>
          <ArrowUpRight size={16} strokeWidth={2.5} />
        </span>
      </div>
    </>
  );
}
