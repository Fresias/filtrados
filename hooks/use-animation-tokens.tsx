"use client"

/**
 * Sistema de tokens de animación que documenta los valores existentes
 * sin imponer nuevos valores a las animaciones actuales
 */
export const animationTokens = {
  // Documentación de duraciones existentes observadas en el proyecto
  duration: {
    // Duraciones existentes (documentadas, no impuestas)
    existing: {
      // Animaciones básicas
      basicAnimation: 1.0, // En basic-animation.tsx
      circleAnimation: 0.8, // En basic-animation.tsx
      triangleAnimation: 1.2, // En basic-animation.tsx

      // Animaciones de texto
      textAnimation: 0.5, // En text-animation.tsx
      textCharStagger: 0.03, // En text-animation.tsx

      // Animaciones de scroll
      scrollAnimation: 0.8, // En scroll-animation.tsx
      scrollMobileAnimation: 0.6, // En scroll-animation.tsx

      // Animaciones de hover
      hoverAnimation: 0.3, // En hover-animation.tsx
      hoverScale: 0.4, // En hover-animation.tsx

      // Animaciones de timeline
      timelineAnimation: 0.8, // En timeline-animation.tsx

      // Animaciones de página
      introAnimation: 0.2, // En intro-animation.tsx
      wordTransition: 0.05, // En intro-animation.tsx

      // Animaciones de componentes específicos
      menuItemAnimation: 0.6, // En menu.tsx
      productCarousel: 0.6, // En product-carousel.tsx
      contactForm: 0.8, // En contact.tsx
      footerAnimation: 0.8, // En footer.tsx
      navigationMobile: 0.6, // En navigation.tsx
      poetryLine: 0.6, // En poetry-section.tsx
      wordsCarousel: 20, // En words-carousel.tsx (duración larga para animación continua)
      sectionNavigation: 0.5, // En sections-navigation.tsx
    },
    // Categorías estandarizadas para nuevas animaciones
    fast: 0.3,
    medium: 0.6,
    slow: 0.9,
    extraSlow: 1.5,
  },

  // Documentación de easings existentes observados en el proyecto
  ease: {
    // Easings existentes (documentados, no impuestos)
    existing: {
      // Animaciones básicas
      basicAnimation: "power2.inOut", // En basic-animation.tsx
      circleAnimation: "elastic.out(1, 0.3)", // En basic-animation.tsx
      triangleAnimation: "back.inOut(1.7)", // En basic-animation.tsx

      // Animaciones de texto
      textAnimation: "power2.out", // En text-animation.tsx

      // Animaciones de scroll
      scrollAnimation: "power2.out", // En scroll-animation.tsx

      // Animaciones de hover
      hoverAnimation: "power2.out", // En hover-animation.tsx

      // Animaciones de timeline
      timelineAnimation: "power2.out", // En timeline-animation.tsx
      timelineElastic: "elastic.out(1, 0.3)", // En timeline-animation.tsx

      // Animaciones de página
      introAnimation: "power3.out", // En intro-animation.tsx

      // Animaciones de componentes específicos
      menuItemAnimation: "power3.out", // En menu.tsx
      productCarousel: "power2.out", // En product-carousel.tsx
      contactForm: "power3.out", // En contact.tsx
      footerAnimation: "power2.out", // En footer.tsx
      navigationMobile: "power3.out", // En navigation.tsx
      poetryLine: "power2.out", // En poetry-section.tsx
      wordsCarousel: "linear", // En words-carousel.tsx
      parallaxScroll: "none", // En varios componentes para efectos parallax
    },
    // Categorías estandarizadas para nuevas animaciones
    standard: "power2.out",
    bounce: "back.out(1.7)",
    elastic: "elastic.out(1, 0.3)",
    smooth: "sine.inOut",
    sharp: "power3.inOut",
    linear: "none",
  },

  // Valores de stagger observados y recomendados
  stagger: {
    // Valores existentes (documentados, no impuestos)
    existing: {
      textAnimation: 0.03, // En text-animation.tsx
      scrollAnimation: 0.1, // En scroll-animation.tsx
      menuItems: 0.1, // En menu.tsx
      productItems: 0.15, // En product-carousel.tsx
      timelineItems: 0.3, // En timeline-animation.tsx
      poetryLines: 0.15, // En poetry-section.tsx
      sectionItems: 0.1, // En sections-navigation.tsx
    },
    // Categorías estandarizadas para nuevas animaciones
    fast: 0.05,
    medium: 0.1,
    slow: 0.2,
    extraSlow: 0.3,
  },

  // Valores de delay observados y recomendados
  delay: {
    // Valores existentes (documentados, no impuestos)
    existing: {
      introAnimation: 0.3, // En intro-animation.tsx
      menuItemsDelay: 0.1, // En menu.tsx
      productItemsDelay: 0.2, // En product-carousel.tsx
      socialIconsDelay: 1, // En varios componentes
    },
    // Categorías estandarizadas para nuevas animaciones
    none: 0,
    short: 0.1,
    medium: 0.3,
    long: 0.6,
  },

  // Valores de repetición observados
  repeat: {
    // Valores existentes (documentados, no impuestos)
    existing: {
      basicAnimation: 1, // En basic-animation.tsx (yoyo)
      textAnimation: 1, // En text-animation.tsx (yoyo)
      wordsCarousel: -1, // En words-carousel.tsx (infinito)
      floatingElements: -1, // En varios componentes para elementos flotantes
    },
    // Categorías estandarizadas para nuevas animaciones
    none: 0,
    once: 1,
    twice: 2,
    infinite: -1,
  },
}

/**
 * Hook que proporciona acceso a los tokens de animación
 * y permite personalización por componente
 */
export function useAnimationTokens(componentName?: string) {
  // Devolver tokens específicos del componente si existen
  if (componentName) {
    return {
      duration:
        animationTokens.duration.existing[componentName as keyof typeof animationTokens.duration.existing] ||
        animationTokens.duration.medium,
      ease:
        animationTokens.ease.existing[componentName as keyof typeof animationTokens.ease.existing] ||
        animationTokens.ease.standard,
      stagger:
        animationTokens.stagger.existing[componentName as keyof typeof animationTokens.stagger.existing] ||
        animationTokens.stagger.medium,
      delay:
        animationTokens.delay.existing[componentName as keyof typeof animationTokens.delay.existing] ||
        animationTokens.delay.none,
      repeat:
        animationTokens.repeat.existing[componentName as keyof typeof animationTokens.repeat.existing] ||
        animationTokens.repeat.none,
      // Proporcionar acceso a todos los tokens
      allTokens: animationTokens,
    }
  }

  // Devolver tokens predeterminados
  return {
    duration: animationTokens.duration.medium,
    ease: animationTokens.ease.standard,
    stagger: animationTokens.stagger.medium,
    delay: animationTokens.delay.none,
    repeat: animationTokens.repeat.none,
    // Proporcionar acceso a todos los tokens
    allTokens: animationTokens,
  }
}
