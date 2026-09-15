<!--
  SurfaceDecisionTreeSlide

  A compact routing tree for choosing a Copilot surface. The root asks for the
  desired outcome; four intent branches expose the next discriminating question
  and terminate in one or more surface recommendations.

  Props:
    partNumber    1-4, drives section chrome and branch colors
    pillIcon      emoji for the section badge
    pillLabel     text for the section badge
    title         slide headline
    subtitle      supporting guidance
    root          root decision question
    branches      exactly 4: { icon, intent, prompt, roles, routes }
                  routes: 1-3 { condition, surface, detail }
    insight       optional bottom takeaway
    progressDots  { current, total, activeColor }
-->

<script setup>
import { computed } from 'vue'
import { isDark } from './useTheme'
import { useSectionChrome, useSectionCards, validatePartNumber } from './useSectionTheme'

const props = defineProps({
  partNumber:   { type: Number, required: true },
  pillIcon:     { type: String, required: true },
  pillLabel:    { type: String, required: true },
  title:        { type: String, required: true },
  subtitle:     { type: String, required: true },
  root:         { type: String, required: true },
  branches:     { type: Array, required: true },
  insight:      { type: String, required: false, default: '' },
  progressDots: { type: Object, required: true },
})

validatePartNumber(props.partNumber, 'SurfaceDecisionTreeSlide')

const BRANCHES_MAX = 4
const ROUTES_MAX = 3
const validationError = computed(() => {
  if (props.branches?.length !== BRANCHES_MAX)
    return `[SurfaceDecisionTreeSlide] branches must contain exactly ${BRANCHES_MAX} items (got ${props.branches?.length ?? 'none'})`
  if (props.branches.some(branch => !branch.routes?.length || branch.routes.length > ROUTES_MAX))
    return `[SurfaceDecisionTreeSlide] each branch must contain 1-${ROUTES_MAX} routes`
  return null
})

const chrome = useSectionChrome(() => props.partNumber)
const cards = useSectionCards(() => props.partNumber)

const DARK = {
  title: 'text-white',
  subtitle: 'text-white/60',
  root: 'bg-gray-900/70 border-white/15 text-white',
  rootHint: 'text-white/45',
  branchPrompt: 'text-white/65',
  roles: 'text-white/45',
  route: 'bg-gray-950/55 border-white/10',
  routeCondition: 'text-white/45',
  routeSurface: 'text-white',
  routeDetail: 'text-white/60',
  connector: 'bg-white/20',
  insight: 'bg-cyan-950/45 border-cyan-500/30 text-cyan-100',
  dotInactive: 'bg-white/20',
  dotCounter: 'text-white/40',
}

const LIGHT = {
  title: 'text-gray-900',
  subtitle: 'text-gray-600',
  root: 'bg-white/90 border-gray-300 text-gray-900',
  rootHint: 'text-gray-500',
  branchPrompt: 'text-gray-700',
  roles: 'text-gray-500',
  route: 'bg-white/75 border-gray-300',
  routeCondition: 'text-gray-500',
  routeSurface: 'text-gray-900',
  routeDetail: 'text-gray-600',
  connector: 'bg-gray-300',
  insight: 'bg-cyan-50 border-cyan-300 text-cyan-900',
  dotInactive: 'bg-gray-300',
  dotCounter: 'text-gray-400',
}

const t = computed(() => isDark.value ? DARK : LIGHT)
</script>

<template>
  <div class="h-full flex flex-col justify-start relative overflow-hidden px-12">
    <div v-if="validationError" class="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-50 p-12">
      <div class="text-red-400 text-4xl mb-4">!</div>
      <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
    </div>

    <template v-else>
      <div class="absolute inset-0 bg-gradient-to-br" :class="chrome.ambientBg"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl rounded-full blur-3xl" :class="chrome.orb"></div>

      <div class="relative z-10 flex items-center gap-3 mb-3">
        <span class="px-4 py-1 bg-gradient-to-r border rounded-full text-xs font-semibold tracking-wide shadow-lg" :class="[chrome.pill, chrome.pillText]">
          {{ pillIcon }} {{ pillLabel }}
        </span>
        <div class="flex-1 h-px bg-gradient-to-r from-transparent to-transparent" :class="chrome.divider"></div>
        <div class="flex items-center gap-2">
          <div
            v-for="n in progressDots.total"
            :key="n"
            class="w-2 h-2 rounded-full"
            :class="n === progressDots.current ? progressDots.activeColor : t.dotInactive"
          ></div>
          <span class="text-xs ml-1" :class="t.dotCounter">{{ progressDots.current }} of {{ progressDots.total }}</span>
        </div>
      </div>

      <div class="relative z-10 mb-3">
        <div class="text-xl font-bold" :class="t.title">{{ title }}</div>
        <div class="text-xs mt-0.5" :class="t.subtitle">{{ subtitle }}</div>
      </div>

      <div class="relative z-10 rounded-xl border px-5 py-2.5 text-center" :class="t.root">
        <div class="text-[10px] uppercase font-semibold tracking-wide" :class="t.rootHint">Start with the work, not the job title</div>
        <div class="text-base font-bold">{{ root }}</div>
      </div>

      <div class="relative z-10 h-4 flex justify-center">
        <div class="w-px h-full" :class="t.connector"></div>
      </div>

      <div class="relative z-10 flex-1 min-h-0 grid grid-cols-4 gap-3">
        <div
          v-for="(branch, index) in branches"
          :key="branch.intent"
          class="rounded-xl border p-2.5 flex flex-col min-h-0"
          :class="[cards[index].bg, cards[index].border]"
        >
          <div class="flex items-center gap-2 mb-1">
            <span class="text-xl">{{ branch.icon }}</span>
            <span class="font-bold text-sm" :class="cards[index].title">{{ branch.intent }}</span>
          </div>
          <div class="text-[9px] leading-tight min-h-7" :class="t.branchPrompt">{{ branch.prompt }}</div>
          <div class="text-[8px] mt-0.5 mb-1" :class="t.roles">Often starts with: {{ branch.roles }}</div>
          <div class="w-px h-2 mx-auto" :class="t.connector"></div>
          <div class="space-y-1 flex-1 min-h-0">
            <div
              v-for="route in branch.routes"
              :key="route.surface"
              class="rounded-lg border px-2 py-1 text-left"
              :class="t.route"
            >
              <div class="text-[8px] leading-tight" :class="t.routeCondition">{{ route.condition }}</div>
              <div class="text-[11px] font-bold leading-tight" :class="t.routeSurface">{{ route.surface }}</div>
              <div class="text-[8px] leading-tight" :class="t.routeDetail">{{ route.detail }}</div>
            </div>
          </div>
        </div>
      </div>

      <div v-if="insight" class="relative z-10 mt-1.5 rounded-lg border px-4 py-1 text-[9px] text-center" :class="t.insight">
        {{ insight }}
      </div>
    </template>
  </div>
</template>
