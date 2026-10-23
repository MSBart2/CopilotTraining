<!--
  PrFlowLaneSlide

  Swimlane of the three built-in pull request agents plus the person, across
  generic pull request events. Every populated cell carries a badge:
  👤 human-invoked, ⚡ automatic, ⏸ waits for a person, 🛑 can gate, 🚫 cannot.

  Props:
    partNumber    1-4, drives section chrome
    pillIcon      emoji for the section badge
    pillLabel     text for the section badge
    title         slide headline
    subtitle      optional sub-headline
    variant       'full' (diagram fills the slide) | 'strip' (compact diagram + rule + practice panel)
    focusRows     optional row keys to light: person | agent | review | quality
    focusColumns  optional column keys to light: assign | open | push | respond | rework | decide
    rule          strip variant: the general rule shown under the diagram
    ruleDetail    strip variant: one or two supporting sentences
    invoked       strip variant: human | auto | wait (badge beside the rule)
    actor         strip variant: who acts in this step, e.g. "PR owner"
    practice      strip variant: { label, lines: [{ when, what }] }
    footnote      optional bottom caption
    progressDots  { current, total, activeColor }
-->

<script setup>
import { computed } from 'vue'
import { isDark } from './useTheme'
import { useSectionChrome, validatePartNumber } from './useSectionTheme'

const columns = [
  { key: 'assign', label: 'Issue assigned', detail: 'Person delegates' },
  { key: 'open', label: 'Draft opens', detail: 'Plan commit lands' },
  { key: 'push', label: 'Agent pushes', detail: 'The change arrives' },
  { key: 'respond', label: 'Person responds', detail: 'Resolve, comment, commit' },
  { key: 'rework', label: 'Rework pushed', detail: 'Any new commit' },
  { key: 'decide', label: 'Decide', detail: 'Ready, approve, merge' },
]

const rows = [
  { key: 'person', icon: '👤', label: 'Person', detail: 'Requester, PR owner, reviewer', cells: {
    assign: { kind: 'human', label: 'Writes + assigns issue' },
    respond: { kind: 'human', label: '@copilot · resolve · commit' },
    decide: { kind: 'wait', label: 'Ready · approve · merge' },
  } },
  { key: 'agent', icon: '🛠️', label: 'Cloud agent', detail: 'Produce', cells: {
    assign: { kind: 'auto', label: 'Starts a session' },
    open: { kind: 'auto', label: 'Draft + plan commit' },
    push: { kind: 'auto', label: 'Pushes the change' },
    rework: { kind: 'auto', label: 'Pushes rework' },
    decide: { kind: 'limit', label: 'Cannot approve or merge' },
  } },
  { key: 'review', icon: '🔎', label: 'Code review', detail: 'Reason', cells: {
    open: { kind: 'auto', label: 'Reviews if ruleset on' },
    push: { kind: 'auto', label: 'Re-reviews if new pushes on' },
    rework: { kind: 'auto', label: 'Re-reviews if new pushes on' },
    decide: { kind: 'gate', label: 'Approval counts (preview)' },
  } },
  { key: 'quality', icon: '📏', label: 'Code Quality', detail: 'Measure', cells: {
    open: { kind: 'auto', label: 'Scans in seconds' },
    push: { kind: 'auto', label: 'Rescans in seconds' },
    rework: { kind: 'auto', label: 'Rescans in seconds' },
    decide: { kind: 'gate', label: 'Blocks if rule Active' },
  } },
]

const BADGE = { human: '👤', auto: '⚡', wait: '⏸', gate: '🛑', limit: '🚫' }
const LEGEND = [
  { kind: 'human', label: 'Human-invoked' },
  { kind: 'auto', label: 'Automatic' },
  { kind: 'wait', label: 'Waits for a person' },
  { kind: 'gate', label: 'Can gate merge' },
  { kind: 'limit', label: 'Cannot' },
]

const props = defineProps({
  partNumber:   { type: Number, required: true },
  pillIcon:     { type: String, required: true },
  pillLabel:    { type: String, required: true },
  title:        { type: String, required: true },
  subtitle:     { type: String, required: false, default: '' },
  variant:      { type: String, required: false, default: 'full' },
  focusRows:    { type: Array, required: false, default: () => [] },
  focusColumns: { type: Array, required: false, default: () => [] },
  rule:         { type: String, required: false, default: '' },
  ruleDetail:   { type: String, required: false, default: '' },
  invoked:      { type: String, required: false, default: '' },
  actor:        { type: String, required: false, default: '' },
  practice:     { type: Object, required: false, default: null },
  footnote:     { type: String, required: false, default: '' },
  progressDots: { type: Object, required: true },
})

validatePartNumber(props.partNumber, 'PrFlowLaneSlide')

const validationError = computed(() => {
  const rowKeys = new Set(rows.map(r => r.key))
  const colKeys = new Set(columns.map(c => c.key))
  for (const key of props.focusRows)
    if (!rowKeys.has(key)) return `[PrFlowLaneSlide] unknown focusRows key "${key}"`
  for (const key of props.focusColumns)
    if (!colKeys.has(key)) return `[PrFlowLaneSlide] unknown focusColumns key "${key}"`
  if (!['full', 'strip'].includes(props.variant))
    return `[PrFlowLaneSlide] variant must be "full" or "strip"`
  if (props.invoked && !BADGE[props.invoked])
    return `[PrFlowLaneSlide] invoked must be human, auto, or wait`
  if (props.practice && (props.practice.lines?.length ?? 0) > 4)
    return `[PrFlowLaneSlide] practice.lines supports at most 4 entries`
  return null
})

const chrome = useSectionChrome(() => props.partNumber)
const strip = computed(() => props.variant === 'strip')
const hasFocus = computed(() => props.focusRows.length > 0 || props.focusColumns.length > 0)
const rowLit = key => !props.focusRows.length || props.focusRows.includes(key)
const colLit = key => !props.focusColumns.length || props.focusColumns.includes(key)
const cellLit = (rowKey, colKey) => rowLit(rowKey) && colLit(colKey)

const DARK = {
  title: 'text-white',
  subtitle: 'text-white/60',
  axis: 'text-white/45',
  header: 'bg-gray-900/55 border-gray-700/60',
  headerTitle: 'text-white/90',
  headerDetail: 'text-white/45',
  empty: 'bg-white/[0.025] border-white/[0.06]',
  human: 'bg-amber-950/55 border-amber-500/45 text-amber-100',
  auto: 'bg-sky-950/55 border-sky-500/45 text-sky-100',
  wait: 'bg-violet-950/55 border-violet-500/45 text-violet-100',
  gate: 'bg-rose-950/55 border-rose-500/45 text-rose-100',
  limit: 'bg-gray-800/60 border-gray-600/50 text-gray-300',
  lit: 'ring-2 ring-white/70 shadow-lg',
  loop: 'text-sky-300/80',
  panel: 'bg-gray-900/60 border-gray-700/60',
  ruleText: 'text-white',
  ruleDetail: 'text-white/65',
  practiceLabel: 'text-emerald-300',
  practiceWhen: 'text-emerald-200/80',
  practiceWhat: 'text-white/80',
  actor: 'bg-white/10 border-white/20 text-white/80',
  legend: 'text-white/55',
  footnote: 'text-white/45',
  dotInactive: 'bg-white/20',
  dotCounter: 'text-white/40',
}

const LIGHT = {
  title: 'text-gray-900',
  subtitle: 'text-gray-600',
  axis: 'text-gray-500',
  header: 'bg-white/80 border-gray-300',
  headerTitle: 'text-gray-900',
  headerDetail: 'text-gray-500',
  empty: 'bg-gray-50/60 border-gray-200',
  human: 'bg-amber-100 border-amber-300 text-amber-950',
  auto: 'bg-sky-100 border-sky-300 text-sky-950',
  wait: 'bg-violet-100 border-violet-300 text-violet-950',
  gate: 'bg-rose-100 border-rose-300 text-rose-950',
  limit: 'bg-gray-100 border-gray-300 text-gray-600',
  lit: 'ring-2 ring-gray-900/60 shadow-lg',
  loop: 'text-sky-700',
  panel: 'bg-white/85 border-gray-300',
  ruleText: 'text-gray-900',
  ruleDetail: 'text-gray-600',
  practiceLabel: 'text-emerald-700',
  practiceWhen: 'text-emerald-800',
  practiceWhat: 'text-gray-700',
  actor: 'bg-gray-100 border-gray-300 text-gray-700',
  legend: 'text-gray-500',
  footnote: 'text-gray-500',
  dotInactive: 'bg-gray-300',
  dotCounter: 'text-gray-400',
}

const t = computed(() => isDark.value ? DARK : LIGHT)
const dim = 'opacity-25 saturate-50'
const cellClass = (row, col) => {
  const cell = row.cells[col.key]
  const base = cell ? t.value[cell.kind] : t.value.empty
  if (!hasFocus.value) return base
  if (!cell) return [base, cellLit(row.key, col.key) ? '' : dim]
  return [base, cellLit(row.key, col.key) ? t.value.lit : dim]
}
const gridCols = computed(() => strip.value
  ? 'grid-cols-[7rem_repeat(6,minmax(0,1fr))]'
  : 'grid-cols-[9rem_repeat(6,minmax(0,1fr))]')
</script>

<template>
  <div class="h-full flex flex-col justify-start relative overflow-hidden px-10">
    <div v-if="validationError" class="absolute inset-0 bg-red-950 flex flex-col items-center justify-center z-50 p-12">
      <div class="text-red-400 text-4xl mb-4">!</div>
      <div class="font-mono text-red-300 text-base text-center leading-relaxed max-w-2xl">{{ validationError }}</div>
    </div>

    <template v-else>
      <div class="absolute inset-0 bg-gradient-to-br" :class="chrome.ambientBg"></div>
      <div class="absolute top-0 right-0 w-96 h-96 bg-gradient-to-bl rounded-full blur-3xl" :class="chrome.orb"></div>

      <div class="relative z-10 flex items-center gap-3 mb-2">
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

      <div class="relative z-10" :class="strip ? 'mb-1.5' : 'mb-2'">
        <div class="font-bold" :class="[t.title, strip ? 'text-lg' : 'text-xl']">{{ title }}</div>
        <div v-if="subtitle" class="text-xs mt-0.5" :class="t.subtitle">{{ subtitle }}</div>
      </div>

      <div class="relative z-10 flex flex-col" :class="strip ? 'shrink-0' : 'flex-1 min-h-0'">
        <div class="grid gap-1 mb-1" :class="gridCols">
          <div class="flex items-end px-1.5 pb-0.5 text-[9px] font-semibold uppercase tracking-wide" :class="t.axis">
            Who acts ↓<br />Event →
          </div>
          <div
            v-for="col in columns"
            :key="col.key"
            class="rounded-md border px-1.5 text-center"
            :class="[t.header, strip ? 'py-0.5' : 'py-1', hasFocus && !colLit(col.key) ? 'opacity-40' : '']"
          >
            <div class="font-bold leading-tight" :class="[t.headerTitle, strip ? 'text-[10px]' : 'text-xs']">{{ col.label }}</div>
            <div v-if="!strip" class="text-[9px] mt-0.5 leading-tight" :class="t.headerDetail">{{ col.detail }}</div>
          </div>
        </div>

        <div class="grid gap-1" :class="strip ? '' : 'flex-1 min-h-0'" :style="strip ? {} : { gridTemplateRows: `repeat(${rows.length}, minmax(0, 1fr))` }">
          <div v-for="row in rows" :key="row.key" class="grid gap-1 min-h-0" :class="gridCols">
            <div
              class="rounded-md border px-2 flex items-center gap-1.5 min-w-0"
              :class="[t.header, strip ? 'py-0.5' : 'py-1.5', hasFocus && !rowLit(row.key) ? 'opacity-40' : '']"
            >
              <div class="shrink-0" :class="strip ? 'text-sm' : 'text-xl'">{{ row.icon }}</div>
              <div class="min-w-0">
                <div class="font-bold leading-tight" :class="[t.headerTitle, strip ? 'text-[10px]' : 'text-xs']">{{ row.label }}</div>
                <div v-if="!strip" class="text-[9px] leading-tight mt-0.5" :class="t.headerDetail">{{ row.detail }}</div>
              </div>
            </div>
            <div
              v-for="col in columns"
              :key="`${row.key}-${col.key}`"
              class="rounded-md border px-1 flex items-center justify-center gap-1 min-w-0 text-center"
              :class="[cellClass(row, col), strip ? 'py-0.5 min-h-[1.6rem]' : 'py-1']"
            >
              <template v-if="row.cells[col.key]">
                <span :class="strip ? 'text-[10px]' : 'text-sm'">{{ BADGE[row.cells[col.key].kind] }}</span>
                <span class="font-semibold leading-tight" :class="strip ? 'text-[8px]' : 'text-[10px]'">{{ row.cells[col.key].label }}</span>
              </template>
            </div>
          </div>
        </div>

        <div class="grid gap-1 mt-0.5" :class="gridCols">
          <div></div>
          <div class="col-start-5 col-span-2 text-center font-semibold" :class="[t.loop, strip ? 'text-[8px]' : 'text-[10px]']">
            ↺ repeats on every push until a person decides
          </div>
        </div>
      </div>

      <div v-if="strip" class="relative z-10 flex-1 min-h-0 grid grid-cols-5 gap-3 mt-2">
        <div class="col-span-3 rounded-lg border px-4 py-3 flex flex-col justify-center" :class="t.panel">
          <div class="flex items-center gap-2 mb-1.5">
            <span v-if="invoked" class="text-lg">{{ BADGE[invoked] }}</span>
            <span v-if="actor" class="px-2 py-0.5 rounded-full border text-[10px] font-semibold" :class="t.actor">{{ actor }}</span>
          </div>
          <div class="text-base font-bold leading-snug" :class="t.ruleText">{{ rule }}</div>
          <div v-if="ruleDetail" class="text-xs mt-1.5 leading-relaxed" :class="t.ruleDetail">{{ ruleDetail }}</div>
        </div>
        <div v-if="practice" class="col-span-2 rounded-lg border px-3 py-2.5 flex flex-col" :class="t.panel">
          <div class="text-[10px] font-bold uppercase tracking-wide mb-1.5" :class="t.practiceLabel">{{ practice.label }}</div>
          <div v-for="(line, i) in practice.lines" :key="i" class="text-[10px] leading-snug mb-1">
            <span class="font-mono font-semibold" :class="t.practiceWhen">{{ line.when }}</span>
            <span class="ml-1.5" :class="t.practiceWhat">{{ line.what }}</span>
          </div>
        </div>
      </div>

      <div v-if="!strip" class="relative z-10 mt-2 flex items-center justify-center gap-4 text-[10px]" :class="t.legend">
        <span v-for="item in LEGEND" :key="item.kind">{{ BADGE[item.kind] }} {{ item.label }}</span>
      </div>
      <div v-if="footnote" class="relative z-10 mt-1 text-center text-[10px] italic" :class="t.footnote">{{ footnote }}</div>
    </template>
  </div>
</template>
