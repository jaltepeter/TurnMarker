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
            startMarkerPath: Settings.getStartMarkerPath(),
            previewPath: Settings.getImagePath()
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
        const markerSelect = html.find('#image');
        const customImage = html.find('#customImage');
        const markerPreview = html.find('#markerPreview');

        if (markerSelect.length > 0) {
            markerSelect.on('change', event => {
                if (customImage[0].value.trim() == '') {
                    markerPreview.attr('src', Settings.getImageByIndex(Number(event.target.value)));
                }
            });
        }

        if (customImage.length > 0) {
            customImage.on('change', event => {
                if (event.target.value.trim() == '') {
                    markerPreview.attr('src', Settings.getImageByIndex(Number(markerSelect[0].value)));
                } else {
                    markerPreview.attr('src', event.target.value);
                }
            });
        }
    }

    getSelectList(array, selected) {
        let options = [];
        array.forEach((x, i) => {
            options.push({ value: x, selected: i == selected });
        });
        return options;
    }
}