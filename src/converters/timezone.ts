import type { Unit } from '../data/types';

/**
 * Timezone conversion using Intl.DateTimeFormat
 * Converts datetime strings between different timezones
 */
export function timezoneConvert(from: Unit, to: Unit, value: string): string {
  // Don't convert if empty
  if (!value.trim()) {
    return '';
  }

  // Get timezone identifiers from units
  const fromTz = getTimezoneIdentifier(from);
  const toTz = getTimezoneIdentifier(to);

  if (!fromTz || !toTz) {
    return 'Error: Invalid timezone';
  }

  try {
    // Parse the input datetime
    const date = parseDateTime(value);

    if (!date || isNaN(date.getTime())) {
      return 'Error: Invalid date/time';
    }

    // Format the date in the target timezone
    return formatDateTime(date, toTz);
  } catch (error) {
    return 'Error: Conversion failed';
  }
}

/**
 * Get IANA timezone identifier from unit
 * Uses the iana property directly from the unit
 */
function getTimezoneIdentifier(unit: Unit): string | null {
  return unit.iana || null;
}

/**
 * Parse datetime string
 */
function parseDateTime(value: string): Date | null {
  const trimmed = value.trim();

  // Try ISO 8601 format first
  if (/^\d{4}-\d{2}-\d{2}/.test(trimmed)) {
    const date = new Date(trimmed);
    if (!isNaN(date.getTime())) {
      return date;
    }
  }

  // Try common time formats (HH:MM:SS, HH:MM)
  const timeMatch = trimmed.match(/^(\d{1,2}):(\d{2})(?::(\d{2}))?(?:\s*(AM|PM))?$/i);
  if (timeMatch) {
    let hours = parseInt(timeMatch[1], 10);
    const minutes = parseInt(timeMatch[2], 10);
    const seconds = timeMatch[3] ? parseInt(timeMatch[3], 10) : 0;
    const ampm = timeMatch[4]?.toUpperCase();

    // Handle 12-hour format
    if (ampm) {
      if (ampm === 'PM' && hours < 12) hours += 12;
      if (ampm === 'AM' && hours === 12) hours = 0;
    }

    // Create date for today in the source timezone
    const now = new Date();
    const month = now.getMonth() + 1;
    const day = now.getDate();
    const dateStr = `${now.getFullYear()}-${month < 10 ? '0' + month : month}-${day < 10 ? '0' + day : day}`;
    const hoursStr = hours < 10 ? '0' + hours : String(hours);
    const minutesStr = minutes < 10 ? '0' + minutes : String(minutes);
    const secondsStr = seconds < 10 ? '0' + seconds : String(seconds);
    const timeStr = `${hoursStr}:${minutesStr}:${secondsStr}`;

    // Parse as ISO string and adjust for timezone
    const isoStr = `${dateStr}T${timeStr}`;
    return new Date(isoStr);
  }

  // Try parsing as general date string
  const date = new Date(trimmed);
  if (!isNaN(date.getTime())) {
    return date;
  }

  return null;
}

/**
 * Format date in target timezone
 */
function formatDateTime(date: Date, timezone: string): string {
  try {
    // Use toLocaleString with timezone option
    const options: Intl.DateTimeFormatOptions = {
      timeZone: timezone,
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
    };

    const formatted = date.toLocaleString('en-US', options);

    // Parse the formatted string (format: "MM/DD/YYYY, HH:MM:SS")
    const match = formatted.match(/(\d{2})\/(\d{2})\/(\d{4}),\s*(\d{2}):(\d{2}):(\d{2})/);

    if (match) {
      const [, month, day, year, hour, minute, second] = match;
      return `${year}-${month}-${day} ${hour}:${minute}:${second}`;
    }

    // Fallback: return the formatted string as-is
    return formatted;
  } catch (error) {
    return 'Error: Invalid timezone';
  }
}
