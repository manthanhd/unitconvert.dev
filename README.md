# Converter App

A keyboard-first, instant unit converter for developers and power users. Fast, minimal, shareable.

## Features

- **Keyboard-first** - Full workflow without touching mouse. Tab/Enter navigation, type-to-search
- **Instant** - No loading, no page transitions, no signup. Client-side only
- **Shareable** - State encoded in URL. Copy link = share conversion
- **Fuzzy search** - Type abbreviations, aliases, or partial names to find units
- **Recent conversions** - Quick access to your conversion history with values

## Supported Categories

- Length (meters, feet, miles, etc.)
- Temperature (Celsius, Fahrenheit, Kelvin)
- Speed (m/s, km/h, mph, knots)
- Time (seconds, minutes, hours, days)
- Digital storage (bytes, KB, MB, GB, TB)
- Electrical (volts, amps, watts, ohms)
- Scientific (moles, pascals, joules)
- Everyday (cooking measurements, currency-like)

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| `Tab` | Move to next field |
| `Enter` | Select highlighted option |
| `Escape` | Close dropdown / Clear |
| `Cmd/Ctrl + C` | Copy result |
| `Cmd/Ctrl + L` | Copy shareable link |
| `Cmd/Ctrl + K` | Reset / New conversion |

## Development

### Prerequisites

- Node.js 20+
- npm

### Setup

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Tech Stack

- [Preact](https://preactjs.com/) - Fast 3kB React alternative
- [Vite](https://vitejs.dev/) - Next generation frontend tooling
- [Fuse.js](https://fusejs.io/) - Lightweight fuzzy-search
- [TypeScript](https://www.typescriptlang.org/) - Type safety

## Project Structure

```
src/
  components/     # UI components
  hooks/          # Custom React hooks
  data/           # Unit definitions and categories
  converters/     # Conversion logic
  styles/         # CSS styles
  utils/          # Helper functions
docs/             # Product documentation
```

## License

MIT
