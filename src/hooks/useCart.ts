import { useEffect, useState } from 'react';
import type { CartItem, Size } from '../types';
import { findProduct } from '../data/products';

const KEY = 'seiza-cart';

function load(): CartItem[] {
  try {
    const raw = localStorage.getItem(KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : [];
  } catch {
    return [];
  }
}

/** Sacola mockada: vive no estado do React e é salva no localStorage do navegador. */
export function useCart() {
  const [items, setItems] = useState<CartItem[]>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(items));
    } catch {
      /* armazenamento indisponível: a sacola continua funcionando na sessão */
    }
  }, [items]);

  const same = (a: CartItem, productId: string, variantId: string, size: Size) =>
    a.productId === productId && a.variantId === variantId && a.size === size;

  const add = (productId: string, variantId: string, size: Size, qty = 1) =>
    setItems((prev) =>
      prev.some((i) => same(i, productId, variantId, size))
        ? prev.map((i) => (same(i, productId, variantId, size) ? { ...i, qty: i.qty + qty } : i))
        : [...prev, { productId, variantId, size, qty }],
    );

  const setQty = (index: number, qty: number) =>
    setItems((prev) => (qty <= 0 ? prev.filter((_, i) => i !== index) : prev.map((it, i) => (i === index ? { ...it, qty } : it))));

  const clear = () => setItems([]);

  const count = items.reduce((n, i) => n + i.qty, 0);
  const subtotal = items.reduce((n, i) => n + findProduct(i.productId).price * i.qty, 0);

  return { items, add, setQty, clear, count, subtotal };
}
