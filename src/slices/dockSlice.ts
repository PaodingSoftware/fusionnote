import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit"

interface dockState {
    isDocked: boolean,
}

const initialState: dockState = {
    isDocked: false,
}

export const dockSlice = createSlice({
    name: 'dock',
    initialState,
    reducers: {
        setDockingStatus: (state, action: PayloadAction<boolean>) => {
            state.isDocked = action.payload
        },
    }
})

export const dockMiddleware: Middleware = store => next => async (action: any) => {
    const { dispatch, getState } = store;
    const { type } = action;

    if (type == "dock/determineDockingStatus") {
        const isDocked = await (window as any).paoding.isWindowDocked({});
        dispatch(setDockingStatus(isDocked));
    }

    return next(action);
}

export const determineDockingStatus = { type: 'dock/determineDockingStatus' }

export const { setDockingStatus } = dockSlice.actions

export default dockSlice.reducer