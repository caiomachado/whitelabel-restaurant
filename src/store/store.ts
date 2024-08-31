import { configureStore } from "@reduxjs/toolkit";
import venueReducer from './reducers/venueReducer';

export const store = configureStore({
    reducer: {
        venue: venueReducer,
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;