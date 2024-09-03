import { useTranslation } from "react-i18next";
import { useAppSelector } from "../../../store/hooks";

export const CartPrices = () => {
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const cart = useAppSelector((state) => state.cart.cart);
    const { t } = useTranslation();

    const totalPrice = cart.reduce((total, cartItem) => {
        total += cartItem.unitPrice;
        return total;
    }, 0)

    return (
        <div className="flex flex-col">
            <div className="p-4 border-b border-[#dadada] flex items-center justify-between bg-[#F8F9FA]">
                <h3 className="font-normal text-[#121212] text-base leading-[18px]">{t('menu.cart.subtotal')}</h3>
                <span className="font-medium text-[#121212] text-base leading-[18px]">
                    {currentVenue?.ccySymbol}{totalPrice.toFixed(2)}
                </span>
            </div>
            <div className="p-4 flex items-center justify-between bg-[#F8F9FA]">
                <h3 className="font-light text-[#121212] text-2xl leading-7">{t('menu.cart.total')}</h3>
                <span className="font-bold text-[#121212] text-2xl leading-7">
                    {currentVenue?.ccySymbol}{totalPrice.toFixed(2)}
                </span>
            </div>
        </div>
    )
}