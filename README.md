# Perspectivizing knowledge graphs: how should we treat stance?

**Andrea Schimmenti** · University of Bologna, DISI · INFINITY project
Lightning talk at the MKG Barstuhl workshop, ISWC 2026, Bari

▶ **Slides:** open `index.html`, or the GitHub Pages link of this repository.

---

## The idea in one paragraph

A multi-perspective knowledge graph (MKG) should be able to hold several perspectives on the same thing. That presupposes we know what a perspective is, and that we can annotate it with some confidence. Perspectivism describes a perspective as a triangle: an **agent** looks at an **object** from a **stance**. Knowledge graphs already record the object, and through provenance the agent. The stance, the position from which a claim was made, is almost never there. When a source declares it, we can put it in provenance. When it does not, we have to infer it, and that inference is one more interpretation, open to our own biases. This talk asks how we should treat stance when annotating perspective, and whether perspectives should become first-class entities in MKGs.

## Why it matters

Annotating perspective makes potential bias explicit. It concerns interpretative claims, and factual statements and plain triples as well: any statement comes from somewhere. Positionality matters in politics, in the description and attribution of museum artefacts, and in how something is measured or analysed.

## The talk, slide by slide

The structure follows the workshop template: core open challenge, suggested principles and critical review, questions for the breakout groups.

### 1 · Core open challenge: a claim comes from a perspective

- **The triangle.** Agent (with its provenance, as in PROV-O), object, stance; the claim sits in the middle.
- **A soft example.** *"The Benin Bronzes were acquired in 1897"* and *"…were looted in 1897"* describe the same event from different positions. The stance shows in the wording, and the KG has no place for it.
- **A harder example.** On Wikidata, the capital of Israel is Jerusalem, simply asserted, while both Tel Aviv statements are deprecated. Qualifiers record who disputes the claim. From which positionality the claim was made stays unsaid. The choice matches the US position of December 2017.
- **Discourse.** Claims and their positionality join into discourses, in Foucault's sense: the statements and rules that decide what can be said about a subject. Even naming a discourse is a stance.

### 2 · Principles and critical review: provenance and positionality

A statement should be annotated with its provenance and its positionality. This is always possible; how hard it is depends on what the source tells us.

| | The source says why | The source is silent |
|---|---|---|
| Example | *"As a Marxist critic, I read this novel as a study of class."* | *"The novel lays bare the class order behind its characters."* |
| Stance | **declared**: goes into provenance | **attributed**: inferred from method, background, discourse |
| Risk | low | the inference is another interpretation, biased by our own positionality |

Existing models (PROV-O, nanopublications, CRMinf, DEC, DOLCE-based epistemic models) tell us *what* was claimed and *by whom*. None of them answers *from which stance*.

A constructivist route, in five steps:

1. **Claim**: take the claim as stated.
2. **Provenance**: who made it, where, when.
3. **Agent**: analyse their method, background and other claims.
4. **Perspectivize**: propose a candidate stance from those variables and the discourse the claim belongs to.
5. **Signature**: the KG maintainer declares its own stance on the annotation. At some level, the knowledge base has to be transparent about itself.

### 3 · For the breakout groups: perspectives as first-class entities?

Use case: *every Marxist claim about literary entities in novels.*

1. What identifies a perspective?
2. Who may declare one?
3. Who annotates the annotator?

Trade-off to discuss: attributing stances gives coverage at scale, and every attribution is itself a claim that can be contested.

One possibility, for fun: gather claims with their provenance into a named graph, read the graph as a discourse, and infer a stance from it. The catch is circularity: choosing which claims belong to the discourse already assumes the stance.


## Using the slides

No build step and no dependencies; the deck works offline.

```bash
python3 -m http.server 8000   # then open http://localhost:8000
```

| Key | Action |
| --- | --- |
| `→` `Space` | next step / slide |
| `←` | back |
| `T` | show or hide captions (also the *Text* button) |
| `N` | speaker notes |
| `A` | auto-advance (`?auto=60` sets seconds per slide) |
| `F` | fullscreen |
| `?` | help |

`#2.3` in the URL opens slide 2 at step 3.

**Editing.** All text is in `index.html`: each slide is a `<section class="slide" data-steps="N">`, and elements with `data-from` / `data-until` appear at those steps. Captions are in each slide's `.caps` block, speaker notes in `.note`. Colours and fonts are in `css/theme.css`.

**Publishing.** Settings → Pages → *Deploy from a branch* → `main` / root.

## Acknowledgements

This work is part of the INFINITY project, funded by the European Union's Horizon Europe programme under grant agreement 101233051.