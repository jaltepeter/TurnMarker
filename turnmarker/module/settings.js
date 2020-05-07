import { modName } from './utils.js';
import { Marker } from './marker.js';

/**
 * Provides functionality for reading and writing module settings
 */
export class Settings {

    /**
     * Gets the image ratio
     */
    static getRatio() {
        return game.settings.get(modName, 'ratio');
    }

    /**
     * Returns true if the marker should be animated
     */
    static shouldAnimate() {
        return game.settings.get(modName, 'animation');
    }

    /**
     * Gets the animation interval in ms.
     */
    static getInterval() {
        return game.settings.get(modName, 'interval');
    }

    /**
     * Gets a path to the currently selected image to be used as the marker
     */
    static getImagePath() {
        if (game.settings.get(modName, 'customimage').trim() == '') {
            switch (game.settings.get(modName, 'image')) {
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
            return game.settings.get(modName, 'customimage');
        }
    }

    /**
     * Registers all game settings
     */
    static registerSettings() {

        game.settings.register(modName, 'ratio', {
            name: 'Image Ratio',
            hint: 'As compared to the token size.',
            scope: 'world',
            config: true,
            type: Number,
            default: 1.5,
            restricted: true
        });

        game.settings.register(modName, 'animation', {
            name: 'Animate Marker?',
            hint: 'Use rotation animation on marker. (changes may not be visible until a new combat is started)',
            scope: 'user',
            config: true,
            type: Boolean,
            default: true,
        });

        game.settings.register(modName, 'interval', {
            name: 'Animation Speed',
            hint: 'How fast to animate the rotation if enabled (recommended between 50 and 200)',
            scope: 'user',
            config: true,
            type: Number,
            default: 100
        });

        game.settings.register(modName, 'image', {
            name: 'Marker Image',
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

        game.settings.register(modName, 'customimage', {
            name: 'Custom Image Path',
            hint: 'Use a custom image instead (leave blank to use a built in image)',
            scope: 'world',
            config: true,
            type: String,
            default: '',
            restricted: true
        });
    }
}