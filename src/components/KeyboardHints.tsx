interface KeyboardHintsProps {
  show?: boolean;
}

export function KeyboardHints({ show = true }: KeyboardHintsProps) {
  if (!show) return null;

  const isMac = navigator.platform.toLowerCase().includes('mac');
  const modKey = isMac ? '⌘' : 'Ctrl';

  return (
    <div className="keyboard-hints">
      <span className="keyboard-hint">
        <kbd>{modKey}C</kbd> copy result
      </span>
      <span className="keyboard-hint">
        <kbd>{modKey}L</kbd> copy link
      </span>
      <span className="keyboard-hint">
        <kbd>{modKey}S</kbd> share
      </span>
      <span className="keyboard-hint">
        <kbd>{modKey}K</kbd> reset
      </span>
      <span className="keyboard-hint">
        <kbd>Tab</kbd> next field
      </span>
    </div>
  );
}
