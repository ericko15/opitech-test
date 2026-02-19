import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import ErrorBanner from './ErrorBanner.vue';

describe('ErrorBanner', () => {
  it('renders nothing when message is empty', () => {
    const wrapper = mount(ErrorBanner, {
      props: { message: '' },
    });
    expect(wrapper.html()).toContain('v-if');
  });

  it('renders error message', () => {
    const wrapper = mount(ErrorBanner, {
      props: { message: 'Error occurred' },
    });
    expect(wrapper.text()).toContain('Error occurred');
  });

  it('has role alert attribute', () => {
    const wrapper = mount(ErrorBanner, {
      props: { message: 'Error' },
    });
    expect(wrapper.attributes('role')).toBe('alert');
  });

  it('has aria-live polite attribute', () => {
    const wrapper = mount(ErrorBanner, {
      props: { message: 'Error' },
    });
    expect(wrapper.attributes('aria-live')).toBe('polite');
  });
});
