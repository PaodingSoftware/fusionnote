import { configureStore } from "@reduxjs/toolkit";
import locationReducer, { locationMiddleware } from './slices/locationSlice';
import submitFormReducer from './slices/submitFormSlice'
import notesReducer, { notesMiddleware } from './slices/notesSlice'
import dockReducer, { dockMiddleware } from './slices/dockSlice'

const store = configureStore({
    reducer: {
        location: locationReducer,
        submitForm: submitFormReducer,
        notes: notesReducer,
        dock: dockReducer,
    },
    middleware: (getDefaultMiddleware) => {
        return getDefaultMiddleware().concat([notesMiddleware, locationMiddleware, dockMiddleware]);
    },
})

export type RootState = ReturnType<typeof store.getState>

export type AppDispatch = typeof store.dispatch

export default store;