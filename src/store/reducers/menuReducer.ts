import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Menu } from "../../models/menu";

type AccordionsState = Record<string, boolean>;

type ReducerState = {
    menuItems: Menu | null;
    accordionsState: AccordionsState | null;
}

type UpdateAccordionStatePayload = {
    key: string;
    isOpen: boolean;
}

const initialState: ReducerState = {
    menuItems: null,
    accordionsState: null,
};

export const menuSlice = createSlice({
    name: 'menu',
    initialState,
    reducers: {
        setMenuItems: (state, action: PayloadAction<Menu>) => {
            state.accordionsState = action.payload.sections.reduce<AccordionsState>((acc, cur) => {
                acc[cur.name] = true;
                return acc;
            }, {})
            state.menuItems = action.payload;
        },
        updateAccordionsState: (state, action: PayloadAction<UpdateAccordionStatePayload>) => {
            state.accordionsState = {
                ...state.accordionsState,
                [action.payload.key]: action.payload.isOpen,
            }
        },
        expandAllAccordions: (state) => {
            state.accordionsState = state?.accordionsState && Object.keys(state.accordionsState).reduce<AccordionsState>((acc, accordionName) => {
                acc[accordionName] = true;
                return acc;
            }, {})
        }
    }
})

export const { setMenuItems, updateAccordionsState, expandAllAccordions } = menuSlice.actions;

export default menuSlice.reducer;