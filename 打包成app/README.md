# 📚 学术课程表 - PWA安装包

欢迎使用学术课程表PWA版本！这个文件夹包含了将课程表应用打包成手机APP所需的所有文件和说明。

## 📁 文件说明

```
打包成app/
├── PWA部署指南.md          # 详细的部署和安装教程
├── deploy.bat              # Windows一键部署脚本
├── deploy.sh               # Mac/Linux一键部署脚本
├── generate-icons.js       # 图标生成工具
└── README.md               # 本文件
```

## 🚀 快速开始（推荐）

### Windows用户
1. 双击运行 `deploy.bat`
2. 选择部署方式（推荐Vercel）
3. 完成！用手机访问生成的网址并安装

### Mac/Linux用户
```bash
chmod +x deploy.sh
./deploy.sh
```

## 📖 详细教程

请查看 [PWA部署指南.md](./PWA部署指南.md) 获取完整的部署和安装教程，包括：

- ✅ 三种部署方式详解
- ✅ Android/iOS安装步骤
- ✅ 数据存储说明
- ✅ 常见问题解答
- ✅ 图标自定义方法

## 🎯 三种方案对比

| 方案 | 难度 | 时间 | 特点 |
|------|------|------|------|
| **在线部署** (Vercel/Netlify) | ⭐ 简单 | 5分钟 | 随时随地访问，支持离线 |
| **本地运行** | ⭐⭐ 中等 | 2分钟 | 仅本地网络，数据最安全 |
| **打包成APK** | ⭐⭐⭐ 困难 | 30分钟 | 可上架应用商店 |

## 💡 推荐方案

**最简单的方式（5分钟）**：

1. 确保安装了Node.js
2. 运行一键部署脚本：
   - Windows: 双击 `deploy.bat`
   - Mac/Linux: 运行 `./deploy.sh`
3. 选择 `1) Vercel`
4. 用手机访问生成的网址
5. 点击"添加到主屏幕"

完成！🎉

## 🔧 技术细节

### PWA特性
- ✅ 离线访问（Service Worker）
- ✅ 桌面图标（Manifest）
- ✅ 自动更新
- ✅ 推送通知（可选）
- ✅ 本地数据存储

### 数据存储
- 使用LocalStorage + IndexedDB
- 数据仅保存在本地
- 不会上传到服务器
- 支持导出/导入备份

### 兼容性
- ✅ Android Chrome (推荐)
- ✅ iOS Safari (部分功能)
- ✅ Edge、Firefox等现代浏览器

## 📞 需要帮助？

1. 查看 [PWA部署指南.md](./PWA部署指南.md)
2. 检查项目根目录的 [README.md](../README.md)
3. 确保Node.js版本 >= 14.0

## 🎨 自定义

### 修改应用名称
编辑 `../public/manifest.json`:
```json
{
  "name": "你的应用名称",
  "short_name": "短名称"
}
```

### 替换应用图标
1. 准备512x512的图标图片
2. 访问 https://www.pwabuilder.com/imageGenerator
3. 上传图片并下载生成的图标包
4. 替换 `../public/icons/` 目录下的文件

## 📊 项目状态

- ✅ PWA配置完成
- ✅ Service Worker就绪
- ✅ 离线缓存配置
- ✅ 安装提示功能
- ✅ 移动端UI优化
- ✅ 本地数据存储

---

**开始使用吧！** 🚀

运行一键部署脚本，5分钟后就能在手机上使用你的课程表应用了！
