import { JSONObject } from 'harmony-types';

const TYPE_STRING_TO_INT: any = {// TODO: turn into map
	'DEF_TYPE_PAINTKIT_VARIABLES': 6,
	'DEF_TYPE_PAINTKIT_OPERATION': 7,
	'DEF_TYPE_PAINTKIT_ITEM_DEFINITION': 8,
	'DEF_TYPE_PAINTKIT_DEFINITION': 9,
	'DEF_TYPE_HEADER_ONLY': 10,
}

export interface ProtoDefID {
	type: number;
	defindex: number;
}

export class WarpaintDefinitions {
	static warpaintDefinitionsPromise: Promise<JSONObject> | null;
	static warpaintDefinitions: JSONObject;
	static #warpaintDefinitionsURL: string = '';

	static setWarpaintDefinitionsURL(url: string) {
		this.#warpaintDefinitionsURL = url;
	}

	static getWarpaintDefinitions(): Promise<JSONObject> {
		if (!this.warpaintDefinitionsPromise) {
			this.warpaintDefinitionsPromise = new Promise(async (resolve, reject) => {
				let reponse = await fetch(this.#warpaintDefinitionsURL);
				this.warpaintDefinitions = await reponse.json();
				resolve(this.warpaintDefinitions);
			});
		}
		return this.warpaintDefinitionsPromise;
	}

	static setWarpaintDefinitions(warpaintDefinitions: JSONObject | null) {
		if (warpaintDefinitions) {
			this.warpaintDefinitionsPromise = new Promise(async resolve => {
				resolve(warpaintDefinitions);
			});
		} else {
			this.warpaintDefinitionsPromise = null;
		}
	}

	static async getDefinition(cMsgProtoDefID: JSONObject): Promise<JSONObject | null> {
		let warpaintDefinitions = await this.getWarpaintDefinitions();
		if (warpaintDefinitions) {
			let type = warpaintDefinitions[String(TYPE_STRING_TO_INT[String(cMsgProtoDefID.type)] ?? cMsgProtoDefID.type)] as JSONObject;
			if (type) {
				return type[String(cMsgProtoDefID.defindex)] as JSONObject;
			}
		}
		return null;
	}
}
