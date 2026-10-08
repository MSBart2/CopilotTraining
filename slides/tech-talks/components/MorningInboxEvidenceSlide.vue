<script setup>
import { computed } from 'vue'
import { isDark } from './useTheme'

const props = defineProps({
  focus: { type: Boolean, default: false },
})

const columns = [
  { label: 'ISSUE · HUMAN', detail: 'Approve scope' },
  { label: 'DRAFT · AGENT', detail: 'Offer bounded work' },
  { label: 'PR · INDEPENDENT', detail: 'Review and quality' },
  { label: 'MERGE · HUMAN', detail: 'Decide with evidence' },
]

const generalRows = [
  {
    issue: 'WHO',
    status: 'ACTORS',
    cells: [
      { title: 'Developer', detail: 'Names the task and authority' },
      { title: 'Workflow agent', detail: 'Implements approved scope' },
      { title: 'Copilot + quality', detail: 'Advice, fix, or gate' },
      { title: 'Reviewer', detail: 'Accepts or holds the draft' },
    ],
  },
  {
    issue: 'WHAT',
    status: 'HANDOFF',
    cells: [
      { title: 'Runnable plan', detail: 'Behavior, tests, exclusions' },
      { title: 'Draft diff', detail: 'One offered change' },
      { title: 'Head-specific proof', detail: 'CI, review, quality gate' },
      { title: 'Disposition', detail: 'Accept, revise, or hold' },
    ],
  },
  {
    issue: 'WHERE',
    status: 'EVIDENCE',
    cells: [
      { title: 'Issue', detail: 'Approval and scope' },
      { title: 'Run + PR', detail: 'Actor, code, head SHA' },
      { title: 'Checks + threads', detail: 'Ruleset enforces the bar' },
      { title: 'PR decision', detail: 'Owner and recovery path' },
    ],
  },
]

const observedRow = {
  issue: 'FANHUB',
  status: 'FOUR PRs',
  cells: [
    { title: '#110: approved', detail: 'Human corrects plan and authorizes work' },
    { title: '#193: draft', detail: 'Agent moves two CSS rules; build passes' },
    { title: '#198 / #201', detail: 'Review catches Retry; Autofix corrects catch' },
    { title: 'No auto-merge', detail: '#199 gate clears; a person still decides' },
  ],
}

const rows = computed(() => props.focus ? [observedRow] : generalRows)

const t = computed(() => isDark.value ? {
  title: 'text-white',
  text: 'text-slate-300',
  muted: 'text-slate-400',
  header: 'bg-slate-900/70 border-slate-700',
  cell: 'bg-slate-900/50 border-slate-700/60',
  active: 'bg-cyan-950/60 border-cyan-400/70',
  candidate: 'bg-slate-900/40 border-slate-700/50',
  proof: 'bg-indigo-950/70 border-indigo-400/70',
} : {
  title: 'text-slate-900',
  text: 'text-slate-700',
  muted: 'text-slate-600',
  header: 'bg-white border-slate-300',
  cell: 'bg-white border-slate-300',
  active: 'bg-cyan-50 border-cyan-500',
  candidate: 'bg-slate-100 border-slate-300',
  proof: 'bg-indigo-50 border-indigo-500',
})
</script>

<template>
  <div class="h-full flex flex-col relative overflow-hidden px-12">
    <div class="absolute inset-0 bg-gradient-to-br from-slate-900 to-slate-950"></div>
    <div class="relative z-10 flex items-center gap-3 mb-2">
      <span class="px-4 py-1 rounded-full border border-cyan-500/40 bg-cyan-950/50 text-cyan-300 text-xs font-semibold tracking-wide">
        🧭 FROM ISSUE TO MERGE DECISION
      </span>
      <div class="flex-1 h-px bg-cyan-500/30"></div>
      <div class="flex items-center gap-2">
        <div class="w-2 h-2 rounded-full" :class="focus ? 'bg-white/20' : 'bg-cyan-400 shadow-lg shadow-cyan-500/50'"></div>
        <div class="w-2 h-2 rounded-full" :class="focus ? 'bg-cyan-400 shadow-lg shadow-cyan-500/50' : 'bg-white/20'"></div>
        <span class="text-xs ml-1" :class="t.muted">{{ focus ? '2' : '1' }} of 2</span>
      </div>
    </div>

    <h2 class="relative z-10 text-lg font-bold mb-1" :class="t.title">
      {{ focus ? 'Four PRs Prove Different Parts of the Delivery Loop' : 'Who Acts, What Runs, and Who Decides?' }}
    </h2>
    <p class="relative z-10 text-xs mb-2" :class="t.text">
      {{ focus ? 'FanHub examples are separate PRs; no single draft completed all four paths.' : 'An approved request, a draft, and independent signals make the merge decision inspectable.' }}
    </p>

    <div class="relative z-10 grid grid-cols-[8.5rem_repeat(4,minmax(0,1fr))] gap-2 mb-2">
      <div class="text-xs font-semibold self-end pb-2" :class="t.muted">{{ focus ? 'DISTINCT ↓' : 'DECISIONS ↓' }}</div>
      <div v-for="column in columns" :key="column.label" class="p-2 rounded-lg border text-left" :class="t.header">
        <div class="text-xs font-bold text-cyan-300">{{ column.label }}</div>
        <div class="text-[0.65rem]" :class="t.muted">{{ column.detail }}</div>
      </div>
    </div>

    <div v-for="(row, rowIndex) in rows" :key="row.issue"
      class="relative z-10 grid grid-cols-[8.5rem_repeat(4,minmax(0,1fr))] gap-2 mb-2"
      :class="rowIndex === 0 ? 'min-h-[5rem]' : 'min-h-[3rem]'"
    >
      <div class="p-3 rounded-lg border flex flex-col justify-center" :class="rowIndex === 0 ? t.active : t.candidate">
        <div class="text-base font-bold" :class="t.title">{{ row.issue }}</div>
        <div class="text-[0.65rem] font-semibold" :class="rowIndex === 0 ? 'text-cyan-300' : t.muted">{{ row.status }}</div>
      </div>
      <div v-for="(cell, cellIndex) in row.cells" :key="cell.title"
        class="p-3 rounded-lg border flex flex-col justify-center text-left"
        :class="rowIndex === 0 && focus ? t.active : t.cell"
      >
        <div v-if="focus && rowIndex === 0" class="text-xs font-bold text-cyan-400 mb-1">
          {{ cellIndex + 1 }} →
        </div>
        <div class="text-sm font-bold mb-1" :class="t.title">{{ cell.title }}</div>
        <div class="text-[0.7rem] leading-snug" :class="t.text">{{ cell.detail }}</div>
      </div>
    </div>

    <div v-if="focus" class="relative z-10 p-3 mt-2 rounded-lg border flex items-center gap-4" :class="t.proof">
      <span class="text-xs font-bold shrink-0 text-indigo-300">PROVENANCE MATTERS</span>
      <span class="text-xs" :class="t.title">
        #193 is agent delivery; #198 is review; #199 is an enforced coverage gate; #201 is human-accepted Autofix.
      </span>
    </div>
  </div>
</template>
