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

        let patienceLabel = this.contentEl.createEl('label', {text: 'Patience'})
        this.contentEl.createEl('br');
        let patience = this.contentEl.createEl('input', {type:'range'})
        let patienceDataList = this.contentEl.createEl('datalist');
        let intrigueLabel = this.contentEl.createEl('label', {text: 'Intrique'})
        this.contentEl.createEl('br');
        let intrigue = this.contentEl.createEl('input', {type:'range'})
        let intrigueDataList = this.contentEl.createEl('datalist');

        patienceDataList.id = 'values';
        patienceDataList.style.width = '80%'
        for (let i = 0; i < 6; i++)
        {
            let option = patienceDataList.createEl('option', {value: i.toString()});
            option.label = i.toString();
        }
        
        patience.setAttribute('list', 'values')
        patience.min = "0";
        patience.max = "5";
        patience.step = "1";
        patience.style.width = '80%'

        intrigueDataList.id = 'values';
        intrigueDataList.style.width = '80%'
        for (let i = 0; i < 6; i++)
        {
            let option = intrigueDataList.createEl('option', {value: i.toString()});
            option.label = i.toString();
        }

        intrigue.setAttribute('list', 'values')
        intrigue.min = "0";
        intrigue.max = "5";
        intrigue.step = "1";
        intrigue.style.width = '80%'
    }
    
    async onClose() {
        // Nothing to clean up. FOR NOW
    }

}