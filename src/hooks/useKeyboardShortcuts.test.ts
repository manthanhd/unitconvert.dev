import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { renderHook } from '@testing-library/preact';
import { useKeyboardShortcuts } from './useKeyboardShortcuts';

describe('useKeyboardShortcuts', () => {
  let mockCopyResult: ReturnType<typeof vi.fn>;
  let mockCopyLink: ReturnType<typeof vi.fn>;
  let mockShare: ReturnType<typeof vi.fn>;
  let mockReset: ReturnType<typeof vi.fn>;
  let mockShowToast: ReturnType<typeof vi.fn>;

  beforeEach(() => {
    mockCopyResult = vi.fn();
    mockCopyLink = vi.fn();
    mockShare = vi.fn();
    mockReset = vi.fn();
    mockShowToast = vi.fn();
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
    vi.restoreAllMocks();
  });

  function dispatchKeyEvent(key: string, options: Partial<KeyboardEventInit> = {}) {
    const event = new KeyboardEvent('keydown', {
      key,
      bubbles: true,
      ...options,
    });
    window.dispatchEvent(event);
  }

  describe('Cmd+C (copy result)', () => {
    it('should call copyResult when Cmd+C is pressed with no selection', () => {
      vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);

      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('c', { metaKey: true });

      expect(mockCopyResult).toHaveBeenCalledTimes(1);
    });

    it('should call copyResult when Ctrl+C is pressed with no selection', () => {
      vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);

      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('c', { ctrlKey: true });

      expect(mockCopyResult).toHaveBeenCalledTimes(1);
    });

    it('should NOT call copyResult when text is selected', () => {
      vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => 'selected text' } as Selection);

      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('c', { metaKey: true });

      expect(mockCopyResult).not.toHaveBeenCalled();
    });
  });

  describe('Cmd+L (copy link)', () => {
    it('should call copyLink when Cmd+L is pressed', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('l', { metaKey: true });

      expect(mockCopyLink).toHaveBeenCalledTimes(1);
    });

    it('should call copyLink when Ctrl+L is pressed', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('l', { ctrlKey: true });

      expect(mockCopyLink).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cmd+S (share)', () => {
    it('should call share when Cmd+S is pressed', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('s', { metaKey: true });

      expect(mockShare).toHaveBeenCalledTimes(1);
    });

    it('should call share when Ctrl+S is pressed', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('s', { ctrlKey: true });

      expect(mockShare).toHaveBeenCalledTimes(1);
    });
  });

  describe('Cmd+K (reset with double-press)', () => {
    it('should show toast on first Cmd+K press', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
          showToast: mockShowToast,
        })
      );

      dispatchKeyEvent('k', { metaKey: true });

      expect(mockShowToast).toHaveBeenCalledWith('Press again to reset');
      expect(mockReset).not.toHaveBeenCalled();
    });

    it('should call reset on double Cmd+K press within 1 second', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
          showToast: mockShowToast,
        })
      );

      // First press
      dispatchKeyEvent('k', { metaKey: true });
      expect(mockShowToast).toHaveBeenCalledWith('Press again to reset');

      // Second press within 1 second
      vi.advanceTimersByTime(500);
      dispatchKeyEvent('k', { metaKey: true });

      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it('should NOT call reset if second press is after 1 second', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
          showToast: mockShowToast,
        })
      );

      // First press
      dispatchKeyEvent('k', { metaKey: true });

      // Wait more than 1 second
      vi.advanceTimersByTime(1100);

      // Second press (should be treated as first press again)
      dispatchKeyEvent('k', { metaKey: true });

      expect(mockReset).not.toHaveBeenCalled();
      expect(mockShowToast).toHaveBeenCalledTimes(2);
    });
  });

  describe('Escape (reset)', () => {
    it('should call reset when Escape is pressed and dropdown is not open', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
          isDropdownOpen: false,
        })
      );

      dispatchKeyEvent('Escape');

      expect(mockReset).toHaveBeenCalledTimes(1);
    });

    it('should NOT call reset when Escape is pressed and dropdown is open', () => {
      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
          isDropdownOpen: true,
        })
      );

      dispatchKeyEvent('Escape');

      expect(mockReset).not.toHaveBeenCalled();
    });
  });

  describe('Cleanup', () => {
    it('should remove event listener on unmount', () => {
      const removeEventListenerSpy = vi.spyOn(window, 'removeEventListener');

      const { unmount } = renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      unmount();

      expect(removeEventListenerSpy).toHaveBeenCalledWith('keydown', expect.any(Function));
    });
  });

  describe('No meta key', () => {
    it('should not trigger shortcuts without meta/ctrl key', () => {
      vi.spyOn(window, 'getSelection').mockReturnValue({ toString: () => '' } as Selection);

      renderHook(() =>
        useKeyboardShortcuts({
          copyResult: mockCopyResult,
          copyLink: mockCopyLink,
          share: mockShare,
          reset: mockReset,
        })
      );

      dispatchKeyEvent('c');
      dispatchKeyEvent('l');
      dispatchKeyEvent('s');
      dispatchKeyEvent('k');

      expect(mockCopyResult).not.toHaveBeenCalled();
      expect(mockCopyLink).not.toHaveBeenCalled();
      expect(mockShare).not.toHaveBeenCalled();
    });
  });
});
