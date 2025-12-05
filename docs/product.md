# Converter App — Product Document

## Vision

A keyboard-first, instant unit converter for developers and power users. Think "Spotlight for conversions" — fast, minimal, shareable.

## Core Principles

| Principle | Implementation |
|-----------|----------------|
| **Keyboard-first** | Full workflow without touching mouse. Tab/Enter navigation, type-to-search |
| **Instant** | No loading, no page transitions, no signup. Client-side only |
| **Shareable** | State encoded in URL. Copy link = share conversion |
| **TUI aesthetic** | Monospace, minimal chrome, high contrast, no visual noise |
| **Progressive disclosure** | Start simple, reveal complexity only when needed |

## User Flow

```
┌─────────────────────────────────────────────────────────────┐
│                                                             │
│   [kilometers    ▾]  →  [miles         ▾]                   │
│                                                             │
│   ┌─────────────────┐    ┌─────────────────┐                │
│   │ 5               │    │ 3.10686         │                │
│   └─────────────────┘    └─────────────────┘                │
│                                                             │
│   ⌘C copy result  •  ⌘L copy link  •  ⌘K new conversion     │
│                                                             │
└─────────────────────────────────────────────────────────────┘
```

### Keyboard Flow

1. Land on page → focus is on "from unit" field
2. Type `kil` → autocomplete shows "kilometers", press `Enter` to select
3. Focus moves to "to unit" field
4. Type `mil` → autocomplete shows "miles", press `Enter` to select
5. Focus moves to "from value" input
6. Type number → result updates live in "to value"
7. `Tab` to "to value" → selects all (can type to do reverse conversion)
8. `⌘C` copies result, `⌘L` copies shareable link

### Autocomplete Behavior

- Fuzzy match on unit names and abbreviations
- `km`, `kilo`, `kilometers` all match "kilometers"
- Show unit category as hint (e.g., "kilometers · length")
- Support common aliases (e.g., "klicks" → kilometers)

## URL Structure

```
https://convert.app/km/mi/5
https://convert.app/usd/eur/100
https://convert.app/pst/utc/2024-01-15T09:00
```

Format: `/{from}/{to}/{value}`

- Shareable, bookmarkable
- Updates as user types (debounced)
- Landing on URL pre-fills everything

## Technical Approach

- **Framework**: Single HTML + JS (or lightweight framework like Preact/Solid)
- **Styling**: Minimal CSS, CSS variables for theming, monospace font
- **State**: URL is source of truth, synced with inputs
- **Compute**: All conversions client-side, zero API calls
- **Autocomplete**: Fuse.js or similar for fuzzy matching
- **Deployment**: Static hosting (Vercel/Netlify/Cloudflare Pages)

## UX Details

### Focus Management

- Clear visual focus indicator (TUI-style block cursor or underline)
- `Escape` clears current field
- `⌘K` or `/` resets to start (new conversion)

### Input Validation

- Numeric fields accept numbers only
- Invalid input: subtle red border, no error modals
- DateTime fields: flexible parsing (natural language stretch goal)

### Accessibility

- Full keyboard navigation
- ARIA labels for screen readers
- High contrast by default

## Future Expansion (Post-MVP)

1. **More conversions**: Currency (API needed), file formats, encoding
2. **History**: LocalStorage-based recent conversions
3. **Favorites**: Pin common conversions
4. **Multi-step**: Chain conversions (km → mi → ft)
5. **Batch mode**: Convert lists of values
6. **PWA**: Installable, works offline
7. **API**: Programmatic access for scripts

## Success Metrics

- Time to first conversion < 5 seconds
- Full conversion via keyboard only
- Zero loading states visible to user
- Lighthouse score > 95

## Open Questions

1. **Name?** (convert.app, cnvrt, unitly, etc.)
2. **Dark mode default?** (fits TUI vibe, or respect system preference?)
3. **DateTime input format**: Strict ISO or flexible natural language?
4. **Mobile**: How does keyboard-first translate? Tap-to-focus + native keyboard?
