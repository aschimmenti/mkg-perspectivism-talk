# Perspectivizing knowledge graphs: how should we treat stance?

Lightning talk for the MKG Barstuhl workshop (ISWC 2026, Bari): a title slide plus three slides following the organisers' template (core open challenge, principles and critical review, breakout discussion). Built for 3 minutes, about 1 minute per slide.

Plain HTML, CSS and a small script. No build step, no dependencies, works offline.

## Run it

Open `index.html` in a browser, or serve the folder:

```bash
python3 -m http.server 8000   # http://localhost:8000
```

## Publish on GitHub Pages

Settings → Pages → *Deploy from a branch* → `main` / root. The deck is then at `https://<user>.github.io/<repo>/`.

## Keys

| Key | Action |
| --- | --- |
| `→` `Space` | next step, then next slide |
| `←` | back |
| `T` | show / hide captions (also the *Text* button) |
| `N` | speaker notes |
| `A` | auto-advance (`?auto=60` sets seconds per slide) |
| `F` | fullscreen |
| `?` | help |

`#2.3` in the URL opens slide 2 at step 3.

## Edit

- Text, captions and notes: `index.html`. A slide is `<section class="slide" data-steps="N">`; elements with `data-from="a"` / `data-until="b"` show while `a ≤ step ≤ b`. Captions live in each slide's `.caps` block, notes in `.note`.
- Colours and fonts: `css/theme.css` (sampled from the INFINITY template: #282828, #E0DC76). `assets/infinity-logo.png` is a crop of that template; replace it with the official file.

## Notes on the examples

The Wikidata statements are shown as captured for the talk; the "= US position" label is an inference made for the talk, not data recorded in Wikidata. No position is taken on the claims themselves.

INFINITY · Horizon Europe, grant agreement 101233051.
