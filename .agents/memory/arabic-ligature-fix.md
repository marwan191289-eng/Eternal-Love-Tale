---
name: Arabic ligature fix
description: How to prevent Arabic letters appearing disconnected in React/CSS
---

## Rule
Never split Arabic text into per-character `<span>` elements with `display: inline-block`. Never apply `letterSpacing > 0` to Arabic text.

**Why:** Arabic is a cursive script — letters connect to each other based on context. Splitting into individual inline-block spans breaks the shaping context, rendering "أ م ي ر ة" instead of "أميرة". Same effect with positive letter-spacing.

**How to apply:**
- Typewriter effects: accumulate chars into a single string, render as one text node. Use a cursor `<span>` separately.
- Set `letterSpacing: lang === "ar" ? "0" : "0.04em"` for bilingual elements.
- CSS `letter-spacing` property in stylesheets: guard with `:lang(ar)` selector or JS check.
