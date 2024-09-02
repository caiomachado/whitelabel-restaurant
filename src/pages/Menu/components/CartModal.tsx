import { twMerge } from "tailwind-merge";
import { Button } from "../../../components";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "../../../components/Dialog"
import { Counter } from "./Counter";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearCart, decrementItemQuantity, incrementItemQuantity } from "../../../store/reducers/cartReducer";

type Props = {
    open: boolean;
    onOpenChange: () => void;
}

export const CartModal = ({ open, onOpenChange }: Props) => {
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();

    const totalPrice = cart.reduce((total, cartItem) => {
        total += cartItem.unitPrice;
        return total;
    }, 0)

    function handleCheckout() {
        dispatch(clearCart())
        onOpenChange();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            <DialogContent className="w-full h-full overflow-auto max-w-full flex flex-col bg-[#F8F9FA] p-0 border-none gap-0 md:h-auto md:overflow-hidden md:w-[480px]">
                <DialogHeader className="p-6 border-b border-[#DADADA] bg-white text-center">
                    <DialogTitle className="text-[#121212] font-medium leading-[21px]">Basket</DialogTitle>
                    <DialogDescription className="hidden">Cart content</DialogDescription>
                </DialogHeader>

                <div className={twMerge("w-full bg-white")}>
                    {cart.map((cartItem, index) => {
                        return (
                            <div key={cartItem?.id} className="flex justify-between gap-2.5 p-4 border-b border-[#EEEEEE]">
                                <div className="flex flex-col gap-1">
                                    <div className="flex flex-col gap-1">
                                        <h3 className="font-normal text-[#121212] text-base leading-[18px]">{cartItem?.name}</h3>
                                        {Object.values(cartItem?.modifiers).length > 0 && (
                                            <p className="font-normal text-[#5F5F5F] text-base leading-[18px]">
                                                Com {Object.values(cartItem?.modifiers).flat().map((modifier) => modifier.name).join(', ')}
                                            </p>
                                        )}
                                    </div>

                                    <Counter
                                        count={cartItem?.quantity}
                                        size={12}
                                        onDecrement={() => dispatch(decrementItemQuantity(index))}
                                        onIncrement={() => dispatch(incrementItemQuantity(index))}
                                    />
                                </div>

                                <span className="font-medium text-[#121212] text-base leading-[18px] flex-shrink-0">
                                    {currentVenue?.ccySymbol}{cartItem?.unitPrice?.toFixed(2)}
                                </span>
                            </div>
                        )
                    })}

                    <div className="p-4 border-b border-[#dadada] flex items-center justify-between bg-[#F8F9FA]">
                        <h3 className="font-normal text-[#121212] text-base leading-[18px]">Sub total</h3>
                        <span className="font-medium text-[#121212] text-base leading-[18px]">
                            {currentVenue?.ccySymbol}{totalPrice.toFixed(2)}
                        </span>
                    </div>
                    <div className="p-4 flex items-center justify-between bg-[#F8F9FA]">
                        <h3 className="font-light text-[#121212] text-2xl leading-7">Total:</h3>
                        <span className="font-bold text-[#121212] text-2xl leading-7">
                            {currentVenue?.ccySymbol}{totalPrice.toFixed(2)}
                        </span>
                    </div>
                </div>

                <DialogFooter className="bg-[#F8F9FA] items-center justify-center mt-auto p-6">
                    <Button
                        fullSize
                        type="button"
                        onClick={handleCheckout}
                    >
                        Checkout now
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
