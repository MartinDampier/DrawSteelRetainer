import { ItemView,
   WorkspaceLeaf,
  ButtonComponent,
ExtraButtonComponent } from "obsidian";

export const VIEW_TYPE_EXAMPLE = "example-view";

export class ExampleView extends ItemView {
  gridE1: HTMLDivElement;
  constructor(leaf: WorkspaceLeaf) {
    super(leaf);
  }

  getViewType() {
    return VIEW_TYPE_EXAMPLE;
  }

  getDisplayText() {
    return "Example view";
  }

  async onOpen() {
    this.display();
  }

  async onClose() {
    // Nothing to clean up.
  }

  async display()
  {
    const container = this.containerEl.children[1];
    container.empty();
    container.createEl("div", { text: "Abilities" });
    container.children[0].createEl("button", { text: "POWER ROLL", click:  });

  }
}