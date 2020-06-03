import { Settings } from "./settings.js";

export class Chatter {

    static sendTurnMessage(combatant) {
        let players = [];
        combatant.players.forEach(player => {
            players.push(player.name);
        });
        if (players.length == 0) players.push("GM");
        ChatMessage.create({
            speaker: { actor: combatant.actor },
            //speaker: { actor: {}, alias: 'Turn Marker' },
            content:
                `<div class="flexrow">${this.placeImage(combatant)}
                    <div style="flex: 12;">
                        <h2>${combatant.name}'s Turn</h2>
                        <p>${players.join(' - ')}</p>
                    </div>
                    </div><em>Turn Marker</em>`
        });
    }

    static placeImage(combatant) {
        if (Settings.getIncludeAnnounceImage()) {
            let img = combatant.img;
            if (combatant.flags.core && combatant.flags.core.thumb) {
                img = combatant.flags.core.thumb;
            }
            return `<div style="flex:3;"><img src="${img}" style="border: none;" /></div>`;
            // return `<div style="flex:3;"><video><source="${combatant.img}"></video></div>`;
        } else return '';
    }
}