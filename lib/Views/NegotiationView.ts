import { NEGOTIATION_VIEW } from "lib/Models/Constants";
import { ItemView, TextComponent, WorkspaceLeaf } from "obsidian";

export class NegotiationView extends ItemView {
    isCreate: boolean;
    wizardEl: HTMLElement;

    constructor(leaf: WorkspaceLeaf, isCreate: boolean) {
        super(leaf);
        this.isCreate = isCreate;
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
        this.buildWizard();
    }
    
    private buildWizard() {
        this.contentEl.empty();
        this.wizardEl = this.contentEl.createDiv();
        this.wizardEl.addClass('Centered');
        this.wizardEl.addClass('fill');
        this.wizardEl.createEl('label', {text: 'Character Name'});
        this.wizardEl.createEl('br');
        new TextComponent(this.wizardEl).setPlaceholder('John Smith');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('label', {text: 'Languages'})
        this.wizardEl.createEl('br');
        new TextComponent(this.wizardEl).setPlaceholder('John Smith');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('label', {text: 'Motivations'})
        this.wizardEl.createEl('br');
        new TextComponent(this.wizardEl).setPlaceholder('John Smith');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('label', {text: 'Pitfalls'})
        this.wizardEl.createEl('br');
        new TextComponent(this.wizardEl).setPlaceholder('John Smith');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('br');
        this.wizardEl.createEl('label', {text: 'Offers'})
        this.wizardEl.createEl('br');
        new TextComponent(this.wizardEl).setPlaceholder('John Smith');
    }

    private buildTracker() {
        this.contentEl.empty();
        this.buildSliderSection();
    }

    private buildSliderSection() {
        let inputGrid = this.contentEl.createDiv({cls: 'Centered'});
        inputGrid.createEl('label', {text: 'Patience'})
        inputGrid.createEl('br');
        let patience = inputGrid.createEl('input', {type:'range', cls: 'slider'})
        let patienceDataList = inputGrid.createEl('datalist', {cls: 'Centered'});
        inputGrid.createEl('label', {text: 'Intrique'})
        inputGrid.createEl('br');
        let intrigue = inputGrid.createEl('input', {type:'range'})
        let intrigueDataList = inputGrid.createEl('datalist', {cls: 'Centered'});

        patienceDataList.id = 'values';
        for (let i = 0; i < 6; i++)
        {
            let option = patienceDataList.createEl('option', {value: i.toString()});
            option.label = i.toString();
        }
        
        patience.setAttribute('list', 'values')
        patience.min = "0";
        patience.max = "5";
        patience.step = "1";

        intrigueDataList.id = 'values';
        for (let i = 0; i < 6; i++)
        {
            let option = intrigueDataList.createEl('option', {value: i.toString()});
            option.label = i.toString();
        }

        intrigue.setAttribute('list', 'values')
        intrigue.min = "0";
        intrigue.max = "5";
        intrigue.step = "1";
    }

    async onClose() {
        // Nothing to clean up. FOR NOW
    }

}