import { render, screen, fireEvent } from '@testing-library/react';
import { Counter, CounterProps } from './Counter';
import { vi } from 'vitest';

const mockDecrementFn = vi.fn();
const mockIncrementFn = vi.fn();

const renderUI = (props?: Partial<CounterProps>) => (
    render(<Counter count={0} onDecrement={mockDecrementFn} onIncrement={mockIncrementFn} {...props} />)
)

describe('Counter', () => {
    afterEach(() => {
        vi.clearAllMocks();
    })

    it('should render correctly', () => {
        renderUI();
        const countText = screen.getByText('0');
        expect(countText).toBeVisible();
    })

    it('should call increment function when clicking on the plus button', () => {
        renderUI();
        const [, incrementButton] = screen.getAllByRole('button');
        fireEvent.click(incrementButton);
        expect(mockIncrementFn).toHaveBeenCalled();
    })

    it('should call decrement function when clicking on the minus button', () => {
        renderUI();
        const [decrementButton] = screen.getAllByRole('button');
        fireEvent.click(decrementButton);
        expect(mockDecrementFn).toHaveBeenCalled();
    })

    it('decrement button should be disabled if isDecrementDisabled is true', () => {
        renderUI({ isDecrementDisabled: true })
        const [decrementButton] = screen.getAllByRole('button');
        expect(decrementButton).toBeDisabled();
    });

    it('increment button should be disabled if isIncrementDisabled is true', () => {
        renderUI({ isIncrementDisabled: true })
        const [, incrementButton] = screen.getAllByRole('button');
        expect(incrementButton).toBeDisabled();
    });
})