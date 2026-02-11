# Screenshot Guide

Run the commands below to capture all 10 homepage screenshots for this article.

## Prerequisites

```bash
pip install playwright
python3 -m playwright install chromium
```

## Output Directory

```
output/articles/2026-02-11-best-calendar-manufacturers-china/assets/
```

## Commands (Local Playwright)

```bash
ASSETS="output/articles/2026-02-11-best-calendar-manufacturers-china/assets"

python3 scripts/screenshot_website.py https://www.syloon.com/ "$ASSETS/syloon-homepage.png"
python3 scripts/screenshot_website.py https://www.ybj-printing.com/ "$ASSETS/ybj-homepage.png"
python3 scripts/screenshot_website.py https://www.bookprintingchina.com/ "$ASSETS/bookprintingchina-homepage.png"
python3 scripts/screenshot_website.py https://www.chinaprinting4u.com/ "$ASSETS/chinaprinting4u-homepage.png"
python3 scripts/screenshot_website.py https://www.lionpaper-istyle.com/ "$ASSETS/lionpaper-homepage.png"
python3 scripts/screenshot_website.py https://jabaygames.com/ "$ASSETS/jabay-homepage.png"
python3 scripts/screenshot_website.py https://www.xqcprinting.com/ "$ASSETS/xinqicai-homepage.png"
python3 scripts/screenshot_website.py https://www.liyangprinting.com/ "$ASSETS/liyang-homepage.png"
python3 scripts/screenshot_website.py https://global.lybookprinting.com/ "$ASSETS/longyin-homepage.png"
python3 scripts/screenshot_website.py https://lzjhy.com/ "$ASSETS/jinhao-homepage.png"
```

## Expected Files

After execution, the `assets/` directory should contain:

- syloon-homepage.png
- ybj-homepage.png
- bookprintingchina-homepage.png
- chinaprinting4u-homepage.png
- lionpaper-homepage.png
- jabay-homepage.png
- xinqicai-homepage.png
- liyang-homepage.png
- longyin-homepage.png
- jinhao-homepage.png

## Notes

- The article markdown already references these filenames with `![Company Homepage](assets/xxx-homepage.png)` tags.
- No additional edits needed after screenshots are captured.
