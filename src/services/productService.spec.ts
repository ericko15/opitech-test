import { describe, it, expect, vi, beforeEach } from 'vitest';
import { productService } from './productService';

const mockFetch = vi.fn();
globalThis.fetch = mockFetch;

describe('productService', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    productService.state.products = [];
    productService.state.categories = [];
    productService.state.total = 0;
    productService.state.current = null;
    productService.state.productCache = {};
  });
  describe('getProducts', () => {
    it('should fetch products with pagination', async () => {
      const mockResponse = {
        products: [{ id: 1, title: 'Product 1' }],
        total: 100,
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      const result = await productService.getProducts({ page: 1 });

      expect(result).toEqual(mockResponse);
      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products?limit=12&skip=0');
    });

    it('should include search query', async () => {
      const mockResponse = { products: [], total: 0 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await productService.getProducts({ q: 'test', page: 1 });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/search?q=test&limit=12&skip=0',
      );
    });

    it('should include category filter', async () => {
      const mockResponse = { products: [], total: 0 };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await productService.getProducts({ category: 'electronics', page: 1 });

      expect(mockFetch).toHaveBeenCalledWith(
        'https://dummyjson.com/products/category/electronics?limit=12&skip=0',
      );
    });

    it('should throw error on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(productService.getProducts()).rejects.toThrow('Error al cargar productos');
    });
  });

  describe('getProduct', () => {
    it('should fetch single product', async () => {
      const mockProduct = { id: 1, title: 'Product 1' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      const result = await productService.getProduct(1);

      expect(result).toEqual(mockProduct);
      expect(mockFetch).toHaveBeenCalledWith('https://dummyjson.com/products/1');
    });

    it('should throw 404 error when product not found', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 404,
      });

      await expect(productService.getProduct(999)).rejects.toThrow('Producto no encontrado');
    });

    it('should throw error on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
        status: 500,
      });

      await expect(productService.getProduct(1)).rejects.toThrow('Error al cargar producto');
    });
  });

  describe('getCategories', () => {
    it('should fetch and map categories', async () => {
      const mockCategories = [
        { slug: 'electronics', name: 'Electronics', url: 'http://example.com' },
        { slug: 'clothing', name: 'Clothing', url: 'http://example.com' },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      });

      const result = await productService.getCategories();

      expect(result).toEqual(['electronics', 'clothing']);
    });

    it('should throw error on failed request', async () => {
      mockFetch.mockResolvedValueOnce({
        ok: false,
      });

      await expect(productService.getCategories()).rejects.toThrow('Error al cargar categorías');
    });
  });

  describe('fetchCategories', () => {
    it('should update state with categories', async () => {
      const mockCategories = [
        { slug: 'electronics', name: 'Electronics', url: 'http://example.com' },
      ];
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockCategories),
      });

      await productService.fetchCategories();

      expect(productService.state.categories).toEqual(['electronics']);
    });
  });

  describe('fetchProducts', () => {
    it('should update state with products', async () => {
      const mockResponse = {
        products: [{ id: 1, title: 'Product 1' }],
        total: 1,
      };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockResponse),
      });

      await productService.fetchProducts({ page: 1 });

      expect(productService.state.products).toEqual([{ id: 1, title: 'Product 1' }]);
      expect(productService.state.total).toBe(1);
    });
  });

  describe('fetchProduct', () => {
    it('should use cache on second call', async () => {
      const mockProduct = { id: 1, title: 'Product 1' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      await productService.fetchProduct(1);
      await productService.fetchProduct(1);

      expect(mockFetch).toHaveBeenCalledTimes(1);
      expect(productService.state.current).toEqual(mockProduct);
    });

    it('should cache fetched product', async () => {
      const mockProduct = { id: 1, title: 'Product 1' };
      mockFetch.mockResolvedValueOnce({
        ok: true,
        json: () => Promise.resolve(mockProduct),
      });

      await productService.fetchProduct(1);

      expect(productService.state.productCache[1]).toEqual(mockProduct);
    });
  });
});
