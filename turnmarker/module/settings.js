import { modName } from './utils.js';
import { Marker } from './marker.js';

const ratio = 'ratio';
const animation = 'animation';
const interval = 'interval';
const announce = 'announce-turn';
const image = 'image';
const customimage = 'customimage';

/**
 * Provides functionality for reading and writing module settings
 */
export class Settings {

    /**
     * Gets the image ratio
     */
    static getRatio() {
        return game.settings.get(modName, ratio);
    }

    /**
     * Returns true if the marker should be animated
     */
    static shouldAnimate() {
        return game.settings.get(modName, animation);
    }

    /**
     * Gets the animation interval in ms.
     */
    static getInterval() {
        return game.settings.get(modName, interval);
    }

    /**
     * Returns true if turn changes should be announced in chat
     */
    static shouldAnnounceTurns() {
        return game.settings.get(modName, announce);
    }

    /**
     * Gets a path to the currently selected image to be used as the marker
     */
    static getImagePath() {
        if (game.settings.get(modName, customimage).trim() == '') {
            switch (game.settings.get(modName, image)) {
                case 0: return 'modules/turnmarker/images/incendium.png';
                case 1: return 'modules/turnmarker/images/cultist.png';
                case 2: return 'modules/turnmarker/images/regeneration.png';
                case 3: return 'modules/turnmarker/images/cosmos.png';
                case 4: return 'modules/turnmarker/images/earthlydust.png';
                case 5: return 'modules/turnmarker/images/reality.png';
                case 6: return 'modules/turnmarker/images/believer.png';
                case 7: return 'modules/turnmarker/images/madmage.png';
                case 8: return 'modules/turnmarker/images/bluesky.png';
                case 9: return 'modules/turnmarker/images/universe.png';
                case 10: return 'modules/turnmarker/images/prosperity.png';

            }
        } else {
            return game.settings.get(modName, customimage);
        }
    }

    /**
     * Registers all game settings
     */
    static registerSettings() {

        game.settings.register(modName, ratio, {
            name: 'settings.ratio.name',
            hint: 'settings.ratio.hint',
            scope: 'world',
            config: true,
            type: Number,
            default: 1.5,
            restricted: true
        });

        game.settings.register(modName, animation, {
            name: 'settings.animate.name',
            hint: 'settings.animate.hint',
            scope: 'user',
            config: true,
            type: Boolean,
            default: true,
        });

        game.settings.register(modName, interval, {
            name: 'settings.interval.name',
            hint: 'settings.interval.hint',
            scope: 'user',
            config: true,
            type: Number,
            default: 100
        });

        game.settings.register(modName, image, {
            name: 'settings.image.name',
            scope: 'world',
            config: true,
            type: Number,
            default: 0,
            choices: [
                'Runes of Incendium by Rin',
                'Runes of the Cultist by Rin',
                'Runes of Regeneration by Rin',
                'Runes of the Cosmos by Rin',
                'Runes of Earthly Dust by Rin',
                'Runes of Reality by Rin',
                'Runes of the Believer by Rin',
                'Runes of the Mad Mage by Rin',
                'Runes of the Blue Sky by Rin',
                'Runes of the Universe by Rin',
                'Runes of Prosperity by Rin'
            ],
            restricted: true,
            onChange: value => Marker.updateImagePath(value)
        });

        game.settings.register(modName, customimage, {
            name: 'settings.customImage.name',
            hint: 'settings.customImage.hint',
            scope: 'world',
            config: true,
            type: String,
            default: '',
            restricted: true,
            onChange: value => Marker.updateImagePath(value)
        });

        game.settings.register(modName, announce, {
            name: 'settings.announce.name',
            hint: 'settings.announce.hint',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true
        });
    }
}