import { defineStore } from 'pinia';
import type { Product } from '@/types/product';

export const useProductsStore = defineStore('products', {
  state: () => ({
    products: [] as Product[],
    categories: [] as string[],
    total: 0,
    page: 1,
    loading: false,
    current: null as Product | null,
    error: '',
  }),
  getters: {
    totalPages(state) {
      return Math.max(1, Math.ceil(state.total / 12));
    },
  },
});
