import { describe, it, expect, vi, beforeEach } from 'vitest';
import { Watermark, WatermarkOptions } from '../src';

// Mock global methods and classes for tests
beforeEach(() => {
  vi.stubGlobal(
    'Image',
    class {
      src = '';
      onload = () => {};
      onerror = (error: Error) => {};
      constructor() {
        this.src = '';
      }
    },
  );
});

describe('Watermark class', () => {
  describe('constructor', () => {
    it('should set default options if no options are passed', () => {
      const watermark = new Watermark();
      const options = watermark['options'];

      // Assert default options
      expect(options.gapX).toBe(212);
      expect(options.gapY).toBe(222);
      expect(options.width).toBe(120);
      expect(options.height).toBe(64);
      expect(options.rotate).toBe(-22);
      expect(options.opacity).toBe(1);
      expect(options.fontStyle).toBe('normal');
      expect(options.fontWeight).toBe('normal');
      expect(options.fontColor).toBe('rgba(0,0,0,.15)');
      expect(options.fontSize).toBe(16);
      expect(options.fontFamily).toBe('sans-serif');
    });

    it('should allow custom options to override defaults', () => {
      const customOptions: WatermarkOptions = {
        gapX: 300,
        gapY: 250,
        rotate: 45,
        opacity: 0.5,
      };

      const watermark = new Watermark(customOptions);
      const options = watermark['options'];

      // Assert custom options override default options
      expect(options.gapX).toBe(300);
      expect(options.gapY).toBe(250);
      expect(options.rotate).toBe(45);
      expect(options.opacity).toBe(0.5);
    });
  });

  describe('create method', () => {
    it('should create a valid data URL for a watermark', async () => {
      const watermark = new Watermark({
        content: 'Test Watermark',
        width: 200,
        height: 100,
        gapX: 220,
        gapY: 230,
        fontSize: 20,
      });

      // Assert that the create method returns a valid data URL
      const dataUrl = await watermark.create();
      expect(dataUrl).toMatch(/^data:image\/png;base64,/);
    });

    it('should throw an error if canvas context is not supported', async () => {
      const watermark = new Watermark();

      // Mock unsupported canvas context
      const originalGetContext = HTMLCanvasElement.prototype.getContext;
      HTMLCanvasElement.prototype.getContext = vi.fn().mockReturnValue(null);

      // Assert that an error is thrown
      await expect(watermark.create()).rejects.toThrowError('Canvas is not supported in the current environment.');

      // Restore the original getContext method
      HTMLCanvasElement.prototype.getContext = originalGetContext;
    });
  });

  describe('drawImageWatermark method', () => {
    it('should draw an image watermark', async () => {
      const watermark = new Watermark({ image: 'some-image-url' });

      const ctx = createMockCanvasContext();

      // Call the drawImageWatermark method
      await watermark['drawImageWatermark'](ctx, 'image-url', 200, 100, 0.8);

      // Assert the behavior of drawing the image
      expect(ctx.save).toHaveBeenCalledOnce();
      expect(ctx.globalAlpha).toBe(0.8);
      expect(ctx.drawImage).toHaveBeenCalledWith(expect.any(Image), 0, 0, 200, 100);
      expect(ctx.restore).toHaveBeenCalledOnce();
    });

    it('should handle image loading error', async () => {
      const watermark = new Watermark({ image: 'invalid-image-url' });

      const ctx = {} as CanvasRenderingContext2D;
      const imageSrc = 'invalid-url';

      // Simulate image loading error
      const img = new Image();
      img.src = imageSrc;
      img.onerror(new Error('Image load error'));

      await expect(watermark['drawImageWatermark'](ctx, imageSrc, 200, 100, 1)).rejects.toThrowError(
        'Failed to load image: Error: Image load error',
      );
    });
  });

  describe('drawTextWatermark method', () => {
    it('should draw text watermark', () => {
      const watermark = new Watermark({ content: 'Test Text' });

      const ctx = {
        font: '',
        fillStyle: '',
        fillText: vi.fn(),
      } as unknown as CanvasRenderingContext2D;

      const options = {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontColor: 'rgba(0,0,0,.15)',
        fontSize: 16,
        fontFamily: 'sans-serif',
        lineHeight: 64,
      };

      watermark['drawTextWatermark'](ctx, 'Test Text', options);

      // Assert that text drawing happens correctly
      expect(ctx.fillText).toHaveBeenCalledWith('Test Text', 0, 0);
    });

    it('should handle multiple lines of text', () => {
      const watermark = new Watermark({ content: ['Line 1', 'Line 2'] });

      const ctx = {
        font: '',
        fillStyle: '',
        fillText: vi.fn(),
      } as unknown as CanvasRenderingContext2D;

      const options = {
        fontStyle: 'normal',
        fontWeight: 'normal',
        fontColor: 'rgba(0,0,0,.15)',
        fontSize: 16,
        fontFamily: 'sans-serif',
        lineHeight: 64,
      };

      watermark['drawTextWatermark'](ctx, ['Line 1', 'Line 2'], options);

      // Assert that the multiple lines are drawn at correct positions
      expect(ctx.fillText).toHaveBeenCalledWith('Line 1', 0, 0);
      expect(ctx.fillText).toHaveBeenCalledWith('Line 2', 0, 32); // Adjusted vertical position
    });
  });
});

// Helper function to create mock canvas context
function createMockCanvasContext(): CanvasRenderingContext2D {
  return {
    save: vi.fn(),
    restore: vi.fn(),
    globalAlpha: 1,
    drawImage: vi.fn(),
  } as unknown as CanvasRenderingContext2D;
}
