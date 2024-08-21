import { Extension, PMPlugin } from "@slaykit/core";

export const TableOfContents = Extension.create({
  name: "tableOfContents",

  addStorage() {
    return {
      content: [],
    };
  },

  addProseMirrorPlugins() {
    return [
      new PMPlugin({
        view: () => ({
          update: (view) => {
            let headings: any = [];
            let itemIndex = 1;

            view.state.doc.descendants((node, pos) => {
              if (node.type.name === "heading") {
                const dataDocId =
                  node.content &&
                  node.content.content &&
                  node.content.content[0] &&
                  node.content.content[0].text;
                headings.push({
                  id: dataDocId,
                  levelId: `${itemIndex}`,
                  level: node.attrs.level,
                  textContent: node.textContent,
                  isActive: false,
                });
                itemIndex++;
              }
            });

            this.storage.content = headings;
          },
        }),
      }),
    ];
  },

  getHeadings() {
    return this.storage.content;
  },
});
