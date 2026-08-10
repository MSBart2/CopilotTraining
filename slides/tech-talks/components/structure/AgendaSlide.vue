<script setup>
import { computed } from 'vue'
import { isDark } from '../useTheme'

const props = defineProps({
  items: {
    type: Array,
    required: true,
    validator: (value) => value.length === 3,
  },
})

const ITEMS_MAX = 3
const CARD_TITLE_MAX = 30
const TAKEAWAY_MAX = 110
const WHY_IT_MATTERS_MAX = 110

const validationError = computed(() => {
  if (!props.items || props.items.length !== ITEMS_MAX)
    return `[AgendaSlide] items must contain exactly ${ITEMS_MAX} entries (got ${props.items?.length ?? 'none'})`

  const missingField = props.items.findIndex((item) =>
    !item?.title || !item?.takeaway || !item?.whyItMatters,
  )
  if (missingField !== -1)
    return `[AgendaSlide] items[${missingField}] requires title, takeaway, and whyItMatters`

  return null
})

props.items?.forEach((item, index) => {
  if (item.title?.length > CARD_TITLE_MAX)
    console.warn(`[AgendaSlide] items[${index}].title too long (${item.title.length} chars, max ${CARD_TITLE_MAX}): "${item.title}"`)
  if (item.takeaway?.length > TAKEAWAY_MAX)
    console.warn(`[AgendaSlide] items[${index}].takeaway too long (${item.takeaway.length} chars, max ${TAKEAWAY_MAX}): "${item.takeaway.slice(0, 50)}..."`)
  if (item.whyItMatters?.length > WHY_IT_MATTERS_MAX)
    console.warn(`[AgendaSlide] items[${index}].whyItMatters too long (${item.whyItMatters.length} chars, max ${WHY_IT_MATTERS_MAX}): "${item.whyItMatters.slice(0, 50)}..."`)
})

const DARK_CARD_STYLES = [
  { bg: 'from-cyan-900/40 to-blue-900/35', border: 'border-cyan-500/45', number: 'text-cyan-400/70', title: 'text-cyan-200', label: 'text-cyan-400/80', detail: 'text-cyan-100/75' },
  { bg: 'from-blue-900/40 to-indigo-900/35', border: 'border-blue-500/45', number: 'text-blue-400/70', title: 'text-blue-200', label: 'text-blue-400/80', detail: 'text-blue-100/75' },
  { bg: 'from-indigo-900/40 to-purple-900/35', border: 'border-indigo-500/45', number: 'text-indigo-400/70', title: 'text-indigo-200', label: 'text-indigo-400/80', detail: 'text-indigo-100/75' },
]
const LIGHT_CARD_STYLES = [
  { bg: 'from-cyan-100 to-blue-200', border: 'border-cyan-400', number: 'text-cyan-700/70', title: 'text-cyan-900', label: 'text-cyan-800', detail: 'text-cyan-900' },
  { bg: 'from-blue-100 to-indigo-200', border: 'border-blue-400', number: 'text-blue-700/70', title: 'text-blue-900', label: 'text-blue-800', detail: 'text-blue-900' },
  { bg: 'from-indigo-100 to-purple-200', border: 'border-indigo-400', number: 'text-indigo-700/70', title: 'text-indigo-900', label: 'text-indigo-800', detail: 'text-indigo-900' },
]
const DARK_THEME = {
  ambientBg: 'from-cyan-900/20 via-blue-900/10 to-transparent',
  pill: 'from-cyan-600/80 to-blue-600/80',
  divider: 'from-cyan-400/60 to-transparent',
  title: 'text-white',
  subtitle: 'text-gray-300',
}
const LIGHT_THEME = {
  ambientBg: 'from-cyan-100/40 via-blue-50/20 to-transparent',
  pill: 'from-cyan-500 to-blue-500',
  divider: 'from-cyan-300/60 to-transparent',
  title: 'text-gray-900',
  subtitle: 'text-gray-600',
}

const cardStyles = computed(() => isDark.value ? DARK_CARD_STYLES : LIGHT_CARD_STYLES)
const theme = computed(() => isDark.value ? DARK_THEME : LIGHT_THEME)
</script>

<template>
  <div class="h-full flex flex-col relative overflow-hidden px-14 py-2">
    <div v-if="validationError" class="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-50 p-12">
      <div class="text-red-400 text-4xl mb-4">!</div>
      <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
    </div>
    <template v-else>
      <div class="absolute inset-0 bg-gradient-to-br" :class="theme.ambientBg"></div>
      <div class="relative z-10 flex items-center gap-3 mb-2">
        <span class="px-4 py-1 bg-gradient-to-r rounded-full text-white text-xs font-semibold tracking-wide shadow-lg" :class="theme.pill">
          Agenda
        </span>
        <div class="flex-1 h-px bg-gradient-to-r" :class="theme.divider"></div>
      </div>
      <div class="relative z-10 mb-3 text-center">
        <h1 class="text-2xl font-bold mb-1" :class="theme.title">Three outcomes for the work ahead</h1>
        <p class="text-sm" :class="theme.subtitle">What we will explore, what it unlocks, and why it matters in practice.</p>
      </div>
      <div class="relative z-10 grid grid-cols-3 gap-6 flex-1 min-h-0 pb-2">
        <article
          v-for="(item, index) in items"
          :key="item.title"
          class="relative h-full min-h-0 p-4 bg-gradient-to-br rounded-xl border flex flex-col"
          :class="[cardStyles[index].bg, cardStyles[index].border]"
        >
          <div class="text-[10px] font-bold tracking-widest mb-2" :class="cardStyles[index].number">0{{ index + 1 }}</div>
          <div role="heading" aria-level="2" class="text-sm font-bold leading-snug mb-3" :class="cardStyles[index].title">{{ item.title }}</div>
          <div class="mb-3">
            <div class="text-[10px] font-semibold uppercase tracking-wide mb-1" :class="cardStyles[index].label">Takeaway</div>
            <p class="text-[11px] leading-relaxed" :class="cardStyles[index].detail">{{ item.takeaway }}</p>
          </div>
          <div class="mt-auto pt-2 border-t border-white/15">
            <div class="text-[10px] font-semibold uppercase tracking-wide mb-1" :class="cardStyles[index].label">Why it matters</div>
            <p class="text-[11px] leading-relaxed" :class="cardStyles[index].detail">{{ item.whyItMatters }}</p>
          </div>
        </article>
      </div>
    </template>
  </div>
</template>