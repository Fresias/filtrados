import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import BasicAnimation from '../basic-animation'

jest.mock('gsap', () => ({
  to: jest.fn(() => ({ play: jest.fn(), reverse: jest.fn(), kill: jest.fn() })),
  killTweensOf: jest.fn(),
}))

describe('BasicAnimation Component', () => {
  it('renders three boxes and a button', () => {
    render(<BasicAnimation />)
    expect(screen.getByText('Animate All')).toBeInTheDocument()
    expect(document.querySelectorAll('.bg-red-500').length).toBe(1)
    expect(document.querySelectorAll('.bg-green-500').length).toBe(1)
    expect(document.querySelectorAll('.bg-blue-500').length).toBe(1)
  })

  it('el botón Animate All dispara la animación', () => {
    render(<BasicAnimation />)
    const button = screen.getByText('Animate All')
    fireEvent.click(button)
    // gsap.to debe ser llamado al menos una vez
    const gsap = require('gsap')
    expect(gsap.to).toHaveBeenCalled()
  })

  it('el componente se puede renderizar varias veces sin errores', () => {
    for (let i = 0; i < 3; i++) {
      render(<BasicAnimation />)
    }
    expect(screen.getAllByText('Animate All').length).toBe(3)
  })
}) 