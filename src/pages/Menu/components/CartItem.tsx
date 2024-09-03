import { CartItem } from '../../../models/cart';
import { Counter } from './Counter';
import { incrementItemQuantity, decrementItemQuantity } from "../../../store/reducers/cartReducer";
import { useAppDispatch, useAppSelector } from '../../../store/hooks';
import { useTranslation } from 'react-i18next';

export type CartItemProps = {
    cartItem: CartItem;
}

export const Item = ({ cartItem }: CartItemProps) => {
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    return (
        <div className="flex justify-between gap-2.5 p-4 border-b border-[#EEEEEE]">
            <div className="flex flex-col gap-1">
                <div className="flex flex-col gap-1">
                    <h3 className="font-normal text-[#121212] text-base leading-[18px]">{cartItem?.name}</h3>
                    {Object.values(cartItem?.modifiers).length > 0 && (
                        <p className="font-normal text-[#5F5F5F] text-base leading-[18px]">
                            {t('menu.cart.with-modifiers-text')} {Object.values(cartItem?.modifiers).flat().map((modifier) => modifier.name).join(', ')}
                        </p>
                    )}
                </div>

                <Counter
                    count={cartItem?.quantity}
                    size={12}
                    onDecrement={() => dispatch(decrementItemQuantity(cartItem?.id))}
                    onIncrement={() => dispatch(incrementItemQuantity(cartItem?.id))}
                />
            </div>

            <span className="font-medium text-[#121212] text-base leading-[18px] flex-shrink-0">
                {cartItem?.unitPrice?.toLocaleString(currentVenue?.locale, {
                    style: 'currency',
                    currency: currentVenue?.ccy
                })}
            </span>
        </div>
    )
}