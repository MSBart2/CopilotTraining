<!--
  ThankYouSlide Styling Architecture:

  This component uses a three-layer styling approach that must be preserved:

  Layer 1: Layout & Structure (style.css)
    • Positioning: position: absolute, z-index
    • Layout: flex, flex-direction, justify-content, align-items
    • Sizing: height, width
    • Spacing: margin, padding
    Example: .sv-thanks-slide { position: relative; display: flex; height: 100%; }

  Layer 2: Typography & Effects (inline Tailwind utilities)
    • Sizing: text-3xl, font-bold, text-sm, w-20
    • Effects: shadow-lg, rounded, border
    • Spacing: mb, mt, gap
    • Positioning: relative
    Example: class="text-3xl font-bold" and class="w-20"

  Layer 3: Dynamic Colors (Vue theme object)
    • DARK_THEME and LIGHT_THEME with orb, tagline, footer, etc.
    • Applied via :class="t.orb" for dynamic switching
    • Never hardcode colors in the template
    Example: :class="t.tagline" → "text-indigo-300" or "text-indigo-700"

  WHY THIS MATTERS:
  All color values must come from the theme object so isDark switching works.
  The theme object is reactive, inline styles and CSS classes are not.

  DO NOT:
  - Move colors to styles.css
  - Add inline style="" attributes
  - Hardcode color classes in the template
-->

<script setup>
import { computed } from "vue";
import { isDark } from '../useTheme'

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  cards: { type: Array, required: true },
  prompt: { type: String, required: true },
});

const validationError = computed(() => {
  if (!props.cards || props.cards.length < 2 || props.cards.length > 4)
    return `[ThankYouSlide] ❌ cards must contain 2–4 items (got ${props.cards?.length ?? 'none'})`
  return null
})

// Prop length limits — read by build-all.ps1 for static lint enforcement
const TITLE_MAX    = 80
const SUBTITLE_MAX = 120
const PROMPT_MAX   = 160
if (props.title?.length > TITLE_MAX)
  console.warn(`[ThankYouSlide] title is ${props.title.length} chars (max ${TITLE_MAX})`)
if (props.subtitle?.length > SUBTITLE_MAX)
  console.warn(`[ThankYouSlide] subtitle is ${props.subtitle.length} chars (max ${SUBTITLE_MAX})`)
if (props.prompt?.length > PROMPT_MAX)
  console.warn(`[ThankYouSlide] prompt is ${props.prompt.length} chars (max ${PROMPT_MAX})`)

const gridColsClass = computed(() => {
  if (props.cards.length === 4) return "grid-cols-4";
  if (props.cards.length === 2) return "grid-cols-2";
  return "grid-cols-3";
});

const DARK_CARD_STYLES = [
  { card: "bg-gradient-to-br from-cyan-900/40 to-blue-900/40 border-cyan-500/40",     value: "text-cyan-300",   subdetail: "text-cyan-400/70"   },
  { card: "bg-gradient-to-br from-blue-900/40 to-indigo-900/40 border-blue-500/40",   value: "text-blue-300",   subdetail: "text-blue-400/70"   },
  { card: "bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border-indigo-500/40", value: "text-indigo-300", subdetail: "text-indigo-400/70" },
  { card: "bg-gradient-to-br from-purple-900/40 to-pink-900/40 border-purple-500/40",  value: "text-purple-300", subdetail: "text-purple-400/70" },
]
const LIGHT_CARD_STYLES = [
  { card: "bg-gradient-to-br from-cyan-100/80 to-blue-100/80 border-cyan-300",     value: "text-cyan-700",   subdetail: "text-cyan-600/80"   },
  { card: "bg-gradient-to-br from-blue-100/80 to-indigo-100/80 border-blue-300",   value: "text-blue-700",   subdetail: "text-blue-600/80"   },
  { card: "bg-gradient-to-br from-indigo-100/80 to-purple-100/80 border-indigo-300", value: "text-indigo-700", subdetail: "text-indigo-600/80" },
  { card: "bg-gradient-to-br from-purple-100/80 to-pink-100/80 border-purple-300",   value: "text-purple-700", subdetail: "text-purple-600/80" },
]

const DARK_THEME = {
  ambientBg: 'from-cyan-900/20 via-blue-900/10 to-indigo-900/20',
  orb:       'from-cyan-500/20 via-blue-500/20 to-indigo-500/20',
  heading:   'from-cyan-400 via-blue-400 to-indigo-400',
  pill:      'from-cyan-600/80 to-blue-600/80 shadow-cyan-500/25',
  divider:   'via-cyan-400/50',
}
const LIGHT_THEME = {
  ambientBg: 'from-cyan-100/30 via-blue-50/20 to-indigo-50/10',
  orb:       'from-cyan-200/30 via-blue-200/20 to-indigo-200/10',
  heading:   'from-cyan-600 via-blue-600 to-indigo-600',
  pill:      'from-cyan-500 to-blue-500 shadow-cyan-300/50',
  divider:   'via-cyan-300/50',
}

const cardStyles = computed(() => isDark.value ? DARK_CARD_STYLES : LIGHT_CARD_STYLES)
const t = computed(() => isDark.value ? DARK_THEME : LIGHT_THEME)
</script>

<template>
  <!-- Full-height centered container -->
  <div class="h-full flex flex-col items-start justify-center relative overflow-hidden px-16">
    <div v-if="validationError" class="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-50 p-12">
      <div class="text-red-400 text-4xl mb-4">⛔</div>
      <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
    </div>
    <template v-else>
    <!-- Ambient gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br" :class="[t.ambientBg, isDark ? 'sv-slide-surface-dark' : 'sv-slide-surface-light']"></div>

    <!-- Animated blur orb (centered) -->
    <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gradient-to-r rounded-full blur-3xl" :class="t.orb"></div>

    <!-- ===== CENTER CONTENT ===== -->
    <div class="relative z-10 flex w-full max-w-4xl flex-col items-start text-left">
      <!-- ===== LOGO SECTION ===== -->
      <!-- Logo with glow effect -->
      <div class="relative mb-3">
        <img src="../../sdp-logo.png" class="w-20 relative" alt="SDP Logo" />
      </div>

      <!-- ===== HEADING ===== -->
      <!-- Main title with gradient text -->
      <h1 class="!text-4xl !font-bold !mb-2 bg-gradient-to-r bg-clip-text text-transparent" :class="t.heading">
        {{ title }}
      </h1>

      <!-- ===== SUBTITLE PILL ===== -->
      <!-- Tagline in pill format -->
      <div class="mb-4">
        <span class="sv-section-kicker px-4 py-1 bg-gradient-to-r text-white text-sm font-medium" :class="t.pill">
          {{ subtitle }}
        </span>
      </div>

      <!-- ===== CARDS SECTION ===== -->
      <!-- Grid of outcome/detail cards (2, 3, or 4 columns based on card count) -->
      <div class="grid w-full gap-2 text-sm mb-4" :class="gridColsClass">
        <!-- Card item -->
        <div
          v-for="(card, index) in cards"
          :key="index"
          :class="[cardStyles[index % 4].card, isDark ? 'sv-card-surface-dark' : 'sv-card-surface-light']"
          class="p-2 rounded-xl border"
        >
          <!-- Card icon (large watermark) -->
          <div class="text-2xl mb-1">
            {{ card.icon }}
          </div>

          <!-- Card value (main number/metric) -->
          <div :class="cardStyles[index % 4].value" class="text-xl font-bold">
            {{ card.value }}
          </div>

          <!-- Card detail (metric description) -->
          <div class="text-xs opacity-80 mt-1">
            {{ card.detail }}
          </div>

          <!-- Card subdetail (additional info) -->
          <div :class="cardStyles[index % 4].subdetail" class="text-xs mt-1">
            {{ card.subdetail }}
          </div>
        </div>
      </div>

      <!-- ===== PROMPT/CTA ===== -->
      <!-- Call-to-action or final prompt -->
      <div class="text-sm opacity-70">
        {{ prompt }}
      </div>
    </div>

    <!-- ===== BOTTOM DIVIDER ===== -->
    <!-- Decorative bottom line -->
    <div class="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent to-transparent" :class="t.divider"></div>
    </template>
  </div>
</template>
