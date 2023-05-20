/** Function for setting the types of extended items. */

"use strict";

import { validateCharacter } from "common_bc";

/**
 * Load and assign the type to the passed item without refreshing.
 * @param item The Item in question
 * @param character The player or simple character
 * @param type The item's `Type` (or `Mode` in the case of vibrating items)
 */
export function itemSetType(item: Item, character: Character, type: null | string): void {
    validateCharacter(character);
    if (item === null || typeof item !== "object") {
        throw new TypeError(`Invalid "item" type: ${typeof item}`);
    }

    const asset = item.Asset;
    if (!asset.Extended) {
        return;
    }

    if (type === null) {
        return;
    } else if (asset.Archetype) {
        const setType = ITEM_SET_TYPE_DICT[asset.Archetype];
        return setType(character, item, type);
    } else {
        return setTypeNoArch(item, character, type);
    }
}

/**
 * Construct a baseline property object for the passed object and given type.
 * @param item The Item in question
 * @param character The player or simple character
 * @param type The item's `Type` (or `Mode` in the case of vibrating items)
 */
export function getBaselineProperty(asset: Asset, character: Character, type: null | string): ItemProperties {
    const item: Item = { Asset: asset };
    ExtendedItemInit(character, item, false);
    itemSetType(item, character, type);
    return item.Property ?? {};
}

/** Type-setting callback type for {@link ITEM_SET_TYPE_DICT} */
type setTypeCallback = (C: Character, item: Item, type: string) => void;

/** A record with template functions for setting the {@link ItemProperties.Type} of various archetypical items. */
const ITEM_SET_TYPE_DICT: Readonly<Record<ExtendedArchetype, setTypeCallback>> = Object.freeze({ // R92
    typed: (...args) => TypedItemSetOptionByName(...args),
    vibrating: (...args) => VibratorModeSetOptionByName(...args),
    modular: (...args) => ModularItemSetOptionByName(...args),
    variableheight: () => { return; },
    text: () => { return; },
});

/** Set the {@link ItemProperties.Type} of a non-archetypical item. */
function setTypeNoArch(item: Item, _character: Character, _type: string): void {
    console.warn(`${item.Asset.Group.Name}${item.Asset.Name}: Unsupported non-archetypical item, aborting type-setting`);
}
