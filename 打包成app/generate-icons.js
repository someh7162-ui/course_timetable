import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 创建简单的PNG图标（使用Canvas或安装sharp库）
// 这里我们创建一个安装指南文件

const sizes = [72, 96, 128, 144, 152, 192, 384, 512];

const instructions = `
# 图标生成说明

## 方法一：使用在线工具（推荐）
1. 访问 https://realfavicongenerator.net/ 或 https://www.pwabuilder.com/imageGenerator
2. 上传 public/icons/icon.svg 文件
3. 下载生成的所有尺寸图标
4. 将图标放到 public/icons/ 目录下，命名格式：icon-{size}x{size}.png

## 方法二：使用ImageMagick命令行工具
如果已安装ImageMagick，运行以下命令：

${sizes.map(size => `convert public/icons/icon.svg -resize ${size}x${size} public/icons/icon-${size}x${size}.png`).join('\n')}

## 方法三：使用在线SVG转PNG工具
1. 访问 https://cloudconvert.com/svg-to-png
2. 上传 icon.svg
3. 设置尺寸为 512x512
4. 下载后使用图片编辑软件调整为所需尺寸

## 所需图标尺寸：
${sizes.map(size => `- ${size}x${size}px`).join('\n')}
`;

console.log(instructions);

// 创建占位图标（base64）
const createPlaceholderIcon = (size) => {
  const svgContent = `<svg xmlns="http://www.w3.org/2000/svg" width="${size}" height="${size}" viewBox="0 0 512 512">
  <rect width="512" height="512" fill="#193ce6" rx="100"/>
  <g fill="white">
    <rect x="100" y="120" width="312" height="272" rx="20" fill="none" stroke="white" stroke-width="24"/>
    <rect x="100" y="120" width="312" height="80" rx="20" fill="white" opacity="0.9"/>
    <line x1="180" y1="100" x2="180" y2="160" stroke="white" stroke-width="16" stroke-linecap="round"/>
    <line x1="332" y1="100" x2="332" y2="160" stroke="white" stroke-width="16" stroke-linecap="round"/>
    <line x1="140" y1="240" x2="372" y2="240" stroke="white" stroke-width="3" opacity="0.3"/>
    <line x1="140" y1="280" x2="372" y2="280" stroke="white" stroke-width="3" opacity="0.3"/>
    <line x1="140" y1="320" x2="372" y2="320" stroke="white" stroke-width="3" opacity="0.3"/>
    <circle cx="160" cy="260" r="8" fill="#fbbf24"/>
    <circle cx="200" cy="260" r="8" fill="#10b981"/>
    <circle cx="280" cy="260" r="8" fill="#f87171"/>
    <circle cx="160" cy="300" r="8" fill="#818cf8"/>
    <circle cx="240" cy="300" r="8" fill="#fbbf24"/>
    <circle cx="320" cy="340" r="8" fill="#10b981"/>
  </g>
</svg>`;
  
  // 写入到项目的 public/icons 目录
  const projectRoot = path.resolve(__dirname, '..');
  const svgFilename = path.join(projectRoot, 'public', 'icons', `icon-${size}x${size}.svg`);
  fs.writeFileSync(svgFilename, svgContent);
  console.log(`Created placeholder: icon-${size}x${size}.svg`);
};

// 创建占位符
sizes.forEach(createPlaceholderIcon);

console.log('\n占位图标已创建（SVG格式）。请使用上述方法生成PNG图标以获得最佳效果。');
