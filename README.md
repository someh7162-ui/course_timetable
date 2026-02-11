# 📚 学术课程表 - PWA应用

一个简洁高效的学术课程表Progressive Web App（PWA），支持离线访问、添加到桌面，提供原生应用般的体验。

![Version](https://img.shields.io/badge/version-1.0.0-blue)
![React](https://img.shields.io/badge/React-19.2.4-61dafb)
![Vite](https://img.shields.io/badge/Vite-6.2.0-646cff)
![PWA](https://img.shields.io/badge/PWA-Ready-5a0fc8)

## ✨ 特性

- 📅 **课程表管理** - 清晰展示一周课程，支持多周切换
- 📥 **Excel导入** - 一键导入学校教务系统导出的课表
- ✅ **任务管理** - 记录作业、考试等重要任务
- 📱 **移动端优化** - 完美适配手机屏幕，无需横向滚动
- 🔄 **离线访问** - 安装后无需网络即可使用
- 💾 **本地存储** - 数据保存在本地，隐私安全
- 🎨 **深色主题** - 护眼的深色界面设计
- 🚀 **PWA支持** - 可添加到桌面，像原生APP一样使用

## 🚀 快速开始

### 在线访问（推荐）

**项目地址**: https://github.com/someh7162-ui/course_timetable

在手机浏览器中打开部署后的链接，点击"添加到主屏幕"即可安装。

### 本地运行

```bash
# 克隆仓库
git clone https://github.com/someh7162-ui/course_timetable.git
cd course_timetable

# 安装依赖
npm install

# 启动开发服务器
npm run dev

# 构建生产版本
npm run build

# 预览生产构建
npm run preview
```

## 📱 安装到手机

### Android (Chrome)

1. 用Chrome浏览器访问应用
2. 点击右上角菜单 `⋮`
3. 选择"添加到主屏幕"或"安装应用"
4. 确认安装

### iOS (Safari)

1. 用Safari浏览器访问应用
2. 点击底部分享按钮 ↑
3. 选择"添加到主屏幕"
4. 点击"添加"

## 🛠️ 部署指南

项目提供了多种部署方案，详见 [`打包成app/`](./打包成app/) 目录：

### 方法一：Netlify Drop（最简单）⭐

1. 构建项目：`npm run build`
2. 访问：https://app.netlify.com/drop
3. 拖拽 `dist` 文件夹到页面
4. 完成！

详细教程：[Netlify部署图文教程](./打包成app/Netlify部署图文教程.md)

### 方法二：Vercel

```bash
npm install -g vercel
vercel --prod
```

### 方法三：GitHub Pages

在仓库设置中启用GitHub Pages，选择部署分支。

## 📖 完整文档

- [PWA部署指南](./打包成app/PWA部署指南.md) - 完整的PWA部署文档
- [快速部署指南](./打包成app/快速部署指南.md) - 3种部署方法对比
- [Netlify图文教程](./打包成app/Netlify部署图文教程.md) - 最详细的步骤说明
- [部署清单](./打包成app/部署清单.md) - 技术清单和检查项
- [部署指南HTML](./打包成app/部署指南.html) - 可视化部署指南

## 🔧 技术栈

- **框架**: React 19
- **构建工具**: Vite 6
- **UI**: Tailwind CSS
- **PWA**: vite-plugin-pwa + Workbox
- **图标**: Lucide React
- **数据处理**: XLSX.js
- **存储**: LocalStorage + IndexedDB

## 📋 功能说明

### 课程表功能

- ✅ 一周课程视图
- ✅ 多周切换（支持20周）
- ✅ 课程详情查看（时间、地点、教师）
- ✅ Excel导入课程数据
- ✅ 自动高亮当前时间
- ✅ 支持课程冲突检测

### 任务管理

- ✅ 添加、编辑、删除任务
- ✅ 任务完成状态切换
- ✅ 任务提醒（截止时间）
- ✅ 任务分类（作业、考试、其他）

### 数据管理

- ✅ 本地数据存储
- ✅ 数据导出备份
- ✅ 数据导入恢复
- ✅ 清除所有数据

## 🔐 隐私说明

- 所有数据仅保存在您的设备本地
- 不会上传到任何服务器
- 不收集任何个人信息
- 卸载应用会删除所有数据

## 📊 浏览器支持

| 浏览器 | 版本 | PWA支持 |
|--------|------|---------|
| Chrome | 最新 | ✅ 完整支持 |
| Edge | 最新 | ✅ 完整支持 |
| Safari | 最新 | ⚠️ 部分支持 |
| Firefox | 最新 | ⚠️ 部分支持 |

## 🤝 贡献

欢迎提交Issue和Pull Request！

## 📝 更新日志

### v1.0.0 (2026-02-11)

- 🎉 初始版本发布
- ✅ 课程表展示和管理
- ✅ Excel导入功能
- ✅ 任务管理功能
- ✅ PWA支持
- ✅ 移动端适配
- ✅ 完整部署文档

## 📄 开源协议

MIT License

## 🙏 致谢

- [React](https://react.dev/) - UI框架
- [Vite](https://vitejs.dev/) - 构建工具
- [Tailwind CSS](https://tailwindcss.com/) - CSS框架
- [Lucide](https://lucide.dev/) - 图标库
- [SheetJS](https://sheetjs.com/) - Excel处理

## 📞 联系方式

- GitHub: [@someh7162-ui](https://github.com/someh7162-ui)
- 项目地址: https://github.com/someh7162-ui/course_timetable

---

⭐ 如果这个项目对你有帮助，请给个Star支持一下！
