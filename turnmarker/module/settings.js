import { modName } from './utils.js';

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
     * Gets the animation rotation in degrees
     */
    static getDegrees() {
        return game.settings.get(modName, 'degrees');
    }

    /**
     * Gets a path to the currently selected image to be used as the marker
     */
    static getImagePath() {
        if (game.settings.get(modName, 'customimage').trim() == '') {
            switch (game.settings.get(modName, 'image')) {
                case 0: return 'modules/turnmarker/images/RedRunes.png';
                case 1: return 'modules/turnmarker/images/WhiteRunes.png';
                case 2: return 'modules/turnmarker/images/BlueRunes.png';
                case 3: return 'modules/turnmarker/images/GreenRunes.png';
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
            hint: 'Use rotation animation on marker.',
            scope: 'world',
            config: true,
            type: Boolean,
            default: true,
            restricted: true
        });

        game.settings.register(modName, 'interval', {
            name: 'Animation Speed',
            hint: 'How fast to animate in ms (lower number is faster, higher is slower)',
            scope: 'world',
            config: true,
            type: Number,
            default: 500,
            restricted: true
        });

        game.settings.register(modName, 'degrees', {
            name: 'Animation Degrees',
            hint: 'How many degrees to rotate the marker per tick of "Animation Speed"',
            scope: 'world',
            config: true,
            type: Number,
            default: 10,
            restricted: true
        });

        game.settings.register(modName, 'image', {
            name: 'Marker Image',
            scope: 'world',
            config: true,
            type: Number,
            default: 0,
            choices: [
                'Red Runes by Rin',
                'White Runes by Rin',
                'Blue Runes by Rin',
                'Green Runes by Rin'
            ],
            restricted: true
        });

        game.settings.register(modName, 'customimage', {
            name: 'Custom Image Path',
            hint: 'Use a custom image instead (leave blank to use a built in image',
            scope: 'world',
            config: true,
            type: String,
            default: '',
            restricted: true
        });
    }
}