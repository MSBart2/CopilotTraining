#!/usr/bin/env python3
"""
Test Report Analyzer using GitHub Copilot SDK

Analyzes test failure reports to identify flaky tests, suggest root causes,
and provide actionable recommendations for fixing issues.

Supports: JUnit XML, Jest JSON, pytest JSON, and generic test output

Usage:
    python test-analyzer.py test-report.json
    python test-analyzer.py --format junit test-results.xml
    python test-analyzer.py --history-dir ./test-history test-report.json
"""

import argparse
import json
import sys
import os
from pathlib import Path
from github_copilot_sdk import CopilotClient


def load_test_report(filepath, format_type='auto'):
    """Load test report from file."""
    with open(filepath, 'r') as f:
        content = f.read()
    
    if format_type == 'json' or (format_type == 'auto' and filepath.endswith('.json')):
        return json.loads(content)
    else:
        # For XML or text formats, return raw content
        return content


def load_historical_failures(history_dir):
    """Load previous test failure data for pattern detection."""
    if not history_dir or not os.path.exists(history_dir):
        return None
    
    history = []
    for file in Path(history_dir).glob('*.json'):
        with open(file, 'r') as f:
            history.append(json.load(f))
    
    return history if history else None


def analyze_test_report(report_data, historical_data=None):
    """Use Copilot SDK to analyze test failures."""
    client = CopilotClient()
    
    history_context = ""
    if historical_data:
        history_context = f"""
Historical failure data available for cross-build analysis:
{json.dumps(historical_data, indent=2)[:2000]}  # Truncated for brevity
"""
    
    prompt = f"""
Analyze this test report and provide detailed diagnostics:

Test Report:
{json.dumps(report_data, indent=2) if isinstance(report_data, dict) else report_data}

{history_context}

Provide analysis including:

## 1. Failure Summary
- Total tests run, passed, failed, skipped
- Failure rate and trends (if historical data available)

## 2. Root Cause Analysis
For each failure, identify:
- Most likely root cause (with confidence score)
- Whether it's a real bug, flaky test, or infrastructure issue
- Specific code locations to investigate

## 3. Flaky Test Detection
Identify tests that may be flaky based on:
- Intermittent failures in history
- Timing-related failures (timeouts, race conditions)
- Error patterns suggesting non-determinism

## 4. Recommendations
- Immediate fixes for high-confidence issues
- Tests to quarantine
- Infrastructure improvements needed
- Code patterns to investigate

## 5. Priority Classification
Classify each failure as:
- 🔴 Critical: Blocks deployment, needs immediate fix
- 🟡 Medium: Fix soon, may impact users
- 🟢 Low: Flaky test or minor issue, can defer

Format as markdown with actionable items.
"""
    
    response = client.chat(prompt)
    return response.text


def save_to_history(report_data, history_dir):
    """Save current report to history for future pattern detection."""
    if not history_dir:
        return
    
    os.makedirs(history_dir, exist_ok=True)
    
    from datetime import datetime
    timestamp = datetime.now().strftime('%Y%m%d_%H%M%S')
    filepath = os.path.join(history_dir, f'test-report-{timestamp}.json')
    
    with open(filepath, 'w') as f:
        json.dump(report_data if isinstance(report_data, dict) else {'raw': str(report_data)}, f, indent=2)
    
    print(f"💾 Saved to history: {filepath}", file=sys.stderr)


def main():
    parser = argparse.ArgumentParser(
        description='Analyze test reports using Copilot SDK'
    )
    parser.add_argument('report', help='Path to test report file')
    parser.add_argument('--format', choices=['auto', 'json', 'xml', 'text'], 
                        default='auto', help='Report format (default: auto-detect)')
    parser.add_argument('--history-dir', help='Directory to store/read historical test data')
    parser.add_argument('--output', help='Output file (default: stdout)')
    
    args = parser.parse_args()
    
    print(f"📊 Loading test report: {args.report}...", file=sys.stderr)
    report_data = load_test_report(args.report, args.format)
    
    print(f"🔍 Loading historical data...", file=sys.stderr)
    historical_data = load_historical_failures(args.history_dir)
    
    print(f"🤖 Analyzing failures with Copilot SDK...", file=sys.stderr)
    analysis = analyze_test_report(report_data, historical_data)
    
    # Save to history for future analysis
    if args.history_dir:
        save_to_history(report_data, args.history_dir)
    
    if args.output:
        with open(args.output, 'w') as f:
            f.write(analysis)
        print(f"✅ Analysis written to {args.output}", file=sys.stderr)
    else:
        print("\n" + "="*80 + "\n", file=sys.stderr)
        print(analysis)
        print("\n" + "="*80 + "\n", file=sys.stderr)


if __name__ == '__main__':
    main()
