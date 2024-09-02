import { render, screen, fireEvent } from '@testing-library/react';
import { vi } from 'vitest';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from '../../../store/reducers/venueReducer';
import menuReducer from '../../../store/reducers/menuReducer';
import cartReducer from '../../../store/reducers/cartReducer';
import { restaurantMockData } from '../../../mocks';
import { RootState } from '../../../store/store';
import { AddToCartModal, AddToCartModalProps } from './AddToCartModal';
import { AvailabilityType } from '../../../models/menu';

const mockData = {
    "id": 1625701,
    "name": "Hard Core",
    "description": "180g angus beef burger, with shredded ribs, gruyere cheese, caramelized onions, lettuce, confit tomato, special house bread, served with fried cassava and passion fruit chipotle.",
    "alcoholic": 0,
    "price": 33.00,
    "position": 0,
    "visible": 1,
    "availabilityType": AvailabilityType.AVAILABLE,
    "sku": "I1625701",
    "images": [
        {
            "id": 108305,
            "image": "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbdc8cecca.png"
        }
    ],
    "available": true
};

const onOpenChangeFn = vi.fn();

const renderUI = (props?: Partial<AddToCartModalProps>, storeInitialValues?: Partial<RootState>) => {
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
                cart: [],
            },
            ...storeInitialValues
        }
    })

    return render(
        <Provider store={store}>
            <AddToCartModal open onOpenChange={onOpenChangeFn} itemDetails={mockData} {...props} />
        </Provider>
    )
}


describe('AddToCartModal', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    it('should render correctly', () => {
        renderUI();
        const [itemName] = screen.getAllByText(mockData.name);
        expect(itemName).toBeVisible();
    })

    it('should display correct total value if you increase the quantity', () => {
        renderUI();
        const incrementButton = screen.getByTestId('increment-button');
        const totalPrice = screen.getByText('Add to Order • R$33.00');
        const count = screen.getByText('1');
        expect(count).toHaveTextContent('1');
        fireEvent.click(incrementButton);
        expect(count).toHaveTextContent('2');
        expect(totalPrice).toHaveTextContent('Add to Order • R$66.00');
    })

    it('should disable decrement button if quantity is 1', () => {
        renderUI();
        const count = screen.getByText('1');
        const decrementButton = screen.getByTestId('decrement-button');
        expect(count).toHaveTextContent('1');
        expect(decrementButton).toBeDisabled();
    })

    it('should close modal if Add to order button is clicked', () => {
        renderUI();
        const addToOrderButton = screen.getByTestId('add-to-order-button');
        fireEvent.click(addToOrderButton);
        expect(onOpenChangeFn).toHaveBeenCalled();
    })
})