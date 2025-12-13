import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { copyToClipboard } from './clipboard';

describe('copyToClipboard', () => {
  const originalNavigator = globalThis.navigator;

  beforeEach(() => {
    vi.clearAllMocks();
    // Define execCommand for jsdom (deprecated but needed for fallback testing)
    if (!document.execCommand) {
      (document as unknown as { execCommand: () => boolean }).execCommand = vi.fn();
    }
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  describe('Clipboard API (modern browsers)', () => {
    it('should copy text using Clipboard API and return true', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(globalThis, 'navigator', {
        value: { clipboard: { writeText: writeTextMock } },
        writable: true,
        configurable: true,
      });

      const result = await copyToClipboard('test text');

      expect(writeTextMock).toHaveBeenCalledWith('test text');
      expect(result).toBe(true);

      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });

    it('should handle empty string', async () => {
      const writeTextMock = vi.fn().mockResolvedValue(undefined);
      Object.defineProperty(globalThis, 'navigator', {
        value: { clipboard: { writeText: writeTextMock } },
        writable: true,
        configurable: true,
      });

      const result = await copyToClipboard('');

      expect(writeTextMock).toHaveBeenCalledWith('');
      expect(result).toBe(true);

      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });
  });

  describe('Fallback (older browsers)', () => {
    it('should use execCommand fallback when Clipboard API fails', async () => {
      const writeTextMock = vi.fn().mockRejectedValue(new Error('Not supported'));
      Object.defineProperty(globalThis, 'navigator', {
        value: { clipboard: { writeText: writeTextMock } },
        writable: true,
        configurable: true,
      });

      const mockTextarea = {
        value: '',
        style: { position: '', opacity: '' },
        select: vi.fn(),
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockTextarea as unknown as HTMLTextAreaElement);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockTextarea as unknown as Node);
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockTextarea as unknown as Node);
      (document as unknown as { execCommand: ReturnType<typeof vi.fn> }).execCommand = vi.fn().mockReturnValue(true);

      const result = await copyToClipboard('fallback text');

      expect(writeTextMock).toHaveBeenCalled();
      expect(mockTextarea.value).toBe('fallback text');
      expect(mockTextarea.style.position).toBe('fixed');
      expect(mockTextarea.style.opacity).toBe('0');
      expect(mockTextarea.select).toHaveBeenCalled();
      expect(result).toBe(true);

      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });

    it('should return false when both Clipboard API and fallback fail', async () => {
      const writeTextMock = vi.fn().mockRejectedValue(new Error('Not supported'));
      Object.defineProperty(globalThis, 'navigator', {
        value: { clipboard: { writeText: writeTextMock } },
        writable: true,
        configurable: true,
      });

      vi.spyOn(document, 'createElement').mockImplementation(() => {
        throw new Error('createElement failed');
      });

      const result = await copyToClipboard('test');

      expect(result).toBe(false);

      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });

    it('should return false when execCommand fails', async () => {
      const writeTextMock = vi.fn().mockRejectedValue(new Error('Not supported'));
      Object.defineProperty(globalThis, 'navigator', {
        value: { clipboard: { writeText: writeTextMock } },
        writable: true,
        configurable: true,
      });

      const mockTextarea = {
        value: '',
        style: { position: '', opacity: '' },
        select: vi.fn(),
      };
      vi.spyOn(document, 'createElement').mockReturnValue(mockTextarea as unknown as HTMLTextAreaElement);
      vi.spyOn(document.body, 'appendChild').mockImplementation(() => mockTextarea as unknown as Node);
      vi.spyOn(document.body, 'removeChild').mockImplementation(() => mockTextarea as unknown as Node);
      (document as unknown as { execCommand: () => boolean }).execCommand = () => {
        throw new Error('execCommand failed');
      };

      const result = await copyToClipboard('test');

      expect(result).toBe(false);

      Object.defineProperty(globalThis, 'navigator', {
        value: originalNavigator,
        writable: true,
        configurable: true,
      });
    });
  });
});
