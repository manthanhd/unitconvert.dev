import { useEffect, useRef } from 'preact/hooks';
import { copyToClipboard } from '../utils/clipboard';
import { trackSocialShare, trackCopyLink } from '../lib/analytics';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export function ShareModal({ isOpen, onClose }: ShareModalProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : '';

  // Auto-select URL when modal opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.select();
    }
  }, [isOpen]);

  // Handle Escape key to close modal
  useEffect(() => {
    if (!isOpen || typeof window === 'undefined') return;

    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        onClose();
      }
      // Handle Cmd/Ctrl+C when input is focused
      if ((e.metaKey || e.ctrlKey) && e.key === 'c' && document.activeElement === inputRef.current) {
        // Let the browser handle the copy
        setTimeout(onClose, 200); // Close after copy
      }
    };

    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [isOpen, onClose]);

  // Handle click outside to close
  const handleBackdropClick = (e: MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  // Handle copy button click
  const handleCopy = async () => {
    const success = await copyToClipboard(currentUrl);
    if (success) {
      trackCopyLink();
      onClose();
    }
  };

  // Generate share URLs
  const shareUrls = {
    whatsapp: `https://wa.me/?text=${encodeURIComponent(currentUrl)}`,
    telegram: `https://t.me/share/url?url=${encodeURIComponent(currentUrl)}`,
    sms: `sms:?body=${encodeURIComponent(currentUrl)}`,
  };

  if (!isOpen) return null;

  return (
    <div className="share-modal__backdrop" onClick={handleBackdropClick}>
      <div className="share-modal">
        <div className="share-modal__header">
          <h3 className="share-modal__title">Share Link</h3>
          <button
            className="share-modal__close"
            onClick={onClose}
            aria-label="Close"
            type="button"
          >
            ×
          </button>
        </div>

        <div className="share-modal__content">
          <div className="share-modal__url-section">
            <input
              ref={inputRef}
              type="text"
              value={currentUrl}
              readOnly
              className="share-modal__url-input"
              aria-label="Current URL"
            />
            <p className="share-modal__hint">
              Press <kbd>⌘C</kbd> or <kbd>Ctrl+C</kbd> to copy
            </p>
          </div>

          <button
            type="button"
            className="share-modal__copy-btn"
            onClick={handleCopy}
          >
            Copy Link
          </button>

          <div className="share-modal__divider">
            <span>or share via</span>
          </div>

          <div className="share-modal__social">
            <a
              href={shareUrls.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="share-modal__social-btn"
              aria-label="Share on WhatsApp"
              onClick={() => trackSocialShare('whatsapp')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
              </svg>
              WhatsApp
            </a>

            <a
              href={shareUrls.telegram}
              target="_blank"
              rel="noopener noreferrer"
              className="share-modal__social-btn"
              aria-label="Share on Telegram"
              onClick={() => trackSocialShare('telegram')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="22" y1="2" x2="11" y2="13"></line>
                <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
              </svg>
              Telegram
            </a>

            <a
              href={shareUrls.sms}
              className="share-modal__social-btn"
              aria-label="Share via SMS"
              onClick={() => trackSocialShare('sms')}
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
              </svg>
              SMS
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
