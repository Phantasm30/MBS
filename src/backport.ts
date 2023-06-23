/** Backports of R91 bug fixes */

import { waitFor } from "common";
import { settingsMBSLoaded } from "common_bc";

/** A set with the pull request IDs of all applied bug fix backports */
export const backportIDs: Set<number> = new Set();

waitFor(settingsMBSLoaded).then(() => {
    if (GameVersion === "R93") {
        const w: typeof window & Record<string, any> = window;
        if (typeof InventoryItemDevicesLuckyWheelGame0Load !== "undefined") {
            w["InventoryItemDevicesLuckyWheelg0Load"] = InventoryItemDevicesLuckyWheelGame0Load;
            backportIDs.add(4332);
        }
        if (typeof InventoryItemDevicesLuckyWheelGame0Draw !== "undefined") {
            w["InventoryItemDevicesLuckyWheelg0Draw"] = InventoryItemDevicesLuckyWheelGame0Draw;
            backportIDs.add(4332);
        }
        if (typeof InventoryItemDevicesLuckyWheelGame0Click !== "undefined") {
            w["InventoryItemDevicesLuckyWheelg0Click"] = InventoryItemDevicesLuckyWheelGame0Click;
            backportIDs.add(4332);
        }
        if (typeof InventoryItemDevicesLuckyWheelGame0Exit !== "undefined") {
            w["InventoryItemDevicesLuckyWheelg0Exit"] = InventoryItemDevicesLuckyWheelGame0Exit;
            backportIDs.add(4332);
        }
    }

    if (backportIDs.size) {
        console.log("MBS: Initializing R94 bug fix backports", backportIDs);
    } else {
        console.log("MBS: No R94 bug fix backports");
    }
});
