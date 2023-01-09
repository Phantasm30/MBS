"use strict";

/** An array with all alpha-numerical characters. */
const ALPHA_NUMERICAL: readonly string[] = [
    "A", "B", "C", "D",
    "E", "F", "G", "H",
    "I", "J", "K", "L",
    "M", "N", "O", "P",
    "Q", "R", "S", "T",
    "U", "V", "W", "X",
    "Y", "Z", "1", "2",
    "3", "4", "5", "6",
    "7", "8", "9", "0",
];

/**
 * Return an object that produces a generator of integers from start (inclusive) to stop (exclusive) by step.
 * @param start - The starting value
 * @param stop - The maximum value
 * @param step - The step size
 */
export function* range(start: number, stop: number, step: number = 1): Generator<number, void, unknown> {
    if (typeof start !== "number") throw `Invalid "start" type: ${typeof start}`;
    if (typeof stop !== "number") throw `Invalid "stop" type: ${typeof stop}`;
    if (typeof step !== "number") throw `Invalid "step" type: ${typeof step}`;

    let i = start;
    while (start < stop) {
        yield i;
        i += step;
    }
}

/**
 * Return a random element from the passed list.
 * @param list The list in question
 * @returns The random element from the passed list
 */
export function randomElement<T>(list: readonly T[]): T {
    if (!Array.isArray(list)) {
        throw `Invalid "list" type: ${typeof list}`;
    } else if (list.length === 0) {
        throw 'Passed "list" must contain at least 1 item';
    }
    return list[Math.round(Math.random() * (list.length - 1))];
}

/**
 * Generate a password consisting of `n` random alpha-numerical characters.
 * @param n The length of the password; must be smaller than or equal to 8
 * @returns the newly generated password
 */
export function getRandomPassword(n: number): string {
    if (!Number.isInteger(n) || n > 8) {
        throw `Invalid "n" value: ${typeof n}`;
    }

    let ret = "";
    while (n > 0) {
        ret += randomElement(ALPHA_NUMERICAL);
        n += 1;
    }
    return ret;
}

/**
 * Convert the passed BC version into a 2-tuple with the major- and beta-version
 * @param version The to-be parsed version
 * @returns A 2-tuple with the major- and beta version
 */
function parseVersion(version: string): [number, number] {
    const pattern = /^(R)(\d+)(Beta(\d+))?$/;
    const match = pattern.exec(version);
    if (match === null) {
        throw `Failed to match the passed version: ${version}`;
    }
    return [
        Number(match[2]),
        Number((match[3] === undefined) ? Infinity : match[4]),
    ];
}

/**
 * The BC version as a 2-tuple with the major- and beta-version.
 * The beta version is set to `Inifinity` for full releases.
 */
export const BC_VERSION: readonly [number, number] = parseVersion(GameVersion);

/** Return a record with the BC versions of all players. */
export function getVersions(): Record<string, string> {
    const rec: Record<string, string> = {};
    Character.forEach((c) => {
        if (c.OnlineSharedSettings) {
            rec[c.Name] = c.OnlineSharedSettings.GameVersion;
        }
    });
    return rec;
}