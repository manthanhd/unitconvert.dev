import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { render, screen } from '@testing-library/preact';
import { Toast } from './Toast';

describe('Toast', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.useRealTimers();
  });

  describe('Rendering', () => {
    it('should render message', () => {
      const onClose = vi.fn();
      render(<Toast message="Test message" onClose={onClose} />);

      expect(screen.getByText('Test message')).toBeDefined();
    });

    it('should have toast class', () => {
      const onClose = vi.fn();
      const { container } = render(<Toast message="Test" onClose={onClose} />);

      expect(container.querySelector('.toast')).toBeDefined();
    });

    it('should have toast__message class on message span', () => {
      const onClose = vi.fn();
      const { container } = render(<Toast message="Test" onClose={onClose} />);

      expect(container.querySelector('.toast__message')).toBeDefined();
    });
  });

  describe('Auto-dismiss', () => {
    it('should call onClose after default duration (2000ms)', () => {
      const onClose = vi.fn();
      render(<Toast message="Test" onClose={onClose} />);

      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(2000);

      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should call onClose after custom duration', () => {
      const onClose = vi.fn();
      render(<Toast message="Test" onClose={onClose} duration={5000} />);

      vi.advanceTimersByTime(2000);
      expect(onClose).not.toHaveBeenCalled();

      vi.advanceTimersByTime(3000);
      expect(onClose).toHaveBeenCalledTimes(1);
    });

    it('should not call onClose before duration', () => {
      const onClose = vi.fn();
      render(<Toast message="Test" onClose={onClose} duration={3000} />);

      vi.advanceTimersByTime(2999);
      expect(onClose).not.toHaveBeenCalled();
    });

    it('should clear timeout on unmount', () => {
      const onClose = vi.fn();
      const { unmount } = render(<Toast message="Test" onClose={onClose} />);

      vi.advanceTimersByTime(1000);
      unmount();

      vi.advanceTimersByTime(2000);
      expect(onClose).not.toHaveBeenCalled();
    });
  });

  describe('Different messages', () => {
    it('should display "Copied!" message', () => {
      const onClose = vi.fn();
      render(<Toast message="Copied!" onClose={onClose} />);

      expect(screen.getByText('Copied!')).toBeDefined();
    });

    it('should display "Link copied!" message', () => {
      const onClose = vi.fn();
      render(<Toast message="Link copied!" onClose={onClose} />);

      expect(screen.getByText('Link copied!')).toBeDefined();
    });

    it('should display long messages', () => {
      const onClose = vi.fn();
      const longMessage = 'This is a very long toast message that might span multiple lines';
      render(<Toast message={longMessage} onClose={onClose} />);

      expect(screen.getByText(longMessage)).toBeDefined();
    });
  });

  describe('Re-render behavior', () => {
    it('should reset timer when duration changes', () => {
      const onClose = vi.fn();
      const { rerender } = render(<Toast message="Test" onClose={onClose} duration={2000} />);

      vi.advanceTimersByTime(1500);

      // Re-render with different duration
      rerender(<Toast message="Test" onClose={onClose} duration={3000} />);

      // Original timer (500ms remaining) should be cleared
      vi.advanceTimersByTime(500);
      expect(onClose).not.toHaveBeenCalled();

      // New timer (3000ms) should fire
      vi.advanceTimersByTime(2500);
      expect(onClose).toHaveBeenCalledTimes(1);
    });
  });
});
