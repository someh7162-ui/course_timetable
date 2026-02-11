@echo off
REM 学术课程表 PWA 一键部署脚本 (Windows版本)

echo ======================================
echo   学术课程表 PWA 一键部署工具
echo ======================================
echo.

REM 检查Node.js
where node >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo ❌ 错误: 未检测到Node.js，请先安装Node.js
    pause
    exit /b 1
)

for /f "tokens=*" %%i in ('node -v') do set NODE_VERSION=%%i
echo ✅ Node.js 版本: %NODE_VERSION%
echo.

echo 请选择部署方式：
echo 1) Vercel (推荐 - 最简单)
echo 2) Netlify
echo 3) 仅构建，不部署
echo.
set /p choice="请输入选项 (1-3): "

if "%choice%"=="1" goto vercel
if "%choice%"=="2" goto netlify
if "%choice%"=="3" goto build_only
goto invalid

:vercel
echo.
echo 📦 正在构建应用...
call npm run build

where vercel >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️  未检测到Vercel CLI，正在安装...
    call npm install -g vercel
)

echo.
echo 🚀 正在部署到Vercel...
call vercel --prod

echo.
echo ✅ 部署完成！
echo 📱 请用手机浏览器访问上方显示的网址，然后：
echo    - Android: 菜单 → 添加到主屏幕
echo    - iOS: 分享 → 添加到主屏幕
goto end

:netlify
echo.
echo 📦 正在构建应用...
call npm run build

where netlify >nul 2>nul
if %ERRORLEVEL% NEQ 0 (
    echo.
    echo ⚠️  未检测到Netlify CLI，正在安装...
    call npm install -g netlify-cli
)

echo.
echo 🚀 正在部署到Netlify...
call netlify deploy --prod --dir=dist

echo.
echo ✅ 部署完成！
echo 📱 请用手机浏览器访问上方显示的网址，然后：
echo    - Android: 菜单 → 添加到主屏幕
echo    - iOS: 分享 → 添加到主屏幕
goto end

:build_only
echo.
echo 📦 正在构建应用...
call npm run build

echo.
echo ✅ 构建完成！
echo 📁 构建文件位于: dist/
echo.
echo 后续步骤：
echo 1. 将 dist/ 目录上传到任何静态网站托管服务
echo 2. 或运行 'npm run preview' 进行本地预览
goto end

:invalid
echo ❌ 无效选项
pause
exit /b 1

:end
echo.
echo ======================================
echo   部署完成！
echo ======================================
pause
