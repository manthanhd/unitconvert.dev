# Digital Units

Data Storage, Transfer Rate, and Typography/CSS conversions.

## Data Storage

### Decimal (SI) Units

| Unit | Abbreviations | Size |
|------|---------------|------|
| Bit | b, bit | 1 bit |
| Nibble | nibble | 4 bits |
| Byte | B, byte | 8 bits |
| Kilobyte | KB | 1,000 B |
| Megabyte | MB | 1,000² B |
| Gigabyte | GB | 1,000³ B |
| Terabyte | TB | 1,000⁴ B |
| Petabyte | PB | 1,000⁵ B |
| Exabyte | EB | 1,000⁶ B |
| Zettabyte | ZB | 1,000⁷ B |
| Yottabyte | YB | 1,000⁸ B |

### Binary (IEC) Units

| Unit | Abbreviations | Size |
|------|---------------|------|
| Kibibyte | KiB | 1,024 B |
| Mebibyte | MiB | 1,024² B |
| Gibibyte | GiB | 1,024³ B |
| Tebibyte | TiB | 1,024⁴ B |
| Pebibyte | PiB | 1,024⁵ B |
| Exbibyte | EiB | 1,024⁶ B |
| Zebibyte | ZiB | 1,024⁷ B |
| Yobibyte | YiB | 1,024⁸ B |

## Data Transfer Rate

### Bit-based

| Unit | Abbreviations | Notes |
|------|---------------|-------|
| Bit per second | bps, b/s | |
| Kilobit per second | Kbps, Kb/s | |
| Megabit per second | Mbps, Mb/s | |
| Gigabit per second | Gbps, Gb/s | |
| Terabit per second | Tbps, Tb/s | |

### Byte-based (Decimal)

| Unit | Abbreviations | Notes |
|------|---------------|-------|
| Byte per second | B/s, Bps | |
| Kilobyte per second | KB/s, KBps | |
| Megabyte per second | MB/s, MBps | |
| Gigabyte per second | GB/s, GBps | |

### Byte-based (Binary)

| Unit | Abbreviations | Notes |
|------|---------------|-------|
| Kibibyte per second | KiB/s | |
| Mebibyte per second | MiB/s | |
| Gibibyte per second | GiB/s | |

## Typography / CSS Units

| Unit | Abbreviations | Notes |
|------|---------------|-------|
| Pixel | px | Device pixel |
| Point | pt | 1/72 inch |
| Pica | pc | 12 points |
| Em | em | Relative to font-size |
| Rem | rem | Relative to root font-size |
| Inch | in | 96 px |
| Centimeter | cm | ~37.8 px |
| Millimeter | mm | ~3.78 px |
| Viewport width | vw | 1% of viewport width |
| Viewport height | vh | 1% of viewport height |
| Ch | ch | Width of "0" |
| Ex | ex | Height of "x" |
| Viewport min | vmin | Min of vw/vh |
| Viewport max | vmax | Max of vw/vh |

### Typography Conversion Notes

- Base assumption: 16px = 1rem = 12pt (standard browser default)
- Physical units (in, cm, mm) assume 96 DPI screen
- vw/vh require viewport size context (default: 1920x1080)
- ch/ex are font-dependent (assume standard monospace)
