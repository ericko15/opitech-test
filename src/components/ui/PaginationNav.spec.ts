import { describe, it, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import PaginationNav from './PaginationNav.vue';

describe('PaginationNav', () => {
  it('renders page info', () => {
    const wrapper = mount(PaginationNav, {
      props: { page: 1, totalPages: 5 },
    });
    expect(wrapper.text()).toContain('1 / 5');
  });

  it('disables previous button on first page', () => {
    const wrapper = mount(PaginationNav, {
      props: { page: 1, totalPages: 5 },
    });
    const buttons = wrapper.findAll('button');
    const prevButton = buttons[0];
    expect(prevButton).toBeDefined();
    expect(prevButton!.attributes('disabled')).toBeDefined();
  });

  it('disables next button on last page', () => {
    const wrapper = mount(PaginationNav, {
      props: { page: 5, totalPages: 5 },
    });
    const buttons = wrapper.findAll('button');
    const nextButton = buttons[buttons.length - 1];
    expect(nextButton).toBeDefined();
    expect(nextButton!.attributes('disabled')).toBeDefined();
  });

  it('emits change event with previous page', async () => {
    const wrapper = mount(PaginationNav, {
      props: { page: 3, totalPages: 5 },
    });
    const buttons = wrapper.findAll('button');
    const prevButton = buttons[1];
    expect(prevButton).toBeDefined();
    await prevButton!.trigger('click');
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')?.[0]).toEqual([2]);
  });

  it('emits change event with next page', async () => {
    const wrapper = mount(PaginationNav, {
      props: { page: 3, totalPages: 5 },
    });
    const buttons = wrapper.findAll('button');
    const nextButton = buttons[2];
    expect(nextButton).toBeDefined();
    await nextButton!.trigger('click');
    expect(wrapper.emitted('change')).toBeTruthy();
    expect(wrapper.emitted('change')?.[0]).toEqual([4]);
  });

  it('shows first/last buttons when more than 2 pages', () => {
    const wrapper = mount(PaginationNav, {
      props: { page: 3, totalPages: 5 },
    });
    expect(wrapper.text()).toContain('Primera');
    expect(wrapper.text()).toContain('Última');
  });

  it('hides first/last buttons when 2 or fewer pages', () => {
    const wrapper = mount(PaginationNav, {
      props: { page: 1, totalPages: 2 },
    });
    expect(wrapper.text()).not.toContain('Primera');
    expect(wrapper.text()).not.toContain('Última');
  });
});
