import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import { ProductItem } from '../product-item'

jest.mock('gsap', () => ({
  to: jest.fn(() => ({ play: jest.fn(), reverse: jest.fn(), kill: jest.fn() })),
  killTweensOf: jest.fn(),
  timeline: jest.fn(() => ({ to: jest.fn().mockReturnThis(), kill: jest.fn(), play: jest.fn(), reverse: jest.fn() })),
}))

const mockProduct = {
  id: '1',
  name: 'Producto de prueba',
  price: '99.99',
  description: 'Descripción del producto',
  image: '/test-image.jpg',
  isActive: false,
}

describe('ProductItem Component', () => {
  it('renders product information correctly', () => {
    render(<ProductItem product={mockProduct} isActive={false} onClick={jest.fn()} />)
    expect(screen.getByText(mockProduct.name.toUpperCase())).toBeInTheDocument()
    expect(screen.getByText(mockProduct.price)).toBeInTheDocument()
  })

  it('renders the product image', () => {
    render(<ProductItem product={mockProduct} isActive={false} onClick={jest.fn()} />)
    const img = screen.getByAltText(mockProduct.name)
    expect(img).toBeInTheDocument()
  })

  it('handles click event on the card and on the button (propagates)', () => {
    const onClick = jest.fn()
    render(<ProductItem product={mockProduct} isActive={false} onClick={onClick} />)
    // Click en el div principal
    const card = screen.getByText(mockProduct.name.toUpperCase()).closest('div')
    if (card) fireEvent.click(card)
    expect(onClick).toHaveBeenCalledTimes(1)
    // Click en el botón también dispara onClick (propagación)
    const button = screen.getByRole('button', { name: /ver producto/i })
    fireEvent.click(button)
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('acepta width y height opcionales', () => {
    const productWithSize = { ...mockProduct, width: 200, height: 200 }
    render(<ProductItem product={productWithSize} isActive={false} onClick={jest.fn()} />)
    const img = screen.getByAltText(mockProduct.name)
    expect(img).toBeInTheDocument()
  })
}) 