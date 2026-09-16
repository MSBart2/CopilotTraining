<!--
  SectionOpenerSlide Styling Architecture:

  This component uses a three-layer styling approach that must be preserved:

  Layer 1: Layout & Structure (style.css)
    • Positioning: position: absolute, z-index
    • Layout: flex, flex-direction, justify-content, grid
    • Sizing: height, width, border-radius
    • Spacing: padding, margin, gap
    Example: .sv-section-opener-slide { position: relative; display: flex; }

  Layer 2: Typography & Effects (inline Tailwind utilities)
    • Sizing: text-5xl, font-bold, text-xs, text-xl
    • Grid layout: grid, grid-cols-3, gap-4
    • Spacing: p-4, mb, mt, px-8
    • Positioning: relative, absolute
    • Effects: bg-clip-text, text-transparent, rounded-lg, border, line-clamp
    Example: class="text-5xl font-bold" and class="grid grid-cols-3 gap-4"

  Layer 3: Dynamic Colors (Vue theme object)
    • colorThemes object with 4 complete color sets (one per partNumber)
    • Each part has distinct gradients and text colors
    • Applied via computed colors based on props.partNumber
    • Never hardcode colors in the template
    Example: colors.value.title → "from-cyan-300 via-blue-300 to-indigo-300"

  WHY THIS MATTERS:
  SectionOpener is the only component where title uses gradient text (text-5xl with
  bg-clip-text). Each of 4 parts needs distinct gradient colors that react to isDark.
  Using colorThemes ensures proper part-to-color mapping.

  DO NOT:
  - Move part colors to styles.css (breaks isDark reactivity and partNumber logic)
  - Add inline style="" attributes
  - Hardcode gradients in the template
-->

<script setup>
import { computed } from 'vue'
import { isDark } from '../useTheme'

const TITLE_MAX    = 40
const SUBTITLE_MAX = 120
const CARD_TITLE_MAX = 30
const CARD_BLURB_MAX = 75

const props = defineProps({
  partNumber: { type: Number, required: true },
  title:      { type: String, required: true },
  subtitle:   { type: String, required: true },
  cards:      { type: Array,  required: true }, // exactly 3: { icon, title, blurb }
  terminal:   { type: Object, required: true }, // { context, detail }
})

// Dev-tools warnings — build is pure Vite bundle so these only fire in browser
if (props.title?.length > TITLE_MAX)
  console.warn(`[SectionOpenerSlide] title too long (${props.title.length} chars, max ${TITLE_MAX}): "${props.title.slice(0, 40)}…"`)
if (props.subtitle?.length > SUBTITLE_MAX)
  console.warn(`[SectionOpenerSlide] subtitle too long (${props.subtitle.length} chars, max ${SUBTITLE_MAX}): "${props.subtitle.slice(0, 40)}…"`)
props.cards?.forEach((c, i) => {
  if (c.title?.length > CARD_TITLE_MAX)
    console.warn(`[SectionOpenerSlide] cards[${i}].title too long (${c.title.length} chars, max ${CARD_TITLE_MAX}): "${c.title}"`)
  if (c.blurb?.length > CARD_BLURB_MAX)
    console.warn(`[SectionOpenerSlide] cards[${i}].blurb too long (${c.blurb.length} chars, max ${CARD_BLURB_MAX}): "${c.blurb.slice(0, 40)}…"`)
})

const validationError = computed(() => {
  if (!props.partNumber || props.partNumber < 1 || props.partNumber > 4)
    return `[SectionOpenerSlide] ❌ partNumber must be 1–4 (got ${props.partNumber})`
  if (!props.cards || props.cards.length !== 3)
    return `[SectionOpenerSlide] ❌ cards must contain exactly 3 items (got ${props.cards?.length ?? 'none'})`
  if (!props.terminal?.context || !props.terminal?.detail)
    return `[SectionOpenerSlide] ❌ terminal prop must have { context, detail } strings`
  return null
})

// Color progression hardcoded by part number — not configurable per deck
// Part 1: cyan → blue → indigo
// Part 2: blue → indigo → purple
// Part 3: indigo → purple → pink
// Part 4: purple → pink → rose

const DARK_THEMES = [
  {
    ambientBg: 'from-cyan-900/25 via-blue-900/15 to-indigo-900/20',
    orb:       'from-cyan-500/10 via-blue-500/10 to-indigo-500/10',
    pill:      'from-cyan-600/40 to-blue-600/40 border-cyan-400/30 text-cyan-300',
    h1:        'from-cyan-400 via-blue-300 to-indigo-400',
    divider:   'via-cyan-400',
    arrow:     'text-cyan-300',
    subtitle:  null,
    cards: [
      { bg: 'bg-cyan-900/30',   border: 'border-cyan-500/30',   title: 'text-cyan-300',   blurb: null },
      { bg: 'bg-blue-900/30',   border: 'border-blue-500/30',   title: 'text-blue-300',   blurb: null },
      { bg: 'bg-indigo-900/30', border: 'border-indigo-500/30', title: 'text-indigo-300', blurb: null },
    ],
  },
  {
    ambientBg: 'from-blue-900/25 via-indigo-900/15 to-purple-900/20',
    orb:       'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
    pill:      'from-blue-600/40 to-indigo-600/40 border-blue-400/30 text-blue-300',
    h1:        'from-blue-400 via-indigo-300 to-purple-400',
    divider:   'via-blue-400',
    arrow:     'text-blue-300',
    subtitle:  null,
    cards: [
      { bg: 'bg-blue-900/30',   border: 'border-blue-500/30',   title: 'text-blue-300',   blurb: null },
      { bg: 'bg-indigo-900/30', border: 'border-indigo-500/30', title: 'text-indigo-300', blurb: null },
      { bg: 'bg-purple-900/30', border: 'border-purple-500/30', title: 'text-purple-300', blurb: null },
    ],
  },
  {
    ambientBg: 'from-indigo-900/25 via-purple-900/15 to-pink-900/20',
    orb:       'from-indigo-500/10 via-purple-500/10 to-pink-500/10',
    pill:      'from-indigo-600/40 to-purple-600/40 border-indigo-400/30 text-indigo-300',
    h1:        'from-indigo-400 via-purple-300 to-pink-400',
    divider:   'via-indigo-400',
    arrow:     'text-indigo-300',
    subtitle:  null,
    cards: [
      { bg: 'bg-indigo-900/30', border: 'border-indigo-500/30', title: 'text-indigo-300', blurb: null },
      { bg: 'bg-purple-900/30', border: 'border-purple-500/30', title: 'text-purple-300', blurb: null },
      { bg: 'bg-pink-900/30',   border: 'border-pink-500/30',   title: 'text-pink-300',   blurb: null },
    ],
  },
  {
    ambientBg: 'from-purple-900/25 via-pink-900/15 to-rose-900/20',
    orb:       'from-purple-500/10 via-pink-500/10 to-rose-500/10',
    pill:      'from-purple-600/40 to-pink-600/40 border-purple-400/30 text-purple-300',
    h1:        'from-purple-400 via-pink-300 to-rose-400',
    divider:   'via-purple-400',
    arrow:     'text-purple-300',
    subtitle:  null,
    cards: [
      { bg: 'bg-purple-900/30', border: 'border-purple-500/30', title: 'text-purple-300', blurb: null },
      { bg: 'bg-pink-900/30',   border: 'border-pink-500/30',   title: 'text-pink-300',   blurb: null },
      { bg: 'bg-rose-900/30',   border: 'border-rose-500/30',   title: 'text-rose-300',   blurb: null },
    ],
  },
]

const LIGHT_THEMES = [
  {
    ambientBg: 'from-cyan-100/40 via-blue-100/20 to-indigo-100/20',
    orb:       'from-cyan-200/30 via-blue-200/30 to-indigo-200/30',
    pill:      'from-cyan-100 to-blue-100 border-cyan-400 text-cyan-900',
    h1:        'from-cyan-600 via-blue-600 to-indigo-600',
    divider:   'via-cyan-500',
    arrow:     'text-cyan-700',
    terminalArrow: 'text-cyan-300',
    subtitle:  'text-gray-600',
    cards: [
      { bg: 'bg-cyan-100/80',   border: 'border-cyan-300',   title: 'text-cyan-800',   blurb: 'text-gray-600' },
      { bg: 'bg-blue-100/80',   border: 'border-blue-300',   title: 'text-blue-800',   blurb: 'text-gray-600' },
      { bg: 'bg-indigo-100/80', border: 'border-indigo-300', title: 'text-indigo-800', blurb: 'text-gray-600' },
    ],
  },
  {
    ambientBg: 'from-blue-100/40 via-indigo-100/20 to-purple-100/20',
    orb:       'from-blue-200/30 via-indigo-200/30 to-purple-200/30',
    pill:      'from-blue-100 to-indigo-100 border-blue-400 text-blue-900',
    h1:        'from-blue-600 via-indigo-600 to-purple-600',
    divider:   'via-blue-500',
    arrow:     'text-blue-700',
    terminalArrow: 'text-blue-300',
    subtitle:  'text-gray-600',
    cards: [
      { bg: 'bg-blue-100/80',   border: 'border-blue-300',   title: 'text-blue-800',   blurb: 'text-gray-600' },
      { bg: 'bg-indigo-100/80', border: 'border-indigo-300', title: 'text-indigo-800', blurb: 'text-gray-600' },
      { bg: 'bg-purple-100/80', border: 'border-purple-300', title: 'text-purple-800', blurb: 'text-gray-600' },
    ],
  },
  {
    ambientBg: 'from-indigo-100/40 via-purple-100/20 to-pink-100/20',
    orb:       'from-indigo-200/30 via-purple-200/30 to-pink-200/30',
    pill:      'from-indigo-100 to-purple-100 border-indigo-400 text-indigo-900',
    h1:        'from-indigo-600 via-purple-600 to-pink-600',
    divider:   'via-indigo-500',
    arrow:     'text-indigo-700',
    terminalArrow: 'text-indigo-300',
    subtitle:  'text-gray-600',
    cards: [
      { bg: 'bg-indigo-100/80', border: 'border-indigo-300', title: 'text-indigo-800', blurb: 'text-gray-600' },
      { bg: 'bg-purple-100/80', border: 'border-purple-300', title: 'text-purple-800', blurb: 'text-gray-600' },
      { bg: 'bg-pink-100/80',   border: 'border-pink-300',   title: 'text-pink-800',   blurb: 'text-gray-600' },
    ],
  },
  {
    ambientBg: 'from-purple-100/40 via-pink-100/20 to-rose-100/20',
    orb:       'from-purple-200/30 via-pink-200/30 to-rose-200/30',
    pill:      'from-purple-100 to-pink-100 border-purple-400 text-purple-900',
    h1:        'from-purple-600 via-pink-600 to-rose-600',
    divider:   'via-purple-500',
    arrow:     'text-purple-700',
    terminalArrow: 'text-purple-300',
    subtitle:  'text-gray-600',
    cards: [
      { bg: 'bg-purple-100/80', border: 'border-purple-300', title: 'text-purple-800', blurb: 'text-gray-600' },
      { bg: 'bg-pink-100/80',   border: 'border-pink-300',   title: 'text-pink-800',   blurb: 'text-gray-600' },
      { bg: 'bg-rose-100/80',   border: 'border-rose-300',   title: 'text-rose-800',   blurb: 'text-gray-600' },
    ],
  },
]

const theme = computed(() => (isDark.value ? DARK_THEMES : LIGHT_THEMES)[props.partNumber - 1])
</script>

<template>
  <!-- Full-height centered container -->
  <div class="h-full flex flex-col items-center justify-center relative overflow-hidden">
    <!-- Prop validation error — renders instead of content when props are wrong -->
    <div v-if="validationError" class="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-50 p-12">
      <div class="text-red-400 text-4xl mb-4">⛔</div>
      <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
    </div>
    <template v-else>
    <!-- Ambient gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br" :class="[theme.ambientBg, isDark ? 'sv-slide-surface-dark' : 'sv-slide-surface-light']"></div>

    <!-- Animated blur orb (centered) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-r rounded-full blur-3xl" :class="theme.orb"></div>

    <!-- ===== CENTER CONTENT ===== -->
    <div class="relative z-10 flex w-full max-w-4xl flex-col items-start px-16 text-left">
      <!-- ===== PART PILL ===== -->
      <!-- Part number indicator -->
      <div class="sv-section-kicker mb-4 px-4 py-1.5 bg-gradient-to-r border text-sm font-medium tracking-widest uppercase" :class="theme.pill">
        Part {{ partNumber }}
      </div>

      <!-- ===== SECTION TITLE ===== -->
      <!-- Main title with gradient text (larger size) -->
      <h1 class="!text-5xl !font-bold !mb-3 bg-gradient-to-r bg-clip-text text-transparent leading-tight" :class="theme.h1">
        {{ title }}
      </h1>

      <!-- ===== SECTION SUBTITLE ===== -->
      <!-- Supporting subtitle (smaller size) -->
      <h2 class="!text-2xl !font-normal !m-0 mb-6" :class="theme.subtitle ?? 'opacity-70'">
        {{ subtitle }}
      </h2>

      <!-- ===== DIVIDER ===== -->
      <!-- Decorative separator line -->
      <div class="w-full h-px bg-gradient-to-r from-transparent to-transparent mb-6" :class="theme.divider"></div>

      <!-- ===== CONTEXT CARDS ===== -->
      <!-- Three supporting context cards -->
      <div class="grid w-full grid-cols-3 gap-3 text-sm">
        <!-- Context card -->
        <div v-for="(card, i) in cards" :key="i" class="px-4 py-3 rounded-xl border" :class="[theme.cards[i].bg, theme.cards[i].border, isDark ? 'sv-card-surface-dark' : 'sv-card-surface-light']">
          <!-- Card icon -->
          <div class="text-2xl mb-1">
            {{ card.icon }}
          </div>

          <!-- Card title -->
          <div class="font-semibold" :class="theme.cards[i].title">
            {{ card.title }}
          </div>

          <!-- Card description -->
          <div class="text-xs mt-1" :class="theme.cards[i].blurb ?? 'opacity-70'">
            {{ card.blurb }}
          </div>
        </div>
      </div>

      <!-- ===== TERMINAL CONTEXT ===== -->
      <!-- Terminal/console-style context box -->
      <div class="mt-5 w-full font-mono text-xs bg-gray-950/90 border border-gray-700/50 rounded-lg px-5 py-3 text-left">
        <!-- Context line (before state) -->
        <span class="text-gray-300">
          {{ terminal.context }}
        </span>
        <!-- Arrow pointer + detail line (after state) -->
        <br />
        <span class="mt-1 block" :class="theme.terminalArrow ?? theme.arrow">
          ↳ {{ terminal.detail }}
        </span>
      </div>
    </div>
    </template>
  </div>
</template>
