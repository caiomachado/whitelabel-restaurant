import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { Counter } from "./Counter";
import { incrementItemQuantity, decrementItemQuantity, clearCart } from "../../../store/reducers/cartReducer";
import { twMerge } from "tailwind-merge";
import { Button } from "../../../components";

export const Cart = () => {
    const cart = useAppSelector((state) => state.cart.cart);
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const dispatch = useAppDispatch();

    const totalPrice = cart.reduce((total, cartItem) => {
        total += cartItem.unitPrice;
        return total;
    }, 0)

    return (
        <div className="hidden md:flex md:flex-col md:shadow-[0_2px_14px_0_rgba(0,0,0,0.14)] md:h-fit md:w-[320px]">
            <div className="w-full md:px-3 md:py-4 lg:p-6">
                <h1 className="text-[#464646] font-medium text-2xl leading-7">Carrinho</h1>
            </div>

            <div className={twMerge("w-full bg-white", !cart.length && 'md:px-3 md:py-4 lg:p-6')}>
                {!cart.length ? (
                    <p className="text-[#464646] leading-[18px] font-normal">Seu carrinho está vazio</p>
                ) : (
                    <>
                        {cart.map((cartItem, index) => {
                            return (
                                <div key={cartItem?.id} className="flex justify-between gap-2.5 p-4">
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

                        <div className="p-4 border-t border-[#EEEEEE] flex items-center justify-between bg-[#F8F9FA]">
                            <h3 className="font-normal text-[#121212] text-base leading-[18px]">Sub total</h3>
                            <span className="font-medium text-[#121212] text-base leading-[18px]">
                                {currentVenue?.ccySymbol}{totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className="p-4 border-t border-[#dadada] flex items-center justify-between bg-[#F8F9FA]">
                            <h3 className="font-light text-[#121212] text-2xl leading-7">Total:</h3>
                            <span className="font-bold text-[#121212] text-2xl leading-7">
                                {currentVenue?.ccySymbol}{totalPrice.toFixed(2)}
                            </span>
                        </div>
                        <div className="w-full p-6 pt-2">
                            <Button
                                fullSize
                                type="button"
                                onClick={() => dispatch(clearCart())}
                            >
                                Checkout now
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}