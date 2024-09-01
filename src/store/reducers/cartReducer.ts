import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CartItem } from "../../models/cart";

type ReducerState = {
    cart: CartItem[];
}

const initialState: ReducerState = {
    cart: [],
};

export const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {
        addItemToCart: (state, action: PayloadAction<CartItem>) => {
            state.cart.push(action.payload)
        },
        incrementItemQuantity: (state, action: PayloadAction<number>) => {
            const updatedCart = state.cart.map((cartItem, index) => {
                if (index === action.payload) {
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                    }
                }

                return cartItem;
            })
            state.cart = updatedCart;
        },
        decrementItemQuantity: (state, action: PayloadAction<number>) => {
            const updatedCart = state.cart.map((cartItem, index) => {
                if (index === action.payload) {
                    return cartItem.quantity === 1 ? undefined : {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                    }
                }

                return cartItem;
            }).filter(Boolean) as CartItem[];
            state.cart = updatedCart;
        }
    }
})

export const { addItemToCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;