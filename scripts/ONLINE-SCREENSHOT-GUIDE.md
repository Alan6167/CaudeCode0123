# 在线截图 API 使用指南

无需本地浏览器，使用云端 API 服务自动截图！

---

## 🌟 推荐服务对比

| 服务 | 免费额度 | 优点 | 获取API Key |
|------|---------|------|------------|
| **ScreenshotOne** | 100次/月 | 功能全面，质量高 | https://screenshotone.com/ |
| **ApiFlash** | 100次/月 | 速度快，稳定 | https://apiflash.com/ |
| **ScreenshotAPI** | 100次/月 | 简单易用 | https://screenshotapi.net/ |
| **ScreenshotLayer** | 100次/月 | 文档详细 | https://screenshotlayer.com/ |
| **ScreenshotMachine** | 无限（带水印） | 免费但有水印 | https://www.screenshotmachine.com/ |

---

## 🚀 快速开始

### 步骤 1: 获取 API Key

选择一个服务并注册获取 API key（推荐 ScreenshotOne）：

1. 访问 https://screenshotone.com/
2. 点击 "Sign Up" 注册账号
3. 进入 Dashboard 获取 API key
4. 免费计划：100 次截图/月

### 步骤 2: 设置 API Key

```bash
# 方法 A: 设置环境变量（推荐）
export SCREENSHOTONE_API_KEY="your_api_key_here"

# 方法 B: 或在使用时通过参数传递
# python3 script.py --api-key your_api_key_here
```

### 步骤 3: 批量截图所有公司（9个网站）

```bash
cd /home/user/CaudeCode0123

# 使用默认服务（ScreenshotOne）
python3 scripts/capture_screenshots_online.py

# 或指定其他服务
python3 scripts/capture_screenshots_online.py --service apiflash
```

### 步骤 4: 完成！

截图会自动保存到：
```
output/articles/2026-01-23-best-tumbler-manufacturers-china/assets/
├── maxlink-homepage.png
├── everich-homepage.png
├── haers-homepage.png
└── ... (共9张)
```

---

## 📖 详细使用说明

### 单个网站截图

```bash
# 基本用法（自动生成文件名）
python3 scripts/screenshot_online.py https://www.maxlink.com.cn/

# 指定输出路径
python3 scripts/screenshot_online.py \
  https://www.maxlink.com.cn/ \
  output/screenshots/maxlink.png

# 使用不同服务
python3 scripts/screenshot_online.py \
  https://www.maxlink.com.cn/ \
  --service apiflash \
  --api-key YOUR_API_KEY
```

### 批量截图所有公司

```bash
# 默认配置
python3 scripts/capture_screenshots_online.py

# 自定义输出目录
python3 scripts/capture_screenshots_online.py \
  --output my-screenshots/

# 使用 ApiFlash 服务
export APIFLASH_API_KEY="your_key"
python3 scripts/capture_screenshots_online.py --service apiflash

# 调整请求间隔（避免限流）
python3 scripts/capture_screenshots_online.py --delay 3
```

---

## 🎯 各服务详细配置

### 1. ScreenshotOne（推荐）

**注册：** https://screenshotone.com/

**特点：**
- ✅ 免费 100 次/月
- ✅ 无水印
- ✅ 支持广告拦截
- ✅ 支持 Cookie 横幅拦截
- ✅ 速度快，质量高

**使用：**
```bash
export SCREENSHOTONE_API_KEY="your_key"
python3 scripts/capture_screenshots_online.py
```

---

### 2. ApiFlash

**注册：** https://apiflash.com/

**特点：**
- ✅ 免费 100 次/月
- ✅ 基于 Chrome 渲染
- ✅ 支持全页截图
- ✅ API 响应快

**使用：**
```bash
export APIFLASH_API_KEY="your_key"
python3 scripts/capture_screenshots_online.py --service apiflash
```

---

### 3. ScreenshotAPI

**注册：** https://screenshotapi.net/

**特点：**
- ✅ 免费 100 次/月
- ✅ 简单易用
- ✅ 支持自定义等待时间

**使用：**
```bash
export SCREENSHOTAPI_API_KEY="your_key"
python3 scripts/capture_screenshots_online.py --service screenshotapi
```

---

### 4. ScreenshotLayer

**注册：** https://screenshotlayer.com/

**特点：**
- ✅ 免费 100 次/月
- ✅ 文档详细
- ✅ RESTful API

**使用：**
```bash
export SCREENSHOTLAYER_API_KEY="your_key"
python3 scripts/capture_screenshots_online.py --service screenshotlayer
```

---

### 5. ScreenshotMachine

**注册：** https://www.screenshotmachine.com/

**特点：**
- ⚠️ 免费版有水印
- ✅ 无请求限制
- ✅ 付费去水印

**使用：**
```bash
export SCREENSHOTMACHINE_API_KEY="your_key"
python3 scripts/capture_screenshots_online.py --service screenshotmachine
```

---

## 💡 实用技巧

### 技巧 1: 同时使用多个服务

如果一个服务达到限额，切换到另一个：

```bash
# 使用 ScreenshotOne 截前 3 个
export SCREENSHOTONE_API_KEY="key1"
python3 scripts/screenshot_online.py https://www.maxlink.com.cn/ assets/maxlink.png
python3 scripts/screenshot_online.py https://www.everich.com/ assets/everich.png
python3 scripts/screenshot_online.py https://www.haers.com/ assets/haers.png

# 切换到 ApiFlash 截剩余
export APIFLASH_API_KEY="key2"
python3 scripts/screenshot_online.py https://www.ansune.com/ assets/ansune.png --service apiflash
# ... 继续其他网站
```

### 技巧 2: 检查 API 配额

大多数服务提供 Dashboard 查看剩余配额：
- ScreenshotOne: https://screenshotone.com/dashboard
- ApiFlash: https://apiflash.com/dashboard
- ScreenshotAPI: https://screenshotapi.net/dashboard

### 技巧 3: 批量处理优化

```bash
# 增加延迟避免限流
python3 scripts/capture_screenshots_online.py --delay 5

# 如果遇到超时，可以重试单个失败的
python3 scripts/screenshot_online.py https://failed-url.com/ output.png
```

---

## 🔧 故障排除

### 问题 1: API Key 无效

```
❌ Error: 401 - Unauthorized
```

**解决：**
- 检查 API key 是否正确
- 确认环境变量名称正确（SCREENSHOTONE_API_KEY）
- 重新生成 API key

### 问题 2: 达到限额

```
❌ Error: 429 - Too Many Requests
```

**解决：**
- 等待下个月配额刷新
- 切换到其他服务
- 升级到付费计划

### 问题 3: 截图失败

```
❌ Error: 500 - Internal Server Error
```

**解决：**
- 检查目标网站是否可访问
- 增加 delay 参数
- 重试请求
- 切换到其他服务

### 问题 4: 网络超时

```
❌ Error: Timeout
```

**解决：**
- 检查网络连接
- 增加超时时间（脚本中默认 60 秒）
- 重试请求

---

## 📊 成本估算

### 免费计划足够吗？

对于 9 个公司网站：
- **一次性截图**: ✅ 任何免费计划都够用（9次 < 100次）
- **每周更新**: ✅ 够用（36次/月 < 100次）
- **每日更新**: ❌ 需要付费计划（270次/月 > 100次）

### 付费计划（如需更多配额）

| 服务 | 价格 | 月配额 |
|------|------|--------|
| ScreenshotOne | $15/月 | 1,000 次 |
| ApiFlash | $9/月 | 1,000 次 |
| ScreenshotAPI | $9/月 | 1,000 次 |

---

## 🎨 高级功能

### 自定义截图参数

编辑 `screenshot_online.py`，修改参数：

```python
params = {
    'viewport_width': 1920,      # 宽度
    'viewport_height': 1080,     # 高度
    'device_scale_factor': 2,    # 视网膜屏幕 (2x)
    'format': 'jpg',             # 格式: png/jpg
    'quality': 90,               # JPG 质量 (1-100)
    'full_page': True,           # 全页截图
    'block_ads': True,           # 屏蔽广告
    'block_cookie_banners': True,# 屏蔽 Cookie 横幅
}
```

### 截图特定元素

某些服务支持 CSS 选择器：

```python
params = {
    'selector': '.main-content',  # 只截取主内容区域
}
```

---

## ✅ 完整工作流程示例

### 为文章添加所有公司截图

```bash
# 1. 获取 API Key
# 访问 https://screenshotone.com/ 注册并获取 key

# 2. 设置环境变量
export SCREENSHOTONE_API_KEY="your_key_here"

# 3. 运行批量截图
cd /home/user/CaudeCode0123
python3 scripts/capture_screenshots_online.py

# 4. 验证结果
ls -lh output/articles/2026-01-23-best-tumbler-manufacturers-china/assets/

# 输出应该显示 9 个 PNG 文件：
# maxlink-homepage.png
# everich-homepage.png
# haers-homepage.png
# kingstar-homepage.png
# ansune-homepage.png
# cayi-homepage.png
# fuguang-homepage.png
# inoxicon-homepage.png
# steelhydro-homepage.png

# 5. 查看截图
# 打开文件夹查看图片质量

# 6. 更新文章添加图片引用（可选）
# 编辑 Markdown 文件添加 ![alt](assets/xxx.png)

# 7. 提交到 Git
git add output/articles/2026-01-23-best-tumbler-manufacturers-china/assets/
git commit -m "feat: add company website screenshots"
git push
```

---

## 📚 相关资源

### 官方文档
- ScreenshotOne: https://screenshotone.com/docs/
- ApiFlash: https://apiflash.com/documentation
- ScreenshotAPI: https://screenshotapi.net/documentation

### 本地脚本
- `screenshot_online.py` - 单个网站截图
- `capture_screenshots_online.py` - 批量截图
- `screenshot_website.py` - 本地 Playwright 截图（需要网络访问）

### 其他文档
- [图片添加指南](../output/articles/2026-01-23-best-tumbler-manufacturers-china/IMAGE-GUIDE.md)
- [脚本总览](README.md)

---

## 🎯 总结

**推荐方案：** ScreenshotOne API

**原因：**
1. ✅ 免费 100 次/月，足够文章使用
2. ✅ 无水印，质量高
3. ✅ 支持广告和 Cookie 横幅拦截
4. ✅ API 稳定可靠
5. ✅ 文档清晰易懂

**立即开始：**
```bash
# 1. 获取 API Key: https://screenshotone.com/
# 2. 设置环境变量
export SCREENSHOTONE_API_KEY="your_key"
# 3. 运行脚本
python3 scripts/capture_screenshots_online.py
```

**3 分钟内完成所有 9 个公司的截图！** 🚀
