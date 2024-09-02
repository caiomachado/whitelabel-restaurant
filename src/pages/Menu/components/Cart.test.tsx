import { render, screen, fireEvent } from '@testing-library/react';
import { Cart } from './Cart';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from '../../../store/reducers/venueReducer';
import menuReducer from '../../../store/reducers/menuReducer';
import cartReducer from '../../../store/reducers/cartReducer';
import { restaurantMockData } from '../../../mocks';
import { RootState } from '../../../store/store';

const mockData = [
    {
        id: new Date().getTime(),
        itemId: 1004122,
        name: "Smirnoff",
        quantity: 1,
        modifiers: {},
        unitPrice: 10,
    },
    {
        id: new Date().getTime() + 1,
        itemId: 1625701,
        name: "Hard Core",
        quantity: 2,
        modifiers: {},
        unitPrice: 66,
    },
]

const renderUI = (storeInitialValues?: Partial<RootState>) => {
    const store = configureStore({
        reducer: {
            venue: venueReducer,
            menu: menuReducer,
            cart: cartReducer,
        },
        preloadedState: {
            venue: {
                venue: restaurantMockData
            },
            menu: {
                menuItems: null,
                accordionsState: null,
            },
            cart: {
                cart: mockData,
            },
            ...storeInitialValues
        }
    })

    return render(
        <Provider store={store}>
            <Cart />
        </Provider>
    )
}


describe('Cart', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    it('should render correctly', () => {
        renderUI();
        const sectionName = screen.getByText('Carrinho');
        expect(sectionName).toBeVisible();
    })

    it('should display empty cart text if there are no items selected', () => {
        renderUI({ cart: { cart: [] } });
        const emptyText = screen.getByText('Seu carrinho está vazio');
        expect(emptyText).toBeVisible();
    })

    it('should update total value correctly if you increase the quantity of a selected item', () => {
        renderUI();
        const [, totalPrice] = screen.getAllByText('R$76.00');
        expect(totalPrice).toBeVisible();
        const [firstItemIncrement] = screen.getAllByTestId('increment-button');
        fireEvent.click(firstItemIncrement);
        expect(totalPrice).toHaveTextContent('86.00');
    })

    it('should update total value correctly if you decrease the quantity of a selected item', () => {
        renderUI();
        const [, totalPrice] = screen.getAllByText('R$76.00');
        expect(totalPrice).toBeVisible();
        const [, secondItemDecrement] = screen.getAllByTestId('decrement-button');
        fireEvent.click(secondItemDecrement);
        expect(totalPrice).toHaveTextContent('R$43.00');
    })

    it('should update total value correctly if you decrease the quantity of a selected item', () => {
        renderUI();
        const checkoutButton = screen.getByText('Checkout now');
        fireEvent.click(checkoutButton);
        const emptyText = screen.getByText('Seu carrinho está vazio');
        expect(emptyText).toBeVisible();
    })
})