# Time Units

Duration and Timezone conversions.

## Duration

| Unit | Abbreviations | Notes |
|------|---------------|-------|
| Nanosecond | ns | |
| Microsecond | μs, us | |
| Millisecond | ms | |
| Second | s, sec | SI base |
| Minute | min | 60 s |
| Hour | h, hr, hour | 3600 s |
| Day | d, day | 86400 s |
| Week | wk, week | 7 days |
| Fortnight | fortnight | 14 days |
| Month (avg) | mo, month | ~30.44 days |
| Year | y, yr, year | 365.25 days |
| Decade | decade | 10 years |
| Century | century | 100 years |
| Millennium | millennium | 1000 years |
| Sidereal Day | sidereal day | 23h 56m 4s |
| Julian Year | julian year | 365.25 days exactly |

## Timezones

DateTime conversion between zones. Input format: ISO 8601 or flexible parsing.

### Common Zones

| Zone | Offset | Aliases |
|------|--------|---------|
| UTC | +00:00 | GMT, Zulu, Z |
| GMT | +00:00 | Greenwich Mean Time |

### North America

| Zone | Offset | Aliases |
|------|--------|---------|
| PST | -08:00 | Pacific Standard Time |
| PDT | -07:00 | Pacific Daylight Time |
| MST | -07:00 | Mountain Standard Time |
| MDT | -06:00 | Mountain Daylight Time |
| CST | -06:00 | Central Standard Time |
| CDT | -05:00 | Central Daylight Time |
| EST | -05:00 | Eastern Standard Time |
| EDT | -04:00 | Eastern Daylight Time |
| AST | -04:00 | Atlantic Standard Time |
| NST | -03:30 | Newfoundland Standard Time |

### South America

| Zone | Offset | Aliases |
|------|--------|---------|
| BRT | -03:00 | Brasília Time |
| ART | -03:00 | Argentina Time |
| CLT | -04:00 | Chile Standard Time |
| COT | -05:00 | Colombia Time |
| PET | -05:00 | Peru Time |
| VET | -04:00 | Venezuela Time |

### Europe

| Zone | Offset | Aliases |
|------|--------|---------|
| WET | +00:00 | Western European Time |
| WEST | +01:00 | Western European Summer |
| CET | +01:00 | Central European Time |
| CEST | +02:00 | Central European Summer |
| EET | +02:00 | Eastern European Time |
| EEST | +03:00 | Eastern European Summer |
| MSK | +03:00 | Moscow Standard Time |

### Asia

| Zone | Offset | Aliases |
|------|--------|---------|
| GST | +04:00 | Gulf Standard Time |
| PKT | +05:00 | Pakistan Standard Time |
| IST | +05:30 | India Standard Time |
| NPT | +05:45 | Nepal Time |
| BST | +06:00 | Bangladesh Standard Time |
| ICT | +07:00 | Indochina Time |
| WIB | +07:00 | Western Indonesia |
| CST | +08:00 | China Standard Time |
| HKT | +08:00 | Hong Kong Time |
| SGT | +08:00 | Singapore Time |
| PHT | +08:00 | Philippine Time |
| JST | +09:00 | Japan Standard Time |
| KST | +09:00 | Korea Standard Time |

### Australia & Pacific

| Zone | Offset | Aliases |
|------|--------|---------|
| AWST | +08:00 | Australian Western |
| ACST | +09:30 | Australian Central |
| AEST | +10:00 | Australian Eastern |
| NZST | +12:00 | New Zealand Standard |
| NZDT | +13:00 | New Zealand Daylight |
| FJST | +12:00 | Fiji Standard Time |

### Africa

| Zone | Offset | Aliases |
|------|--------|---------|
| WAT | +01:00 | West Africa Time |
| CAT | +02:00 | Central Africa Time |
| EAT | +03:00 | East Africa Time |
| SAST | +02:00 | South Africa Standard |

### IANA Timezone Support

Full IANA timezone database support:

```
America/New_York
America/Los_Angeles
America/Chicago
America/Denver
America/Toronto
America/Vancouver
America/Mexico_City
America/Sao_Paulo
Europe/London
Europe/Paris
Europe/Berlin
Europe/Rome
Europe/Madrid
Europe/Amsterdam
Europe/Moscow
Asia/Tokyo
Asia/Seoul
Asia/Shanghai
Asia/Hong_Kong
Asia/Singapore
Asia/Mumbai
Asia/Dubai
Asia/Bangkok
Asia/Jakarta
Australia/Sydney
Australia/Melbourne
Australia/Perth
Pacific/Auckland
Pacific/Honolulu
Africa/Cairo
Africa/Johannesburg
Africa/Lagos
```

## DateTime Input Formats

Supported input formats for timezone conversion:

```
2024-01-15T09:00:00          # ISO 8601
2024-01-15 09:00             # Space separator
2024/01/15 9:00 AM           # Slash, 12-hour
Jan 15, 2024 9:00 AM         # Natural
15 Jan 2024 09:00            # European
now                          # Current time
today                        # Today midnight
tomorrow 9am                 # Relative (stretch)
```
