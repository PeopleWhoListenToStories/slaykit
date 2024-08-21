---
outline: deep
---

# Base Text Editor

```javascript
import { Editor } from "@slaykit/core";
import { Document } from "@slaykit/document";
import { TextKit } from "@slaykit/text-kit";

const editor = new Editor({
  element: document.querySelector("#app"),
  extensions: [Document, TextKit],
});
```

<script setup>
import BaseTextEditor from './examples/base-text-editor.vue'
</script>

Try type below:

<BaseTextEditor />
