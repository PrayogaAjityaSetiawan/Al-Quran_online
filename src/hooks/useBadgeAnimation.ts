"use client";
import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";

export function useBadgeAnimation(messages: string[], delay = 3000) {
  const textRef = useRef<HTMLSpanElement | null>(null);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;

    const interval = setInterval(() => {
      gsap.to(el, {
        y: -10,
        opacity: 0,
        duration: 0.35,
        ease: "power2.out",
        onComplete: () => {
          setIndex((i) => (i + 1) % messages.length);
          gsap.set(el, { y: 10 });
          gsap.to(el, {
            y: 0,
            opacity: 1,
            duration: 0.35,
            ease: "power2.out",
          });
        },
      });
    }, delay);

    return () => clearInterval(interval);
  }, [messages, delay]);

  return { textRef, index };
}
