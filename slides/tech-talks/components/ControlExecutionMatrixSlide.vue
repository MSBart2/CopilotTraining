<!--
  ControlExecutionMatrixSlide

  A two-axis map separating where a person controls work from where agent
  execution or analysis happens. Rows are control surfaces; columns are
  execution locations. Populated cells name the capability spanning both.

  Props:
    partNumber       1-4, drives section chrome
    pillIcon         emoji for the section badge
    pillLabel        text for the section badge
    title            slide headline
    subtitle         optional sub-headline
    scenario         optional { role, outcome, steps: [{ row, column, item, step }] }
    footnote         optional bottom caption
    progressDots     { current, total, activeColor }
-->

<script setup>
import { computed } from 'vue'
import { isDark } from './useTheme'
import { useSectionChrome, validatePartNumber } from './useSectionTheme'

const matrixColumns = [
  { key: 'local', label: 'Local workspace', detail: 'Files, tools, processes' },
  { key: 'remote', label: 'Remote host', detail: 'SSH or connected environment' },
  { key: 'github', label: 'GitHub', detail: 'Service or hosted sandbox' },
  { key: 'runtime', label: 'App runtime', detail: 'Your product environment' },
]

const matrixRows = [
  { icon: '🧑‍💻', label: 'VS Code', detail: 'Editor + Agents window', cells: [
    { column: 'local', items: ['Agent mode', 'Local sessions'] },
    { column: 'remote', items: ['Remote agents'] },
    { column: 'github', items: ['Cloud sessions'] },
  ] },
  { icon: '⌨️', label: 'Copilot CLI', detail: 'Terminal', cells: [
    { column: 'local', items: ['Interactive', 'Programmatic'] },
    { column: 'remote', items: ['Host-local work'] },
    { column: 'github', items: ['Delegate'] },
  ] },
  { icon: '🌐', label: 'GitHub.com', detail: 'Browser, issue, or PR', cells: [
    { column: 'github', items: ['Chat', 'Coding agent', 'Code Review'] },
  ] },
  { icon: '🎛️', label: 'Copilot app', detail: 'Local desktop', cells: [
    { column: 'local', items: ['Local sessions'] },
    { column: 'github', items: ['Cloud fleet', 'PRs + workflows'] },
  ] },
  { icon: '🧩', label: 'Your product', detail: 'UI or API', cells: [
    { column: 'runtime', items: ['Copilot SDK'] },
  ] },
]

const props = defineProps({
  partNumber:   { type: Number, required: true },
  pillIcon:     { type: String, required: true },
  pillLabel:    { type: String, required: true },
  title:        { type: String, required: true },
  subtitle:     { type: String, required: false, default: '' },
  scenario:     { type: Object, required: false, default: null },
  footnote:     { type: String, required: false, default: '' },
  progressDots: { type: Object, required: true },
})

validatePartNumber(props.partNumber, 'ControlExecutionMatrixSlide')

const MATRIX_ROW_MAX = 5
const ITEMS_MAX = 3

const validationError = computed(() => {
  const columnKeys = new Set(matrixColumns.map(column => column.key))
  for (const [rowIndex, row] of matrixRows.entries()) {
    for (const cell of row.cells ?? []) {
      if (!columnKeys.has(cell.column))
        return `[ControlExecutionMatrixSlide] row[${rowIndex}] references unknown column "${cell.column}"`
      if (!cell.items?.length || cell.items.length > ITEMS_MAX)
        return `[ControlExecutionMatrixSlide] row[${rowIndex}] cell "${cell.column}" must contain 1-${ITEMS_MAX} items`
    }
  }
  return null
})

const chrome = useSectionChrome(() => props.partNumber)

const cellFor = (row, columnKey) => row.cells?.find(cell => cell.column === columnKey)
const routeStep = (rowLabel, columnKey, item) => props.scenario?.steps?.find(step =>
  step.row === rowLabel && step.column === columnKey && step.item === item
)
const isRouteCell = (rowLabel, columnKey) => props.scenario?.steps?.some(step =>
  step.row === rowLabel && step.column === columnKey
)
const cellEmphasis = (rowLabel, columnKey) => {
  if (!props.scenario) return ''
  return isRouteCell(rowLabel, columnKey) ? 'ring-2 ring-white/70 shadow-lg' : 'opacity-25 saturate-50'
}

const DARK = {
  title: 'text-white',
  subtitle: 'text-white/60',
  axis: 'text-white/45',
  columnHeader: 'bg-gray-900/55 border-gray-700/60',
  columnTitle: 'text-white/90',
  columnDetail: 'text-white/45',
  rowHeader: 'bg-gray-900/55 border-gray-700/60',
  rowTitle: 'text-white',
  rowDetail: 'text-white/45',
  empty: 'bg-white/[0.025] border-white/[0.06]',
  local: 'bg-cyan-950/55 border-cyan-500/40 text-cyan-100',
  remote: 'bg-blue-950/55 border-blue-500/40 text-blue-100',
  github: 'bg-indigo-950/55 border-indigo-500/40 text-indigo-100',
  runtime: 'bg-violet-950/55 border-violet-500/40 text-violet-100',
  localPill: 'bg-cyan-400/15 border-cyan-400/25 text-cyan-200',
  remotePill: 'bg-blue-400/15 border-blue-400/25 text-blue-200',
  githubPill: 'bg-indigo-400/15 border-indigo-400/25 text-indigo-200',
  runtimePill: 'bg-violet-400/15 border-violet-400/25 text-violet-200',
  footnote: 'text-white/45',
  scenario: 'bg-white/8 border-white/15 text-white/80',
  step: 'bg-white text-gray-950',
  dotInactive: 'bg-white/20',
  dotCounter: 'text-white/40',
}

const LIGHT = {
  title: 'text-gray-900',
  subtitle: 'text-gray-600',
  axis: 'text-gray-500',
  columnHeader: 'bg-white/80 border-gray-300',
  columnTitle: 'text-gray-900',
  columnDetail: 'text-gray-500',
  rowHeader: 'bg-white/80 border-gray-300',
  rowTitle: 'text-gray-900',
  rowDetail: 'text-gray-500',
  empty: 'bg-gray-50/60 border-gray-200',
  local: 'bg-cyan-100 border-cyan-300 text-cyan-950',
  remote: 'bg-blue-100 border-blue-300 text-blue-950',
  github: 'bg-indigo-100 border-indigo-300 text-indigo-950',
  runtime: 'bg-violet-100 border-violet-300 text-violet-950',
  localPill: 'bg-cyan-50 border-cyan-300 text-cyan-800',
  remotePill: 'bg-blue-50 border-blue-300 text-blue-800',
  githubPill: 'bg-indigo-50 border-indigo-300 text-indigo-800',
  runtimePill: 'bg-violet-50 border-violet-300 text-violet-800',
  footnote: 'text-gray-500',
  scenario: 'bg-white/85 border-gray-300 text-gray-700',
  step: 'bg-gray-900 text-white',
  dotInactive: 'bg-gray-300',
  dotCounter: 'text-gray-400',
}

const t = computed(() => isDark.value ? DARK : LIGHT)
const columnTone = key => t.value[key] ?? t.value.github
const pillTone = key => t.value[`${key}Pill`] ?? t.value.githubPill
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
        <div v-if="subtitle" class="text-xs mt-0.5" :class="t.subtitle">{{ subtitle }}</div>
      </div>

      <div class="relative z-10 flex-1 min-h-0 flex flex-col">
        <div class="grid grid-cols-[9.5rem_repeat(4,minmax(0,1fr))] gap-1.5 mb-1.5">
          <div class="flex items-end px-2 pb-1 text-[10px] font-semibold uppercase tracking-wide" :class="t.axis">
            You steer here ↓<br />Work happens →
          </div>
          <div
            v-for="column in matrixColumns"
            :key="column.key"
            class="rounded-lg border px-2 py-1.5 text-center"
            :class="t.columnHeader"
          >
            <div class="text-xs font-bold" :class="t.columnTitle">{{ column.label }}</div>
            <div class="text-[9px] mt-0.5 leading-tight" :class="t.columnDetail">{{ column.detail }}</div>
          </div>
        </div>

        <div class="flex-1 min-h-0 grid gap-1.5" :style="{ gridTemplateRows: `repeat(${matrixRows.length}, minmax(0, 1fr))` }">
          <div
            v-for="row in matrixRows"
            :key="row.label"
            class="grid grid-cols-[9.5rem_repeat(4,minmax(0,1fr))] gap-1.5 min-h-0"
          >
            <div class="rounded-lg border px-2.5 py-1.5 flex items-center gap-2 min-w-0" :class="t.rowHeader">
              <div class="text-xl shrink-0">{{ row.icon }}</div>
              <div class="min-w-0">
                <div class="text-xs font-bold leading-tight" :class="t.rowTitle">{{ row.label }}</div>
                <div class="text-[9px] leading-tight mt-0.5" :class="t.rowDetail">{{ row.detail }}</div>
              </div>
            </div>

            <div
              v-for="column in matrixColumns"
              :key="`${row.label}-${column.key}`"
              class="rounded-lg border px-1.5 py-1 flex items-center justify-center min-w-0"
              :class="[
                cellFor(row, column.key) ? columnTone(column.key) : t.empty,
                cellEmphasis(row.label, column.key)
              ]"
            >
              <div v-if="cellFor(row, column.key)" class="flex flex-nowrap justify-center gap-0.5">
                <span
                  v-for="item in cellFor(row, column.key).items"
                  :key="item"
                  class="px-1 py-0.5 rounded border text-[8px] font-semibold leading-tight text-center whitespace-nowrap"
                  :class="pillTone(column.key)"
                >
                  <span
                    v-if="routeStep(row.label, column.key, item)"
                    class="inline-flex w-3.5 h-3.5 mr-0.5 rounded-full items-center justify-center text-[7px] font-black"
                    :class="t.step"
                  >{{ routeStep(row.label, column.key, item).step }}</span>
                  {{ item }}
                </span>
              </div>
            </div>
          </div>
        </div>

        <div v-if="scenario" class="mt-2 rounded-lg border px-3 py-1.5 text-[10px] flex items-center justify-between gap-4" :class="t.scenario">
          <span><strong>{{ scenario.role }}</strong> follows the numbered route.</span>
          <span class="text-right"><strong>Artifact:</strong> {{ scenario.outcome }}</span>
        </div>
        <div v-else-if="footnote" class="mt-2 text-center text-[10px] italic" :class="t.footnote">{{ footnote }}</div>
      </div>
    </template>
  </div>
</template>
