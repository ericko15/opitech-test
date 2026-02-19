import { describe, it, expect, beforeEach } from 'vitest';
import { setActivePinia, createPinia } from 'pinia';
import { useProductsStore } from './products';

describe('products store', () => {
  beforeEach(() => {
    setActivePinia(createPinia());
  });

  it('should have initial state', () => {
    const store = useProductsStore();
    expect(store.products).toEqual([]);
    expect(store.categories).toEqual([]);
    expect(store.total).toBe(0);
    expect(store.page).toBe(1);
    expect(store.loading).toBe(false);
    expect(store.current).toBeNull();
    expect(store.error).toBe('');
  });

  it('should calculate totalPages correctly', () => {
    const store = useProductsStore();

    store.total = 0;
    expect(store.totalPages).toBe(1);

    store.total = 12;
    expect(store.totalPages).toBe(1);

    store.total = 13;
    expect(store.totalPages).toBe(2);

    store.total = 100;
    expect(store.totalPages).toBe(9);
  });
});
