import { Settings } from './module/settings.js';
import { Marker } from './module/marker.js';
import { MarkerAnimation } from './module/markeranimation.js';
import { firstGM } from './module/utils.js';

let animator;
let markerId;

Hooks.on('ready', async () => {
    Settings.registerSettings();
    let marker = canvas.tiles.placeables.find(t => t.data.flags.turnMarker == true);
    if (marker && marker.id) {
        markerId = marker.id;
        let tile = canvas.tiles.placeables.find(t => t.data.flags.turnMarker == true);
        tile.zIndex = Math.max(...canvas.tiles.placeables.map(o => o.zIndex)) + 1;
        tile.parent.sortChildren();
        if (!game.paused && Settings.shouldAnimate()) {
            animator = MarkerAnimation.startAnimation(animator, markerId);
        }
    }
});

Hooks.on('createTile', (scene, tile) => {
    if (tile.flags.turnMarker == true) {
        markerId = tile._id;
        tile = canvas.tiles.placeables.find(t => t.data.flags.turnMarker == true);
        tile.zIndex = Math.max(...canvas.tiles.placeables.map(o => o.zIndex)) + 1;
        tile.parent.sortChildren();
        if (Settings.shouldAnimate()) {
            animator = MarkerAnimation.startAnimation(animator, markerId);
        }
    }
});

Hooks.on('updateCombat', async (combat, update) => {
    if (update && game.user.isGM && game.userId == firstGM()) {
        let tile = canvas.tiles.placeables.find(t => t.data.flags.turnMarker == true);
        let result = await Marker.placeMarker(combat.combatant.token._id, (tile && tile.id) || undefined);
        markerId = result.markerId;
        animator = result.animator;
    }
});

Hooks.on('deleteCombat', async () => {
    if (game.user.isGM) {
        Marker.clearAllMarkers();
    }
    MarkerAnimation.stopAnimation(animator);
});

Hooks.on('updateToken', (scene, updateToken, updateData) => {
    let tile = canvas.tiles.placeables.find(t => t.data.flags.turnMarker == true);
    if ((updateData.x || updateData.y || updateData.width || updateData.height || updateData.hidden) &&
        (game && game.combat && game.combat.combatant && game.combat.combatant.tokenId == updateToken._id) &&
        game.user.isGM && game.combat) {
        Marker.moveMarkerToToken(updateToken._id, tile.id);
    }
    if (tile) {
        tile.zIndex = Math.max(...canvas.tiles.placeables.map(o => o.zIndex)) + 1;
        tile.parent.sortChildren();
    }
});

Hooks.on('updateTile', () => {
    if (canvas.scene.data.tokenVision) {
        let tile = canvas.tiles.placeables.find(t => t.data.flags.turnMarker == true);
        if (tile) {
            let combatant = canvas.tokens.placeables.find(x => x.id == game.combat.combatant.tokenId);
            if (combatant && !combatant.data.hidden) {
                tile.visible = canvas.sight.testVisibility(combatant.center, { tolerance: canvas.dimensions.size / 4 });
            }
        }
    }
});

Hooks.on('pauseGame', async (isPaused) => {
    if (markerId && Settings.shouldAnimate()) {
        if (isPaused) {
            MarkerAnimation.stopAnimation(animator);
        } else {
            animator = MarkerAnimation.startAnimation(animator, markerId);
        }
    }
});