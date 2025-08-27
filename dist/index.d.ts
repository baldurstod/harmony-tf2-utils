export declare function getLegacyPaintKit(id: number): string | number;

export declare class PaintKitDefinitions {
    #private;
    static warpaintDefinitionsPromise: Promise<any>;
    static warpaintDefinitions: any;
    static setWarpaintDefinitionsURL(url: string): void;
    static getWarpaintDefinitions(): Promise<any>;
    static setWarpaintDefinitions(warpaintDefinitions: any): void;
    static getDefinition(cMsgProtoDefID: any): Promise<any>;
}

export declare interface ProtoDefID {
    type: number;
    defindex: number;
}

export declare function setLegacyPaintKit(oldId: number, newId: string): void;

export declare enum Tf2Team {
    RED = 0,
    BLU = 1
}

export declare class UniformRandomStream {
    #private;
    constructor(seed?: number);
    set seed(seed: number);
    randomFloat(low?: number, high?: number): number;
    randomFloatExp(low?: number, high?: number): number;
    randomInt(low: number, high: number): number;
}

export { }
