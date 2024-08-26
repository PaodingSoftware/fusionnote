import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit"
import { saveState } from "../localStorage"

interface LocationState {
    fileIdentifier: string,
    filePath: string,
    displayName: string,
    pageIndex: number,
}

const initialState: LocationState = {
    fileIdentifier: "about:blank:0",
    filePath: "",
    displayName: "未选择文件",
    pageIndex: 0,
}

export const locationSlice = createSlice({
    name: 'location',
    initialState,
    reducers: {
        setFileIdentifier: (state, action: PayloadAction<string>) => {
            state.fileIdentifier = action.payload
        },
        setFilePath: (state, action: PayloadAction<string>) => {
            state.filePath = action.payload
        },
        setDisplayName: (state, action: PayloadAction<string>) => {
            state.displayName = action.payload
        },
        setPageIndex: (state, action: PayloadAction<number>) => {
            state.pageIndex = action.payload
        },
    }
})

function parseFileName(url: string) {
    if (url == "about:blank" || !url) {
        return "未选择文件";
    }
    let path = new URL(url).pathname;
    return path.substring(path.lastIndexOf('/') + 1);
}

export const locationMiddleware: Middleware = store => next => async (action: any) => {
    const { dispatch, getState } = store;
    const { type } = action;

    function localStorageOnChanged(changes: { [key: string]: chrome.storage.StorageChange }) {
        for (let key in changes) {
            let change = changes[key];
            if (key == 'location') {
                dispatch(setFileIdentifier(change.newValue['id']));
                dispatch(setFilePath(change.newValue['originalUrl']));
                dispatch(setDisplayName(parseFileName(change.newValue['originalUrl'])));
                dispatch(setPageIndex(change.newValue['pageIndex']));
            }
        }
    }

    if (type == "location/bindlocalStorageEventListener") {
        if (chrome.storage) {
            chrome.storage.local.onChanged.addListener(localStorageOnChanged);
        }
    }

    let result = next(action);

    if (type == "notes/addNote" || type == "notes/removeNote") {
        const state = getState();
        await saveState(state.location.fileIdentifier, state.notes.items);
    }

    return result;
}

export const bindlocalStorageEventListener = { type: 'location/bindlocalStorageEventListener' }

export const { setFileIdentifier, setFilePath, setDisplayName, setPageIndex } = locationSlice.actions

export default locationSlice.reducer 