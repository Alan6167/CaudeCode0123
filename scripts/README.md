# Scripts Directory

Utility scripts for automating content creation and asset management.

## Available Scripts

### 1. screenshot_website.py

Capture screenshots of websites using Playwright.

**Usage:**
```bash
# Basic usage (auto-generate filename)
python3 scripts/screenshot_website.py https://www.example.com/

# Specify output path
python3 scripts/screenshot_website.py https://www.example.com/ output/screenshot.png
```

**Requirements:**
- Python 3.11+
- playwright (`pip install playwright`)
- Chromium browser (`playwright install chromium`)

**Features:**
- Headless browser capture
- 1920x1080 viewport size
- PNG format output
- Automatic directory creation
- Network idle wait for complete page load

---

### 2. capture_article_screenshots.py

Batch screenshot capture for all companies in an article.

**Usage:**
```bash
# Use default output directory
python3 scripts/capture_article_screenshots.py

# Specify custom output directory
python3 scripts/capture_article_screenshots.py path/to/output/assets/
```

**Features:**
- Batch processing of multiple URLs
- Progress tracking
- Success/failure summary
- Configured for "Best Tumbler Manufacturers" article
- Automatically creates assets directory

**Company List:**
- Maxlink (https://www.maxlink.com.cn/)
- Everich (https://www.everich.com/)
- Haers (https://www.haers.com/)
- KingStar (https://www.waterbottle.tech/)
- Ansune (https://www.ansune.com/)
- Cayi (https://en.cayigroup.com/)
- Fuguang (https://www.fgaofficial.com/)
- Inoxicon (https://inoxiconkitchen.com/)
- Steelhydro (https://steelhydro.com/)

---

## Installation

### Install Dependencies

```bash
# Install Playwright
pip install playwright

# Install Chromium browser
python3 -m playwright install chromium

# Verify installation
python3 -c "import playwright; print('Playwright installed successfully')"
```

---

## Troubleshooting

### Network Issues

If you encounter `ERR_TUNNEL_CONNECTION_FAILED` or network errors:

1. **Check proxy settings**
   ```bash
   echo $HTTP_PROXY
   echo $HTTPS_PROXY
   ```

2. **Try without proxy**
   ```bash
   unset HTTP_PROXY HTTPS_PROXY
   python3 scripts/screenshot_website.py https://www.example.com/
   ```

3. **Use alternative methods** (see `IMAGE-GUIDE.md`)
   - Browser manual screenshot
   - Online screenshot APIs
   - Desktop screenshot tools

### Browser Not Found

If you see "Executable doesn't exist":

```bash
# Install browsers
python3 -m playwright install chromium

# Or install all browsers
python3 -m playwright install
```

### Permission Issues

```bash
# Make scripts executable
chmod +x scripts/*.py

# Run with python3
python3 scripts/screenshot_website.py <url>
```

---

## Customization

### Add New URLs

Edit `capture_article_screenshots.py`:

```python
COMPANIES = [
    {
        'name': 'company-slug',
        'display': 'Company Display Name',
        'url': 'https://www.company.com/'
    },
    # Add more...
]
```

### Change Screenshot Settings

Edit `screenshot_website.py`:

```python
# Viewport size
viewport={'width': 1920, 'height': 1080}

# Screenshot type
page.screenshot(path=output_path, type='png', full_page=True)  # Full page

# Timeout
page.goto(url, timeout=60000)  # 60 seconds
```

---

## Future Scripts

Planned additions:
- Image compression/optimization tool
- Product image downloader from official websites
- Batch image format converter
- SEO article generator with auto-screenshots
- Automated alt-text generator for images

---

## Notes

- Screenshots are captured at 1920x1080 resolution
- PNG format is used for better quality
- Network idle state is awaited before capture
- Failed screenshots are logged but don't stop batch processing
- All scripts create output directories automatically

---

## Related Documentation

- [Image Adding Guide](../output/articles/2026-01-23-best-tumbler-manufacturers-china/IMAGE-GUIDE.md)
- [Output Directory Structure](../output/README.md)
- [Playwright Documentation](https://playwright.dev/python/)
