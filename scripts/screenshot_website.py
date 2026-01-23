#!/usr/bin/env python3
"""
Website Screenshot Tool
Captures screenshots of company websites for article illustrations
"""

import sys
import os
from urllib.parse import urlparse

def screenshot_website(url, output_path):
    """
    Capture a screenshot of a website using playwright

    Args:
        url: Website URL to capture
        output_path: Path to save the screenshot
    """
    try:
        from playwright.sync_api import sync_playwright
    except ImportError:
        print("Error: playwright not installed")
        print("Install with: pip install playwright && playwright install chromium")
        sys.exit(1)

    print(f"📸 Capturing screenshot of {url}...")

    try:
        with sync_playwright() as p:
            # Launch browser
            browser = p.chromium.launch(headless=True)

            # Create new page with desktop viewport
            page = browser.new_page(viewport={'width': 1920, 'height': 1080})

            # Navigate to URL with timeout
            page.goto(url, timeout=30000, wait_until='networkidle')

            # Wait a bit for any animations
            page.wait_for_timeout(2000)

            # Take screenshot (not full page, just viewport)
            page.screenshot(path=output_path, type='png')

            browser.close()

        print(f"✅ Screenshot saved to: {output_path}")
        return True

    except Exception as e:
        print(f"❌ Error capturing screenshot: {e}")
        return False

def get_company_name_from_url(url):
    """Extract a simple company name from URL for filename"""
    parsed = urlparse(url)
    domain = parsed.netloc.replace('www.', '').split('.')[0]
    return domain

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python3 screenshot_website.py <url> [output_path]")
        print("Example: python3 screenshot_website.py https://www.maxlink.com.cn/")
        sys.exit(1)

    url = sys.argv[1]

    # Generate output path if not provided
    if len(sys.argv) >= 3:
        output_path = sys.argv[2]
    else:
        company = get_company_name_from_url(url)
        output_path = f"{company}-homepage.png"

    # Ensure output directory exists
    output_dir = os.path.dirname(output_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    screenshot_website(url, output_path)
