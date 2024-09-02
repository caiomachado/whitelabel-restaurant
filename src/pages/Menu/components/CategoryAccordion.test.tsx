import { render, screen, fireEvent } from '@testing-library/react';
import { CategoryAccordion, CategoryAccordionProps } from './CategoryAccordion';
import { vi } from 'vitest';
import { AvailabilityType } from '../../../models/menu';
import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
import venueReducer from '../../../store/reducers/venueReducer';
import menuReducer from '../../../store/reducers/menuReducer';
import cartReducer from '../../../store/reducers/cartReducer';
import { menuMockData, restaurantMockData } from '../../../mocks';
import { RootState } from '../../../store/store';

const mockData = {
    "id": 242677,
    "name": "Desserts",
    "position": 2000,
    "images": [
        {
            "id": 1552,
            "image": "https://preodemo.gumlet.io/usr/venue/7602/section/646fbe93cb615.png"
        }
    ],
    "items": [
        {
            "id": 1625704,
            "name": "Nutella",
            "alcoholic": 0,
            "price": 18.90,
            "position": 0,
            "visible": 1,
            "availabilityType": AvailabilityType.AVAILABLE,
            "images": [
                {
                    "id": 108310,
                    "image": "https://preodemo.gumlet.io/usr/venue/7602/menuItem/646fbf0bec8fe.png"
                }
            ],
            "available": true
        }
    ]
}

const renderUI = (props?: Partial<CategoryAccordionProps>, storeInitialValues?: Partial<RootState>) => {
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
                menuItems: menuMockData,
                accordionsState: {
                    [mockData.name]: true,
                }
            },
            cart: {
                cart: [],
            },
            ...storeInitialValues
        }
    })

    return render(
        <Provider store={store}>
            <CategoryAccordion sectionContent={mockData} filteredValue='' {...props} />
        </Provider>
    )
}


describe('CategoryAccordion', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    it('should render correctly', () => {
        renderUI();
        const sectionName = screen.getByText(mockData.name);
        expect(sectionName).toBeVisible();
    })

    it('should hide items if collapse button is clicked', () => {
        renderUI();
        const collapseButton = screen.getByRole('button');
        const firstItem = screen.getByText(mockData.items[0].name);
        expect(firstItem).toBeVisible();
        fireEvent.click(collapseButton);
        expect(firstItem).not.toBeVisible();
    })

    it('should show items if accordion is collapsed and expand button is clicked', () => {
        renderUI({}, { menu: { menuItems: null, accordionsState: { [mockData.name]: false } } });
        const collapseButton = screen.getByRole('button');
        const hiddenItem = screen.queryByText(mockData.items[0].name);
        expect(hiddenItem).not.toBeInTheDocument();
        fireEvent.click(collapseButton);
        const nutella = screen.getByText(mockData.items[0].name);
        expect(nutella).toBeVisible();
    })

    it('should display an empty search text if no items match the filteredValue', () => {
        renderUI({ filteredValue: 'just testing a random value' });
        const firstItem = screen.queryByText(mockData.items[0].name);
        const emptyText = screen.getByText('No items found in this section with that filter value.');
        expect(firstItem).not.toBeInTheDocument();
        expect(emptyText).toBeVisible();
    })
})