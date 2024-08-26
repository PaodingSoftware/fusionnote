import { createSlice, Middleware, PayloadAction } from "@reduxjs/toolkit"
import { loadState } from "../localStorage"
import pDebounce from "p-debounce"

export interface NoteState {
    id: string,
    caption: string,
    content: string,
    content_type: string,
    created_at: number,
}

interface NotesState {
    items: NoteState[]
}

const initialState: NotesState = {
    items: []
}

export const notesSlice = createSlice({
    name: 'notes',
    initialState,
    reducers: {
        addNote: (state, action: PayloadAction<NoteState>) => {
            state.items = [action.payload, ...state.items]
        },
        removeNote: (state, action: PayloadAction<string>) => {
            state.items = state.items.filter(note => note.id != action.payload)
        },
        resetNotes: (state, action: PayloadAction<NoteState[]>) => {
            state.items = !action.payload ? [] : action.payload
        },
    }
})

export const notesMiddleware: Middleware = store => next => async (action: any) => {
    const { dispatch } = store;
    const { type, payload } = action;

    if (type == "location/setFileIdentifier") {
        const debouncedFunction = pDebounce(async () => {
            const loadedState = await loadState(payload);
            if (loadedState) {
                dispatch(resetNotes(loadedState[payload] as any));
            }
        }, 800);
        await debouncedFunction();
    }

    return next(action);
}

export const { addNote, removeNote, resetNotes } = notesSlice.actions

export default notesSlice.reducer