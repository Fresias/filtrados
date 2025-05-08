import '@testing-library/jest-dom'
import { render, screen } from '@testing-library/react'

// Mock de gsap y ScrollTrigger para evitar errores de importación ESM
jest.mock('gsap', () => ({
  registerPlugin: jest.fn(),
  fromTo: jest.fn(),
}))
jest.mock('gsap/ScrollTrigger', () => ({
  ScrollTrigger: { getAll: () => ({ forEach: () => {} }) },
}))

import { Contact } from '../contact'

describe('Contact Component', () => {
  it('renderiza todos los campos del formulario', () => {
    render(<Contact />)
    expect(screen.getByLabelText(/nombre/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/email/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/asunto/i)).toBeInTheDocument()
    expect(screen.getByLabelText(/mensaje/i)).toBeInTheDocument()
    expect(screen.getByRole('button', { name: /enviar/i })).toBeInTheDocument()
  })

  it('muestra la información de contacto', () => {
    render(<Contact />)
    expect(screen.getByText('+52 123 456 7890')).toBeInTheDocument()
    expect(screen.getByText('info@filtrados.com')).toBeInTheDocument()
    expect(screen.getByText(/Horario de Atención/i)).toBeInTheDocument()
    expect(screen.getByText(/Lunes a Viernes/i)).toBeInTheDocument()
    expect(screen.getByText(/Sábado y Domingo/i)).toBeInTheDocument()
  })

  it('muestra los iconos de redes sociales', () => {
    render(<Contact />)
    // Busca los iconos por su aria-label o por el href
    const links = screen.getAllByRole('link')
    expect(links.length).toBeGreaterThanOrEqual(3)
  })
}) 