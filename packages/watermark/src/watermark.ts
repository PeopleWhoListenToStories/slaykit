interface WatermarkOptions {
  /** Watermark text content */
  content?: string | string[];
  /** Rotation angle of the watermark in degrees. @default `-22` */
  rotate?: number;
  /** High-definition image source for the watermark. */
  image?: string;
  /** Horizontal spacing between watermarks. @default `212` */
  gapX?: number;
  /** Vertical spacing between watermarks. @default `222` */
  gapY?: number;
  /** Width of the watermark. @default `120` */
  width?: number;
  /** Height of the watermark. @default `64` */
  height?: number;
  /** Horizontal offset of the watermark. Defaults to `gapX / 2`. */
  offsetLeft?: number;
  /** Vertical offset of the watermark. Defaults to `gapY / 2`. */
  offsetTop?: number;
  /** Font size of the text. @default `16` */
  fontSize?: number;
  /** Font family of the text. @default `sans-serif` */
  fontFamily?: string;
  /** Font weight of the text. @default `normal` */
  fontWeight?: 'normal' | 'light' | 'weight' | number;
  /** Font color of the text. @default `rgba(0,0,0,.15)` */
  fontColor?: string;
  /** Font style of the text. @default `normal` */
  fontStyle?: CanvasFillStrokeStyles['fillStyle'];
  /** Opacity of the watermark. @default `1` */
  opacity?: number;
}

/**
 * Returns the pixel ratio for high-DPI screens.
 * @param context CanvasRenderingContext2D | null
 * @returns Pixel ratio
 */
const getPixelRatio = (context: CanvasRenderingContext2D | null): number => {
  if (!context) return 1;
  const backingStore =
    context.backingStorePixelRatio ||
    context.webkitBackingStorePixelRatio ||
    context.mozBackingStorePixelRatio ||
    context.msBackingStorePixelRatio ||
    context.oBackingStorePixelRatio ||
    1;
  return (window.devicePixelRatio || 1) / backingStore;
};

class Watermark {
  private options: WatermarkOptions;

  constructor(options: WatermarkOptions = {}) {
    // Default options
    const defaultOptions: WatermarkOptions = {
      gapX: 212,
      gapY: 222,
      width: 120,
      height: 64,
      rotate: -22,
      opacity: 1,
      fontStyle: 'normal',
      fontWeight: 'normal',
      fontColor: 'rgba(0,0,0,.15)',
      fontSize: 16,
      fontFamily: 'sans-serif',
    };

    // Merge user options with defaults
    this.options = { ...defaultOptions, ...options };
  }

  /**
   * Creates the watermark and returns it as a data URL.
   * @returns Promise<string>
   */
  async create(): Promise<string> {
    const {
      image,
      content,
      gapX,
      gapY,
      width,
      height,
      rotate,
      opacity,
      fontStyle,
      fontWeight,
      fontColor,
      fontSize,
      fontFamily,
      offsetLeft,
      offsetTop,
    } = this.options;

    // Create canvas and context
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    if (!ctx) throw new Error('Canvas is not supported in the current environment.');

    // Calculate pixel ratio for high-DPI screens
    const ratio = getPixelRatio(ctx);

    // Set canvas dimensions
    canvas.width = (gapX! + width!) * ratio;
    canvas.height = (gapY! + height!) * ratio;

    // Set offsets
    const canvasOffsetLeft = offsetLeft ?? gapX! / 2;
    const canvasOffsetTop = offsetTop ?? gapY! / 2;

    // Transform context for rotation
    ctx.translate(canvasOffsetLeft * ratio, canvasOffsetTop * ratio);
    ctx.rotate((Math.PI / 180) * rotate!);

    const markWidth = width! * ratio;
    const markHeight = height! * ratio;

    // Draw image watermark
    if (image) {
      await this.drawImageWatermark(ctx, image, markWidth, markHeight, opacity);
    }

    // Draw text watermark
    if (content) {
      this.drawTextWatermark(ctx, content, {
        fontStyle,
        fontWeight,
        fontColor,
        fontSize: fontSize! * ratio,
        fontFamily,
        lineHeight: markHeight,
      });
    }

    return canvas.toDataURL();
  }

  /**
   * Draws an image watermark on the canvas.
   * @param ctx CanvasRenderingContext2D
   * @param imageSrc string
   * @param width number
   * @param height number
   * @param opacity number (0 to 1, default is 1 for full opacity)
   */
  private async drawImageWatermark(
    ctx: CanvasRenderingContext2D,
    imageSrc: string,
    width: number,
    height: number,
    opacity: number = 1,
  ): Promise<void> {
    const img = new Image();
    img.crossOrigin = 'anonymous';
    img.referrerPolicy = 'no-referrer';
    img.src = imageSrc;

    return new Promise((resolve, reject) => {
      img.onload = () => {
        // Save the current canvas state
        ctx.save();

        // Set the global alpha (opacity)
        ctx.globalAlpha = opacity;

        // Draw the image on the canvas
        ctx.drawImage(img, 0, 0, width, height);

        // Restore the canvas state
        ctx.restore();

        resolve();
      };

      img.onerror = (error) => reject(new Error(`Failed to load image: ${error}`));
    });
  }

  /**
   * Draws a text watermark on the canvas.
   * @param ctx CanvasRenderingContext2D
   * @param content string | string[]
   * @param options Object containing text style properties
   */
  private drawTextWatermark(
    ctx: CanvasRenderingContext2D,
    content: string | string[],
    options: {
      fontStyle: string;
      fontWeight: string | number;
      fontColor: string;
      fontSize: number;
      fontFamily: string;
      lineHeight: number;
    },
  ): void {
    const { fontStyle, fontWeight, fontColor, fontSize, fontFamily, lineHeight } = options;
    ctx.font = `${fontStyle} normal ${fontWeight} ${fontSize}px/${lineHeight}px ${fontFamily}`;
    ctx.fillStyle = fontColor;

    if (Array.isArray(content)) {
      content.forEach((text, index) => {
        ctx.fillText(text, 0, index * fontSize * 2); // Adjust vertical position
      });
    } else {
      ctx.fillText(content, 0, 0);
    }
  }
}

export { Watermark, WatermarkOptions };
