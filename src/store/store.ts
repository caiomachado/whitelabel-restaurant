import { configureStore } from "@reduxjs/toolkit";
import venueReducer from './reducers/venueReducer';
import menuReducer from "./reducers/menuReducer";

export const store = configureStore({
    reducer: {
        venue: venueReducer,
        menu: menuReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;