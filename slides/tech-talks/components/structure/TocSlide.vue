<!--
  TocSlide Styling Architecture:

  This component uses a three-layer styling approach that must be preserved:

  Layer 1: Layout & Structure (style.css)
    • Positioning: position: absolute, z-index
    • Layout: flex, flex-direction, justify-content, grid
    • Sizing: height, width, border-radius
    • Spacing: padding, margin, gap
    Example: .sv-toc-slide { position: relative; display: flex; height: 100%; }

  Layer 2: Typography & Effects (inline Tailwind utilities)
    • Grid layout: grid, grid-cols-2, gap-4
    • Sizing: text-2xl, font-bold, text-sm, text-xs
    • Spacing: p-4, mb, mt
    • Positioning: relative, absolute
    • Effects: rounded-lg, border, line-clamp
    Example: class="grid grid-cols-2 gap-4" and class="text-2xl font-bold"

  Layer 3: Dynamic Colors (Vue theme object)
    • cardStyles computed array with 4 color sets (one per section)
    • DARK_THEME and LIGHT_THEME for structural colors (pill, divider, title)
    • Applied via :class="cardStyles[i].bg" for dynamic switching
    • Never hardcode colors in the template
    Example: :class="cardStyles[0].bg" → "from-cyan-900/30 to-blue-900/30"

  WHY THIS MATTERS:
  The 4 table-of-contents cards each need distinct colors that react to isDark.
  Using computed cardStyles ensures the colors update when the theme changes.

  DO NOT:
  - Move card colors to styles.css (breaks isDark reactivity)
  - Add inline style="" attributes
  - Hardcode colors in the template
-->

<script setup>
import { computed } from 'vue'
import { isDark } from '../useTheme'

const props = defineProps({
  sections: {
    type: Array,
    required: true,
    validator: (val) => val.length === 4,
  },
})

// Prop length limits — read by build-all.ps1 for static lint enforcement
const SECTIONS_MAX   = 4   // sections array must be exactly 4 items
const CARD_TITLE_MAX = 49
const CARD_BLURB_MAX = 100

const validationError = computed(() => {
  if (!props.sections || props.sections.length !== 4)
    return `[TocSlide] ❌ sections must contain exactly 4 items (got ${props.sections?.length ?? 'none'})`
  for (let i = 0; i < props.sections.length; i++) {
    if (!props.sections[i].icon)  return `[TocSlide] ❌ sections[${i}].icon is required`
    if (!props.sections[i].blurb) return `[TocSlide] ❌ sections[${i}].blurb is required`
  }
  return null
})

props.sections?.forEach((s, i) => {
  if (s.title?.length > CARD_TITLE_MAX)
    console.warn(`[TocSlide] sections[${i}].title too long (${s.title.length} chars, max ${CARD_TITLE_MAX}): "${s.title}"`)
  if (s.blurb?.length > CARD_BLURB_MAX)
    console.warn(`[TocSlide] sections[${i}].blurb too long (${s.blurb.length} chars, max ${CARD_BLURB_MAX}): "${s.blurb.slice(0, 50)}…"`)
})

// Card styles: cyan → blue → indigo → purple
const DARK_CARD_STYLES = [
  { bg: 'from-cyan-900/40 to-blue-900/40',     border: 'border-cyan-500/50',   hover: 'hover:border-cyan-400',   titleGrad: 'from-cyan-300 to-blue-300',     shadow: 'shadow-lg shadow-cyan-500/10',   blurb: 'text-cyan-400/70',   partNum: 'text-cyan-500/60'   },
  { bg: 'from-blue-900/40 to-indigo-900/40',   border: 'border-blue-500/50',   hover: 'hover:border-blue-400',   titleGrad: 'from-blue-300 to-indigo-300',   shadow: 'shadow-lg shadow-blue-500/10',   blurb: 'text-blue-400/70',   partNum: 'text-blue-500/60'   },
  { bg: 'from-indigo-900/40 to-purple-900/40', border: 'border-indigo-500/50', hover: 'hover:border-indigo-400', titleGrad: 'from-indigo-300 to-purple-300', shadow: 'shadow-lg shadow-indigo-500/10', blurb: 'text-indigo-400/70', partNum: 'text-indigo-500/60' },
  { bg: 'from-purple-900/40 to-pink-900/40',   border: 'border-purple-500/50', hover: 'hover:border-purple-400', titleGrad: 'from-purple-300 to-pink-300',   shadow: 'shadow-lg shadow-purple-500/10', blurb: 'text-purple-400/70', partNum: 'text-purple-500/60' },
]
const LIGHT_CARD_STYLES = [
  { bg: 'from-cyan-200 to-blue-300',     border: 'border-cyan-400',   hover: 'hover:border-cyan-600',   titleGrad: 'from-cyan-800 to-blue-800',     shadow: 'shadow-lg shadow-cyan-300/50',   blurb: 'text-cyan-900',   partNum: 'text-cyan-700/70'   },
  { bg: 'from-blue-200 to-indigo-300',   border: 'border-blue-400',   hover: 'hover:border-blue-600',   titleGrad: 'from-blue-800 to-indigo-800',   shadow: 'shadow-lg shadow-blue-300/50',   blurb: 'text-blue-900',   partNum: 'text-blue-700/70'   },
  { bg: 'from-indigo-100 to-purple-200', border: 'border-indigo-400', hover: 'hover:border-indigo-600', titleGrad: 'from-indigo-700 to-purple-700', shadow: 'shadow-lg shadow-indigo-300/50', blurb: 'text-indigo-800', partNum: 'text-indigo-600/70' },
  { bg: 'from-purple-100 to-pink-200',   border: 'border-purple-400', hover: 'hover:border-purple-600', titleGrad: 'from-purple-700 to-pink-700',   shadow: 'shadow-lg shadow-purple-300/50', blurb: 'text-purple-800', partNum: 'text-purple-600/70' },
]

// Structural/ambient theme classes
const DARK_THEME = {
  ambientBg:    'from-blue-900/20 via-indigo-900/10 to-transparent',
  orb:          'from-blue-500/10 to-transparent',
  pill:         'from-blue-600/80 to-indigo-600/80',
  divider:      'from-blue-400/60 to-transparent',
  subtitleText: 'text-gray-300',
}
const LIGHT_THEME = {
  ambientBg:    'from-blue-100/40 via-indigo-50/20 to-transparent',
  orb:          'from-blue-200/30 to-transparent',
  pill:         'from-blue-500 to-indigo-500',
  divider:      'from-blue-300/60 to-transparent',
  subtitleText: 'text-gray-600',
}

const cardStyles = computed(() => isDark.value ? DARK_CARD_STYLES : LIGHT_CARD_STYLES)
const t = computed(() => isDark.value ? DARK_THEME : LIGHT_THEME)
</script>

<template>
  <!-- Full-height container -->
  <div class="h-full flex flex-col justify-start relative overflow-hidden px-14">
    <div v-if="validationError" class="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-50 p-12">
      <div class="text-red-400 text-4xl mb-4">⛔</div>
      <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
    </div>
    <template v-else>
    <!-- Ambient gradient background -->
    <div class="absolute inset-0 bg-gradient-to-br" :class="[t.ambientBg, isDark ? 'sv-slide-surface-dark' : 'sv-slide-surface-light']"></div>

    <!-- Animated blur orb in top-right -->
    <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl rounded-full blur-3xl" :class="t.orb"></div>

    <!-- ===== HEADER SECTION ===== -->
    <!-- Section label pill + divider -->
    <div class="relative z-10 flex items-center gap-3 mb-4">
      <span class="sv-section-kicker px-4 py-1 bg-gradient-to-r text-white text-xs font-semibold tracking-wide" :class="t.pill">
        📖 Table of Contents
      </span>
      <div class="flex-1 h-px bg-gradient-to-r" :class="t.divider"></div>
    </div>

    <!-- ===== CONTENT SECTION ===== -->
    <!-- 2x2 grid of major sections -->
    <div class="relative z-10 flex-1 min-h-0 flex flex-col">
      <div class="grid grid-cols-2 grid-rows-2 gap-6 mt-2 flex-1">
        <!-- Section card (clickable to navigate) -->
        <div
          v-for="(section, i) in sections"
          :key="i"
          @click="$nav.go(section.slide)"
          class="cursor-pointer group h-full"
        >
          <div
            class="relative p-7 bg-gradient-to-br rounded-xl border-2 hover:scale-[1.02] transition-all duration-300 overflow-hidden h-full"
            :class="[cardStyles[i].bg, cardStyles[i].border, cardStyles[i].hover, isDark ? 'sv-card-surface-dark' : 'sv-card-surface-light']"
          >
            <!-- Large icon watermark (background) -->
            <div class="absolute bottom-2 right-4 text-9xl opacity-10 select-none pointer-events-none leading-none">
              {{ section.icon }}
            </div>

            <!-- Part number badge (top-right) -->
            <div class="absolute top-3 right-4 text-xs font-bold tracking-widest uppercase" :class="cardStyles[i].partNum">
              Part {{ i + 1 }}
            </div>

            <!-- Section title with gradient text -->
            <div class="relative text-xl font-bold bg-gradient-to-r bg-clip-text text-transparent mb-2" :class="cardStyles[i].titleGrad">
              {{ section.title }}
            </div>

            <!-- Section subtitle -->
            <div class="relative text-sm mt-1" :class="t.subtitleText">
              {{ section.subtitle }}
            </div>

            <!-- Section description/blurb -->
            <div class="relative text-sm mt-3" :class="cardStyles[i].blurb">
              {{ section.blurb }}
            </div>
          </div>
        </div>
      </div>

      <!-- Footer hint text -->
    </div>
    </template>
  </div>
</template>
