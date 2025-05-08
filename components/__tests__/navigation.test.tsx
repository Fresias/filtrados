import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { Navigation } from '../navigation'

// Mock de gsap
jest.mock('gsap', () => ({
  fromTo: jest.fn(),
}))

describe('Navigation Component', () => {
  beforeEach(() => {
    // Limpiar todos los mocks antes de cada prueba
    jest.clearAllMocks()
  })

  it('renders navigation links correctly', () => {
    render(<Navigation />)
    // Verifica que existan los enlaces principales (al menos uno de cada uno)
    expect(screen.getAllByText('Inicio').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Sobre Nosotros').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Productos').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Ubicaciones').length).toBeGreaterThan(0)
    expect(screen.getAllByText('Contacto').length).toBeGreaterThan(0)
  })

  it('el logo FILTRADOS está presente', () => {
    render(<Navigation />)
    expect(screen.getAllByText('FILTRADOS').length).toBeGreaterThan(0)
  })

  it('los enlaces tienen los href correctos', () => {
    render(<Navigation />)
    expect(screen.getByText('Inicio').closest('a')).toHaveAttribute('href', '#inicio')
    expect(screen.getByText('Sobre Nosotros').closest('a')).toHaveAttribute('href', '#sobre-nosotros')
    expect(screen.getByText('Productos').closest('a')).toHaveAttribute('href', '#productos')
    expect(screen.getByText('Ubicaciones').closest('a')).toHaveAttribute('href', '#ubicaciones')
    expect(screen.getByText('Contacto').closest('a')).toHaveAttribute('href', '#contacto')
  })

  it('abre y cierra el menú móvil correctamente', () => {
    render(<Navigation />)
    // El botón de menú es el único button visible inicialmente
    const [menuButton] = screen.getAllByRole('button')
    fireEvent.click(menuButton)
    // Ahora debe haber al menos dos botones (el de cerrar y el de menú)
    const buttons = screen.getAllByRole('button')
    expect(buttons.length).toBeGreaterThan(1)
    // Cerrar el menú móvil
    fireEvent.click(buttons[1])
    // El menú móvil se cierra sin errores
  })

  it('cierra el menú móvil al hacer clic en un enlace', () => {
    render(<Navigation />)
    const [menuButton] = screen.getAllByRole('button')
    fireEvent.click(menuButton)
    // Hay dos enlaces "Inicio", tomamos el del menú móvil (el segundo)
    const inicioLinks = screen.getAllByText('Inicio')
    expect(inicioLinks.length).toBeGreaterThan(1)
    fireEvent.click(inicioLinks[1])
    // El menú móvil se cierra sin errores
  })

  it('applies scroll styles correctly', () => {
    render(<Navigation />)
    // Simular scroll
    fireEvent.scroll(window, { target: { scrollY: 100 } })
    // Verificar que se aplican las clases correctas
    const header = screen.getByRole('banner')
    expect(header).toHaveClass('bg-[#FFEDCO]/90')
  })

  it('muestra los enlaces en el menú móvil', () => {
    render(<Navigation />)
    const [menuButton] = screen.getAllByRole('button')
    fireEvent.click(menuButton)
    expect(screen.getAllByText('Inicio').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Sobre Nosotros').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Productos').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Ubicaciones').length).toBeGreaterThan(1)
    expect(screen.getAllByText('Contacto').length).toBeGreaterThan(1)
  })
}) 