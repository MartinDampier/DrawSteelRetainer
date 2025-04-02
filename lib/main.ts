import { App, ButtonComponent, Editor, MarkdownView, Modal, Notice, Plugin, PluginSettingTab, Setting, WorkspaceLeaf } from 'obsidian';
import { InitiativeView } from './Views/InitiativeTrackerView';
import { NegotiationView } from './Views/NegotiationView';
import { INITIATIVE_VIEW, TableFormat, TableFlag, NEGOTIATION_VIEW } from 'lib/Models/Constants';
import Creature from 'lib/Models/Creature';
import {RetainerSettings, DEFAULT_SETTINGS, RetainerSettingTab} from 'lib/Settings'
import { CreatureTypes } from './Models/CreatureTypes';
// Remember to rename these classes and interfaces!

export default class ForbiddenLandsCharacterSheet extends Plugin {
	settings: RetainerSettings;
	creatures: Creature[] = [];

	async onload() {
		await this.loadSettings();
		this.registerView(
			INITIATIVE_VIEW,
			(leaf) => new InitiativeView(leaf, this.creatures, this.settings.playerCharacters)
		);
		this.registerView(
			NEGOTIATION_VIEW,
			(leaf) =>  new NegotiationView(leaf, this.settings, true)
		);

		this.addRibbonIcon('scroll-text', 'DRAW STEEL! (Initiative Tracker)', () => {
			this.activateInitiativeView();
		});
		this.addRibbonIcon('messages-square', 'TALK IT OUT! (Negotiation Tracker)', () => {
			this.activateNegotiationView();
		});


		// This adds a status bar item to the bottom of the app. Does not work on mobile apps.
		const statusBarItemEl = this.addStatusBarItem();
		statusBarItemEl.setText('Status Bar Text');
		
		// this.addCommands();
		// This adds a settings tab so the user can configure letious aspects of the plugin
		this.addSettingTab(new RetainerSettingTab(this.app, this));
	}

	importSelectionToTracker(editor: Editor){
		if(!(editor.somethingSelected())) {
			return;
		}

		let selection = editor.getSelection();
		let done = false;
		let lines: string[] = [];
		lines = selection.split('\n');
		let flagFound = false;
		let creatures = [];
		for(let i = 0; i < lines.length; i++){
			let sample = lines[i];
			if (sample.contains(TableFlag))
			{
				flagFound = true;
				continue;
			}
			if (flagFound && sample.contains("|"))
			{
				let cells = sample.split("|");
				let creature = new Creature();
				creature.Name = cells[1];
				creature.MaxStamina = +cells[2];
				creature.Id = creatures.length.toString();
				creatures.push(creature);
			}
		}
		if (creatures.length > 0)
		{
			this.creatures = creatures;
			this.activateInitiativeView();
			this.creatures = [];
		}
	}

	onunload() {
	}

	async activateNegotiationView() {
		const { workspace } = this.app;
	
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(NEGOTIATION_VIEW);
	
		if (leaves.length > 0) {
		  // A leaf with our view already exists, use that
		  leaf = leaves[0];

		} else {
		  // Our view could not be found in the workspace, create a new leaf
		  // in the right sidebar for it
		  
		  leaf = workspace.getRightLeaf(false);
		  if (leaf != null)
			await leaf.setViewState({ type: NEGOTIATION_VIEW, active: true });
		}
	
		// "Reveal" the leaf in case it is in a collapsed sidebar
		if (leaf != null)
		workspace.revealLeaf(leaf);
	}

	async activateInitiativeView() {
		const { workspace } = this.app;
	
		let leaf: WorkspaceLeaf | null = null;
		const leaves = workspace.getLeavesOfType(INITIATIVE_VIEW);
	
		if (leaves.length > 0) {
		  // A leaf with our view already exists, use that
		  leaf = leaves[0];

		} else {
		  // Our view could not be found in the workspace, create a new leaf
		  // in the right sidebar for it
		  
		  leaf = workspace.getRightLeaf(false);
		  if (leaf != null)
			await leaf.setViewState({ type: INITIATIVE_VIEW, active: true });
		}
	
		// "Reveal" the leaf in case it is in a collapsed sidebar
		if (leaf != null)
		workspace.revealLeaf(leaf);
	}

	async loadSettings() {
		this.settings = Object.assign({}, DEFAULT_SETTINGS, await this.loadData());
		console.log("Settings Loaded");
	}

	async saveSettings() {
		await this.saveData(this.settings);
		console.log("Settings Saved");
	}
}