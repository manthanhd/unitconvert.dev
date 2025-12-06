import { useRef, useEffect } from 'preact/hooks';
import type { JSX } from 'preact';
import type { ConversionType } from '../data/types';

interface ValueInputProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  disabled?: boolean;
  onFocus?: () => void;
  onKeyDown?: (e: KeyboardEvent) => void;
  selectOnFocus?: boolean;
  inputRef?: (el: HTMLInputElement | null) => void;
  conversionType?: ConversionType;
}

export function ValueInput({
  value,
  onChange,
  placeholder,
  disabled = false,
  onFocus,
  onKeyDown,
  selectOnFocus = false,
  inputRef,
  conversionType = 'linear',
}: ValueInputProps) {
  const internalRef = useRef<HTMLInputElement>(null);

  // Get validation regex based on conversion type
  const getValidationRegex = (type: ConversionType): RegExp => {
    switch (type) {
      case 'linear':
      case 'offset':
      case 'formula':
        // Numeric input: allow numbers, decimals, negative
        return /^-?\d*\.?\d*$/;
      case 'timezone':
        // DateTime input: digits, colons, dashes, spaces, T, AM/PM
        return /^[\d:\-\sTPAM]*$/i;
      case 'base':
        // Alphanumeric + prefixes: digits, a-f, A-F, x, o, b
        return /^[0-9a-fA-FxXoObB]*$/;
      case 'color':
        // Color format: digits, #, letters a-f, parentheses, commas, %, spaces
        return /^[#0-9a-fA-F(),\s%]*$/;
      default:
        return /^-?\d*\.?\d*$/;
    }
  };

  // Get placeholder based on conversion type
  const getPlaceholder = (type: ConversionType): string => {
    switch (type) {
      case 'linear':
      case 'offset':
      case 'formula':
        return '0';
      case 'timezone':
        return '14:30 or 2025-12-06 14:30';
      case 'base':
        return '255, 0xFF, or 0b11111111';
      case 'color':
        return '#FF5500 or rgb(255,85,0)';
      default:
        return '0';
    }
  };

  // Get inputMode based on conversion type
  const getInputMode = (type: ConversionType): 'decimal' | 'text' => {
    switch (type) {
      case 'linear':
      case 'offset':
      case 'formula':
        return 'decimal';
      case 'timezone':
      case 'base':
      case 'color':
        return 'text';
      default:
        return 'decimal';
    }
  };

  // Handle input changes - validate based on conversion type
  const handleInput = (e: JSX.TargetedEvent<HTMLInputElement>) => {
    const newValue = e.currentTarget.value;
    const validationRegex = getValidationRegex(conversionType);

    // Allow empty or values matching the validation regex
    if (newValue === '' || validationRegex.test(newValue)) {
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
        inputMode={getInputMode(conversionType)}
        className="value-input__field"
        value={value}
        onInput={handleInput}
        onFocus={handleFocus}
        onKeyDown={onKeyDown as JSX.KeyboardEventHandler<HTMLInputElement>}
        placeholder={placeholder ?? getPlaceholder(conversionType)}
        disabled={disabled}
        autocomplete="off"
        spellcheck={false}
      />
    </div>
  );
}
