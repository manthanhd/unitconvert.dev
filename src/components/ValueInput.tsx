import { useRef, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';

interface ValueInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  selectOnFocus?: boolean;
  inputRef?: (el: HTMLInputElement | null) => void;
}

export function ValueInput({
  value,
  onChange,
  placeholder = '0',
  disabled = false,
  onFocus,
  onKeyDown,
  selectOnFocus = false,
  inputRef,
}: ValueInputProps) {
  const internalRef = useRef<HTMLInputElement>(null);

  // Handle input changes - allow numbers, decimals, negative
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    // Allow empty, numbers, single decimal, negative sign at start
    if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
      onChange(newValue);
    }
  };

  // Select all on focus if enabled
  const handleFocus = (e: JSX.TargetedFocusEvent<HTMLInputElement>) => {
    if (selectOnFocus) {
      e.currentTarget.select();
    }
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
        className="value-input__field"
        value={value}
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={onKeyDown as JSX.KeyboardEventHandler<HTMLInputElement>}
        placeholder={placeholder}
        disabled={disabled}
        autocomplete="off"
        spellcheck={false}
      />
    </div>
  );
}
