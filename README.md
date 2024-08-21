<h2 align="center">
    SlayKit
</h2>

<p align="center">
SlayKit is a toolkit editor suite based on tiptap and prosemirror.
</p>

```typescript
import { EditorContent, useEditor } from "@slaykit/react";
import { Document } from "@slaykit/document";
import { TextKit } from "@slaykit/text-kit";
import { BlockTile } from "@slaykit/blocktile";
import { Uuid } from "@slaykit/uuid";

export const Editor = () => {
  const editor = useEditor({
    extensions: [
      Document.extend({ content: "blockTile+" }),
      Uuid,
      BlockTile,
      TextKit,
    ],
  });

  return (
    <div>
      <EditorContent className={styles.editorWrapper} editor={editor}></EditorContent>
    </div>
  );
};
```
