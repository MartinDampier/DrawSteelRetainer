import { NEGOTIATION_VIEW } from "lib/Models/Constants";
import { ItemView, WorkspaceLeaf } from "obsidian";

export class NegotiationView extends ItemView {

    constructor(leaf: WorkspaceLeaf) {
        super(leaf);
    }

    getViewType() {
        return NEGOTIATION_VIEW;
      }
    
    getDisplayText() {
        return 'Negotiation Tracker';
    }
    getIcon() {
        return "messages-square";
    }
    async onOpen() {
        this.contentEl.empty();
    }
    
    async onClose() {
        // Nothing to clean up. FOR NOW
    }

}