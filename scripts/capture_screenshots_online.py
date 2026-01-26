#!/usr/bin/env python3
"""
Batch Online Screenshot Capture
Captures screenshots for all companies using online API services
"""

import os
import sys
import time

# Import the online screenshot function
sys.path.insert(0, os.path.dirname(__file__))
from screenshot_online import capture_screenshot_online

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

def capture_all_screenshots_online(output_dir, service='screenshotone', api_key=None, delay=2):
    """
    Capture screenshots for all companies using online API

    Args:
        output_dir: Directory to save screenshots
        service: Online service to use
        api_key: API key for the service
        delay: Delay between requests (seconds) to avoid rate limits
    """

    # Create output directory
    os.makedirs(output_dir, exist_ok=True)

    print("═" * 60)
    print(f"🎯 Capturing screenshots for {len(COMPANIES)} companies")
    print(f"🌐 Using service: {service}")
    print(f"📁 Output directory: {output_dir}")
    print("═" * 60)
    print()

    success_count = 0
    failed = []

    for i, company in enumerate(COMPANIES, 1):
        print(f"[{i}/{len(COMPANIES)}] {company['display']}")
        print(f"   URL: {company['url']}")

        output_path = os.path.join(output_dir, f"{company['name']}-homepage.png")

        success = capture_screenshot_online(
            company['url'],
            output_path,
            service,
            api_key
        )

        if success:
            success_count += 1
        else:
            failed.append(company['display'])

        print()  # Empty line for readability

        # Delay between requests to avoid rate limiting
        if i < len(COMPANIES) and delay > 0:
            print(f"⏳ Waiting {delay}s before next request...")
            time.sleep(delay)
            print()

    # Summary
    print("═" * 60)
    print(f"✅ Successfully captured: {success_count}/{len(COMPANIES)}")

    if failed:
        print(f"❌ Failed: {len(failed)}")
        for name in failed:
            print(f"   - {name}")

    print("═" * 60)

    return success_count, len(failed)

if __name__ == "__main__":
    import argparse

    parser = argparse.ArgumentParser(
        description='Batch capture screenshots using online API services',
        formatter_class=argparse.RawDescriptionHelpFormatter,
        epilog="""
Examples:
    # Use ScreenshotOne with environment variable
    export SCREENSHOTONE_API_KEY=your_key_here
    python3 capture_screenshots_online.py

    # Use ApiFlash with API key parameter
    python3 capture_screenshots_online.py --service apiflash --api-key YOUR_KEY

    # Custom output directory
    python3 capture_screenshots_online.py --output path/to/output/

    # Adjust delay between requests
    python3 capture_screenshots_online.py --delay 3

Available Services:
    - screenshotone (default) - https://screenshotone.com/
    - apiflash                - https://apiflash.com/
    - screenshotapi           - https://screenshotapi.net/
    - screenshotmachine       - https://www.screenshotmachine.com/
    - screenshotlayer         - https://screenshotlayer.com/

Free Tiers:
    Most services offer 100 free screenshots per month.
    Sign up to get your API key.
        """
    )

    parser.add_argument(
        '--output',
        default='output/articles/2026-01-23-best-tumbler-manufacturers-china/assets',
        help='Output directory for screenshots (default: article assets folder)'
    )
    parser.add_argument(
        '--service',
        default='screenshotone',
        choices=['screenshotone', 'apiflash', 'screenshotapi', 'screenshotmachine', 'screenshotlayer'],
        help='Screenshot service to use (default: screenshotone)'
    )
    parser.add_argument(
        '--api-key',
        help='API key for the service (or set via environment variable)'
    )
    parser.add_argument(
        '--delay',
        type=int,
        default=2,
        help='Delay between requests in seconds (default: 2)'
    )

    args = parser.parse_args()

    # Check for API key
    env_var_name = f"{args.service.upper()}_API_KEY"
    api_key = args.api_key or os.environ.get(env_var_name)

    if not api_key:
        print(f"❌ Error: API key required for {args.service}")
        print(f"")
        print(f"Option 1: Set environment variable")
        print(f"   export {env_var_name}=your_key_here")
        print(f"   python3 {sys.argv[0]}")
        print(f"")
        print(f"Option 2: Use --api-key parameter")
        print(f"   python3 {sys.argv[0]} --api-key YOUR_KEY")
        print(f"")
        print(f"Get API key from: https://{args.service}.com/")
        sys.exit(1)

    # Capture all screenshots
    success, failed = capture_all_screenshots_online(
        args.output,
        args.service,
        api_key,
        args.delay
    )

    sys.exit(0 if failed == 0 else 1)
