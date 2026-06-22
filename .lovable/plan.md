# Yash Goswami — Atompunk Portfolio

A single-page, scroll-driven portfolio in a retro-futurist / Atompunk aesthetic: cream paper, oxidized orange, steel blue, chunky serif display + mono body. Control-panel layout with vector robot illustration. Light motion only.

## Scope (per your picks)
- **Sections:** Hero + About only. No projects/skills/contact sections in this build.
- **Vibe:** Atompunk — cream + burnt orange + steel, chunky serif + monospace, schematic/vector robot art, control-panel framing.
- **Motion:** Subtle CRT flicker on accents, hover micro-interactions, gentle entrance fades. No boot sequence, no desktop OS.

## Page layout

```text
┌──────────────────────────────────────────────────────────┐
│  ░░ TOP BAR: "UNIT YG-2007 // ATOMIC LABS"   [ ● REC ] │
├──────────────────────────────────────────────────────────┤
│                                                          │
│   HERO                                                   │
│   ┌──────────────────────┐    ┌──────────────────────┐  │
│   │  YASH                │    │                      │  │
│   │  GOSWAMI             │    │   [ vector robot /   │  │
│   │  ──────────          │    │     control panel    │  │
│   │  AI ENGINEER ·       │    │     illustration ]   │  │
│   │  LLMs · AGENTS       │    │                      │  │
│   │  > boot.portfolio_   │    │   dials · gauges     │  │
│   └──────────────────────┘    └──────────────────────┘  │
│                                                          │
├──────────────────────────────────────────────────────────┤
│   ABOUT // DOSSIER                                       │
│   ┌─ panel ────────────────────────────────────────────┐ │
│   │  Bio paragraph drawn from resume (LLMs, federated │ │
│   │  learning, RL, multi-agent systems). B.Tech CSE,  │ │
│   │  MIT Moradabad, 2025–2029.                        │ │
│   │                                                    │ │
│   │  [ STATUS: ONLINE ]  [ LOCATION: MORADABAD, IN ] │ │
│   │  [ GITHUB → Yashgoswami2007 ]                     │ │
│   └────────────────────────────────────────────────────┘ │
└──────────────────────────────────────────────────────────┘
```

## Design tokens
- Palette: `#F2E8D5` cream paper, `#1A1814` near-black ink, `#C8501E` oxidized orange (primary accent), `#2C5468` steel blue, `#8A6E3B` brass.
- Type: **Big Shoulders Display** (chunky industrial serif/slab) for headings, **JetBrains Mono** for labels and body accents, **Fraunces** for long-form body text.
- Texture: faint paper grain background, thin double-rule borders, corner brackets `⌐ ¬ └ ┘` around panels, occasional rivets/screws.
- Robot art: generated vector illustration of a friendly retro-futurist robot bust beside a control panel (PNG with transparency, placed in `src/assets/`).

## Motion
- Hero headline: staggered letter fade-in on load.
- Accent dots / "REC" indicator: slow pulse.
- Panel borders: 1px CRT-style flicker every few seconds (opacity tween, very subtle).
- Hover on GitHub link: underline draws + label glitches once.
- Framer Motion handles all of it; respects `prefers-reduced-motion`.

## Content
- Name, role, one-liner pulled from the resume.
- About paragraph: condensed from the resume's Professional Summary + Education line.
- GitHub link: `https://github.com/Yashgoswami2007` (your provided URL — note it points to a profile; I'll wire it as-is).
- No resume download, no contact form, no project cards in this build — easy to add later.

## Technical notes
- TanStack Start, single route at `src/routes/index.tsx`.
- Tailwind v4 tokens added in `src/styles.css` under `@theme` (palette + font families).
- Fonts via `@fontsource` packages: `@fontsource/big-shoulders-display`, `@fontsource/jetbrains-mono`, `@fontsource/fraunces`, imported in `src/main.tsx` (or router entry equivalent for this stack).
- Robot illustration generated with `imagegen` (premium, transparent PNG) and imported as an ES module asset.
- SEO: `<title>Yash Goswami — AI Engineer</title>`, meta description from summary, single H1, semantic sections.

## Out of scope (say the word to add later)
- Projects gallery (FusionNet, A.E.G.I.S., R.A.V.E.N., Xenutron, MoodDoctor).
- Skills grid, resume PDF download, contact form, LinkedIn link.
- Boot-sequence intro or full desktop-OS mode.
