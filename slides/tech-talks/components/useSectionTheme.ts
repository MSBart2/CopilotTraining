// Section palette helper.
//
// Mirrors the color progression used by SectionOpenerSlide so that any
// content component can tint its CHROME (ambient bg, blur orb, header pill,
// divider) to match the deck section it appears in.
//
// Part 1 → cyan / blue / indigo
// Part 2 → blue / indigo / purple
// Part 3 → indigo / purple / pink
// Part 4 → purple / pink / rose
//
// Components that need section-aware NEUTRAL CARDS (TwoColPaired, ThreeColumn,
// FourCard, Code feature cards, etc.) also import the per-card palette below.
//
// Components must NOT override semantic colors (red=Before/Problem,
// green=After/Outcome, blue=Solution) using these arrays — those stay
// hardcoded inside each component.

import { computed, type ComputedRef } from 'vue'
import { isDark } from './useTheme'

export interface SectionChrome {
    ambientBg: string
    orb: string
    pill: string
    pillText: string
    divider: string
    accent: string  // headline accent text color
    h1: string      // gradient text for section title (SectionOpenerSlide)
    arrow: string   // terminal arrow color (SectionOpenerSlide)
}

export interface SectionCard {
    bg: string       // Tailwind class (used by FourCard, ThreeCol, TwoCol)
    border: string   // Tailwind class (used by FourCard, ThreeCol, TwoCol)
    bgColor: string       // CSS rgba value — used by FrameworkMappingRowsSlide via :style
    borderColor: string   // CSS rgba value — used by FrameworkMappingRowsSlide via :style
    title: string
    blurb: string
}

const DARK_CHROME: SectionChrome[] = [
    {
        ambientBg: 'from-cyan-900/25 via-blue-900/15 to-indigo-900/20',
        orb: 'from-cyan-500/10 via-blue-500/10 to-indigo-500/10',
        pill: 'from-cyan-600/40 to-blue-600/40 border-cyan-400/30',
        pillText: 'text-cyan-300',
        divider: 'via-cyan-400',
        accent: 'text-cyan-300',
        h1: 'from-cyan-400 via-blue-300 to-indigo-400',
        arrow: 'text-cyan-300',
    },
    {
        ambientBg: 'from-blue-900/25 via-indigo-900/15 to-purple-900/20',
        orb: 'from-blue-500/10 via-indigo-500/10 to-purple-500/10',
        pill: 'from-blue-600/40 to-indigo-600/40 border-blue-400/30',
        pillText: 'text-blue-300',
        divider: 'via-blue-400',
        accent: 'text-blue-300',
        h1: 'from-blue-400 via-indigo-300 to-purple-400',
        arrow: 'text-blue-300',
    },
    {
        ambientBg: 'from-indigo-900/25 via-purple-900/15 to-pink-900/20',
        orb: 'from-indigo-500/10 via-purple-500/10 to-pink-500/10',
        pill: 'from-indigo-600/40 to-purple-600/40 border-indigo-400/30',
        pillText: 'text-indigo-300',
        divider: 'via-indigo-400',
        accent: 'text-indigo-300',
        h1: 'from-indigo-400 via-purple-300 to-pink-400',
        arrow: 'text-indigo-300',
    },
    {
        ambientBg: 'from-purple-900/25 via-pink-900/15 to-rose-900/20',
        orb: 'from-purple-500/10 via-pink-500/10 to-rose-500/10',
        pill: 'from-purple-600/40 to-pink-600/40 border-purple-400/30',
        pillText: 'text-purple-300',
        divider: 'via-purple-400',
        accent: 'text-purple-300',
        h1: 'from-purple-400 via-pink-300 to-rose-400',
        arrow: 'text-purple-300',
    },
]

const LIGHT_CHROME: SectionChrome[] = [
    {
        ambientBg: 'from-cyan-100/40 via-blue-100/20 to-indigo-100/20',
        orb: 'from-cyan-200/30 via-blue-200/30 to-indigo-200/30',
        pill: 'from-cyan-500/20 to-blue-500/20 border-cyan-400/50',
        pillText: 'text-cyan-700',
        divider: 'via-cyan-500',
        accent: 'text-cyan-700',
        h1: 'from-cyan-600 via-blue-600 to-indigo-600',
        arrow: 'text-cyan-700',
    },
    {
        ambientBg: 'from-blue-100/40 via-indigo-100/20 to-purple-100/20',
        orb: 'from-blue-200/30 via-indigo-200/30 to-purple-200/30',
        pill: 'from-blue-500/20 to-indigo-500/20 border-blue-400/50',
        pillText: 'text-blue-700',
        divider: 'via-blue-500',
        accent: 'text-blue-700',
        h1: 'from-blue-600 via-indigo-600 to-purple-600',
        arrow: 'text-blue-700',
    },
    {
        ambientBg: 'from-indigo-100/40 via-purple-100/20 to-pink-100/20',
        orb: 'from-indigo-200/30 via-purple-200/30 to-pink-200/30',
        pill: 'from-indigo-500/20 to-purple-500/20 border-indigo-400/50',
        pillText: 'text-indigo-700',
        divider: 'via-indigo-500',
        accent: 'text-indigo-700',
        h1: 'from-indigo-600 via-purple-600 to-pink-600',
        arrow: 'text-indigo-700',
    },
    {
        ambientBg: 'from-purple-100/40 via-pink-100/20 to-rose-100/20',
        orb: 'from-purple-200/30 via-pink-200/30 to-rose-200/30',
        pill: 'from-purple-500/20 to-pink-500/20 border-purple-400/50',
        pillText: 'text-purple-700',
        divider: 'via-purple-500',
        accent: 'text-purple-700',
        h1: 'from-purple-600 via-pink-600 to-rose-600',
        arrow: 'text-purple-700',
    },
]

// Per-section card palettes. Each section provides 4 distinct card styles
// (used by FourCardGrid). Three-column components consume the first 3,
// two-column components consume the first 2.
// bgColor/borderColor use raw rgba so FrameworkMappingRowsSlide can apply them
// via :style — UnoCSS does not reliably scan .ts files, so dynamic class
// strings built here may not make it into the CSS bundle.
const DARK_CARDS: SectionCard[][] = [
    // Part 1: cyan → blue → indigo → violet
    [
        { bg: 'bg-cyan-900/30', border: 'border-cyan-500/30', bgColor: 'rgba(22,78,99,0.3)', borderColor: 'rgba(6,182,212,0.3)', title: 'text-cyan-300', blurb: 'text-cyan-100/70' },
        { bg: 'bg-blue-900/30', border: 'border-blue-500/30', bgColor: 'rgba(30,58,138,0.3)', borderColor: 'rgba(59,130,246,0.3)', title: 'text-blue-300', blurb: 'text-blue-100/70' },
        { bg: 'bg-indigo-900/30', border: 'border-indigo-500/30', bgColor: 'rgba(30,27,75,0.3)', borderColor: 'rgba(99,102,241,0.3)', title: 'text-indigo-300', blurb: 'text-indigo-100/70' },
        { bg: 'bg-violet-900/30', border: 'border-violet-500/30', bgColor: 'rgba(46,16,101,0.3)', borderColor: 'rgba(139,92,246,0.3)', title: 'text-violet-300', blurb: 'text-violet-100/70' },
    ],
    // Part 2: blue → indigo → violet → purple
    [
        { bg: 'bg-blue-900/30', border: 'border-blue-500/30', bgColor: 'rgba(30,58,138,0.3)', borderColor: 'rgba(59,130,246,0.3)', title: 'text-blue-300', blurb: 'text-blue-100/70' },
        { bg: 'bg-indigo-900/30', border: 'border-indigo-500/30', bgColor: 'rgba(30,27,75,0.3)', borderColor: 'rgba(99,102,241,0.3)', title: 'text-indigo-300', blurb: 'text-indigo-100/70' },
        { bg: 'bg-violet-900/30', border: 'border-violet-500/30', bgColor: 'rgba(46,16,101,0.3)', borderColor: 'rgba(139,92,246,0.3)', title: 'text-violet-300', blurb: 'text-violet-100/70' },
        { bg: 'bg-purple-900/30', border: 'border-purple-500/30', bgColor: 'rgba(59,7,100,0.3)', borderColor: 'rgba(168,85,247,0.3)', title: 'text-purple-300', blurb: 'text-purple-100/70' },
    ],
    // Part 3: indigo → violet → purple → pink
    [
        { bg: 'bg-indigo-900/30', border: 'border-indigo-500/30', bgColor: 'rgba(30,27,75,0.3)', borderColor: 'rgba(99,102,241,0.3)', title: 'text-indigo-300', blurb: 'text-indigo-100/70' },
        { bg: 'bg-violet-900/30', border: 'border-violet-500/30', bgColor: 'rgba(46,16,101,0.3)', borderColor: 'rgba(139,92,246,0.3)', title: 'text-violet-300', blurb: 'text-violet-100/70' },
        { bg: 'bg-purple-900/30', border: 'border-purple-500/30', bgColor: 'rgba(59,7,100,0.3)', borderColor: 'rgba(168,85,247,0.3)', title: 'text-purple-300', blurb: 'text-purple-100/70' },
        { bg: 'bg-pink-900/30', border: 'border-pink-500/30', bgColor: 'rgba(131,24,67,0.3)', borderColor: 'rgba(236,72,153,0.3)', title: 'text-pink-300', blurb: 'text-pink-100/70' },
    ],
    // Part 4: violet → purple → pink → rose
    [
        { bg: 'bg-violet-900/30', border: 'border-violet-500/30', bgColor: 'rgba(46,16,101,0.3)', borderColor: 'rgba(139,92,246,0.3)', title: 'text-violet-300', blurb: 'text-violet-100/70' },
        { bg: 'bg-purple-900/30', border: 'border-purple-500/30', bgColor: 'rgba(59,7,100,0.3)', borderColor: 'rgba(168,85,247,0.3)', title: 'text-purple-300', blurb: 'text-purple-100/70' },
        { bg: 'bg-pink-900/30', border: 'border-pink-500/30', bgColor: 'rgba(131,24,67,0.3)', borderColor: 'rgba(236,72,153,0.3)', title: 'text-pink-300', blurb: 'text-pink-100/70' },
        { bg: 'bg-rose-900/30', border: 'border-rose-500/30', bgColor: 'rgba(136,19,55,0.3)', borderColor: 'rgba(244,63,94,0.3)', title: 'text-rose-300', blurb: 'text-rose-100/70' },
    ],
]

const LIGHT_CARDS: SectionCard[][] = [
    // Part 1: cyan → blue → indigo → violet
    [
        { bg: 'bg-cyan-200', border: 'border-cyan-400', bgColor: 'rgba(165,243,252,1)', borderColor: 'rgb(34,211,238)', title: 'text-cyan-800', blurb: 'text-cyan-900' },
        { bg: 'bg-blue-200', border: 'border-blue-400', bgColor: 'rgba(191,219,254,1)', borderColor: 'rgb(96,165,250)', title: 'text-blue-800', blurb: 'text-blue-900' },
        { bg: 'bg-indigo-200', border: 'border-indigo-400', bgColor: 'rgba(199,210,254,1)', borderColor: 'rgb(129,140,248)', title: 'text-indigo-800', blurb: 'text-indigo-900' },
        { bg: 'bg-violet-200', border: 'border-violet-400', bgColor: 'rgba(221,214,254,1)', borderColor: 'rgb(167,139,250)', title: 'text-violet-800', blurb: 'text-violet-900' },
    ],
    // Part 2: blue → indigo → violet → purple
    [
        { bg: 'bg-blue-200', border: 'border-blue-400', bgColor: 'rgba(191,219,254,1)', borderColor: 'rgb(96,165,250)', title: 'text-blue-800', blurb: 'text-blue-900' },
        { bg: 'bg-indigo-200', border: 'border-indigo-400', bgColor: 'rgba(199,210,254,1)', borderColor: 'rgb(129,140,248)', title: 'text-indigo-800', blurb: 'text-indigo-900' },
        { bg: 'bg-violet-200', border: 'border-violet-400', bgColor: 'rgba(221,214,254,1)', borderColor: 'rgb(167,139,250)', title: 'text-violet-800', blurb: 'text-violet-900' },
        { bg: 'bg-purple-200', border: 'border-purple-400', bgColor: 'rgba(233,213,255,1)', borderColor: 'rgb(192,132,252)', title: 'text-purple-800', blurb: 'text-purple-900' },
    ],
    // Part 3: indigo → violet → purple → pink
    [
        { bg: 'bg-indigo-200', border: 'border-indigo-400', bgColor: 'rgba(199,210,254,1)', borderColor: 'rgb(129,140,248)', title: 'text-indigo-800', blurb: 'text-indigo-900' },
        { bg: 'bg-violet-200', border: 'border-violet-400', bgColor: 'rgba(221,214,254,1)', borderColor: 'rgb(167,139,250)', title: 'text-violet-800', blurb: 'text-violet-900' },
        { bg: 'bg-purple-200', border: 'border-purple-400', bgColor: 'rgba(233,213,255,1)', borderColor: 'rgb(192,132,252)', title: 'text-purple-800', blurb: 'text-purple-900' },
        { bg: 'bg-pink-200', border: 'border-pink-400', bgColor: 'rgba(251,207,232,1)', borderColor: 'rgb(244,114,182)', title: 'text-pink-800', blurb: 'text-pink-900' },
    ],
    // Part 4: violet → purple → pink → rose
    [
        { bg: 'bg-violet-200', border: 'border-violet-400', bgColor: 'rgba(221,214,254,1)', borderColor: 'rgb(167,139,250)', title: 'text-violet-800', blurb: 'text-violet-900' },
        { bg: 'bg-purple-200', border: 'border-purple-400', bgColor: 'rgba(233,213,255,1)', borderColor: 'rgb(192,132,252)', title: 'text-purple-800', blurb: 'text-purple-900' },
        { bg: 'bg-pink-200', border: 'border-pink-400', bgColor: 'rgba(251,207,232,1)', borderColor: 'rgb(244,114,182)', title: 'text-pink-800', blurb: 'text-pink-900' },
        { bg: 'bg-rose-200', border: 'border-rose-400', bgColor: 'rgba(254,205,211,1)', borderColor: 'rgb(251,113,133)', title: 'text-rose-800', blurb: 'text-rose-900' },
    ],
]

export function validatePartNumber(partNumber: number, componentName: string): void {
    if (partNumber < 1 || partNumber > 4 || !Number.isInteger(partNumber)) {
        throw new Error('[' + componentName + '] ❌ partNumber must be 1–4 (got ' + partNumber + ')')
    }
}

export function useSectionChrome(partNumber: () => number): ComputedRef<SectionChrome> {
    return computed(() => {
        const idx = Math.min(Math.max(partNumber() - 1, 0), 3)
        const chrome = (isDark.value ? DARK_CHROME : LIGHT_CHROME)[idx]
        return {
            ...chrome,
            ambientBg: isDark.value ? 'sv-slide-surface-dark' : 'sv-slide-surface-light',
            orb: 'sv-orb-muted',
            pill: `${chrome.pill} sv-section-kicker`,
        }
    })
}

export function useSectionCards(partNumber: () => number): ComputedRef<SectionCard[]> {
    return computed(() => {
        const idx = Math.min(Math.max(partNumber() - 1, 0), 3)
        const cards = (isDark.value ? DARK_CARDS : LIGHT_CARDS)[idx]
        return cards.map(card => ({
            ...card,
            bg: isDark.value ? 'sv-card-surface-dark' : 'sv-card-surface-light',
            bgColor: isDark.value ? 'rgba(15,23,42,0.78)' : 'rgba(255,255,255,0.94)',
        }))
    })
}
