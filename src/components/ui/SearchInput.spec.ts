import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import SearchInput from './SearchInput.vue';

describe('SearchInput', () => {
  it('renders input element', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    });
    expect(wrapper.find('input').exists()).toBe(true);
  });

  it('displays placeholder', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    });
    expect(wrapper.find('input').attributes('placeholder')).toBe('Buscar…');
  });

  it('binds modelValue correctly', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: 'test' },
    });
    expect(wrapper.find('input').element.value).toBe('test');
  });

  it('emits update:modelValue on input', async () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    });
    await wrapper.find('input').setValue('new value');
    expect(wrapper.emitted('update:modelValue')).toBeTruthy();
    expect(wrapper.emitted('update:modelValue')?.[0]).toEqual(['new value']);
  });

  it('has accessible label', () => {
    const wrapper = mount(SearchInput, {
      props: { modelValue: '' },
    });
    expect(wrapper.find('label').exists()).toBe(true);
    expect(wrapper.find('label').attributes('for')).toBe('search-input');
  });
});
