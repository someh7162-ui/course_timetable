# 学术课程表 PWA 安装与部署指南

## 📱 什么是PWA？

PWA（Progressive Web App，渐进式Web应用）是一种可以像原生APP一样使用的网页应用。具有以下优势：

- ✅ **无需应用商店**：直接从浏览器安装
- ✅ **离线访问**：安装后无需网络也能使用
- ✅ **本地存储**：数据保存在手机本地，隐私安全
- ✅ **自动更新**：访问时自动检查更新
- ✅ **跨平台**：Android、iOS、Windows、Mac都可用
- ✅ **体积小**：比原生APP小很多

---

## 🚀 方式一：在线部署（推荐）

### 步骤1：选择托管平台

选择以下任一免费托管平台：

#### 1. Vercel（推荐）
```bash
# 安装Vercel CLI
npm install -g vercel

# 在项目目录运行
cd F:\AI编程\academic-timetable
vercel

# 按提示操作，几分钟即可上线
```

#### 2. Netlify
```bash
# 安装Netlify CLI
npm install -g netlify-cli

# 部署
cd F:\AI编程\academic-timetable
netlify deploy --prod
```

#### 3. GitHub Pages
1. 将项目推送到GitHub
2. 进入仓库设置 → Pages
3. 选择分支和dist目录
4. 保存即可

### 步骤2：手机访问并安装

部署完成后，会得到一个网址，例如：
- Vercel: `https://your-app.vercel.app`
- Netlify: `https://your-app.netlify.app`

**在Android手机上：**
1. 用Chrome浏览器打开网址
2. 点击右上角 `⋮` 菜单
3. 选择"添加到主屏幕"或"安装应用"
4. 完成！桌面会出现应用图标

**在iPhone上：**
1. 用Safari浏览器打开网址
2. 点击底部分享按钮
3. 选择"添加到主屏幕"
4. 完成！

---

## 🏠 方式二：本地访问

如果只在家里/学校使用，可以本地运行：

### 步骤1：启动服务器

```bash
cd F:\AI编程\academic-timetable
npm run dev
```

### 步骤2：手机连接

确保手机和电脑在同一WiFi下，然后：

1. 查看终端显示的Network地址，例如：`http://192.168.5.103:3002`
2. 用手机浏览器打开这个地址
3. 按上述方法添加到主屏幕

**注意**：电脑关机后无法访问

---

## 📦 方式三：打包成原生APP（可选）

如果需要上架应用商店或需要更原生的体验：

### 使用Capacitor打包

```bash
# 1. 安装Capacitor
npm install @capacitor/core @capacitor/cli
npm install @capacitor/android

# 2. 初始化
npx cap init

# 3. 构建并添加Android平台
npm run build
npx cap add android

# 4. 同步资源
npx cap sync

# 5. 打开Android Studio
npx cap open android

# 6. 在Android Studio中构建APK
```

详细教程：https://capacitorjs.com/docs/getting-started

---

## 🎯 推荐方案对比

| 方案 | 优点 | 缺点 | 适用场景 |
|------|------|------|----------|
| **Vercel在线部署** | 完全免费、自动HTTPS、全球CDN加速 | 需要网络访问 | ⭐推荐，随时随地使用 |
| **本地运行** | 数据完全本地、无需部署 | 电脑需开机、仅本地网络 | 仅个人使用 |
| **打包成APK** | 可上架商店、体验接近原生 | 开发复杂、体积较大 | 商业发布 |

---

## 📊 数据存储说明

当前应用使用 **LocalStorage + IndexedDB** 本地存储方案：

### 数据位置
- **浏览器**：存储在浏览器本地数据库
- **PWA应用**：存储在应用独立数据空间

### 数据包括
- ✅ 课程信息（从Excel导入）
- ✅ 任务列表
- ✅ 用户设置

### 数据安全
- 🔒 数据仅存储在你的手机上
- 🔒 不会上传到任何服务器
- 🔒 卸载应用后数据会被删除

### 数据备份（可选功能）

如果需要多设备同步或云备份，可以：

1. **方案A：导出/导入功能**（已有）
   - 在"我的"页面导出数据为JSON文件
   - 在新设备导入该文件

2. **方案B：添加云同步**（需开发）
   - 使用Firebase、Supabase等后端服务
   - 支持自动同步到云端
   - 需要额外开发工作

---

## 🔧 常见问题

### Q1：安装后找不到应用图标？
**A**：检查"添加到主屏幕"是否成功，部分浏览器可能在应用抽屉中。

### Q2：离线后能用吗？
**A**：完全可以！安装后所有功能都支持离线使用。

### Q3：如何更新应用？
**A**：打开应用时会自动检查更新，刷新页面即可获取最新版本。

### Q4：数据会丢失吗？
**A**：只要不清除浏览器数据或卸载应用，数据会一直保留。建议定期导出备份。

### Q5：iOS支持PWA吗？
**A**：支持！但iOS的PWA功能稍弱，建议使用Safari添加。

### Q6：可以修改应用名称和图标吗？
**A**：可以！修改以下文件：
- 应用名称：`public/manifest.json` 中的 `name` 和 `short_name`
- 应用图标：替换 `public/icons/` 目录下的图标文件

---

## 📞 技术支持

遇到问题？
1. 查看浏览器控制台错误信息
2. 检查网络连接
3. 尝试清除浏览器缓存后重新安装

---

## 🎉 快速开始

**最简单的方式（5分钟上线）**：

```bash
# 1. 安装Vercel CLI
npm install -g vercel

# 2. 部署
cd F:\AI编程\academic-timetable
vercel --prod

# 3. 用手机访问生成的网址并安装
```

完成！现在你有一个可以添加到手机桌面的课程表应用了！
