# Turn Marker
**Turn Marker** is a module for [Foundry VTT](https://foundryvtt.com/ "Foundry VTT") that adds an image under a token who is currently active in the combat tracker. This is completely system agnostic, and fully customizable to fit right into your game.

## Installation
It's always better and easier to install modules through in in app browser. Just search for "Turn Marker"

To install this module manually:
1. Inside the Foundry "Configuration and Setup" screen, click "Add-on Modules"
2. Click "Install Module"
3. In the "Manifest URL" field, paste the following url:
`https://gitlab.com/brunhine/foundry-turnmarker/-/raw/master/turnmarker/module.json`
4. Click 'Install' and wait for installation to complete
5. Don't forget to enable the module in game using the "Manage Module" button

## Usage
The turn marker will move to the active token on their turn, and move with them as they move:
![example](/examples/example.gif)

### Settings
#### Image ratio
The image ratio is related to the size of the token. 1 will be the same size as the active token, 2 will be double the size, etc.
#### Animate Marker
If enabled, the marker will use a rotational animation as defined by "Animation Speed" and "Animation Degrees".
#### Animation Speed
Defines in milliseconds how often the animation should apply a rotation. The lower the number the faster the animation.
#### Animation Degrees
Defines in degrees how much the marker should rotate on each tick.
#### Marker Image
Select from a number of included images provided by the Foundry Community:

|Runes of the Cultist by [Rin](https://foundryvtt.com/community/rin)|Runes of Regeneration by [Rin](https://foundryvtt.com/community/rin)|Runes of the Cosmos by [Rin](https://foundryvtt.com/community/rin)|Runes of Earthly Dust by [Rin](https://foundryvtt.com/community/rin)|
|--|--|--|--|
|<img src="turnmarker/images/cultist.png" width="150" />|<img src="turnmarker/images/regeneration.png" width="150" />|<img src="turnmarker/images/cosmos.png" width="150" />|<img src="turnmarker/images/earthlydust.png" width="150" />|

|Runes of Reality by [Rin](https://foundryvtt.com/community/rin)|Runes of Incendium by [Rin](https://foundryvtt.com/community/rin)|Runes of the Believer by [Rin](https://foundryvtt.com/community/rin)|Runes of the Mad Mage by [Rin](https://foundryvtt.com/community/rin)|
|--|--|--|--|
|<img src="turnmarker/images/reality.png" width="150" />|<img src="turnmarker/images/incendium.png" width="150" />|<img src="turnmarker/images/believer.png" width="150" />|<img src="turnmarker/images/madmage.png" width="150" />|

|Runes of the Blue Sky by [Rin](https://foundryvtt.com/community/rin)|Runes of the Universe by [Rin](https://foundryvtt.com/community/rin)|Runes of Prosperity by [Rin](https://foundryvtt.com/community/rin)|
|--|--|--|
|<img src="turnmarker/images/bluesky.png" width="150" />|<img src="turnmarker/images/universe.png" width="150" />|<img src="turnmarker/images/prosperity.png" width="150" />|

#### Custom Image Path
Sets the path to an image to be used instead of the included images

## Compatibility
Most recently tested on [Foundry VTT](https://foundryvtt.com/ "Foundry VTT") version 0.5.5 (beta).

## Feedback
All feedback and suggestions are welcome. Please contact me on Discord (Brunhine#2182).

Any issues, bugs, or feature requests are always welcome to be reported directly to the [Issue Tracker](https://gitlab.com/brunhine/foundry-turnmarker/-/issues "Issue Tracker")

## Licensing
**Turn Msrker** is a module for [Foundry VTT](https://foundryvtt.com/ "Foundry VTT") by Jeremiah Altepeter and is licensed under a [Creative Commons Attribution 4.0 International License](http://creativecommons.org/licenses/by/4.0/).

This work is licensed under Foundry Virtual Tabletop [EULA - Limited License Agreement for module development v 0.1.6](https://foundryvtt.com/article/license/).

The included images are created by [Rin](https://foundryvtt.com/community/rin) (rin#0002 on Discord)
