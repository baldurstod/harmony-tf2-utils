const legacyWarpaints = new Map<number, string>();

export function setLegacyWarpaint(oldId: number, newId: string) {
	legacyWarpaints.set(oldId, newId.replace(/\~\d+/, ''));
}

export function getLegacyWarpaint(id: number): string | number {
	return legacyWarpaints.get(id) ?? id;
}
