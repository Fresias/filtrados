"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function WordsCarouselClient() {
  useEffect(() => {
    const track = document.querySelector('.words-track');
    if (!track) return;
    const words = track.querySelectorAll('.word');
    if (words.length === 0) return;

    // Duplicar palabras para loop infinito (como en el original)
    if (words.length === 9) {
      words.forEach(word => {
        const clone = word.cloneNode(true);
        track.appendChild(clone);
      });
    }

    // Medir ancho real
    const trackWidth = (track.scrollWidth / 2) || 1;
    // Animación GSAP
    const tween = gsap.to(track, {
      x: -trackWidth,
      duration: 20,
      ease: "linear",
      repeat: -1,
      onRepeat: () => {
        gsap.set(track, { x: 0 });
      },
    });
    if (track instanceof HTMLElement) {
      track.style.willChange = "transform";
    }

    return () => {
      tween.kill();
      if (track instanceof HTMLElement) {
        track.style.willChange = "auto";
      }
    };
  }, []);

  return null;
} 