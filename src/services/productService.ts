import type { Product, ProductsResponse } from '@/types/product';
import { env } from '@/config/env';

const BASE_URL = env.apiBaseUrl;
const PAGE_SIZE = 12;

interface FetchProductsOptions {
  page?: number;
  q?: string;
  category?: string;
}

interface Category {
  slug: string;
  name: string;
  url: string;
}

interface ProductServiceState {
  products: Product[];
  categories: string[];
  total: number;
  current: Product | null;
  productCache: Record<number, Product>;
}

const state: ProductServiceState = {
  products: [],
  categories: [],
  total: 0,
  current: null,
  productCache: {},
};

export const productService = {
  get state() {
    return state;
  },

  async fetchCategories(): Promise<string[]> {
    const categories = await this.getCategories();
    state.categories = categories;
    return categories;
  },

  async fetchProducts(opts: FetchProductsOptions = {}): Promise<ProductsResponse> {
    const data = await this.getProducts(opts);
    state.products = data.products;
    state.total = data.total;
    return data;
  },

  async fetchProduct(id: number): Promise<Product> {
    if (state.productCache[id]) {
      state.current = state.productCache[id];
      return state.current;
    }
    const product = await this.getProduct(id);
    state.current = product;
    state.productCache[id] = product;
    return product;
  },

  async getProducts(opts: FetchProductsOptions = {}): Promise<ProductsResponse> {
    const page = opts.page ?? 1;
    const q = (opts.q ?? '').trim();
    const category = (opts.category ?? '').trim();
    const skip = (page - 1) * PAGE_SIZE;

    let url = `${BASE_URL}/products?limit=${PAGE_SIZE}&skip=${skip}`;
    if (q) {
      url = `${BASE_URL}/products/search?q=${encodeURIComponent(q)}&limit=${PAGE_SIZE}&skip=${skip}`;
    }
    if (category) {
      url = `${BASE_URL}/products/category/${encodeURIComponent(category)}?limit=${PAGE_SIZE}&skip=${skip}`;
    }

    const res = await fetch(url);
    if (!res.ok) throw new Error('Error al cargar productos');
    return res.json() as Promise<ProductsResponse>;
  },

  async getProduct(id: number): Promise<Product> {
    const res = await fetch(`${BASE_URL}/products/${id}`);
    if (res.status === 404) throw new Error('Producto no encontrado');
    if (!res.ok) throw new Error('Error al cargar producto');
    return res.json() as Promise<Product>;
  },

  async getCategories(): Promise<string[]> {
    const res = await fetch(`${BASE_URL}/products/categories`);
    if (!res.ok) throw new Error('Error al cargar categorías');
    const data = (await res.json()) as Category[];
    return data.map((c) => c.slug);
  },
};
