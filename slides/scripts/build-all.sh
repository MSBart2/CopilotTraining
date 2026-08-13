#!/bin/bash
set -e

# Build script for all Slidev presentations
# This script builds each .md file in the slides subdirectories
# Usage: build-all.sh [-v|--verbose] [--folder FOLDER] [--deck DECK]
#   --folder: optional category to build (workshop, tech-talks, exec-talks)
#   --deck:   optional specific deck name; auto-detects category
#   -v|--verbose: enable verbose output
#   Examples:
#     build-all.sh                              # build all categories
#     build-all.sh --folder exec-talks          # build only exec-talks
#     build-all.sh --deck copilot-cli           # build only copilot-cli (auto-detect folder)
#     build-all.sh --deck copilot-cli -v        # build with verbose output
#     build-all.sh -v --folder tech-talks       # build only tech-talks (verbose)

VERBOSE=false
FOLDER=""
DECK=""

# Parse arguments
while [[ $# -gt 0 ]]; do
    case "$1" in
        -v|--verbose)
            VERBOSE=true
            shift
            ;;
        --folder)
            FOLDER="$2"
            shift 2
            ;;
        --deck)
            DECK="$2"
            shift 2
            ;;
        *)
            echo "❌ Unknown option: $1"
            exit 1
            ;;
    esac
done

# If --deck is specified, auto-detect its category
if [[ -n "$DECK" ]]; then
    if [[ -f "$(dirname "${BASH_SOURCE[0]}")/../workshop/${DECK}.md" ]]; then
        FOLDER="workshop"
    elif [[ -f "$(dirname "${BASH_SOURCE[0]}")/../tech-talks/${DECK}.md" ]]; then
        FOLDER="tech-talks"
    elif [[ -f "$(dirname "${BASH_SOURCE[0]}")/../exec-talks/${DECK}.md" ]]; then
        FOLDER="exec-talks"
    else
        echo "❌ Deck not found: ${DECK} (searched in workshop, tech-talks, exec-talks)"
        exit 1
    fi
fi

# Validate folder if specified
if [[ -n "$FOLDER" && "$FOLDER" != "workshop" && "$FOLDER" != "tech-talks" && "$FOLDER" != "exec-talks" ]]; then
    echo "❌ Unknown folder: $FOLDER"
    echo "   Valid options: workshop, tech-talks, exec-talks"
    exit 1
fi

START_TIME=$(date +%s)
SLIDES_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
OUTPUT_DIR="${SLIDES_DIR}/dist"

if [[ -n "$DECK" ]]; then
    echo "🚀 Building single deck: ${DECK}..."
elif [[ -n "$FOLDER" ]]; then
    echo "🚀 Building ${FOLDER} Slidev presentations..."
else
    echo "🚀 Building all Slidev presentations..."
fi
echo "📁 Slides directory: ${SLIDES_DIR}"
echo "📦 Output directory: ${OUTPUT_DIR}"
if $VERBOSE; then
    echo "📢 Verbose mode enabled"
fi
echo ""

# Create output directory structure
mkdir -p "${OUTPUT_DIR}/workshop"
mkdir -p "${OUTPUT_DIR}/tech-talks"
mkdir -p "${OUTPUT_DIR}/exec-talks"

TOTAL_BUILT=0

# Helper function to build a slide
build_slide() {
    local CATEGORY=$1
    local BASENAME=$2
    local SLIDE_START=$(date +%s)

    if $VERBOSE; then
        echo "   🔨 ${CATEGORY}/${BASENAME}..."
        cd "${SLIDES_DIR}"
        npx slidev build "${CATEGORY}/${BASENAME}.md" \
            --base "/CopilotTraining/${CATEGORY}/${BASENAME}/" \
            --out "${OUTPUT_DIR}/${CATEGORY}/${BASENAME}" 2>&1 | sed 's/^/      /'
        local SLIDE_END=$(date +%s)
        local ELAPSED=$((SLIDE_END - SLIDE_START))
        echo "   ✅ ${CATEGORY}/${BASENAME} built (${ELAPSED}s)"
    else
        printf "   🔨 %s/%s... " "${CATEGORY}" "${BASENAME}"
        cd "${SLIDES_DIR}"
        if npx slidev build "${CATEGORY}/${BASENAME}.md" \
            --base "/CopilotTraining/${CATEGORY}/${BASENAME}/" \
            --out "${OUTPUT_DIR}/${CATEGORY}/${BASENAME}" > /dev/null 2>&1; then
            local SLIDE_END=$(date +%s)
            local ELAPSED=$((SLIDE_END - SLIDE_START))
            echo "✅ ${ELAPSED}s"
        else
            echo "❌ (run with -v for details)"
        fi
    fi
}

TOTAL_SKIPPED=0

# Helper function to check if a slide is archived
is_archived() {
    local FILE=$1
    # Check first 20 lines of frontmatter for status: archived
    head -20 "$FILE" | grep -q '^status: archived$'
}

# Build workshop slides
if [[ -z "$FOLDER" || "$FOLDER" == "workshop" ]]; then
    echo "📚 Building workshop slides..."
    for SLIDE_FILE in "${SLIDES_DIR}"/workshop/*.md; do
        if [ -f "$SLIDE_FILE" ]; then
            BASENAME=$(basename "$SLIDE_FILE" .md)
            if [ "$BASENAME" = "template" ]; then
                continue
            fi
            if is_archived "$SLIDE_FILE"; then
                echo "   ⏭️  Skipping archived: workshop/${BASENAME}"
                TOTAL_SKIPPED=$((TOTAL_SKIPPED + 1))
                continue
            fi
            build_slide "workshop" "${BASENAME}"
            TOTAL_BUILT=$((TOTAL_BUILT + 1))
        fi
    done
    echo ""
fi

# Build tech-talks slides
if [[ -z "$FOLDER" || "$FOLDER" == "tech-talks" ]]; then
    echo "🔬 Building tech-talks slides..."
    for SLIDE_FILE in "${SLIDES_DIR}"/tech-talks/*.md; do
        if [ -f "$SLIDE_FILE" ]; then
            BASENAME=$(basename "$SLIDE_FILE" .md)
            if [ "$BASENAME" = "template" ]; then
                continue
            fi
            if is_archived "$SLIDE_FILE"; then
                echo "   ⏭️  Skipping archived: tech-talks/${BASENAME}"
                TOTAL_SKIPPED=$((TOTAL_SKIPPED + 1))
                continue
            fi
            build_slide "tech-talks" "${BASENAME}"
            TOTAL_BUILT=$((TOTAL_BUILT + 1))
        fi
    done
    echo ""
fi

# Build exec-talks slides
if [[ -z "$FOLDER" || "$FOLDER" == "exec-talks" ]]; then
    echo "💼 Building exec-talks slides..."
    for SLIDE_FILE in "${SLIDES_DIR}"/exec-talks/*.md; do
        if [ -f "$SLIDE_FILE" ]; then
            BASENAME=$(basename "$SLIDE_FILE" .md)
            if [ "$BASENAME" = "template" ]; then
                continue
            fi
            if is_archived "$SLIDE_FILE"; then
                echo "   ⏭️  Skipping archived: exec-talks/${BASENAME}"
                TOTAL_SKIPPED=$((TOTAL_SKIPPED + 1))
                continue
            fi
            build_slide "exec-talks" "${BASENAME}"
            TOTAL_BUILT=$((TOTAL_BUILT + 1))
        fi
    done
    echo ""
fi

# Copy index.html and 404.html to dist root
echo "📄 Copying index-custom.html and 404.html to dist root..."
cp "${SLIDES_DIR}/index-custom.html" "${OUTPUT_DIR}/index.html"
cp "${SLIDES_DIR}/404.html" "${OUTPUT_DIR}/404.html"

# Copy pre-built agenda/PDF companions only — never generate in CI/build
echo "📎 Copying companion agenda/PDF artifacts into dist..."
(cd "${SLIDES_DIR}" && node scripts/copy-companions.mjs && node scripts/verify-companions-dist.mjs)

END_TIME=$(date +%s)
TOTAL_ELAPSED=$((END_TIME - START_TIME))
MINUTES=$((TOTAL_ELAPSED / 60))
SECONDS=$((TOTAL_ELAPSED % 60))

echo ""
echo "✨ ${TOTAL_BUILT} presentations built, ${TOTAL_SKIPPED} archived skipped."
if [ $MINUTES -gt 0 ]; then
    echo "⏱️  Total time: ${MINUTES}m ${SECONDS}s"
else
    echo "⏱️  Total time: ${TOTAL_ELAPSED}s"
fi
echo "📦 Output location: ${OUTPUT_DIR}"
echo ""
echo "To preview locally, run: cd dist && python3 -m http.server 8080"