/** Functions for the parsing and (inter-)conversion of {@link ItemBundle} lists. */

"use strict";

import { getBaselineProperty } from "type_setting";

type PropValidator<T extends keyof ItemProperties> = (property: unknown, asset: Asset) => property is NonNullable<ItemProperties[T]>;
type PropMappingType = {[T in keyof ItemProperties]: PropValidator<T>};
type PropEntries = [keyof ItemProperties, PropValidator<keyof ItemProperties>][];

/**
 * A record {@link ItemProperties} with validation functions.
 * Properties are limited to a subset that are not managed by the extended item type-setting machinery.
 */
const PROP_MAPPING = <Readonly<PropMappingType>>Object.freeze({
    OverridePriority: (p, _) => typeof p === "number",
    Opacity: (p, a) => typeof p === "number" && p <= a.MaxOpacity && p >= a.MinOpacity,
    Text: (p, a) => typeof p === "string" && DynamicDrawTextRegex.test(p) && p.length <= (a.TextMaxLength?.Text ?? -1),
    Text2: (p, a) => typeof p === "string" && DynamicDrawTextRegex.test(p) && p.length <= (a.TextMaxLength?.Text2 ?? -1),
    Text3: (p, a) => typeof p === "string" && DynamicDrawTextRegex.test(p) && p.length <= (a.TextMaxLength?.Text3 ?? -1),
    ShowText: (p, _) => typeof p === "boolean",
    TriggerValues: (p, _) => typeof p === "string" && p.split(",").length === ItemVulvaFuturisticVibratorTriggers.length,
    PunishOrgasm: (p, _) => typeof p === "boolean",
    PunishStandup: (p, _) => typeof p === "boolean",
    Texts: (p, _) => {
        if (!Array.isArray(p)) {
            return false;
        }
        if (p.length < ItemDevicesLuckyWheelMinTexts || p.length > ItemDevicesLuckyWheelMaxTexts) {
            return false;
        }
        return p.every(i => typeof i === "string" && i.length <= ItemDevicesLuckyWheelMaxTextLength);
    },
    TargetAngle: (p, _) => typeof p === "number",
});

/**
 * Extract, validate and return all properties that intersect with {@link PROP_MAPPING}.
 * @param asset The relevant asset
 * @param properties The properties in question
 */
function sanitizeProperties(asset: Asset, properties?: ItemProperties): ItemProperties {
    if (typeof properties !== "object") {
        return {};
    }
    const ret: ItemProperties = {};
    for (const [name, validate] of <PropEntries>Object.entries(PROP_MAPPING)) {
        const value = properties[name];
        if (value != null && validate(value, asset)) {
            ret[name] = <any>value;
        }
    }
    return ret;
}

/** A map with various {@link Asset} validation checks for {@link fromItemBundle}. */
const UNSUPPORTED_ASSET_CHECKS = Object.freeze(new Map([
    ["Unknown asset", (asset: null | Asset) => asset == null],
    ["Unsupported owner-only asset", (asset: null | Asset) => asset?.OwnerOnly],
    ["Unsupported lovers-only asset", (asset: null | Asset) => asset?.LoverOnly],
    ["Unsupported disabled asset", (asset: null | Asset) => !asset?.Enable],
    ["Unsupported script-asset", (asset: null | Asset) => asset?.Group?.Category === "Script"],
]));

/**
 * Validate and convert a base64-deserialized {@link ItemBundle} array into a wheel of fortune item list.
 * @param items The original bundled items
 * @returns A 2-tuple with the new list of wheel of fortune items and whether all provided items were successfully parsed
 */
export function fromItemBundle(items: readonly ItemBundle[]): [FortuneWheelItem[], boolean] {
    if (!Array.isArray(<readonly ItemBundle[]>items)) {
        throw `Invalid "items" type: ${typeof items}`;
    }

    // NOTE: Take extra care here as users can pass arbitrary arrays due to the handling of base64-decompressed data
    const ret: FortuneWheelItem[] = [];
    const caughtErrors: Map<string, Error> = new Map();
    items.forEach((item, i)  => {
        let asset: null | Asset = null;
        try {
            asset = <Asset>AssetGet("Female3DCG", item.Group, item.Name);
            for (const [msgPrefix, validationCheck] of UNSUPPORTED_ASSET_CHECKS) {
                if (validationCheck(asset)) {
                    throw `${msgPrefix}: ${item.Group}${item.Name}`;
                }
            }

            let color: undefined | readonly string[];
            if (typeof item.Color === "string") {
                color = [item.Color];
            } else if (Array.isArray(item.Color) && item.Color.every(i => typeof i === "string")) {
                color = [...item.Color];
            }

            let craft: undefined | CraftingItem;
            if (typeof item.Craft === "object") {
                craft = { ...item.Craft, Type: null, OverridePriority: null, Lock: "" };
                CraftingValidate(craft, asset, false);
            }

            const wheelItem: FortuneWheelItem = {
                Name: item.Name,
                Group: item.Group,
                Custom: true,
                Property: sanitizeProperties(asset, item.Property),
                Type: (typeof item.Property?.Type === "string") ? item.Property.Type : null,
                Color: color,
                Craft: craft,
            };

            ret.push(wheelItem);
        } catch (ex) {
            let key = `${asset?.Group?.Name}${asset?.Name}`;
            if (key.includes("undefined")) {
                key = `Item ${i}`;
            }
            caughtErrors.set(key, <Error>ex);
        }
    });
    if (caughtErrors.size !== 0) {
        console.log(`MBS: Failed to parse ${caughtErrors.size} of the provided items`, caughtErrors);
    }
    return [ret, caughtErrors.size === 0];
}

/**
 * Convert a wheel of fortune item into an item bundle
 * @param items The original wheel of fortune items
 */
export function toItemBundle(items: readonly FortuneWheelItem[], character: Character): ItemBundle[] {
    if (!Array.isArray(<readonly FortuneWheelItem[]>items)) {
        throw `Invalid "items" type: ${typeof items}`;
    }
    return items.map(({ Group, Name, Color, Craft, Type, Property }) => {
        const asset = AssetGet(character.AssetFamily, Group, Name);
        if (asset == null) {
            throw `Unkown asset: ${Group}${Name}`;
        }
        return {
            Group: Group,
            Name: Name,
            Color: (Color !== undefined) ? [...Color] : undefined,
            Craft: Craft,
            Property: { ...getBaselineProperty(asset, character, Type), ...Property },
        };
    });
}
