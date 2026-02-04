import { JSONObject } from 'harmony-types';

export declare function getLegacyWarpaint(id: number): string | number;

export declare interface ProtoDefID {
    type: number;
    defindex: number;
}

export declare function setLegacyWarpaint(oldId: number, newId: string): void;

export declare enum Tf2Team {
    None = -1,
    Red = 0,
    Blu = 1
}

export declare class UniformRandomStream {
    #private;
    constructor(seed?: number);
    set seed(seed: number);
    randomFloat(low?: number, high?: number): number;
    randomFloatExp(low?: number, high?: number): number;
    randomInt(low: number, high: number): number;
}

export declare class WarpaintDefinitions {
    #private;
    static warpaintDefinitionsPromise: Promise<JSONObject> | null;
    static warpaintDefinitions: JSONObject;
    static setWarpaintDefinitionsURL(url: string): void;
    static getWarpaintDefinitions(): Promise<JSONObject>;
    static setWarpaintDefinitions(warpaintDefinitions: JSONObject | null): void;
    static getDefinition(cMsgProtoDefID: JSONObject): Promise<JSONObject | null>;
}

export { }
