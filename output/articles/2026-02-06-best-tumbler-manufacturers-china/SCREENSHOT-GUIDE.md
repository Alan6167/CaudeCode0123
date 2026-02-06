# Screenshot Guide

Run the commands below to capture all 10 homepage screenshots for this article.

## Prerequisites

```bash
pip install playwright
python3 -m playwright install chromium
```

## Output Directory

```
output/articles/2026-02-06-best-tumbler-manufacturers-china/assets/
```

## Commands (Local Playwright)

```bash
ASSETS="output/articles/2026-02-06-best-tumbler-manufacturers-china/assets"

python3 scripts/screenshot_website.py https://www.maxlink.com.cn/ "$ASSETS/maxlink-homepage.png"
python3 scripts/screenshot_website.py https://www.everich.com/ "$ASSETS/everich-homepage.png"
python3 scripts/screenshot_website.py https://www.haers.com/ "$ASSETS/haers-homepage.png"
python3 scripts/screenshot_website.py https://www.ansune.com/ "$ASSETS/ansune-homepage.png"
python3 scripts/screenshot_website.py https://www.waterbottle.tech/ "$ASSETS/kingstar-homepage.png"
python3 scripts/screenshot_website.py https://en.cayigroup.com/ "$ASSETS/cayi-homepage.png"
python3 scripts/screenshot_website.py https://www.fgaofficial.com/ "$ASSETS/fuguang-homepage.png"
python3 scripts/screenshot_website.py https://golmate.com/ "$ASSETS/golmate-homepage.png"
python3 scripts/screenshot_website.py https://inoxiconkitchen.com/ "$ASSETS/inoxicon-homepage.png"
python3 scripts/screenshot_website.py https://steelhydro.com/ "$ASSETS/steelhydro-homepage.png"
```

## Alternative: Cloud API

If Playwright is unavailable, use the online screenshot script with an API key:

```bash
export SCREENSHOTONE_API_KEY="your-key-here"

python3 scripts/screenshot_online.py https://www.maxlink.com.cn/ --service screenshotone --output "$ASSETS/maxlink-homepage.png"
# Repeat for each URL above
```

## Expected Files

After execution, the `assets/` directory should contain:

- maxlink-homepage.png
- everich-homepage.png
- haers-homepage.png
- ansune-homepage.png
- kingstar-homepage.png
- cayi-homepage.png
- fuguang-homepage.png
- golmate-homepage.png
- inoxicon-homepage.png
- steelhydro-homepage.png

## Notes

- The article markdown already references these filenames with `![Company Homepage](assets/xxx-homepage.png)` tags.
- No additional edits needed after screenshots are captured.
