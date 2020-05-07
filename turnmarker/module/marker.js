import { Settings } from './settings.js';
import { findTokenById } from './utils.js';

/**
 * Provides functionality for creating, moving, and animating the turn marker
 */
export class Marker {

    /**
     * Places a new turn marker under the token specified, and if required, starts the animation
     * @param {String} tokenId - The ID of the token where the marker should be placed
     * @param {Object} animator - The animator object
     * @param {String} markerId - The ID of the tile being used as the turn marker
     */
    static async placeMarker(tokenId, animator, markerId) {
        if (!markerId) {
            this.clearAllMarkers();

            let token = findTokenById(tokenId);
            let ratio = Settings.getRatio();

            let newTile = new Tile({
                img: Settings.getImagePath(),
                width: token.w * ratio,
                height: token.h * ratio,
                x: token.center.x - ((token.w * ratio) / 2),
                y: token.center.y - ((token.h * ratio) / 2),
                z: 0,
                rotation: 0,
                hidden: token.data.hidden,
                locked: false,
                flags: { turnMarker: true }
            });

            let tile = await canvas.scene.createEmbeddedEntity('Tile', newTile.data);

            if (Settings.shouldAnimate()) { animator = this.startAnimation(animator, tile._id); }

            return { animator: animator, markerId: tile._id };
        } else {
            this.moveMarkerToToken(tokenId, markerId);
            return { animator: animator, markerId: markerId };
        }
    }

    /**
     * Moves the turn marker tile under the specified token
     * @param {String} tokenId - The ID of the token that the marker should be placed under
     * @param {String} markerId - The ID of the tile currently serving as the turn marker
     */
    static moveMarkerToToken(tokenId, markerId) {
        let token = findTokenById(tokenId);
        let ratio = Settings.getRatio();

        canvas.scene.updateEmbeddedEntity('Tile', {
            _id: markerId,
            width: token.w * ratio,
            height: token.h * ratio,
            x: token.center.x - ((token.w * ratio) / 2),
            y: token.center.y - ((token.h * ratio) / 2),
            hidden: token.data.hidden
        });
    }

    /**
     * Removes any existing turn marker tiles from the canvas
     */
    static async clearAllMarkers() {
        let tiles = canvas.scene.getEmbeddedCollection('Tile');

        for (var tile of tiles) {
            if (tile.flags.turnMarker) {
                await canvas.scene.deleteEmbeddedEntity('Tile', tile._id);
            }
        }
    }

    /**
     * Starts the animation loop for the specified tile
     * @param {object} animator - The animator object
     * @param {String} tileId - The ID of the tile currently serving as the turn marker 
     */
    static startAnimation(animator, tileId) {
        clearInterval(animator);
        return setInterval(function () { Marker.rotateMarker(tileId); }, Settings.getInterval());
    }

    /**
     * Stops the current animation loop
     * @param {Object} animator - The animator
     */
    static stopAnimation(animator) {
        clearInterval(animator);
    }

    /**
     * Rotates the specified tile by a number of degrees defined in settings
     * @param {String} tileId - The ID of the tile currently serving as the turn marker
     */
    static rotateMarker(tileId) {
        let t = canvas.scene.getEmbeddedEntity('Tile', tileId);
        if (t) {
            canvas.scene.updateEmbeddedEntity('Tile', { _id: tileId, rotation: t.rotation + Settings.getDegrees() });
        }
    }

    /**
     * Completely resets the turn marker - deletes all tiles and stops any animation
     * @param {Object} animator - The animator object
     */
    static reset(animator) {
        clearInterval(animator);
        this.clearAllMarkers();
    }

}