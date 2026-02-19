import { describe, it, expect, vi } from 'vitest';
import { clickOutside } from './clickOutside';

describe('clickOutside directive', () => {
  it('should define mounted hook', () => {
    expect((clickOutside as any).mounted).toBeDefined();
  });

  it('should define unmounted hook', () => {
    expect((clickOutside as any).unmounted).toBeDefined();
  });

  it('should call binding value when clicking outside', () => {
    const mockBinding = vi.fn();

    const el = document.createElement('div');
    el.contains = vi.fn().mockReturnValue(false);

    (clickOutside as any).mounted(el, { value: mockBinding });

    document.dispatchEvent(new Event('click'));

    expect(mockBinding).toHaveBeenCalled();
  });

  it('should not call binding when clicking inside', () => {
    const mockBinding = vi.fn();

    const el = document.createElement('div');
    el.contains = vi.fn().mockReturnValue(true);

    (clickOutside as any).mounted(el, { value: mockBinding });

    document.dispatchEvent(new MouseEvent('click', { bubbles: true }));

    expect(mockBinding).not.toHaveBeenCalled();
  });

  it('should remove event listener on unmount', () => {
    const removeEventListenerSpy = vi.spyOn(document, 'removeEventListener');

    const el = document.createElement('div');
    el.contains = vi.fn().mockReturnValue(false);

    (clickOutside as any).mounted(el, { value: vi.fn() });
    (clickOutside as any).unmounted(el);

    expect(removeEventListenerSpy).toHaveBeenCalledWith('click', expect.any(Function));
  });
});
