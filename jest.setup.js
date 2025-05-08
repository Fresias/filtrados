import '@testing-library/jest-dom'

// Mock de gsap y ScrollTrigger para evitar errores de importación ESM
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  fromTo: jest.fn(),
}))
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { getAll: () => ({ forEach: () => {} }) },
}))

// Mock de window.matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation(query => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
})

// Mock de ResizeObserver
global.ResizeObserver = jest.fn().mockImplementation(() => ({
  observe: jest.fn(),
  unobserve: jest.fn(),
  disconnect: jest.fn(),
}))

// Polyfill para requestSubmit en JSDOM
if (!HTMLFormElement.prototype.requestSubmit) {
  HTMLFormElement.prototype.requestSubmit = function() {
    this.dispatchEvent(new Event('submit', { bubbles: true, cancelable: true }));
  };
} 