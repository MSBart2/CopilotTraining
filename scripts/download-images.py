#!/usr/bin/env python3
"""
Download images from a source URL for tech-talk content.

This script extracts technical images (screenshots, diagrams, architecture images)
from a source URL and downloads them to a local directory with descriptive filenames.

Usage:
    python3 scripts/download-images.py <source_url> <output_dir> [--limit N] [--dry-run]

Example:
    python3 scripts/download-images.py https://code.visualstudio.com/updates/v1_109 tech-talks/copilot-updates/images --limit 7

Features:
- Extracts images from HTML pages
- Filters for technical content (avoids marketing/decorative images)
- Generates descriptive filenames from alt text or context
- Supports PNG, JPG, JPEG, SVG, GIF formats
- Downloads and saves images locally
- Provides summary report
"""

import argparse
import os
import re
import sys
from pathlib import Path
from urllib.parse import urljoin, urlparse
import requests
from html.parser import HTMLParser


class ImageExtractor(HTMLParser):
    """Extract images and their context from HTML."""
    
    def __init__(self, base_url):
        super().__init__()
        self.base_url = base_url
        self.images = []
        self.current_section = ""
        self.in_heading = False
        self.current_heading_text = ""
        
    def handle_starttag(self, tag, attrs):
        attrs_dict = dict(attrs)
        
        # Track section context (h1, h2, h3 for context)
        if tag in ['h1', 'h2', 'h3']:
            self.in_heading = True
            self.current_heading_text = ""
            
        # Extract image information
        if tag == 'img':
            src = attrs_dict.get('src', '')
            alt = attrs_dict.get('alt', '')
            title = attrs_dict.get('title', '')
            
            if src and self._is_technical_image(src, alt):
                full_url = urljoin(self.base_url, src)
                self.images.append({
                    'url': full_url,
                    'alt': alt,
                    'title': title,
                    'section': self.current_section,
                    'filename': self._generate_filename(src, alt, title)
                })
    
    def handle_data(self, data):
        # Capture heading text for context
        if self.in_heading:
            self.current_heading_text += data.strip()
    
    def handle_endtag(self, tag):
        if tag in ['h1', 'h2', 'h3']:
            self.current_section = self.current_heading_text
            self.in_heading = False
            self.current_heading_text = ""
    
    def _is_technical_image(self, src, alt):
        """Filter for technical images, avoid marketing/decorative content."""
        # Skip common marketing/decorative patterns
        skip_patterns = [
            r'logo',
            r'icon-',
            r'avatar',
            r'banner',
            r'hero',
            r'background',
            r'decoration',
            r'/social/',
            r'/marketing/',
            r'thumbnail-small'
        ]
        
        src_lower = src.lower()
        alt_lower = alt.lower()
        
        # Skip if matches marketing patterns
        for pattern in skip_patterns:
            if re.search(pattern, src_lower) or re.search(pattern, alt_lower):
                return False
        
        # Prioritize technical images
        technical_patterns = [
            r'screenshot',
            r'diagram',
            r'architecture',
            r'flow',
            r'example',
            r'demo',
            r'code',
            r'terminal',
            r'editor',
            r'command',
            r'workflow'
        ]
        
        for pattern in technical_patterns:
            if re.search(pattern, src_lower) or re.search(pattern, alt_lower):
                return True
        
        # Include if it has descriptive alt text (likely technical)
        if len(alt) > 20:  # Substantial alt text
            return True
        
        # Include images from certain paths
        if '/docs/' in src_lower or '/images/' in src_lower or '/assets/' in src_lower:
            return True
        
        return False
    
    def _generate_filename(self, src, alt, title):
        """Generate descriptive filename from image metadata."""
        # Try to use alt text, then title, then URL path
        name_source = alt or title or os.path.basename(urlparse(src).path)
        
        # Clean up the text for filename
        name = re.sub(r'[^\w\s-]', '', name_source.lower())
        name = re.sub(r'[-\s]+', '-', name).strip('-')
        
        # Limit length
        if len(name) > 50:
            name = name[:50].rsplit('-', 1)[0]
        
        # Get extension from original URL
        ext = os.path.splitext(urlparse(src).path)[1]
        if not ext or ext not in ['.png', '.jpg', '.jpeg', '.svg', '.gif']:
            ext = '.png'  # Default
        
        # Ensure unique-ish name
        if not name or len(name) < 3:
            name = os.path.splitext(os.path.basename(urlparse(src).path))[0]
        
        return f"{name}{ext}"


def download_images(source_url, output_dir, limit=None, dry_run=False):
    """
    Download technical images from a source URL.
    
    Args:
        source_url: URL to extract images from
        output_dir: Directory to save images
        limit: Maximum number of images to download (default: no limit)
        dry_run: If True, only show what would be downloaded
    
    Returns:
        List of downloaded image info
    """
    print(f"🔍 Extracting images from: {source_url}")
    
    # Fetch the HTML content
    try:
        response = requests.get(source_url, timeout=30)
        response.raise_for_status()
        html_content = response.text
    except requests.RequestException as e:
        print(f"❌ Error fetching URL: {e}")
        return []
    
    # Extract images
    extractor = ImageExtractor(source_url)
    extractor.feed(html_content)
    
    images = extractor.images
    print(f"✅ Found {len(images)} technical images")
    
    if not images:
        print("ℹ️  No technical images found. The page may not contain screenshots or diagrams.")
        return []
    
    # Apply limit
    if limit and len(images) > limit:
        print(f"📊 Limiting to top {limit} images")
        images = images[:limit]
    
    # Create output directory
    if not dry_run:
        os.makedirs(output_dir, exist_ok=True)
        print(f"📁 Output directory: {output_dir}")
    
    # Download images
    downloaded = []
    for i, img in enumerate(images, 1):
        print(f"\n[{i}/{len(images)}] {img['filename']}")
        print(f"  URL: {img['url']}")
        if img['alt']:
            print(f"  Alt: {img['alt']}")
        if img['section']:
            print(f"  Section: {img['section']}")
        
        if dry_run:
            print("  [DRY RUN - would download]")
            downloaded.append(img)
            continue
        
        # Download the image
        try:
            img_response = requests.get(img['url'], timeout=30)
            img_response.raise_for_status()
            
            # Handle potential filename collisions
            output_path = Path(output_dir) / img['filename']
            counter = 1
            while output_path.exists():
                name, ext = os.path.splitext(img['filename'])
                output_path = Path(output_dir) / f"{name}-{counter}{ext}"
                counter += 1
            
            # Save the image
            with open(output_path, 'wb') as f:
                f.write(img_response.content)
            
            img['local_path'] = str(output_path)
            downloaded.append(img)
            print(f"  ✅ Saved to: {output_path}")
            
        except requests.RequestException as e:
            print(f"  ❌ Error downloading: {e}")
    
    return downloaded


def generate_markdown_report(images, output_dir):
    """Generate markdown snippet for including images in README."""
    if not images:
        return ""
    
    lines = [
        "## Visual Assets",
        "",
        "The following images illustrate key concepts:",
        ""
    ]
    
    for img in images:
        # For tech-talks, README.md is in tech-talks/[name]/README.md
        # and images are in tech-talks/[name]/images/[file]
        # So the markdown path is images/[filename]
        if 'local_path' in img:
            # Extract just the images/filename.png part
            filename = os.path.basename(img['local_path'])
            rel_path = f"images/{filename}"
        else:
            rel_path = f"images/{img['filename']}"
        
        # Use alt text or generate caption
        caption = img['alt'] or img['title'] or img['filename'].replace('-', ' ').title()
        
        lines.append(f"![{caption}]({rel_path})")
        lines.append(f"*{caption}*")
        lines.append("")
    
    return "\n".join(lines)


def main():
    parser = argparse.ArgumentParser(
        description='Download technical images from a source URL for tech-talk content',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
  # Download up to 7 images from VS Code updates page
  python3 scripts/download-images.py https://code.visualstudio.com/updates/v1_109 tech-talks/copilot-updates/images --limit 7
  
  # Dry run to see what would be downloaded
  python3 scripts/download-images.py https://github.blog/copilot-announcement tech-talks/copilot-new/images --dry-run
  
  # Download all technical images
  python3 scripts/download-images.py https://docs.github.com/copilot/features tech-talks/copilot-features/images
        """
    )
    
    parser.add_argument('source_url', help='URL to extract images from')
    parser.add_argument('output_dir', help='Directory to save images')
    parser.add_argument('--limit', type=int, default=7, help='Maximum number of images to download (default: 7)')
    parser.add_argument('--dry-run', action='store_true', help='Show what would be downloaded without downloading')
    
    args = parser.parse_args()
    
    # Download images
    downloaded = download_images(args.source_url, args.output_dir, args.limit, args.dry_run)
    
    # Generate summary
    print("\n" + "="*60)
    print(f"📊 Summary: {len(downloaded)}/{args.limit} images processed")
    
    if not args.dry_run and downloaded:
        print("\n📝 Markdown snippet for README.md:")
        print("="*60)
        print(generate_markdown_report(downloaded, args.output_dir))
        print("="*60)
        print(f"\n✅ Images saved to: {args.output_dir}")
        print("💡 Copy the markdown snippet above into your tech-talk README.md")
    
    return 0 if downloaded else 1


if __name__ == '__main__':
    sys.exit(main())
