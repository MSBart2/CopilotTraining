<!--
  TitleSlide Styling Architecture:

  This component uses a three-layer styling approach that must be preserved:

  Layer 1: Layout & Structure (style.css)
    • Positioning: position: absolute, z-index, inset
    • Layout: flex, flex-direction, justify-content, align-items
    • Sizing: width, height, border-radius
    • Spacing: margin, padding
    Example: .sv-title-slide { position: relative; display: flex; height: 100%; }

  Layer 2: Typography & Effects (inline Tailwind utilities)
    • Sizing: w-64, !text-5xl, !font-bold, !mt-8
    • Effects: shadow-lg, bg-clip-text, text-transparent
    • Positioning: relative
    Example: class="w-64 relative" and class="!text-5xl !font-bold"

  Layer 3: Dynamic Colors (Vue theme object)
    • Component-aware color schemes defined in DARK_THEME and LIGHT_THEME
    • Applied via :class="t.bg" for dynamic dark/light switching
    • Never hardcode gradient colors in the template
    Example: :class="t.bg" → "from-cyan-900/20 via-blue-900/10 to-indigo-900/20"

  WHY THIS MATTERS:
  CSS variables + @apply would look cleaner but break theme switching. The theme
  object is Vue reactive (isDark ref), so it must drive color class selection.
  Splitting layout (CSS) from colors (Vue) is intentional and good.

  DO NOT:
  - Move gradient colors to styles.css (breaks isDark reactivity)
  - Add inline style="" attributes (loses Tailwind benefits)
  - Use data-theme attributes (conflicts with isDark ref logic)
-->

<template>
  <div v-if="validationError" class="h-full bg-red-950 flex flex-col items-center justify-center p-12">
    <div class="text-red-400 text-4xl mb-4">⛔</div>
    <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
  </div>
  <template v-else>
  <!-- Full-height editorial title composition -->
  <div class="sv-title-slide">
    <!-- Ambient gradient background -->
    <div class="sv-title-bg bg-gradient-to-br" :class="t.bg"></div>

    <div class="sv-title-grid"></div>
    <div class="sv-title-rule" :class="t.rule"></div>

    <!-- Compact brand lockup -->
    <div class="sv-title-brand">
      <img src="../../sdp-logo.png" class="sv-title-logo" alt="SDP Logo" />
      <div class="sv-title-brand-copy">
        <span>CopilotTraining</span>
        <span>Technical briefing</span>
      </div>
    </div>

    <div class="sv-title-content">
      <!-- Main title with gradient text effect -->
      <h1 class="sv-title-heading bg-gradient-to-r bg-clip-text text-transparent" :class="t.heading">
        {{ title }}
      </h1>

      <div class="sv-title-subtitle" :class="t.subtitle">
        {{ subtitle }}
      </div>

      <!-- Optional tagline text -->
      <div class="sv-title-tagline">
        {{ tagline }}
      </div>
    </div>

    <div class="sv-title-meta">
      <span>{{ meta }}</span>
      <span class="sv-title-meta-mark" :class="t.metaMark"></span>
    </div>
  </div>
  </template>
</template>

<script setup>
import { computed } from 'vue';
import { isDark } from '../useTheme';

const props = defineProps({
  title: { type: String, required: true },
  subtitle: { type: String, required: true },
  tagline: { type: String, required: true },
  meta: { type: String, required: true },
});

const validationError = computed(() => {
  if (!props.title)    return '[TitleSlide] ❌ title is required'
  if (!props.subtitle) return '[TitleSlide] ❌ subtitle is required'
  if (!props.tagline)  return '[TitleSlide] ❌ tagline is required'
  if (!props.meta)     return '[TitleSlide] ❌ meta is required'
  return null
})

// Prop length limits — read by build-all.ps1 for static lint enforcement
// These limits are set to prevent wrapping at Slidev canvas width (980px):
//   TITLE_MAX: text-5xl (48px bold) — ~33 chars safely, 40 with narrow-char buffer
//   SUBTITLE_MAX: text-xl pill (20px) — ~65 chars before pill wraps
const TITLE_MAX    = 40
const SUBTITLE_MAX = 65
const TAGLINE_MAX  = 120
if (props.title?.length > TITLE_MAX)
  console.warn(`[TitleSlide] title is ${props.title.length} chars (max ${TITLE_MAX}): "${props.title}"`)
if (props.subtitle?.length > SUBTITLE_MAX)
  console.warn(`[TitleSlide] subtitle is ${props.subtitle.length} chars (max ${SUBTITLE_MAX}): "${props.subtitle}"`)
if (props.tagline?.length > TAGLINE_MAX)
  console.warn(`[TitleSlide] tagline is ${props.tagline.length} chars (max ${TAGLINE_MAX})`)

const DARK_THEME = {
  bg:      'from-cyan-900/20 via-blue-900/10 to-indigo-900/20',
  heading: 'from-cyan-400 via-blue-400 to-indigo-400',
  subtitle: 'text-slate-100 border-cyan-400/60',
  rule: 'bg-cyan-400',
  metaMark: 'bg-cyan-400',
}
const LIGHT_THEME = {
  bg:      'from-cyan-100/30 via-blue-50/20 to-indigo-50/10',
  heading: 'from-cyan-600 via-blue-600 to-indigo-600',
  subtitle: 'text-slate-800 border-cyan-500/70',
  rule: 'bg-cyan-500',
  metaMark: 'bg-cyan-500',
}

const t = computed(() => isDark.value ? DARK_THEME : LIGHT_THEME);
</script>
