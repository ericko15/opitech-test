import { productService } from '@/services/productService';
import { useProductsStore } from '@/stores/products';

export function useProducts() {
  const store = useProductsStore();

  const fetchCategories = async () => {
    store.error = '';
    store.loading = true;
    try {
      await productService.fetchCategories();
      store.categories = productService.state.categories;
    } catch (e) {
      store.error = (e as Error).message;
    } finally {
      store.loading = false;
    }
  };

  const fetchProducts = async (opts: { page?: number; q?: string; category?: string } = {}) => {
    const category = typeof opts.category === 'string' ? opts.category : '';
    store.error = '';
    store.loading = true;
    try {
      await productService.fetchProducts({ ...opts, category });
      store.products = productService.state.products;
      store.total = productService.state.total;
      store.page = opts.page ?? 1;
      if (!store.products.length) store.error = 'No se encontraron productos';
    } finally {
      store.loading = false;
    }
  };

  const fetchProduct = async (id: number) => {
    store.error = '';
    store.loading = true;
    try {
      await productService.fetchProduct(id);
      store.current = productService.state.current;
    } catch (e) {
      store.error = (e as Error).message;
    } finally {
      store.loading = false;
    }
  };

  return {
    fetchCategories,
    fetchProducts,
    fetchProduct,
  };
}
