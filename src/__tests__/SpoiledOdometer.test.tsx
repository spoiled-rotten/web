import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import { SpoiledOdometer } from '@/components/SpoiledOdometer';
import { CartProvider } from '@/contexts/CartContext';
import React from 'react';

// Mock the useCart hook
vi.mock('@/contexts/CartContext', () => ({
  CartProvider: ({ children }: { children: React.ReactNode }) => <div>{children}</div>,
  useCart: vi.fn()
}));

import { useCart } from '@/contexts/CartContext';

describe('SpoiledOdometer', () => {
  const mockUseCart = useCart as ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockUseCart.mockReset();
  });

  it('should display 0% when cart is empty', () => {
    mockUseCart.mockReturnValue({
      spoiledLevel: 0,
      totalAmount: 0,
      totalItems: 0
    });

    render(<SpoiledOdometer />);
    
    expect(screen.getByText('0%')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
    expect(screen.getByText('0 items')).toBeInTheDocument();
    expect(screen.getByText('$0')).toBeInTheDocument();
  });

  it('should display correct milestone labels', () => {
    const testCases = [
      { level: 0, label: '0' },
      { level: 25, label: 'TREATING' },
      { level: 45, label: 'SPLURGING' },
      { level: 65, label: 'INDULGING' },
      { level: 85, label: 'LUXURIOUS' },
      { level: 100, label: 'SPOILED' }
    ];

    testCases.forEach(({ level, label }) => {
      mockUseCart.mockReturnValue({
        spoiledLevel: level,
        totalAmount: level * 200,
        totalItems: Math.floor(level / 10)
      });

      const { rerender } = render(<SpoiledOdometer />);
      expect(screen.getByText(label)).toBeInTheDocument();
      rerender(<></>);
    });
  });

  it('should format currency correctly', () => {
    mockUseCart.mockReturnValue({
      spoiledLevel: 50,
      totalAmount: 10000,
      totalItems: 3
    });

    render(<SpoiledOdometer />);
    
    expect(screen.getByText('$10,000')).toBeInTheDocument();
  });

  it('should display singular "item" for single item', () => {
    mockUseCart.mockReturnValue({
      spoiledLevel: 10,
      totalAmount: 2000,
      totalItems: 1
    });

    render(<SpoiledOdometer />);
    
    expect(screen.getByText('1 item')).toBeInTheDocument();
  });

  it('should display plural "items" for multiple items', () => {
    mockUseCart.mockReturnValue({
      spoiledLevel: 25,
      totalAmount: 5000,
      totalItems: 5
    });

    render(<SpoiledOdometer />);
    
    expect(screen.getByText('5 items')).toBeInTheDocument();
  });

  it('should show achievement badge when fully spoiled', () => {
    mockUseCart.mockReturnValue({
      spoiledLevel: 100,
      totalAmount: 20000,
      totalItems: 10
    });

    render(<SpoiledOdometer />);
    
    expect(screen.getByText('FULLY SPOILED! 👑')).toBeInTheDocument();
  });

  it('should show next milestone hint when not fully spoiled', () => {
    mockUseCart.mockReturnValue({
      spoiledLevel: 30,
      totalAmount: 6000,
      totalItems: 3
    });

    render(<SpoiledOdometer />);
    
    expect(screen.getByText('Next:')).toBeInTheDocument();
    expect(screen.getByText('SPLURGING')).toBeInTheDocument();
  });

  it('should position correctly on screen', () => {
    mockUseCart.mockReturnValue({
      spoiledLevel: 50,
      totalAmount: 10000,
      totalItems: 5
    });

    const { container } = render(<SpoiledOdometer />);
    
    const odometerElement = container.firstChild;
    expect(odometerElement).toHaveClass('fixed', 'bottom-6', 'left-6', 'z-50');
  });
});