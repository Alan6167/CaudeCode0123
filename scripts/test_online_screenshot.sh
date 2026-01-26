#!/bin/bash
# Quick test script for online screenshot services

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║      在线截图服务测试脚本                                        ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Check if API key is set
if [ -z "$SCREENSHOTONE_API_KEY" ] && [ -z "$APIFLASH_API_KEY" ] && [ -z "$SCREENSHOTAPI_API_KEY" ]; then
    echo "❌ 错误: 未找到 API Key"
    echo ""
    echo "请先设置 API Key（选择其中一个）："
    echo ""
    echo "  export SCREENSHOTONE_API_KEY=\"your_key\""
    echo "  export APIFLASH_API_KEY=\"your_key\""
    echo "  export SCREENSHOTAPI_API_KEY=\"your_key\""
    echo ""
    echo "获取免费 API Key："
    echo "  • ScreenshotOne: https://screenshotone.com/"
    echo "  • ApiFlash: https://apiflash.com/"
    echo "  • ScreenshotAPI: https://screenshotapi.net/"
    echo ""
    exit 1
fi

# Detect which service to use
SERVICE=""
if [ -n "$SCREENSHOTONE_API_KEY" ]; then
    SERVICE="screenshotone"
    echo "✅ 检测到 ScreenshotOne API Key"
elif [ -n "$APIFLASH_API_KEY" ]; then
    SERVICE="apiflash"
    echo "✅ 检测到 ApiFlash API Key"
elif [ -n "$SCREENSHOTAPI_API_KEY" ]; then
    SERVICE="screenshotapi"
    echo "✅ 检测到 ScreenshotAPI API Key"
fi

echo "🌐 使用服务: $SERVICE"
echo ""

# Test URL
TEST_URL="https://www.maxlink.com.cn/"
OUTPUT_DIR="output/test-screenshots"
OUTPUT_FILE="$OUTPUT_DIR/maxlink-test.png"

echo "📸 测试截图..."
echo "   URL: $TEST_URL"
echo "   输出: $OUTPUT_FILE"
echo ""

# Create output directory
mkdir -p "$OUTPUT_DIR"

# Run screenshot
if python3 scripts/screenshot_online.py "$TEST_URL" "$OUTPUT_FILE" --service "$SERVICE"; then
    echo ""
    echo "═══════════════════════════════════════════════════════════════════"
    echo "✅ 测试成功！"
    echo ""
    echo "截图已保存到: $OUTPUT_FILE"
    echo ""
    echo "查看截图:"
    FILE_SIZE=$(ls -lh "$OUTPUT_FILE" | awk '{print $5}')
    echo "  • 文件大小: $FILE_SIZE"
    echo "  • 路径: $OUTPUT_FILE"
    echo ""
    echo "下一步："
    echo "  • 运行批量截图: python3 scripts/capture_screenshots_online.py"
    echo "  • 查看完整指南: cat scripts/ONLINE-SCREENSHOT-GUIDE.md"
    echo "═══════════════════════════════════════════════════════════════════"
else
    echo ""
    echo "═══════════════════════════════════════════════════════════════════"
    echo "❌ 测试失败"
    echo ""
    echo "可能的原因："
    echo "  1. API Key 无效或已过期"
    echo "  2. 已达到配额限制"
    echo "  3. 网络连接问题"
    echo "  4. 目标网站无法访问"
    echo ""
    echo "解决方案："
    echo "  • 检查 API Key 是否正确"
    echo "  • 访问服务 Dashboard 查看配额"
    echo "  • 尝试其他服务"
    echo "  • 查看详细日志"
    echo "═══════════════════════════════════════════════════════════════════"
    exit 1
fi
