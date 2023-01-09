"use strict";

import { BC_VERSION, range, randomElement, getRandomPassword } from "common";

/**
 * Generate a list of unique length-1 UTF16 characters.
 * @param n - The number of characters that should be returned
 * @param exclude - Characters that should not be contained in the to-be returned list
 * @returns A list of unique UTF16 characters
 */
function generateIDs(n: number, exclude: null | readonly string[] = null): string[] {
    if (!Number.isInteger(n) || n < 0) {
        throw `Invalid "n" value: ${n}`;
    }
    if (exclude == null) {
        exclude = [];
    } else if (!Array.isArray(exclude)) {
        throw `Invalid "exclude" type: ${typeof exclude}`;
    }

    const ret: string[] = [];
    for (const i of range(0, 2**16)) {
        const utf16 = String.fromCharCode(i);
        if (n === 0) {
            break;
        } else if (!exclude.includes(utf16)) {
            ret.push(utf16);
        }
        n -= 1;
    }

    if (n > 0) {
        throw "Insufficient available UTF16 characters";
    }
    return ret;
}

function equipTimerLock(item: Item, minutes: number): void {
    if (typeof minutes !== "number") {
        throw `Invalid "minutes" type: ${typeof minutes}`;
    } else if (minutes < 0 || minutes > 240) {
        throw '"minutes" must fall in the [0, 240] interval';
    }

    // Equip the timer lock if desired and possible
    equipLock(item, "TimerPasswordPadlock");
    if (item.Property == null) item.Property = {};
    item.Property.RemoveTimer = CurrentTime + minutes * 60000;
    item.Property.RemoveItem = true;
    item.Property.LockSet = true;
    item.Property.Password = getRandomPassword(8);
}

function equipHighSecLock(item: Item): void {
    // Equip the timer lock if desired and possible
    equipLock(item, "HighSecurityLock");
    if (item.Property == null) item.Property = {};
    item.Property.MemberNumberListKeys = "";
}

function equipLock(item: Item, lockName: string): void {
    if (typeof item !== "object") {
        throw `Invalid "item" type: ${typeof item}`;
    } else if (typeof lockName !== "string") {
        throw `Invalid "lockName" type: ${typeof lockName}`;
    }

    // Equip the timer lock if desired and possible
    const lock = AssetGet(Player.AssetFamily, "ItemMisc", lockName);
    if (
        lock == null
        || InventoryGetLock(item) != null
        || InventoryDoesItemAllowLock(item)
        || InventoryBlockedOrLimited(Player, { Asset: lock })
    ) {
        return;
    }
    InventoryLock(Player, item, { Asset: lock }, null, true);
}

function fortuneWheelEquip(
    itemList: readonly FortuneWheelItem[],
    globalCallbacks: null | readonly FortuneWheelCallback[] = null,
    stripNaked: boolean = true,
): void {
    if (!Array.isArray(itemList)) {
        throw `Invalid "itemList" type: ${typeof itemList}`;
    }
    if (globalCallbacks != null && !Array.isArray(globalCallbacks)) {
        throw `Invalid "globalCallbacks" type: ${typeof itemList}`;
    }

    if (stripNaked) {
        CharacterNaked(Player);
    }
    for (const {Name, Group, Equip, Craft, ItemCallbacks} of <readonly FortuneWheelItem[]>itemList) {
        const asset = AssetGet(Player.AssetFamily, Group, Name);
        const oldItem = InventoryGet(Player, Group);

        // Equip the item if possible
        if (
            (typeof Equip === "function" && !Equip())
            || asset == null
            || InventoryBlockedOrLimited(Player, {Asset: asset})
            || !(oldItem == null || InventoryGetLock(oldItem) == null)
        ) {
            continue;
        }
        InventoryWear(Player, Name, Group, "Default", SkillGetWithRatio("Bondage"), null, Craft);
        InventoryCraft(Player, Player, Group, Craft, true);

        // Fire up any of the provided item-specific dynamic callbacks
        const newItem = InventoryGet(Player, Group);
        if (newItem == null) {
            continue;
        }
        if (ItemCallbacks != null) {
            Object.values(ItemCallbacks).forEach(next => next(newItem));
        }
        if (globalCallbacks != null) {
            globalCallbacks.forEach(next => next(newItem));
        }
    }
    CharacterRefresh(Player);
    ChatRoomCharacterUpdate(Player);
}

const FORTUNE_WHEEL_COLORS: readonly string[] = [
    "Blue",
    "Gold",
    "Gray",
    "Green",
    "Orange",
    "Purple",
    "Red",
    "Yellow",
];

function copyHairColor(item: Item, indices: number[]): void {
    if (typeof item !== "object") {
        throw `Invalid "item" type: ${typeof item}`;
    }
    if (!Array.isArray(indices)) {
        throw `Invalid "indices" type: ${typeof indices}`;
    }

    const hair = Player.Appearance.find(i => i.Asset.Name === "HairFront3");
    if (hair === undefined) {
        return;
    }

    // Ensure that the item's color is stored as an array
    if (typeof item.Color === "string") {
        item.Color = [item.Color];
        for (const _ of range(1, 1 + Math.max(...indices))) {
            item.Color.push("Default");
        }
    } else if (!Array.isArray(item.Color) || item.Color.length === 0) {
        item.Color = [];
        for (const _ of range(0, 1 + Math.max(...indices))) {
            item.Color.push("Default");
        }
    }

    // Update the item's color with the hair color
    if (typeof hair.Color === "string") {
        item.Color = hair.Color;
    } else if (Array.isArray(hair.Color) && hair.Color.length >= 1) {
        item.Color = hair.Color[0];
    } else {
        return;
    }
}

function generateItemSets(): FortuneWheelItemSets {
    const ret: Record<FortuneWheelNames, FortuneWheelItemBase[]> = {
        leash_candy: [
            {
                Name: "ReverseBunnySuit",
                Group: "Suit",
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0, 1]),
                },
            },
            {
                Name: "Catsuit",
                Group: "SuitLower",
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0, 1]),
                },
            },
            {
                Name: "FaceVeil",
                Group: "Mask",
                ItemCallbacks: {
                    Color: (item) => {
                        item.Color = "#000";
                        copyHairColor(item, [1]);
                    },
                },
            },
            {
                Name: "FuturisticMittens",
                Group: "ItemHands",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Mittens",
                    Type: null,
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0, 1]),
                },
            },
            {
                Name: "InteractiveVRHeadset",
                Group: "ItemHead",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Headset",
                    Type: "b3f3g1",
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0]),
                },
            },
            {
                Name: "LargeDildo",
                Group: "ItemMouth",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Dildo",
                    Description: "Specially made to fill a PSOs mouth and throat",
                },
            },
            {
                Name: "LatexBallMuzzleGag",
                Group: "ItemMouth2",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Muzzle",
                    Description: "Forcing the dildo in and keeping it secure",
                },
            },
            {
                Name: "FuturisticMuzzle",
                Group: "ItemMouth3",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Muzzle",
                    Description: "Keeping your cries muffled",
                    Type: "n1h0s3",
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [3]),
                },
            },
            {
                Name: "FuturisticVibrator",
                Group: "ItemVulva",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Vibe",
                    Description: "Specially made to fill a PSO",
                    Type: "Edge",
                },
            },
            {
                Name: "SciFiPleasurePanties",
                Group: "ItemPelvis",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Panties",
                    Description: "No escape and no Orgasms",
                    Type: "c0i2o1s0",
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0, 2, 4, 5]),
                },
            },
            {
                Name: "BonedNeckCorset",
                Group: "ItemNeck",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Collar",
                    Type: "Ring",
                    Color: "#222222,#888888,#AA2121,#AA2121,#888888",
                },
            },
            {
                Name: "CollarChainShort",
                Group: "ItemNeckRestraints",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Chain",
                    Description: "To keep a PSO on their knees",
                    OverridePriority: 7,
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0]),
                },
            },
            {
                Name: "StrictLeatherPetCrawler",
                Group: "ItemArms",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Suit",
                    Description: "Extra tight and unremovable",
                },
            },
            {
                Name: "HeavyLatexCorset",
                Group: "ItemTorso",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Corset",
                    Description: "Extra tight and specially molded",
                    Type: null,
                },
            },
            {
                Name: "FuturisticHarness",
                Group: "ItemTorso2",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Harness",
                    Description: "Special harness that constantly shrinks....",
                    Type: null,
                    OverridePriority: 45,
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0, 1, 2]),
                },
            },
            {
                Name: "FuturisticEarphones",
                Group: "ItemEars",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Earphones",
                    Type: null,
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [1]),
                },
            },
            {
                Name: "CeilingChain",
                Group: "ItemAddon",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Chain",
                    Description: "Never to escape",
                    Type: null,
                    Color: "#680096",
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0]),
                },
            },
            {
                Name: "RoundPiercing",
                Group: "ItemNipplesPiercings",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Piercings",
                    Type: "Chain",
                    Color: "#000000,#680096,#424242",
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [0, 1, 2]),
                },
            },
            {
                Name: "CollarAutoShockUnit",
                Group: "ItemNeckAccessories",
                Craft: {
                    Property: "Secure",
                    Name: "Permanent PSO Shock Unit",
                    Type: "s0y0",
                },
            },
            {
                Name: "DroneMask",
                Group: "ItemHood",
                Craft: {
                    Property: "Thin",
                    Name: "Permanent PSO Mask",
                    Type: "m0e0p1g0s0h2j0",
                },
                ItemCallbacks: {
                    Color: (item) => copyHairColor(item, [2]),
                },
            },
        ],
    };

    for (const [setName, itemSet] of Object.entries(ret)) {
        for (const [i, item] of itemSet.entries()) {
            if (item.Craft != null) {
                item.Craft.Item = item.Name;
                const asset = AssetGet(Player.AssetFamily, item.Group, item.Name);
                if (!CraftingValidate(<CraftingItem>item.Craft, asset, false)) {
                    throw `Failed to validate the ${setName}-${item.Group}${item.Name} crafting settings`;
                }
            }
            itemSet[i] = Object.freeze(item);
        }
    }
    return <FortuneWheelItemSets>ret;
}

const FORTUNATE_WHEEL_ITEM_SETS = Object.freeze(generateItemSets());

function generateNewOptions(
    idExclude: null | readonly string[] = null,
    colors: readonly string[] = FORTUNE_WHEEL_COLORS,
): FortuneWheelOptions {
    if (!Array.isArray(colors)) {
        throw `Invalid "colors" type: ${typeof colors}`;
    }

    const ret: Record<string, Partial<FortuneWheelOptionBase>> = {
        leash_candy_5_min: {
            Description: "PSO bondage for 5 minutes",
            Script: () => fortuneWheelEquip(
                FORTUNATE_WHEEL_ITEM_SETS.leash_candy,
                [(item) => equipTimerLock(item, 5)],
            ),
            Default: true,
        },
        leash_candy_15_min: {
            Description: "PSO bondage for 15 minutes",
            Script: () => fortuneWheelEquip(
                FORTUNATE_WHEEL_ITEM_SETS.leash_candy,
                [(item) => equipTimerLock(item, 15)],
            ),
            Default: true,
        },
        leash_candy_60_min: {
            Description: "PSO bondage for 60 minutes",
            Script: () => fortuneWheelEquip(
                FORTUNATE_WHEEL_ITEM_SETS.leash_candy,
                [(item) => equipTimerLock(item, 60)],
            ),
            Default: true,
        },
        leash_candy_240_min: {
            Description: "PSO bondage for 4 hours",
            Script: () => fortuneWheelEquip(
                FORTUNATE_WHEEL_ITEM_SETS.leash_candy,
                [(item) => equipTimerLock(item, 240)],
            ),
            Default: false,
        },
        leash_candy_exclusive: {
            Description: "PSO bondage",
            Script: () => fortuneWheelEquip(
                FORTUNATE_WHEEL_ITEM_SETS.leash_candy,
                [(item) => equipLock(item, "ExclusivePadlock")],
            ),
            Default: true,
        },
        leash_candy_hisec: {
            Description: "High security PSO bondage",
            Script: () => fortuneWheelEquip(
                FORTUNATE_WHEEL_ITEM_SETS.leash_candy,
                [(item) => equipHighSecLock(item)],
            ),
            Default: false,
        },
    };

    const entries = Object.entries(ret);
    const IDs = generateIDs(entries.length, idExclude);
    entries.forEach(([name, struct], i) => {
        struct.Name = `MBS_${name}`;
        struct.ID = IDs[i];
        struct.Color = randomElement(colors);
        ret[name] = Object.freeze(struct);
    });
    return <FortuneWheelOptions>ret;
}

const BC88_BETA1: readonly [88, 1] = [88, 1];
if (BC_VERSION >= BC88_BETA1) {
    const WHEEL_ITEMS_NEW = Object.freeze(generateNewOptions(WheelFortuneOption.map(i => i.ID)));
    Object.values(WHEEL_ITEMS_NEW).forEach((item) => {
        if (WheelFortuneOption.some(i => i.Name === item.Name)) {
            return;
        }
        WheelFortuneOption.push(item);
        if (item.Default) {
            WheelFortuneDefault += item.ID;
        }
        if (TextScreenCache != null) {
            TextScreenCache.cache[`Option${item.ID}`] = item.Description;
        }
    });
}