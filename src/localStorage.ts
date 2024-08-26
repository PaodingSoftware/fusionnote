export async function loadState(key: string) {
    try {
        return await chrome.storage.local.get(key);
    } catch (e) {
        return undefined;
    }
}

export async function saveState(key: string, state: any) {
    try {
        await chrome.storage.local.set({ [key]: state });
    } catch (e) {
        // Ignore
    }
}