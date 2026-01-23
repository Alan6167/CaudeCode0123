#!/usr/bin/env python3
"""
Batch screenshot capture for article companies
Captures screenshots for all companies mentioned in an article
"""

import os
import sys

# Import the screenshot function
sys.path.insert(0, os.path.dirname(__file__))
from screenshot_website import screenshot_website

# Company websites for Best Tumbler Manufacturers article
COMPANIES = [
    {
        'name': 'maxlink',
        'display': 'Ningbo Maxlink (Syloon Group)',
        'url': 'https://www.maxlink.com.cn/'
    },
    {
        'name': 'everich',
        'display': 'Everich Drinkware',
        'url': 'https://www.everich.com/'
    },
    {
        'name': 'haers',
        'display': 'Haers',
        'url': 'https://www.haers.com/'
    },
    {
        'name': 'kingstar',
        'display': 'KingStar Industries',
        'url': 'https://www.waterbottle.tech/'
    },
    {
        'name': 'ansune',
        'display': 'Ansheng (Ansune)',
        'url': 'https://www.ansune.com/'
    },
    {
        'name': 'cayi',
        'display': 'Zhejiang Cayi',
        'url': 'https://en.cayigroup.com/'
    },
    {
        'name': 'fuguang',
        'display': 'Fuguang Drinkware',
        'url': 'https://www.fgaofficial.com/'
    },
    {
        'name': 'inoxicon',
        'display': 'Inoxicon',
        'url': 'https://inoxiconkitchen.com/'
    },
    {
        'name': 'steelhydro',
        'display': 'Steelhydro',
        'url': 'https://steelhydro.com/'
    }
]

def capture_all_screenshots(output_dir):
    """Capture screenshots for all companies"""

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    print(f"🎯 Capturing screenshots for {len(COMPANIES)} companies...")
    print(f"📁 Output directory: {output_dir}\n")

    success_count = 0
    failed = []

    for i, company in enumerate(COMPANIES, 1):
        print(f"[{i}/{len(COMPANIES)}] {company['display']}")

        output_path = os.path.join(output_dir, f"{company['name']}-homepage.png")

        success = screenshot_website(company['url'], output_path)

        if success:
            success_count += 1
        else:
            failed.append(company['display'])

        print()  # Empty line for readability

    # Summary
    print("=" * 60)
    print(f"✅ Successfully captured: {success_count}/{len(COMPANIES)}")

    if failed:
        print(f"❌ Failed: {len(failed)}")
        for name in failed:
            print(f"   - {name}")

    print("=" * 60)

if __name__ == "__main__":
    # Default output directory
    default_output = "output/articles/2026-01-23-best-tumbler-manufacturers-china/assets"

    output_dir = sys.argv[1] if len(sys.argv) > 1 else default_output

    capture_all_screenshots(output_dir)
