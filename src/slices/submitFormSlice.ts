import { createSlice, PayloadAction } from "@reduxjs/toolkit"

interface submitFormState {
    caption: string,
    content: string,
}

const initialState: submitFormState = {
    caption: "",
    content: "",
}

export const submitFormSlice = createSlice({
    name: 'submitForm',
    initialState,
    reducers: {
        setCaption: (state, action: PayloadAction<string>) => {
            state.caption = action.payload
        },
        setContent: (state, action: PayloadAction<string>) => {
            state.content = action.payload
        },
    }
})

export const { setCaption, setContent } = submitFormSlice.actions

export default submitFormSlice.reducer