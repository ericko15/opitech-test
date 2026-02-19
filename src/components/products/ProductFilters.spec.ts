import { describe, it, expect, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import ProductFilters from './ProductFilters.vue';

describe('ProductFilters', () => {
  const categories = ['electronics', 'clothing'];

  it('renders search input', () => {
    const wrapper = mount(ProductFilters, {
      props: { searchValue: '', categoryValue: '', categories },
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('renders category component', () => {
    const wrapper = mount(ProductFilters, {
      props: { searchValue: '', categoryValue: '', categories },
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('emits search event after debounce', async () => {
    vi.useFakeTimers();
    const wrapper = mount(ProductFilters, {
      props: { searchValue: '', categoryValue: '', categories },
    });

    await wrapper.find('input').setValue('test');

    expect(wrapper.emitted('search')).toBeFalsy();

    vi.advanceTimersByTime(400);

    expect(wrapper.emitted('search')).toBeTruthy();
    expect(wrapper.emitted('search')?.[0]).toEqual(['test']);
    vi.useRealTimers();
  });

  it('emits categoryChange event', async () => {
    const wrapper = mount(ProductFilters, {
      props: { searchValue: '', categoryValue: '', categories },
    });

    await wrapper.find('button').trigger('click');
    const options = wrapper.findAll('li button');
    expect(options.length).toBeGreaterThan(1);
    await options[1]!.trigger('click');
    expect(wrapper.emitted('categoryChange')).toBeTruthy();
    expect(wrapper.emitted('categoryChange')?.[0]).toEqual(['electronics']);
  });

  it('updates searchValue prop', () => {
    const wrapper = mount(ProductFilters, {
      props: { searchValue: 'initial', categoryValue: '', categories },
    });

    expect(wrapper.find('input').element.value).toBe('initial');
  });
});
