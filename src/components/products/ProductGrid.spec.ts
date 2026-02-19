import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductGrid from './ProductGrid.vue';
import type { Product } from '@/types/product';

describe('ProductGrid', () => {
  const mockProducts: Product[] = [
    {
      id: 1,
      title: 'Product 1',
      description: 'Desc 1',
      price: 10,
      thumbnail: '',
      images: [],
      category: 'a',
    },
    {
      id: 2,
      title: 'Product 2',
      description: 'Desc 2',
      price: 20,
      thumbnail: '',
      images: [],
      category: 'b',
    },
  ];

  it('renders product cards when products exist', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: mockProducts, loading: false },
    });
    expect(wrapper.text()).toContain('Product 1');
    expect(wrapper.text()).toContain('Product 2');
  });

  it('renders empty state when no products', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: [], loading: false },
    });
    expect(wrapper.text()).toContain('No se encontraron productos');
  });

  it('renders skeleton when loading', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: [], loading: true },
    });
    expect(wrapper.find('[aria-busy]').exists()).toBe(true);
  });

  it('does not render empty state when loading', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: [], loading: true },
    });
    expect(wrapper.text()).not.toContain('No se encontraron productos');
  });

  it('has correct grid layout', () => {
    const wrapper = mount(ProductGrid, {
      props: { products: mockProducts, loading: false },
    });
    expect(wrapper.find('div').classes()).toContain('grid');
  });
});
