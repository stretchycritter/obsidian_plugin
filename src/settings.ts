import { App, PluginSettingTab, Setting, Modal } from 'obsidian';
import MyPlugin from './main';

export interface MyPluginSettings {
	mySetting: string;
	dropdown: string;
	checkbox: boolean;
	checkbox2: boolean;
	radioButton: string;
}

export const DEFAULT_SETTINGS: MyPluginSettings = {
	mySetting: 'default',
	dropdown: 'one',
	checkbox: true,
	checkbox2: false,
	radioButton: 'one'
};

export class SampleSettingTab extends PluginSettingTab {
	plugin: MyPlugin;

	constructor(app: App, plugin: MyPlugin) {
		super(app, plugin);
		this.plugin = plugin;
	}

	display(): void {
		const { containerEl } = this;

		containerEl.empty();

		new Setting(containerEl)
			.setName('Text setting')
			.setDesc('A regular text setting')
			.addText(text => text
				.setPlaceholder('Enter your secret')
				.setValue(this.plugin.settings.mySetting)
				.onChange(async (value) => {
					this.plugin.settings.mySetting = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Dropdown')
			.setDesc('An example dropdown')
			.addDropdown(dropdown => dropdown
				.addOption('one', 'Option 1')
				.addOption('two', 'Option 2')
				.addOption('three', 'Option 3')
				.setValue(this.plugin.settings.dropdown)
				.onChange(async (value) => {
					this.plugin.settings.dropdown = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Button')
			.setDesc('A button that opens a popup')
			.addButton(button => button
				.setButtonText('Open popup')
				.onClick(() => {
					new SampleModal(this.app).open();
				}));

		new Setting(containerEl)
			.setName('Checkboxes')
			.setDesc('A set of checkboxes')
			.addToggle(toggle => toggle
				.setTooltip('Checkbox 1')
				.setValue(this.plugin.settings.checkbox)
				.onChange(async (value) => {
					this.plugin.settings.checkbox = value;
					await this.plugin.saveSettings();
				}))
			.addToggle(toggle => toggle
				.setTooltip('Checkbox 2')
				.setValue(this.plugin.settings.checkbox2)
				.onChange(async (value) => {
					this.plugin.settings.checkbox2 = value;
					await this.plugin.saveSettings();
				}));

		new Setting(containerEl)
			.setName('Radio buttons')
			.setDesc('A set of radio buttons')
			.addExtraButton(button => {
				button
				.setIcon('lucide-check')
				.setTooltip('Option 1')
				.onClick(async () => {
					this.plugin.settings.radioButton = 'one';
					await this.plugin.saveSettings();
				})
			})
			.addExtraButton(button => {
				button
				.setIcon('lucide-check')
				.setTooltip('Option 2')
				.onClick(async () => {
					this.plugin.settings.radioButton = 'two';
					await this.plugin.saveSettings();
				})
			})
	}
}

class SampleModal extends Modal {
	constructor(app: App) {
		super(app);
	}

	onOpen() {
		const { contentEl } = this;
		contentEl.setText('Here is a popup!');
	}

	onClose() {
		const { contentEl } = this;
		contentEl.empty();
	}
}
