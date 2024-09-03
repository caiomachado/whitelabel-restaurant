import { useAppDispatch, useAppSelector } from "../../../store/hooks"
import { clearCart } from "../../../store/reducers/cartReducer";
import { twMerge } from "tailwind-merge";
import { Button } from "../../../components";
import { useTranslation } from "react-i18next";
import { Item as CartItem } from "./CartItem";
import { CartPrices } from "./CartPrices";

export const Cart = () => {
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    return (
        <div className="hidden md:flex md:flex-col md:shadow-[0_2px_14px_0_rgba(0,0,0,0.14)] md:h-fit md:w-[320px]">
            <div className="w-full md:px-3 md:py-4 lg:p-6">
                <h1 className="text-[#464646] font-medium text-2xl leading-7">{t('menu.cart.title')}</h1>
            </div>

            <div className={twMerge("w-full bg-white", !cart.length && 'md:px-3 md:py-4 lg:p-6')}>
                {!cart.length ? (
                    <p className="text-[#464646] leading-[18px] font-normal">{t('menu.cart.empty-cart-text')}</p>
                ) : (
                    <>
                        {cart.map((cartItem, index) => {
                            return (
                                <CartItem key={cartItem?.id} cartItem={cartItem} currentIndex={index} />
                            )
                        })}

                        <CartPrices />

                        <div className="w-full p-6 pt-2">
                            <Button
                                fullSize
                                type="button"
                                onClick={() => dispatch(clearCart())}
                            >
                                {t('menu.cart.checkout-button')}
                            </Button>
                        </div>
                    </>
                )}
            </div>
        </div>
    )
}