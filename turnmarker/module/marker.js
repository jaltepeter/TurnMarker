import { Settings } from './settings.js';
import { findTokenById } from './utils.js';
import { MarkerAnimation } from './markeranimation.js';

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
    static async placeMarker(tokenId, markerId) {
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
                rotation: 0,
                hidden: token.data.hidden,
                locked: false,
                flags: { turnMarker: true }
            });

            let tile = await canvas.scene.createEmbeddedEntity('Tile', newTile.data);
            tile.displayToFront();

            return tile._id;
        } else {
            this.moveMarkerToToken(tokenId, markerId);
            return markerId;
        }
    }

    /**
     * Moves the turn marker tile under the specified token
     * @param {String} tokenId - The ID of the token that the marker should be placed under
     * @param {String} markerId - The ID of the tile currently serving as the turn marker
     */
    static async moveMarkerToToken(tokenId, markerId) {
        let token = findTokenById(tokenId);
        let ratio = Settings.getRatio();

        await canvas.scene.updateEmbeddedEntity('Tile', {
            _id: markerId,
            width: token.w * ratio,
            height: token.h * ratio,
            x: token.center.x - ((token.w * ratio) / 2),
            y: token.center.y - ((token.h * ratio) / 2),
            hidden: token.data.hidden
        });

        let tile = canvas.tiles.placeables.find(t => t.id == markerId);
        tile.displayToFront();

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

    static updateImagePath() {
        let tile = canvas.tiles.placeables.find(t => t.data.flags.turnMarker == true);

        canvas.scene.updateEmbeddedEntity('Tile', {
            _id: tile.id,
            img: Settings.getImagePath()
        });
    }

    /**
     * Completely resets the turn marker - deletes all tiles and stops any animation
     * @param {Object} animator - The animator object
     */
    static reset(animator) {
        MarkerAnimation.stopAnimation(animator);
        this.clearAllMarkers();
    }
}