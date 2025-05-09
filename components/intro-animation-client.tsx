"use client";

import { useEffect } from "react";
import gsap from "gsap";

export function IntroAnimationClient() {
  useEffect(() => {
    const container = document.getElementById("intro-animation-container");
    const mainContent = document.querySelector(".page-content");
    if (!container || !(mainContent instanceof HTMLElement)) return;
    // Ocultar solo el contenido principal con opacity
    const originalVisibility = mainContent.style.visibility;
    const originalOpacity = mainContent.style.opacity;
    mainContent.style.visibility = "visible";
    mainContent.style.opacity = "0";
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    // Palabras y estilos
    const words = [
      { text: "DESPERTAR", bgColor: "#BF2A13", textColor: "#FFEDCO", variant: "font-bold" },
      { text: "SENTIR", bgColor: "#F2BC57", textColor: "#570B0A", variant: "font-medium" },
      { text: "CALIDEZ", bgColor: "#FFEDCO", textColor: "#BF2A13", variant: "font-bold" },
      { text: "NOSTALGIA", bgColor: "#8ABFAC", textColor: "#570B0A", variant: "font-medium" },
      { text: "MOMENTO", bgColor: "#570B0A", textColor: "#F2BC57", variant: "font-bold" },
      { text: "AUTENTICIDAD", bgColor: "#045951", textColor: "#F2BC57", variant: "font-medium" },
      { text: "DISFRUTAR", bgColor: "#F2BC57", textColor: "#045951", variant: "font-bold" },
      { text: "COMPARTIR", bgColor: "#8ABFAC", textColor: "#BF2BC13", variant: "font-medium" },
    ];
    const lastWord = { text: "RECONECTAR", bgColor: "#FFEDCO", textColor: "#045951", variant: "font-bold" };

    // Limpiar cualquier contenido existente
    container.innerHTML = "";

    // Crear elementos para todas las palabras primero (excepto la última)
    const fragment = document.createDocumentFragment();
    const wordElements = words.map((word) => {
      const wordEl = document.createElement("div");
      wordEl.className = "absolute inset-0 flex items-center justify-center";
      wordEl.style.backgroundColor = word.bgColor;
      const textEl = document.createElement("h1");
      textEl.className = `hero-text font-display ${word.variant} tracking-tight`;
      textEl.style.color = word.textColor;
      textEl.textContent = word.text;
      wordEl.appendChild(textEl);
      fragment.appendChild(wordEl);
      return wordEl;
    });
    container.appendChild(fragment);
    gsap.set(wordElements, { autoAlpha: 0 });

    // Última palabra
    const lastWordContainer = document.createElement("div");
    lastWordContainer.className = "absolute inset-0 flex items-center justify-center";
    lastWordContainer.style.backgroundColor = lastWord.bgColor;
    lastWordContainer.style.zIndex = "10";
    const lastWordText = document.createElement("h1");
    lastWordText.className = `hero-text font-display ${lastWord.variant} tracking-tight`;
    lastWordText.style.color = lastWord.textColor;
    lastWordText.textContent = lastWord.text;
    lastWordContainer.appendChild(lastWordText);
    container.appendChild(lastWordContainer);
    gsap.set(lastWordContainer, { autoAlpha: 0 });

    // Timeline animación
    const tl = gsap.timeline();
    wordElements.forEach((wordEl, index) => {
      if (index === 0) tl.to(wordEl, { autoAlpha: 1, duration: 0.2 });
      tl.to(wordEl, { autoAlpha: 0, duration: 0.2 }, "+=0.05");
      if (index < wordElements.length - 1) {
        tl.to(wordElements[index + 1], { autoAlpha: 1, duration: 0.2 }, "<0.1");
      } else {
        tl.to(lastWordContainer, { autoAlpha: 1, duration: 0.2 }, "<0.1");
      }
    });
    tl.to({}, {}, "+=0.05");
    // Efecto slice: desplazar la última palabra hacia arriba y revelar la página instantáneamente
    tl.to(lastWordContainer, {
      y: "-100%",
      duration: 0.5,
      ease: "power3.inOut",
      onComplete: () => {
        mainContent.style.opacity = originalOpacity || "1";
        mainContent.style.visibility = originalVisibility;
        document.body.style.overflow = originalOverflow;
        container.style.display = "none";
      }
    });

    if (container instanceof HTMLElement) {
      container.style.willChange = "transform, opacity";
    }
    if (lastWordContainer instanceof HTMLElement) {
      lastWordContainer.style.willChange = "transform, opacity";
    }

    return () => {
      tl.kill();
      if (container instanceof HTMLElement) {
        container.style.willChange = "auto";
      }
      mainContent.style.opacity = originalOpacity || "1";
      mainContent.style.visibility = originalVisibility;
      document.body.style.overflow = originalOverflow;
    };
  }, []);

  return null;
} 