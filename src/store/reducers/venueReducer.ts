import { createSlice } from "@reduxjs/toolkit";
import { Venue } from "../../models/venue";

type ReducerState = {
    venue: Venue | null
}

const initialState: ReducerState = {
    venue: null,
};

export const venueSlice = createSlice({
    name: 'venue',
    initialState,
    reducers: {
        setVenue: (state, action) => {
            state.venue = action.payload;
        }
    }
})

export const { setVenue } = venueSlice.actions;

export default venueSlice.reducer;