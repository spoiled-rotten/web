import { describe, it, expect, beforeEach } from 'vitest';
import { renderHook, act } from '@testing-library/react';
import { CartProvider, useCart } from '@/contexts/CartContext';
import React from 'react';

describe('CartContext', () => {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <CartProvider>{children}</CartProvider>
  );

  beforeEach(() => {
    localStorage.clear();
  });

  describe('Cart Operations', () => {
    it('should initialize with empty cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalAmount).toBe(0);
      expect(result.current.totalItems).toBe(0);
      expect(result.current.spoiledLevel).toBe(0);
    });

    it('should add item to cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      act(() => {
        result.current.addToCart({
          id: '1',
          name: 'Luxury Handbag',
          price: 2850,
          image: 'test.jpg',
          category: 'Handbags'
        });
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.totalAmount).toBe(2850);
      expect(result.current.totalItems).toBe(1);
    });

    it('should update quantity when adding duplicate item', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      act(() => {
        result.current.addToCart({
          id: '1',
          name: 'Luxury Handbag',
          price: 2850,
        });
        result.current.addToCart({
          id: '1',
          name: 'Luxury Handbag',
          price: 2850,
        });
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.totalAmount).toBe(5700);
      expect(result.current.totalItems).toBe(2);
    });

    it('should remove item from cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      act(() => {
        result.current.addToCart({
          id: '1',
          name: 'Luxury Handbag',
          price: 2850,
        });
        result.current.removeFromCart('1');
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalAmount).toBe(0);
    });

    it('should update item quantity', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      act(() => {
        result.current.addToCart({
          id: '1',
          name: 'Luxury Handbag',
          price: 2850,
        });
        result.current.updateQuantity('1', 3);
      });

      expect(result.current.items[0].quantity).toBe(3);
      expect(result.current.totalAmount).toBe(8550);
      expect(result.current.totalItems).toBe(3);
    });

    it('should clear cart', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      act(() => {
        result.current.addToCart({
          id: '1',
          name: 'Luxury Handbag',
          price: 2850,
        });
        result.current.addToCart({
          id: '2',
          name: 'Diamond Necklace',
          price: 4200,
        });
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.totalAmount).toBe(0);
    });
  });

  describe('Spoiled Level Calculation', () => {
    it('should calculate correct spoiled level for different amounts', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      // Test 0%
      expect(result.current.spoiledLevel).toBe(0);

      // Test 25% ($5,000 / $20,000)
      act(() => {
        result.current.addToCart({
          id: '1',
          name: 'Test Item',
          price: 5000,
        });
      });
      expect(result.current.spoiledLevel).toBe(25);

      // Test 50% ($10,000 / $20,000)
      act(() => {
        result.current.updateQuantity('1', 2);
      });
      expect(result.current.spoiledLevel).toBe(50);

      // Test 100% ($20,000 / $20,000)
      act(() => {
        result.current.updateQuantity('1', 4);
      });
      expect(result.current.spoiledLevel).toBe(100);

      // Test capping at 100% (over $20,000)
      act(() => {
        result.current.updateQuantity('1', 5);
      });
      expect(result.current.spoiledLevel).toBe(100);
    });
  });

  describe('LocalStorage Persistence', () => {
    it('should save cart to localStorage', () => {
      const { result } = renderHook(() => useCart(), { wrapper });
      
      act(() => {
        result.current.addToCart({
          id: '1',
          name: 'Luxury Handbag',
          price: 2850,
        });
      });

      const savedCart = localStorage.getItem('spoiledRottenCart');
      expect(savedCart).toBeTruthy();
      const parsed = JSON.parse(savedCart!);
      expect(parsed).toHaveLength(1);
      expect(parsed[0].id).toBe('1');
    });

    it('should load cart from localStorage on mount', () => {
      // Pre-populate localStorage
      const initialCart = [{
        id: '1',
        name: 'Luxury Handbag',
        price: 2850,
        quantity: 2
      }];
      localStorage.setItem('spoiledRottenCart', JSON.stringify(initialCart));

      const { result } = renderHook(() => useCart(), { wrapper });
      
      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.totalAmount).toBe(5700);
    });
  });
});