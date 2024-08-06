import { Node } from "@slaykit/core";

export const Document = Node.create({
  name: "doc",
  topNode: true,
  content: "block+",
});
