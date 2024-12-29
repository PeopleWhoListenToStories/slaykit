---
category: UA
---

# 🔥 Watermark Plugin

A lightweight and customizable JavaScript class for generating watermarks on a canvas element. The plugin supports both text and image-based watermarks with configurable options.

---

## ✨ Features

- Generate watermarks using either text or images.
- Highly customizable options, including font, color, spacing, size, and rotation.
- Supports high-definition displays with device pixel ratio adjustment.
- Works in modern browsers with `canvas` support.

---

## 📦 Installation

Install the plugin via npm or yarn or pnpm:

```bash
# Using npm
npm install @slaykit/watermark --save-dev

# Using yarn
yarn add @slaykit/watermark --dev

# Using pnpm
pnpm add @slaykit/watermark --save-dev
```

## 🚀 Usage

### Example: Text-based Watermark

```javascript
const options = {
  content: 'SlayKit',
  fontSize: 20,
  fontColor: 'rgba(0, 0, 0, 0.1)',
  rotate: -30,
};

const watermark = new Watermark(options);
watermark.create().then((dataURL) => {
  document.body.style.backgroundImage = `url(${dataURL})`;
});
```

### Example: Image-based Watermark

```javascript
const options = {
  image: 'https://xulai.me/favicon.svg',
  width: 150,
  height: 100,
  gapX: 300,
  gapY: 200,
};

const watermark = new Watermark(options);
watermark.create().then((dataURL) => {
  document.body.style.backgroundImage = `url(${dataURL})`;
});
```

## ⚙️ API Reference

### WatermarkOptions

| Property   | Type                                      | Default         | Description                                                                                      |
| ---------- | ----------------------------------------- | --------------- | ------------------------------------------------------------------------------------------------ |
| content    | string \| string[]                        | null            | Watermark text content. Can be a single string or an array of strings for multi-line watermarks. |
| rotate     | number                                    | -22             | Rotation angle of the watermark in degrees.                                                      |
| image      | string                                    | null            | URL of an image to be used as the watermark.                                                     |
| opacity    | number                                    | 1               | Opacity of the watermark in                                                                      |
| gapX       | number                                    | 212             | Horizontal spacing between watermarks.                                                           |
| gapY       | number                                    | 222             | Vertical spacing between watermarks.                                                             |
| width      | number                                    | 120             | Width of the watermark.                                                                          |
| height     | number                                    | 64              | Height of the watermark.                                                                         |
| offsetLeft | number                                    | gapX / 2        | Horizontal offset of the watermark.                                                              |
| offsetTop  | number                                    | gapY / 2        | Vertical offset of the watermark.                                                                |
| fontSize   | number                                    | 16              | Font size for text watermarks.                                                                   |
| fontFamily | string                                    | sans-serif      | Font family for text watermarks.                                                                 |
| fontWeight | "normal" \| "light" \| "weight" \| number | normal          | Font weight for text watermarks.                                                                 |
| fontColor  | string                                    | rgba(0,0,0,.15) | Font color for text watermarks.                                                                  |
| fontStyle  | CanvasFillStrokeStyles["fillStyle"]       | normal          | Text style for text watermarks.                                                                  |

## 贡献

如果你有任何改进建议或发现了问题，欢迎通过 GitHub Issues 向我们反馈，或者提交 Pull Request。
