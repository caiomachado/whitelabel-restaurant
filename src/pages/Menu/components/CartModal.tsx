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
import { Item as CartItem } from "./CartItem";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { clearCart } from "../../../store/reducers/cartReducer";
import { useTranslation } from "react-i18next";
import { CartPrices } from "./CartPrices";

type Props = {
    open: boolean;
    onOpenChange: () => void;
}

export const CartModal = ({ open, onOpenChange }: Props) => {
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();
    const { t } = useTranslation();

    function handleCheckout() {
        dispatch(clearCart())
        onOpenChange();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            <DialogContent className="w-full h-full overflow-auto max-w-full flex flex-col bg-[#F8F9FA] p-0 border-none gap-0 md:h-auto md:overflow-hidden md:w-[480px]">
                <DialogHeader className="p-6 border-b border-[#DADADA] bg-white">
                    <DialogTitle className="text-[#121212] font-medium leading-[21px] text-center">{t('menu.cart.title')}</DialogTitle>
                    <DialogDescription className="hidden">{t('menu.cart.description')}</DialogDescription>
                </DialogHeader>

                <div className={twMerge("w-full bg-white")}>
                    {cart.map((cartItem, index) => {
                        return (
                            <CartItem key={cartItem?.id} cartItem={cartItem} currentIndex={index} />
                        )
                    })}

                    <CartPrices />
                </div>

                <DialogFooter className="bg-[#F8F9FA] items-center justify-center mt-auto p-6">
                    <Button
                        fullSize
                        type="button"
                        onClick={handleCheckout}
                    >
                        {t('menu.cart.checkout-button')}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
