import { Settings } from './module/settings.js';
import { Marker } from './module/marker.js';

let animator;
let markerId;

Hooks.on('ready', async () => {
    Settings.registerSettings();
    let marker = canvas.scene.getEmbeddedCollection('Tile').find(t => t.flags.turnMarker == true);
    if (marker && marker._id) {
        if (!game.paused && Settings.shouldAnimate()) {
            animator = Marker.startAnimation(animator, marker._id);
            markerId = marker._id;
        }
    }
});

Hooks.on('updateCombat', async (combat, update) => {
    if (update && game.user.isGM) {
        let result = await Marker.placeMarker(combat.combatant.token._id, animator, markerId);
        markerId = result.markerId;
        animator = result.animator;
    }
});

Hooks.on('deleteCombat', async (x, y, z) => {
    Marker.reset(animator);
    markerId = undefined;
});

Hooks.on('updateToken', (scene, updateToken, updateData) => {
    if ((updateData.x || updateData.y || updateData.width || updateData.height) && game.combat.combatant.tokenId == updateToken._id && game.user.isGM) {
        Marker.moveMarkerToToken(updateToken._id, markerId);
    }
});

Hooks.on('pauseGame', async (isPaused) => {
    if (markerId && Settings.shouldAnimate()) {
        if (isPaused) {
            clearInterval(animator);
        } else {
            animator = Marker.startAnimation(animator, markerId);
        }
    }
});