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
            const filteredItems = state.cart.filter(cartItem => cartItem.id === action.payload.id);

            // This item doesn't exist in the cart
            if (!filteredItems.length) {
                state.cart.push(action.payload)
            }

            // This item exists in the cart and the added item is a copy of the existent one
            if (filteredItems.length === 1 && JSON.stringify(filteredItems[0].modifiers) === JSON.stringify(action.payload.modifiers)) {
                const updatedCart = state.cart.map((cartItem) => {
                    if (cartItem.id === filteredItems[0].id) {
                        return {
                            ...cartItem,
                            quantity: cartItem.quantity + 1,
                        }
                    }

                    return cartItem;
                })
                state.cart = updatedCart;
            }

            // There are multiple versions of this item added to the cart
            if (filteredItems.length > 1) {
                // We need to check if there's already a version of this item in the cart or not
                const foundItem = state.cart.find(cartItem => {
                    return cartItem.id === action.payload.id && JSON.stringify(cartItem.modifiers) === JSON.stringify(action.payload.modifiers)
                });

                // If there's a version of it, we update the quantity
                if (foundItem) {
                    const updatedCart = state.cart.map((cartItem) => {
                        if (cartItem.id === foundItem.id && JSON.stringify(cartItem.modifiers) === JSON.stringify(foundItem.modifiers)) {
                            return {
                                ...cartItem,
                                quantity: cartItem.quantity + 1,
                            }
                        }

                        return cartItem;
                    })
                    state.cart = updatedCart;
                } else {
                    // If not, it means that this version that we're adding is a new one so it needs to be pushed into the cart
                    state.cart.push(action.payload)
                }
            }
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
                    return {
                        ...cartItem,
                        quantity: cartItem.quantity - 1,
                    }
                }

                return cartItem;
            })
            state.cart = updatedCart;
        }
    }
})

export const { addItemToCart, incrementItemQuantity, decrementItemQuantity } = cartSlice.actions;

export default cartSlice.reducer;