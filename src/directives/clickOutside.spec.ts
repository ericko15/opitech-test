import { describe, it, expect, vi } from 'vitest';
import { clickOutside } from './clickOutside';

const clickOutsideDirective = clickOutside as unknown as {
  mounted: (el: HTMLElement, binding: { value: (...args: unknown[]) => void }) => void;
  unmounted: (el: HTMLElement) => void;
};

describe('clickOutside directive', () => {
  it('should define mounted hook', () => {
    expect(clickOutsideDirective.mounted).toBeDefined();
  });

  it('should define unmounted hook', () => {
    expect(clickOutsideDirective.unmounted).toBeDefined();
  });

  it('should call binding value when clicking outside', () => {
    const mockBinding = vi.fn();

    const el = document.createElement('div');
    el.contains = vi.fn().mockReturnValue(false);

    clickOutsideDirective.mounted(el, { value: mockBinding });

    document.dispatchEvent(new Event('click'));

    expect(mockBinding).toHaveBeenCalled();
  });

  it('should not call binding when clicking inside', () => {
    const mockBinding = vi.fn();

    const el = document.createElement('div');
    el.contains = vi.fn().mockReturnValue(true);

    clickOutsideDirective.mounted(el, { value: mockBinding });

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mockBinding).not.toHaveBeenCalled();
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const el = document.createElement('div');
    el.contains = vi.fn().mockReturnValue(false);

    clickOutsideDirective.mounted(el, { value: vi.fn() });
    clickOutsideDirective.unmounted(el);

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });
});
