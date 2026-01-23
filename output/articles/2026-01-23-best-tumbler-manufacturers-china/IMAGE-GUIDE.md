# 图片添加指南

本文档说明如何为文章添加公司网站截图和产品图片。

## 当前状态

由于网络环境限制，自动截图功能暂时无法使用。您需要手动添加图片。

## 所需图片列表

### 1. Ningbo Maxlink (Syloon Group)
- **网站截图**: `assets/maxlink-homepage.png`
- **官网**: https://www.maxlink.com.cn/
- **推荐尺寸**: 1920x1080px（首屏）
- **产品图（可选）**: `assets/maxlink-product-*.jpg`

### 2. Everich Drinkware
- **网站截图**: `assets/everich-homepage.png`
- **官网**: https://www.everich.com/
- **推荐尺寸**: 1920x1080px（首屏）

### 3. Haers
- **网站截图**: `assets/haers-homepage.png`
- **官网**: https://www.haers.com/
- **推荐尺寸**: 1920x1080px（首屏）

### 4. KingStar Industries
- **网站截图**: `assets/kingstar-homepage.png`
- **官网**: https://www.waterbottle.tech/
- **推荐尺寸**: 1920x1080px（首屏）

### 5. Ansheng (Ansune)
- **网站截图**: `assets/ansune-homepage.png`
- **官网**: https://www.ansune.com/
- **推荐尺寸**: 1920x1080px（首屏）

### 6. Zhejiang Cayi
- **网站截图**: `assets/cayi-homepage.png`
- **官网**: https://en.cayigroup.com/
- **推荐尺寸**: 1920x1080px（首屏）

### 7. Fuguang Drinkware
- **网站截图**: `assets/fuguang-homepage.png`
- **官网**: https://www.fgaofficial.com/
- **推荐尺寸**: 1920x1080px（首屏）

### 8. Inoxicon
- **网站截图**: `assets/inoxicon-homepage.png`
- **官网**: https://inoxiconkitchen.com/
- **推荐尺寸**: 1920x1080px（首屏）

### 9. Steelhydro
- **网站截图**: `assets/steelhydro-homepage.png`
- **官网**: https://steelhydro.com/
- **推荐尺寸**: 1920x1080px（首屏）

---

## 方法 1: 使用在线截图工具

### A. ScreenshotOne API (推荐)
```bash
# 使用在线 API（需要 API key）
# 注册：https://screenshotone.com/

curl "https://api.screenshotone.com/take?access_key=YOUR_KEY&url=https://www.maxlink.com.cn/&viewport_width=1920&viewport_height=1080&format=png" \
  -o assets/maxlink-homepage.png
```

### B. 其他在线工具
- https://www.screenshotmachine.com/
- https://www.site-shot.com/
- https://screenshots.cloud/

---

## 方法 2: 浏览器手动截图

### Chrome/Edge
1. 打开官网（如 https://www.maxlink.com.cn/）
2. 按 `F12` 打开开发者工具
3. 按 `Ctrl+Shift+P`（Windows）或 `Cmd+Shift+P`（Mac）
4. 输入 "Capture screenshot"
5. 选择 "Capture full size screenshot" 或 "Capture screenshot"
6. 保存为 `{company-name}-homepage.png`

### Firefox
1. 打开官网
2. 按 `F12` 打开开发者工具
3. 点击右上角的 "..." 菜单
4. 选择 "Take a screenshot" → "Save full page"

---

## 方法 3: 使用本地 Playwright（如果网络允许）

```bash
# 在可以访问外网的环境运行
cd /home/user/CaudeCode0123
python3 scripts/capture_article_screenshots.py
```

---

## 方法 4: 使用其他截图工具

### macOS
```bash
# 使用内置截图命令（需要 macOS）
screencapture -x output.png
```

### Linux
```bash
# 使用 scrot
scrot -u -d 5 output.png

# 使用 gnome-screenshot
gnome-screenshot -w -f output.png
```

### Windows
```bash
# 使用 PowerShell
Add-Type -AssemblyName System.Windows.Forms
Add-Type -AssemblyName System.Drawing
$screen = [System.Windows.Forms.Screen]::PrimaryScreen.Bounds
$bitmap = New-Object System.Drawing.Bitmap $screen.Width, $screen.Height
```

---

## 图片优化建议

### 压缩图片
```bash
# 使用 ImageMagick
convert input.png -quality 85 -resize 1200x output.png

# 使用在线工具
# https://tinypng.com/
# https://compressor.io/
```

### 推荐规格
- **格式**: PNG（截图）或 JPG（产品图）
- **宽度**: 1200-1920px
- **文件大小**: <500KB（优化后）
- **DPI**: 72 (web)

---

## 添加到文章

图片准备好后，在 Markdown 文件中使用：

```markdown
### 1. Ningbo Maxlink Home & Gift Co., Ltd. (Syloon Group)

![Maxlink Official Website](assets/maxlink-homepage.png)
*Maxlink official website homepage*

**Official Website:** https://www.maxlink.com.cn/
...
```

---

## 版权声明

添加图片时，请在文章末尾添加版权声明：

```markdown
## Image Credits

All company logos and website screenshots are property of their respective owners.
Website screenshots are used for comparative and informational purposes under
fair use doctrine. Product images sourced from official company websites.
```

---

## 自动化脚本（可选）

如果您在没有网络限制的环境中，可以使用：

```bash
# 批量截图
python3 scripts/capture_article_screenshots.py

# 单个截图
python3 scripts/screenshot_website.py https://www.maxlink.com.cn/ assets/maxlink-homepage.png
```

---

## 快速检查清单

- [ ] 访问公司官网
- [ ] 截取首页完整截图
- [ ] 保存为 PNG 格式
- [ ] 重命名为 `{company-name}-homepage.png`
- [ ] 放入 `assets/` 文件夹
- [ ] 压缩优化（可选）
- [ ] 更新 Markdown 引用
- [ ] 添加图片说明文字
- [ ] 添加版权声明

---

## 技术支持

如果遇到问题：
1. 检查图片文件路径是否正确
2. 确认图片格式为 PNG 或 JPG
3. 验证图片文件大小是否合理
4. 查看 Markdown 语法是否正确

有关自动化脚本问题，请参考：
- `scripts/screenshot_website.py`
- `scripts/capture_article_screenshots.py`
