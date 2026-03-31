"use client";

import { useEffect, useRef } from "react";
import anime from "animejs";

/**
 * useScrollReveal – triggers an anime.js animation when the element scrolls into view.
 * @param {object} opts
 * @param {number} opts.threshold  – IntersectionObserver threshold (0-1)
 * @param {number} opts.delay      – base delay before the animation starts (ms)
 * @param {string} opts.selector   – child selector to stagger (if falsy, animates the ref itself)
 * @param {number} opts.stagger    – stagger interval between children (ms)
 * @param {string} opts.direction  – 'up' | 'left' | 'right'  (slide direction)
 * @param {number} opts.distance   – translate distance in px
 */
export default function useScrollReveal({
  threshold = 0.15,
  delay = 0,
  selector = null,
  stagger = 120,
  direction = "up",
  distance = 60,
} = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Determine targets
    const targets = selector ? el.querySelectorAll(selector) : el;

    // Set initial hidden state
    if (selector) {
      el.querySelectorAll(selector).forEach((child) => {
        child.style.opacity = "0";
        if (direction === "up") child.style.transform = `translateY(${distance}px)`;
        else if (direction === "left") child.style.transform = `translateX(${distance}px)`;
        else if (direction === "right") child.style.transform = `translateX(-${distance}px)`;
      });
    } else {
      el.style.opacity = "0";
      if (direction === "up") el.style.transform = `translateY(${distance}px)`;
      else if (direction === "left") el.style.transform = `translateX(${distance}px)`;
      else if (direction === "right") el.style.transform = `translateX(-${distance}px)`;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          // Animate in
          const translateProp =
            direction === "up" ? { translateY: [distance, 0] } :
            direction === "left" ? { translateX: [distance, 0] } :
            { translateX: [-distance, 0] };

          anime({
            targets,
            opacity: [0, 1],
            ...translateProp,
            duration: 900,
            easing: "easeOutExpo",
            delay: selector ? anime.stagger(stagger, { start: delay }) : delay,
          });
        } else {
          // Reset to hidden state when scrolled out of view
          if (selector) {
            el.querySelectorAll(selector).forEach((child) => {
              child.style.opacity = "0";
              child.style.transform =
                direction === "up" ? `translateY(${distance}px)` :
                direction === "left" ? `translateX(${distance}px)` :
                `translateX(-${distance}px)`;
            });
          } else {
            el.style.opacity = "0";
            el.style.transform =
              direction === "up" ? `translateY(${distance}px)` :
              direction === "left" ? `translateX(${distance}px)` :
              `translateX(-${distance}px)`;
          }
        }
      },
      { threshold }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, delay, selector, stagger, direction, distance]);

  return ref;
}
