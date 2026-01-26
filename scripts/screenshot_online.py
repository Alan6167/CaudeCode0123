#!/usr/bin/env python3
"""
Online Screenshot API Tool
Uses cloud-based screenshot services to capture website images
No local browser installation required
"""

import sys
import os
import requests
from urllib.parse import urlencode

class ScreenshotService:
    """Base class for screenshot services"""

    def capture(self, url, output_path):
        raise NotImplementedError

class ScreenshotOneAPI(ScreenshotService):
    """
    ScreenshotOne API - https://screenshotone.com/
    Free tier: 100 screenshots/month
    """

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.screenshotone.com/take"

    def capture(self, url, output_path):
        params = {
            'access_key': self.api_key,
            'url': url,
            'viewport_width': 1920,
            'viewport_height': 1080,
            'device_scale_factor': 1,
            'format': 'png',
            'full_page': False,
            'block_ads': True,
            'block_cookie_banners': True,
        }

        print(f"📸 Requesting screenshot via ScreenshotOne API...")
        response = requests.get(self.base_url, params=params, timeout=60)

        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False

class ApiFlash(ScreenshotService):
    """
    ApiFlash - https://apiflash.com/
    Free tier: 100 screenshots/month
    """

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.apiflash.com/v1/urltoimage"

    def capture(self, url, output_path):
        params = {
            'access_key': self.api_key,
            'url': url,
            'width': 1920,
            'height': 1080,
            'format': 'png',
            'full_page': False,
            'fresh': True,
        }

        print(f"📸 Requesting screenshot via ApiFlash...")
        response = requests.get(self.base_url, params=params, timeout=60)

        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False

class ScreenshotAPI(ScreenshotService):
    """
    ScreenshotAPI - https://screenshotapi.net/
    Free tier: 100 screenshots/month
    """

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://shot.screenshotapi.net/screenshot"

    def capture(self, url, output_path):
        params = {
            'token': self.api_key,
            'url': url,
            'width': 1920,
            'height': 1080,
            'output': 'image',
            'file_type': 'png',
            'wait_for_event': 'load',
        }

        print(f"📸 Requesting screenshot via ScreenshotAPI.net...")
        response = requests.get(self.base_url, params=params, timeout=60)

        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False

class ScreenshotMachine(ScreenshotService):
    """
    ScreenshotMachine - https://www.screenshotmachine.com/
    Free tier with watermark, paid plans available
    """

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.screenshotmachine.com/"

    def capture(self, url, output_path):
        params = {
            'key': self.api_key,
            'url': url,
            'dimension': '1920x1080',
            'format': 'png',
            'cacheLimit': 0,  # Fresh screenshot
        }

        print(f"📸 Requesting screenshot via ScreenshotMachine...")
        response = requests.get(self.base_url, params=params, timeout=60)

        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False

class ScreenshotLayerAPI(ScreenshotService):
    """
    ScreenshotLayer - https://screenshotlayer.com/
    Free tier: 100 screenshots/month
    """

    def __init__(self, api_key):
        self.api_key = api_key
        self.base_url = "https://api.screenshotlayer.com/api/capture"

    def capture(self, url, output_path):
        params = {
            'access_key': self.api_key,
            'url': url,
            'viewport': '1920x1080',
            'format': 'PNG',
            'fullpage': 0,
            'force': 1,  # Fresh screenshot
        }

        print(f"📸 Requesting screenshot via ScreenshotLayer...")
        response = requests.get(self.base_url, params=params, timeout=60)

        if response.status_code == 200:
            with open(output_path, 'wb') as f:
                f.write(response.content)
            return True
        else:
            print(f"❌ Error: {response.status_code} - {response.text}")
            return False

# Service selection helper
SERVICES = {
    'screenshotone': ScreenshotOneAPI,
    'apiflash': ApiFlash,
    'screenshotapi': ScreenshotAPI,
    'screenshotmachine': ScreenshotMachine,
    'screenshotlayer': ScreenshotLayerAPI,
}

def capture_screenshot_online(url, output_path, service_name='screenshotone', api_key=None):
    """
    Capture screenshot using online API service

    Args:
        url: Website URL to capture
        output_path: Path to save screenshot
        service_name: Service to use (screenshotone, apiflash, etc.)
        api_key: API key for the service
    """

    # Check if API key is provided
    if not api_key:
        # Try to get from environment variable
        env_var_name = f"{service_name.upper()}_API_KEY"
        api_key = os.environ.get(env_var_name)

        if not api_key:
            print(f"❌ Error: API key required for {service_name}")
            print(f"   Set environment variable: export {env_var_name}=your_key")
            print(f"   Or provide via --api-key parameter")
            return False

    # Get service class
    if service_name not in SERVICES:
        print(f"❌ Unknown service: {service_name}")
        print(f"   Available services: {', '.join(SERVICES.keys())}")
        return False

    # Create service instance and capture
    service = SERVICES[service_name](api_key)

    # Ensure output directory exists
    output_dir = os.path.dirname(output_path)
    if output_dir:
        os.makedirs(output_dir, exist_ok=True)

    success = service.capture(url, output_path)

    if success:
        file_size = os.path.getsize(output_path)
        print(f"✅ Screenshot saved: {output_path} ({file_size:,} bytes)")

    return success

if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("""
Online Screenshot Tool

Usage:
    python3 screenshot_online.py <url> [output_path] [--service SERVICE] [--api-key KEY]

Examples:
    # Using ScreenshotOne (default)
    export SCREENSHOTONE_API_KEY=your_key_here
    python3 screenshot_online.py https://www.example.com/

    # Specify output path
    python3 screenshot_online.py https://www.example.com/ screenshot.png

    # Use different service
    python3 screenshot_online.py https://www.example.com/ --service apiflash --api-key YOUR_KEY

    # Use ApiFlash with environment variable
    export APIFLASH_API_KEY=your_key_here
    python3 screenshot_online.py https://www.example.com/ --service apiflash

Available Services:
    - screenshotone     : https://screenshotone.com/ (100/month free)
    - apiflash          : https://apiflash.com/ (100/month free)
    - screenshotapi     : https://screenshotapi.net/ (100/month free)
    - screenshotmachine : https://www.screenshotmachine.com/ (free with watermark)
    - screenshotlayer   : https://screenshotlayer.com/ (100/month free)

Get API Keys:
    - ScreenshotOne: https://screenshotone.com/
    - ApiFlash: https://apiflash.com/
    - ScreenshotAPI: https://screenshotapi.net/
    - ScreenshotMachine: https://www.screenshotmachine.com/
    - ScreenshotLayer: https://screenshotlayer.com/
        """)
        sys.exit(1)

    # Parse arguments
    url = sys.argv[1]
    output_path = None
    service_name = 'screenshotone'
    api_key = None

    i = 2
    while i < len(sys.argv):
        arg = sys.argv[i]
        if arg == '--service':
            service_name = sys.argv[i + 1]
            i += 2
        elif arg == '--api-key':
            api_key = sys.argv[i + 1]
            i += 2
        elif not output_path:
            output_path = arg
            i += 1
        else:
            i += 1

    # Default output path
    if not output_path:
        from urllib.parse import urlparse
        domain = urlparse(url).netloc.replace('www.', '').split('.')[0]
        output_path = f"{domain}-screenshot.png"

    # Capture screenshot
    success = capture_screenshot_online(url, output_path, service_name, api_key)

    sys.exit(0 if success else 1)
