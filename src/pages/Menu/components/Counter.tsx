import { Minus, Plus } from 'lucide-react';

export type CounterProps = {
    count: number;
    isDecrementDisabled?: boolean;
    isIncrementDisabled?: boolean;
    onDecrement: () => void;
    onIncrement: () => void;
}

export const Counter = ({ count, onDecrement, onIncrement, isDecrementDisabled, isIncrementDisabled }: CounterProps) => {
    return (
        <div className="flex items-center gap-4">
            <button
                type="button"
                onClick={onDecrement}
                className="bg-[#4F372F] rounded-full p-1.5 disabled:bg-[#DADADA]"
                disabled={isDecrementDisabled}
            >
                <Minus size={18} color={isDecrementDisabled ? "#5F5F5F" : "#FFFFFF"} />
            </button>
            <span className="text-[#121212] font-semibold text-2xl leading-7">{count}</span>
            <button
                type="button"
                onClick={onIncrement}
                className="bg-[#4F372F] rounded-full p-1.5 disabled:bg-[#DADADA]"
                disabled={isIncrementDisabled}
            >
                <Plus size={18} color={isIncrementDisabled ? "#5F5F5F" : "#FFFFFF"} />
            </button>
        </div>
    )
}