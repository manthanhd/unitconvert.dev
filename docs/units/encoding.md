# Encoding Units

Number Bases and Color Code conversions.

## Number Bases

| Base | Names | Prefix | Example |
|------|-------|--------|---------|
| Binary | bin, base2 | 0b | 0b1010 = 10 |
| Octal | oct, base8 | 0o | 0o12 = 10 |
| Decimal | dec, base10 | (none) | 10 |
| Hexadecimal | hex, base16 | 0x | 0xA = 10 |
| Base32 | base32 | (none) | CI====== |
| Base64 | base64 | (none) | Cg== |

### Input Formats

```
Binary:      0b1010, 1010b, 1010 (when base specified)
Octal:       0o12, 12o, 012
Decimal:     10, 10d
Hex:         0xA, 0x0A, Ah, #0A
Base32:      CI======
Base64:      Cg==
```

### Extended Bases (stretch goal)

| Base | Names | Use Case |
|------|-------|----------|
| Base2 | binary | Computing |
| Base8 | octal | Unix permissions |
| Base10 | decimal | Human standard |
| Base12 | duodecimal | Time, angles |
| Base16 | hexadecimal | Computing, colors |
| Base32 | base32 | Encoding |
| Base36 | base36 | URL shorteners |
| Base58 | base58 | Bitcoin addresses |
| Base64 | base64 | Data encoding |

## Color Codes

### Supported Formats

| Format | Example | Notes |
|--------|---------|-------|
| Hex (6-digit) | #FF5733 | Case insensitive |
| Hex (3-digit) | #F53 | Shorthand |
| Hex (8-digit) | #FF5733FF | With alpha |
| Hex (4-digit) | #F53F | Shorthand with alpha |
| RGB | rgb(255, 87, 51) | 0-255 |
| RGB % | rgb(100%, 34%, 20%) | Percentage |
| RGBA | rgba(255, 87, 51, 1) | Alpha 0-1 |
| RGBA % | rgba(100%, 34%, 20%, 100%) | |
| HSL | hsl(11, 100%, 60%) | Hue 0-360, S/L 0-100% |
| HSLA | hsla(11, 100%, 60%, 1) | |
| HSV / HSB | hsv(11, 80%, 100%) | Hue, Saturation, Value |
| CMYK | cmyk(0%, 66%, 80%, 0%) | Print colors |
| Named | red, tomato, coral | CSS color names |

### Modern CSS Color Formats

| Format | Example | Notes |
|--------|---------|-------|
| LAB | lab(62% 56 50) | Perceptual uniformity |
| LCH | lch(62% 75 42) | LAB in polar |
| OKLCH | oklch(70% 0.18 40) | Improved LCH |
| OKLAB | oklab(70% 0.1 0.1) | Improved LAB |
| Display-P3 | color(display-p3 1 0.34 0.2) | Wide gamut |
| sRGB | color(srgb 1 0.34 0.2) | Standard RGB |

### CSS Named Colors (140 colors)

Common named colors:

```
black, white, red, green, blue, yellow, cyan, magenta,
gray, grey, silver, maroon, olive, navy, purple, teal,
orange, pink, brown, coral, crimson, gold, indigo,
lime, orchid, plum, salmon, tan, tomato, turquoise,
violet, wheat, ...
```

### Color Space Notes

**RGB/Hex**: Additive color model for screens. Values 0-255 per channel.

**HSL**: Hue (0-360°), Saturation (0-100%), Lightness (0-100%). More intuitive for humans.

**HSV/HSB**: Hue, Saturation, Value/Brightness. Used in color pickers.

**CMYK**: Subtractive model for print. Cyan, Magenta, Yellow, Key (black).

**LAB**: Device-independent, perceptually uniform. L=lightness, a=green-red, b=blue-yellow.

**LCH**: LAB in cylindrical coordinates. L=lightness, C=chroma, H=hue.

**OKLCH**: Improved version of LCH with better perceptual uniformity. Recommended for modern CSS.

### Conversion Considerations

- RGB → CMYK is approximate (depends on color profile)
- Named colors → exact hex values defined by CSS spec
- HSL/HSV ↔ RGB is lossless
- LAB/LCH conversions require color space assumptions (usually sRGB)
- Some colors exist outside sRGB gamut (display-p3 is wider)

### Example Conversions

```
#FF5733
├── rgb(255, 87, 51)
├── hsl(11, 100%, 60%)
├── hsv(11, 80%, 100%)
├── cmyk(0%, 66%, 80%, 0%)
├── lab(62% 56 50)
└── oklch(70% 0.18 40)

tomato (named)
├── #FF6347
├── rgb(255, 99, 71)
├── hsl(9, 100%, 64%)
└── ...
```
