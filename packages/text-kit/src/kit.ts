import { Extension } from "@slaykit/core";

import { Bold, type BoldOptions } from "./bold";
import { Code, type CodeOptions } from "./code";
import { Color, type ColorOptions } from "./color";
import { Italic, type ItalicOptions } from "./italic";
import { Strike, type StrikeOptions } from "./strike";
import { HardBreak, type HardBreakOptions } from "./hard-break";
import { Paragraph, type ParagraphOptions } from "./paragraph";
import { CodeBlock, type CodeBlockOptions } from "./code-block";
import { TextStyle, type TextStyleOptions } from "./text-style";
import { TextAlign, type TextAlignOptions } from "./text-align";
import { Blockquote, type BlockquoteOptions } from "./blockquote";
import { Subscript, type SubscriptOptions } from "./subscript";
import { Superscript, type SuperscriptOptions } from "./superscript";
import { FontFamily, type FontFamilyOptions } from "./font-family";
import { Text } from "./text";

export interface TextKitOptions {
  bold: Partial<BoldOptions> | false;
  code: Partial<CodeOptions> | false;
  color: Partial<ColorOptions> | false;
  italic: Partial<ItalicOptions> | false;
  strike: Partial<StrikeOptions> | false;
  hardBreak: Partial<HardBreakOptions> | false;
  paragraph: Partial<ParagraphOptions> | false;
  codeBlock: Partial<CodeBlockOptions> | false;
  textStyle: Partial<TextStyleOptions> | false;
  textAlign: Partial<TextAlignOptions> | false;
  blockquote: Partial<BlockquoteOptions> | false;
  subscript: Partial<SubscriptOptions> | false;
  superscript: Partial<SuperscriptOptions> | false;
  fontFamily: Partial<FontFamilyOptions> | false;
  text: false;
}

export const TextKit = Extension.create<TextKitOptions>({
  name: "textKit",

  addExtensions() {
    const extensions = [];

    if (this.options.blockquote !== false) {
      extensions.push(Blockquote.configure(this.options?.blockquote));
    }

    if (this.options.bold !== false) {
      extensions.push(Bold.configure(this.options?.bold));
    }

    if (this.options.code !== false) {
      extensions.push(Code.configure(this.options?.code));
    }

    if (this.options.color !== false) {
      extensions.push(Color.configure(this.options?.color));
    }

    if (this.options.hardBreak !== false) {
      extensions.push(HardBreak.configure(this.options?.hardBreak));
    }

    if (this.options.italic !== false) {
      extensions.push(Italic.configure(this.options?.italic));
    }

    if (this.options.paragraph !== false) {
      extensions.push(Paragraph.configure(this.options?.paragraph));
    }

    if (this.options.strike !== false) {
      extensions.push(Strike.configure(this.options?.strike));
    }

    if (this.options.codeBlock !== false) {
      extensions.push(CodeBlock.configure(this.options?.codeBlock));
    }

    if (this.options.subscript !== false) {
      extensions.push(Subscript.configure(this.options?.subscript));
    }

    if (this.options.superscript !== false) {
      extensions.push(Superscript.configure(this.options?.superscript));
    }
    
    if(this.options.fontFamily !== false) {
      extensions.push(FontFamily.configure(this.options?.fontFamily));
    }

    if (this.options.textStyle !== false) {
      extensions.push(TextStyle.configure(this.options?.textStyle));
    }

    if (this.options.textAlign !== false) {
      extensions.push(TextAlign.configure(this.options?.textAlign));
    }

    if (this.options.text !== false) {
      extensions.push(Text.configure(this.options?.text));
    }

    return extensions;
  },
});
