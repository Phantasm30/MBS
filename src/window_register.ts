/** Module for managing the {@link window} exporting of MBS functions. */

"use strict";

import { waitFor, settingsMBSLoaded } from "common";

import {
    MBSFortuneWheelBackground,
    MBSFortuneWheelLoad,
    MBSFortuneWheelRun,
    MBSFortuneWheelClick,
    MBSFortuneWheelExit,
} from "fortune_wheel_customize";

import {
    MBSFortuneWheelSelectBackground,
    MBSFortuneWheelSelectLoad,
    MBSFortuneWheelSelectRun,
    MBSFortuneWheelSelectClick,
    MBSFortuneWheelSelectExit,
} from "fortune_wheel_select";

import * as common from "common";
import * as crafting from "crafting";
import * as equipper from "equipper";
import * as fortune_wheel_customize from "fortune_wheel_customize";
import * as fortune_wheel_select from "fortune_wheel_select";
import * as fortune_wheel from "fortune_wheel";
import * as item_bundle from "item_bundle";
import * as settings from "settings";

waitFor(settingsMBSLoaded).then(() => {
    const exportMBS = Object.freeze({
        common: Object.freeze(common),
        crafting: Object.freeze(crafting),
        equipper: Object.freeze(equipper),
        fortune_wheel_customize: Object.freeze(fortune_wheel_customize),
        fortune_wheel_select: Object.freeze(fortune_wheel_select),
        fortune_wheel: Object.freeze(fortune_wheel),
        item_bundle: Object.freeze(item_bundle),
        settings: Object.freeze(settings),
    });
    const globalExport = {
        MBSFortuneWheelBackground: MBSFortuneWheelBackground,
        MBSFortuneWheelLoad: MBSFortuneWheelLoad,
        MBSFortuneWheelRun: MBSFortuneWheelRun,
        MBSFortuneWheelClick: MBSFortuneWheelClick,
        MBSFortuneWheelExit: MBSFortuneWheelExit,
        MBSFortuneWheelSelectBackground: MBSFortuneWheelSelectBackground,
        MBSFortuneWheelSelectLoad: MBSFortuneWheelSelectLoad,
        MBSFortuneWheelSelectRun: MBSFortuneWheelSelectRun,
        MBSFortuneWheelSelectClick: MBSFortuneWheelSelectClick,
        MBSFortuneWheelSelectExit: MBSFortuneWheelSelectExit,
    };
    const w = <typeof window & typeof globalExport & typeof exportMBS>window;
    Object.assign(w, globalExport, { MBS: exportMBS });
});