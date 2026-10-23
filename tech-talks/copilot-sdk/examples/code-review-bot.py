#!/usr/bin/env python3
"""
Code Review Assistant using GitHub Copilot SDK

Pre-reviews pull requests against team coding standards, identifying
common issues before human review. Can post comments directly to GitHub.

Usage:
    # Review local changes
    python code-review-bot.py --file path/to/file.py
    
    # Review PR from GitHub
    python code-review-bot.py --pr-number 123 --repo owner/repo
    
    # Use custom standards file
    python code-review-bot.py --standards ./team-standards.md --pr-number 123
"""

import argparse
import sys
import os
import subprocess
from github_copilot_sdk import CopilotClient


DEFAULT_STANDARDS = """
# Code Review Standards

## Security
- All database queries must be parameterized (SQL injection prevention)
- User input must be validated before processing
- Secrets must not be hardcoded in code
- Authentication checks required for sensitive operations

## Error Handling
- Async functions must have try-catch blocks
- Handle all error cases explicitly
- Keep sensitive information out of error messages

## Code Quality
- Give each function a single responsibility
- Name magic numbers as constants
- Null/undefined checks required for optional parameters
- No commented-out code in final PR

## Testing
- New features require test coverage
- Tests cover edge cases (null, empty, boundary values)
- Test names are descriptive

## Performance
- Avoid N+1 queries in database operations
- Use appropriate data structures for the use case
- Consider memory implications of large data operations
"""


def load_standards(filepath):
    """Load team coding standards."""
    if filepath and os.path.exists(filepath):
        with open(filepath, 'r') as f:
            return f.read()
    return DEFAULT_STANDARDS


def get_file_content(filepath):
    """Read file content for review."""
    with open(filepath, 'r') as f:
        return f.read()


def get_pr_diff(pr_number, repo):
    """Fetch PR diff from GitHub."""
    try:
        # Requires gh CLI to be installed and authenticated
        result = subprocess.run(
            ['gh', 'pr', 'diff', str(pr_number), '-R', repo],
            capture_output=True,
            text=True,
            check=True
        )
        return result.stdout
    except subprocess.CalledProcessError as e:
        print(f"Error fetching PR diff: {e}", file=sys.stderr)
        print("Make sure 'gh' CLI is installed and authenticated", file=sys.stderr)
        sys.exit(1)


def review_code(code_content, standards, context=""):
    """Use Copilot SDK to review code against standards."""
    client = CopilotClient()
    
    prompt = f"""
You are a senior code reviewer. Review the following code against our team standards.

{context}

Team Coding Standards:
{standards}

Code to Review:
{code_content}

Provide review feedback including:

## Critical Issues 🔴
Issues that MUST be fixed (security, bugs, data loss risks)
- Specific line numbers or code snippets
- Why it's critical
- Suggested fix

## Important Issues 🟡
Issues that SHOULD be fixed (performance, maintainability, standards)
- Specific line numbers or code snippets
- Why it matters
- Suggested improvement

## Suggestions 🟢
Nice-to-have improvements (style, optimization, best practices)
- What could be better
- Optional improvements

## Positive Observations ✅
Things done well that demonstrate good practices

For each issue:
- Be specific about location (line numbers if available)
- Explain WHY it's an issue, not just WHAT
- Provide actionable suggestions
- Include code examples for fixes when helpful

Format as markdown suitable for GitHub PR comments.
"""
    
    response = client.chat(prompt)
    return response.text


def post_github_comment(pr_number, repo, comment):
    """Post review comment to GitHub PR."""
    try:
        # Create a temporary file with the comment
        import tempfile
        with tempfile.NamedTemporaryFile(mode='w', suffix='.md', delete=False) as f:
            f.write(comment)
            temp_file = f.name
        
        subprocess.run(
            ['gh', 'pr', 'comment', str(pr_number), '-R', repo, '-F', temp_file],
            check=True
        )
        
        os.unlink(temp_file)
        print(f"✅ Comment posted to PR #{pr_number}", file=sys.stderr)
    except subprocess.CalledProcessError as e:
        print(f"Error posting comment: {e}", file=sys.stderr)
        print("Make sure 'gh' CLI is installed and authenticated", file=sys.stderr)


def main():
    parser = argparse.ArgumentParser(
        description='Code review assistant using Copilot SDK'
    )
    
    # Input source
    parser.add_argument('--file', help='File to review')
    parser.add_argument('--pr-number', type=int, help='GitHub PR number to review')
    parser.add_argument('--repo', help='GitHub repository (format: owner/repo)')
    
    # Configuration
    parser.add_argument('--standards', help='Path to team standards file')
    parser.add_argument('--output', help='Output file (default: stdout)')
    parser.add_argument('--post-comment', action='store_true', 
                        help='Post review as GitHub comment (requires --pr-number and --repo)')
    
    args = parser.parse_args()
    
    # Validation
    if not args.file and not args.pr_number:
        parser.error("Either --file or --pr-number must be provided")
    
    if args.pr_number and not args.repo:
        parser.error("--repo required when using --pr-number")
    
    if args.post_comment and not (args.pr_number and args.repo):
        parser.error("--post-comment requires --pr-number and --repo")
    
    # Load standards
    print(f"📋 Loading coding standards...", file=sys.stderr)
    standards = load_standards(args.standards)
    
    # Get code to review
    if args.file:
        print(f"📄 Reading file: {args.file}...", file=sys.stderr)
        code_content = get_file_content(args.file)
        context = f"Reviewing file: {args.file}"
    else:
        print(f"🔍 Fetching PR #{args.pr_number} from {args.repo}...", file=sys.stderr)
        code_content = get_pr_diff(args.pr_number, args.repo)
        context = f"Reviewing PR #{args.pr_number} in {args.repo}"
    
    # Perform review
    print(f"🤖 Analyzing code with Copilot SDK...", file=sys.stderr)
    review = review_code(code_content, standards, context)
    
    # Output results
    if args.post_comment:
        post_github_comment(args.pr_number, args.repo, review)
    
    if args.output:
        with open(args.output, 'w') as f:
            f.write(review)
        print(f"✅ Review written to {args.output}", file=sys.stderr)
    else:
        print("\n" + "="*80 + "\n", file=sys.stderr)
        print(review)
        print("\n" + "="*80 + "\n", file=sys.stderr)


if __name__ == '__main__':
    main()
