#!/bin/bash

# 学术课程表 PWA 一键部署脚本

echo "======================================"
echo "  学术课程表 PWA 一键部署工具"
echo "======================================"
echo ""

# 检查是否安装了Node.js
if ! command -v node &> /dev/null; then
    echo "❌ 错误: 未检测到Node.js，请先安装Node.js"
    exit 1
fi

echo "✅ Node.js 版本: $(node -v)"
echo ""

# 选择部署方式
echo "请选择部署方式："
echo "1) Vercel (推荐 - 最简单)"
echo "2) Netlify"
echo "3) 仅构建，不部署"
echo ""
read -p "请输入选项 (1-3): " choice

case $choice in
  1)
    echo ""
    echo "📦 正在构建应用..."
    npm run build
    
    if ! command -v vercel &> /dev/null; then
        echo ""
        echo "⚠️  未检测到Vercel CLI，正在安装..."
        npm install -g vercel
    fi
    
    echo ""
    echo "🚀 正在部署到Vercel..."
    vercel --prod
    
    echo ""
    echo "✅ 部署完成！"
    echo "📱 请用手机浏览器访问上方显示的网址，然后："
    echo "   - Android: 菜单 → 添加到主屏幕"
    echo "   - iOS: 分享 → 添加到主屏幕"
    ;;
    
  2)
    echo ""
    echo "📦 正在构建应用..."
    npm run build
    
    if ! command -v netlify &> /dev/null; then
        echo ""
        echo "⚠️  未检测到Netlify CLI，正在安装..."
        npm install -g netlify-cli
    fi
    
    echo ""
    echo "🚀 正在部署到Netlify..."
    netlify deploy --prod --dir=dist
    
    echo ""
    echo "✅ 部署完成！"
    echo "📱 请用手机浏览器访问上方显示的网址，然后："
    echo "   - Android: 菜单 → 添加到主屏幕"
    echo "   - iOS: 分享 → 添加到主屏幕"
    ;;
    
  3)
    echo ""
    echo "📦 正在构建应用..."
    npm run build
    
    echo ""
    echo "✅ 构建完成！"
    echo "📁 构建文件位于: dist/"
    echo ""
    echo "后续步骤："
    echo "1. 将 dist/ 目录上传到任何静态网站托管服务"
    echo "2. 或运行 'npm run preview' 进行本地预览"
    ;;
    
  *)
    echo "❌ 无效选项"
    exit 1
    ;;
esac

echo ""
echo "======================================"
echo "  部署完成！"
echo "======================================"
