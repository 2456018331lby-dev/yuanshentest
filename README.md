# 原神角色人格测试 | Genshin Impact Personality Quiz

> 发现你最像哪位提瓦特大陆的伙伴！
> Discover which Teyvat character matches your personality!

<!-- Add a screenshot here -->
<!-- ![Screenshot](images/screenshot.png) -->

## 简介

一款基于 8 大人格维度、64 道精心设计的题目，精准匹配 32 位原神角色的互动测试。支持雷达图分析、维度条形图、角色详细信息展示等功能。

A personality quiz with 8 dimensions and 64 questions that matches you to one of 32 Genshin Impact characters. Features radar charts, dimension analysis, and detailed character profiles.

## 特性 Features

- **8 大人格维度** — 外向/内向、实感/直觉、思考/情感、判断/知觉、冒险/谨慎、光明/黑暗、规则/混沌、热情/冷静
- **32 位角色匹配** — 通过欧氏距离算法精确匹配最相似的角色
- **雷达图可视化** — Canvas 绘制的人格雷达图，直观对比你与角色的差异
- **维度分析条** — 8 维度条形图展示你的性格偏向
- **前进 / 后退** — 支持返回上一题修改答案，分数自动修正
- **进度保存** — 自动保存答题进度，关闭后可继续测试
- **键盘快捷键** — 数字键 1-4 选择，方向键导航，左箭头返回
- **分享结果** — 支持 Web Share API 或一键复制
- **移动端适配** — 响应式设计，触屏友好的按钮尺寸
- **暗金主题** — 精致的原神风格暗色 UI

## 使用方法

### 直接打开

只需用浏览器打开 `index.html` 即可开始测试。无需服务器，无需构建工具。

### 部署到 GitHub Pages

1. Fork 或 clone 本仓库
2. 在 GitHub 仓库设置中启用 Pages
3. 选择 `main` 分支的根目录
4. 访问 `https://<username>.github.io/<repo>/`

### 本地开发

```bash
# 克隆仓库
git clone <repo-url>
cd yuanshentest

# 使用任意 HTTP 服务器打开
# 例如 Python:
python -m http.server 8080
# 或 Node.js:
npx serve .
```

## 技术栈

- **HTML5** — 语义化页面结构
- **CSS3** — CSS 自定义属性、渐变、动画、响应式布局
- **Canvas API** — 雷达图绘制
- **LocalStorage** — 进度保存与恢复
- **Web Share API** — 分享功能（降级为剪贴板复制）

无任何外部框架或运行时依赖（仅加载 Google Fonts 字体）。

## 项目结构

```
yuanshentest/
├── index.html          # 主页面
├── css/
│   └── style.css       # 样式文件
├── js/
│   ├── data.js         # 题目数据与角色数据（不要修改）
│   └── quiz.js         # 核心交互逻辑
├── images/
│   └── characters/     # 角色头像图片
└── README.md           # 本文件
```

## 数据说明

- **64 道题目**，每个维度 8 道
- **4 个选项 / 题**，每选项含维度分值（+2, +1, -1, -2）
- **32 位角色**，每位角色有 8 维度雷达图基准值
- 匹配算法：计算用户 8 维度得分与各角色的欧氏距离，取最小值

> `js/data.js` 包含所有题目和角色数据，格式清晰，可根据需要自定义。

## 自定义指南

- **添加题目**：编辑 `js/data.js` 中的 `questions` 数组
- **添加角色**：编辑 `js/data.js` 中的 `characters` 对象
- **修改样式**：编辑 `css/style.css`，颜色变量在 `:root` 中定义
- **调整匹配算法**：修改 `quiz.js` 中的 `findBestMatch()` 方法

## 浏览器支持

| 浏览器 | 版本 |
|--------|------|
| Chrome | 80+ |
| Firefox | 78+ |
| Safari | 14+ |
| Edge | 80+ |

## 许可证 License

MIT License

```
MIT License

Copyright (c) 2024

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

## 贡献指南 Contributing

欢迎贡献！请遵循以下步骤：

1. Fork 本仓库
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 创建 Pull Request

### 贡献方向

- 增加更多角色
- 优化匹配算法
- 增加多语言支持
- 添加更多角色详情（武器、圣遗物推荐等）
- 改进移动端体验
- 添加音效或背景音乐支持

## 致谢

- 角色数据基于 [原神](https://genshin.hoyoverse.com/) 游戏内容
- 字体：Google Fonts (Noto Sans SC, Noto Serif SC, Cinzel)

## Maintainers

**Simon Su** ([@Simon-Su-1105](https://github.com/Simon-Su-1105)) — Key Maintainer & Contributor  
Email: 1362495971@qq.com
