import { imageTitles, Settings } from './settings.js';

export class SettingsForm extends FormApplication {

    constructor(object, options = {}) {
        super(object, options);
    }

    /**
    * Default Options for this FormApplication
    */
    static get defaultOptions() {
        return mergeObject(super.defaultOptions, {
            id: 'turnmarker-settings-form',
            title: 'Turn Marker - Global Settings',
            template: './modules/turnmarker/templates/settings.html',
            classes: ['sheet'],
            width: 500,
            closeOnSubmit: true
        });
    }

    getData() {
        return {
            ratio: Settings.getRatio(),
            image: this.getSelectList(imageTitles, Settings.getImageIndex()),
            customImage: Settings.getCustomImagePath(),
            announce: Settings.shouldAnnounceTurns(),
            announceImage: Settings.getIncludeAnnounceImage(),
            startMarkerEnabled: Settings.getStartMarkerEnabled(),
            startMarkerPath: Settings.getStartMarkerPath()
        };
    }

    /** 
     * Executes on form submission.
     * @param {Object} e - the form submission event
     * @param {Object} d - the form data
     */
    async _updateObject(e, d) {
        Settings.setRatio(d.ratio);
        Settings.setImage(d.image);
        Settings.setCustomImagePath(d.customImage);
        Settings.setShouldAnnounceTurns(d.announce);
        Settings.setIncludeAnnounceImage(d.announceImage);
        Settings.setStartMarkerEnabled(d.startMarkerEnabled);
        Settings.setStartMarkerPath(d.startMarkerPath);
    }

    activateListeners(html) {
        super.activateListeners(html);
    }

    getSelectList(array, selected) {
        let options = [];
        array.forEach((x, i) => {
            options.push({ value: x, selected: i == selected });
        });
        return options;
    }
}