var Tf2Team;
(function (Tf2Team) {
    Tf2Team[Tf2Team["RED"] = 0] = "RED";
    Tf2Team[Tf2Team["BLU"] = 1] = "BLU";
})(Tf2Team || (Tf2Team = {}));

const legacyPaintKits = new Map();
function setLegacyPaintKit(oldId, newId) {
    legacyPaintKits.set(oldId, newId.replace(/\~\d+/, ''));
}
function getLegacyPaintKit(id) {
    return legacyPaintKits.get(id) ?? id;
}

const TYPE_STRING_TO_INT = {
    'DEF_TYPE_PAINTKIT_VARIABLES': 6,
    'DEF_TYPE_PAINTKIT_OPERATION': 7,
    'DEF_TYPE_PAINTKIT_ITEM_DEFINITION': 8,
    'DEF_TYPE_PAINTKIT_DEFINITION': 9,
    'DEF_TYPE_HEADER_ONLY': 10,
};
class PaintKitDefinitions {
    static warpaintDefinitionsPromise;
    static warpaintDefinitions;
    static #warpaintDefinitionsURL = '';
    static setWarpaintDefinitionsURL(url) {
        this.#warpaintDefinitionsURL = url;
    }
    static getWarpaintDefinitions() {
        if (!this.warpaintDefinitionsPromise) {
            this.warpaintDefinitionsPromise = new Promise(async (resolve, reject) => {
                let reponse = await fetch(this.#warpaintDefinitionsURL);
                this.warpaintDefinitions = await reponse.json();
                resolve(this.warpaintDefinitions);
            });
        }
        return this.warpaintDefinitionsPromise;
    }
    static setWarpaintDefinitions(warpaintDefinitions) {
        this.warpaintDefinitionsPromise = new Promise(async (resolve) => {
            resolve(warpaintDefinitions);
        });
    }
    static async getDefinition(cMsgProtoDefID) {
        let warpaintDefinitions = await this.getWarpaintDefinitions();
        if (warpaintDefinitions) {
            let type = warpaintDefinitions[String(TYPE_STRING_TO_INT[String(cMsgProtoDefID.type)] ?? cMsgProtoDefID.type)];
            if (type) {
                return type[String(cMsgProtoDefID.defindex)];
            }
        }
        return null;
    }
}

const NTAB = 32;
const IA = 16807;
const IM = 2147483647;
const IQ = 127773;
const IR = 2836;
const NDIV = (1 + (IM - 1) / NTAB);
const MAX_RANDOM_RANGE = 0x7FFFFFFF;
const AM = (1.0 / IM);
const EPS = 1.2e-7;
const RNMX = (1.0 - EPS);
class UniformRandomStream {
    #m_idum = 0;
    #m_iy = 0;
    #m_iv = [];
    constructor(seed = 0) {
        this.seed = seed;
    }
    set seed(seed) {
        this.#m_idum = ((seed < 0) ? seed : -seed);
        this.#m_iy = 0;
        this.#m_iv = new Array(NTAB);
    }
    #generateRandomNumber() {
        let j;
        let k;
        if (this.#m_idum <= 0 || !this.#m_iy) {
            if (-(this.#m_idum) < 1)
                this.#m_idum = 1;
            else
                this.#m_idum = -(this.#m_idum);
            for (j = NTAB + 7; j >= 0; j--) {
                k = Math.trunc((this.#m_idum) / IQ);
                this.#m_idum = Math.trunc(IA * (this.#m_idum - k * IQ) - IR * k);
                if (this.#m_idum < 0)
                    this.#m_idum += IM;
                if (j < NTAB)
                    this.#m_iv[j] = this.#m_idum;
            }
            this.#m_iy = this.#m_iv[0];
        }
        k = Math.trunc((this.#m_idum) / IQ);
        this.#m_idum = Math.trunc(IA * (this.#m_idum - k * IQ) - IR * k);
        if (this.#m_idum < 0)
            this.#m_idum += IM;
        j = Math.trunc(this.#m_iy / NDIV);
        // We're seeing some strange memory corruption in the contents of s_pUniformStream.
        // Perhaps it's being caused by something writing past the end of this array?
        // Bounds-check in release to see if that's the case.
        if (j >= NTAB || j < 0) {
            //DebuggerBreakIfDebugging();
            //Warning("CUniformRandomStream had an array overrun: tried to write to element %d of 0..31. Contact Tom or Elan.\n", j);
            // Ensure that NTAB is a power of two.
            //COMPILE_TIME_ASSERT( ( NTAB & ( NTAB - 1 ) ) == 0 );
            // Clamp j.
            j &= NTAB - 1;
        }
        this.#m_iy = this.#m_iv[j];
        this.#m_iv[j] = this.#m_idum;
        return this.#m_iy;
    }
    randomFloat(low = 0.0, high = 1.0) {
        let fl = AM * this.#generateRandomNumber();
        if (fl > RNMX) {
            fl = RNMX;
        }
        return fl * (high - low) + low;
    }
    randomFloatExp(low = 0.0, high = 1.0) {
        return Math.random() * (high - low) + low;
    }
    randomInt(low, high) {
        let x = (high - low) + 1;
        let n;
        if (x <= 1 || MAX_RANDOM_RANGE < x - 1) {
            return low;
        }
        let maxAcceptable = MAX_RANDOM_RANGE - ((MAX_RANDOM_RANGE + 1) % x);
        do {
            n = this.#generateRandomNumber();
        } while (n > maxAcceptable);
        return low + (n % x);
    }
}

export { PaintKitDefinitions, Tf2Team, UniformRandomStream, getLegacyPaintKit, setLegacyPaintKit };
