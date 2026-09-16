<!--
  ReferencesSlide Styling Architecture:

  This component uses a three-layer styling approach that must be preserved:

  Layer 1: Layout & Structure (style.css)
    • Positioning: position: absolute, z-index
    • Layout: flex, flex-direction, justify-content, grid
    • Sizing: height, border-radius
    • Spacing: padding, margin, gap
    Example: .sv-references-slide { position: relative; display: flex; height: 100%; }

  Layer 2: Typography & Effects (inline Tailwind utilities)
    • Grid layout: grid, grid-cols-2, gap-4, space-y
    • Sizing: text-xs, text-sm, font-bold, font-medium
    • Spacing: p-2, mb, mt
    • Positioning: relative
    • Effects: rounded, border, hover effects
    Example: class="grid grid-cols-2 gap-4" and class="text-sm font-bold"

  Layer 3: Dynamic Colors (Vue theme object)
    • DARK_COLORS and LIGHT_COLORS with 10 color sets (one per accent color)
    • titleCls, linkCls, spanCls methods map group.color to theme colors
    • Applied via :class="linkCls(group.color)" for dynamic switching
    • Never hardcode colors in the template
    Example: :class="linkCls('cyan')" → "text-cyan-400 hover:text-cyan-300"

  WHY THIS MATTERS:
  References can be grouped by different colors (cyan, purple, blue, etc.).
  Using color-aware theme mappings ensures all colors react to isDark.

  DO NOT:
  - Move reference colors to styles.css (breaks isDark reactivity)
  - Add inline style="" attributes
  - Hardcode colors like "text-cyan-400" in the template
-->

<script setup>
/**
 * ReferencesSlide — standard references layout for tech-talk decks.
 *
 * Props:
 *   groups: Array<{
 *     title:  string   — group heading (e.g. "📖 Official Documentation")
 *     color:  string   — accent color key (cyan | purple | blue | indigo | green |
 *                        pink | orange | rose | amber | teal)
 *     items:  Array<{
 *       href?:       string  — if present, renders as <a>; otherwise <span>
 *       label:       string  — link/reference text
 *       description: string  — secondary line of text
 *     }>
 *   }>
 */

import { computed } from 'vue'
import { isDark } from '../useTheme'

const DARK_COLORS = {
  cyan:   { title: "text-cyan-300",   link: "text-cyan-400 hover:text-cyan-300",     span: "text-cyan-400"   },
  purple: { title: "text-purple-300", link: "text-purple-400 hover:text-purple-300", span: "text-purple-400" },
  blue:   { title: "text-blue-300",   link: "text-blue-400 hover:text-blue-300",     span: "text-blue-400"   },
  indigo: { title: "text-indigo-300", link: "text-indigo-400 hover:text-indigo-300", span: "text-indigo-400" },
  green:  { title: "text-green-300",  link: "text-green-400 hover:text-green-300",   span: "text-green-400"  },
  pink:   { title: "text-pink-300",   link: "text-pink-400 hover:text-pink-300",     span: "text-pink-400"   },
  orange: { title: "text-orange-300", link: "text-orange-400 hover:text-orange-300", span: "text-orange-400" },
  rose:   { title: "text-rose-300",   link: "text-rose-400 hover:text-rose-300",     span: "text-rose-400"   },
  amber:  { title: "text-amber-300",  link: "text-amber-400 hover:text-amber-300",   span: "text-amber-400"  },
  teal:   { title: "text-teal-300",   link: "text-teal-400 hover:text-teal-300",     span: "text-teal-400"   },
}
const LIGHT_COLORS = {
  cyan:   { title: "text-cyan-700",   link: "text-cyan-600 hover:text-cyan-700",     span: "text-cyan-600"   },
  purple: { title: "text-purple-700", link: "text-purple-600 hover:text-purple-700", span: "text-purple-600" },
  blue:   { title: "text-blue-700",   link: "text-blue-600 hover:text-blue-700",     span: "text-blue-600"   },
  indigo: { title: "text-indigo-700", link: "text-indigo-600 hover:text-indigo-700", span: "text-indigo-600" },
  green:  { title: "text-green-700",  link: "text-green-600 hover:text-green-700",   span: "text-green-600"  },
  pink:   { title: "text-pink-700",   link: "text-pink-600 hover:text-pink-700",     span: "text-pink-600"   },
  orange: { title: "text-orange-700", link: "text-orange-600 hover:text-orange-700", span: "text-orange-600" },
  rose:   { title: "text-rose-700",   link: "text-rose-600 hover:text-rose-700",     span: "text-rose-600"   },
  amber:  { title: "text-amber-700",  link: "text-amber-600 hover:text-amber-700",   span: "text-amber-600"  },
  teal:   { title: "text-teal-700",   link: "text-teal-600 hover:text-teal-700",     span: "text-teal-600"   },
}

const DARK_THEME = {
  ambientBg:    'from-blue-900/20 via-indigo-900/10 to-transparent',
  orb:          'from-blue-500/10 to-transparent',
  pill:         'from-blue-600/80 to-indigo-600/80',
  divider:      'from-blue-400/60 to-transparent',
  itemBg:       'bg-gray-900/50 border-gray-700/50',
  itemBgStyle:  {},
  itemDesc:     'text-gray-400',
}
const LIGHT_THEME = {
  ambientBg:    'from-blue-100/40 via-indigo-50/20 to-transparent',
  orb:          'from-blue-200/30 to-transparent',
  pill:         'from-blue-500 to-indigo-500',
  divider:      'from-blue-300/60 to-transparent',
  itemBg:       'border-gray-200',
  itemBgStyle:  { background: 'rgb(243,244,246)' },
  itemDesc:     'text-gray-600',
}

const colors = computed(() => isDark.value ? DARK_COLORS : LIGHT_COLORS)
const t = computed(() => isDark.value ? DARK_THEME : LIGHT_THEME)

const props = defineProps({
  groups: { type: Array, required: true },
});

const validationError = computed(() => {
  if (!props.groups || props.groups.length === 0)
    return '[ReferencesSlide] ❌ groups must contain at least 1 item'
  return null
})

const titleCls = (c) => (colors.value[c] || colors.value.cyan).title;
const linkCls  = (c) => (colors.value[c] || colors.value.cyan).link;
const spanCls  = (c) => (colors.value[c] || colors.value.cyan).span;
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
        📚 References
      </span>
      <div class="flex-1 h-px bg-gradient-to-r" :class="t.divider"></div>
    </div>

    <!-- ===== CONTENT SECTION ===== -->
    <!-- Two-column groups grid -->
    <div class="relative z-10 flex-1 min-h-0 overflow-y-auto">
      <div class="grid grid-cols-2 gap-4 text-xs">
        <!-- Reference group (category) -->
        <div v-for="group in groups" :key="group.title">
          <!-- Group heading -->
          <div :class="titleCls(group.color)" class="font-bold mb-2 text-sm">
            {{ group.title }}
          </div>

          <!-- Items list in this group -->
          <div class="space-y-1.5">
            <!-- Reference item -->
            <div
              v-for="item in group.items"
              :key="item.label"
              class="p-2 rounded border"
              :class="[t.itemBg, isDark ? 'sv-card-surface-dark' : 'sv-card-surface-light']"
              :style="t.itemBgStyle"
            >
              <!-- Reference link -->
              <a
                :href="item.href"
                :class="linkCls(group.color)"
                class="font-medium"
              >
                {{ item.label }}
              </a>

              <!-- Reference description -->
              <div class="mt-0.5" :class="t.itemDesc">
                {{ item.description }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </template>
  </div>
</template>
