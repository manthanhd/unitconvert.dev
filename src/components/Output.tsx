import { useRef, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';

interface OutputProps {
  value: string;
  onChange?: (value: string) => void;
  placeholder?: string;
  onFocus?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  inputRef?: (el: HTMLInputElement | null) => void;
}

export function Output({
  value,
  onChange,
  placeholder = '—',
  onFocus,
  onKeyDown,
  inputRef,
}: OutputProps) {
  const internalRef = useRef<HTMLInputElement>(null);

  // Handle input changes for reverse conversion
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    // Allow empty, numbers, single decimal, negative sign at start
    if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
      onChange?.(newValue);
    }
  };

  // Select all on focus
  const handleFocus = (e: JSX.TargetedFocusEvent<HTMLInputElement>) => {
    e.currentTarget.select();
    onFocus?.();
  };

  // Forward ref
  useEffect(() => {
    if (inputRef) {
      inputRef(internalRef.current);
    }
  }, [inputRef]);

  return (
    <div className="value-input">
      <input
        ref={internalRef}
        type="text"
        inputMode="decimal"
        className="output__field"
        value={value}
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={onKeyDown as JSX.KeyboardEventHandler<HTMLInputElement>}
        placeholder={placeholder}
        readOnly={!onChange}
        autocomplete="off"
        spellcheck={false}
      />
    </div>
  );
}
