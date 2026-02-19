import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductCard from './ProductCard.vue';
import type { Product } from '../../types/product';

describe('ProductCard', () => {
  const mockProduct: Product = {
    id: 1,
    title: 'Test Product',
    description: 'Test description',
    price: 99.99,
    thumbnail: 'https://example.com/image.jpg',
    images: [],
    category: 'electronics',
    brand: 'TestBrand',
    stock: 10,
    rating: 4.5,
  };

  it('renders product title', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    });
    expect(wrapper.text()).toContain('Test Product');
  });

  it('renders product description', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    });
    expect(wrapper.text()).toContain('Test description');
  });

  it('renders product price', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    });
    expect(wrapper.text()).toContain('$99.99');
  });

  it('renders product image with alt text', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    });
    const img = wrapper.find('img');
    expect(img.exists()).toBe(true);
    expect(img.attributes('alt')).toBe('Test Product');
  });

  it('renders link wrapper', () => {
    const wrapper = mount(ProductCard, {
      props: { product: mockProduct },
    });
    expect(wrapper.find('a, router-link').exists()).toBe(true);
  });
});
