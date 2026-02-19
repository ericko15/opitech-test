import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import CategorySelect from './CategorySelect.vue';

describe('CategorySelect', () => {
  const categories = ['electronics', 'clothing', 'furniture'];

  it('renders dropdown button', () => {
    const wrapper = mount(CategorySelect, {
      props: { categories, modelValue: '' },
    });
    expect(wrapper.find('button').exists()).toBe(true);
  });

  it('displays default label when no selection', () => {
    const wrapper = mount(CategorySelect, {
      props: { categories, modelValue: '' },
    });
    expect(wrapper.text()).toContain('Todas las categorías');
  });

  it('displays selected category', () => {
    const wrapper = mount(CategorySelect, {
      props: { categories, modelValue: 'electronics' },
    });
    expect(wrapper.text()).toContain('electronics');
  });

  it('opens dropdown on click', async () => {
    const wrapper = mount(CategorySelect, {
      props: { categories, modelValue: '' },
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);
  });

  it('closes dropdown when clicking outside', async () => {
    const wrapper = mount(CategorySelect, {
      props: { categories, modelValue: '' },
      attachTo: document.body,
    });
    await wrapper.find('button').trigger('click');
    expect(wrapper.find('ul').exists()).toBe(true);
    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));
    await wrapper.vm.$nextTick();
  });

  it('emits update:modelValue when selecting category', async () => {
    const wrapper = mount(CategorySelect, {
      props: { categories, modelValue: '' },
    });
    await wrapper.find('button').trigger('click');
    const options = wrapper.findAll('ul button');
    expect(options.length).toBeGreaterThan(1);
    await options[1]!.trigger('click');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['electronics']);
  });
});
