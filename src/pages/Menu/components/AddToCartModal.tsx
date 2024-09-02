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
import { MenuItem } from "../../../models/menu";
import { Counter } from "./Counter";
import { ModifierBlock } from "./ModifierBlock";
import { CartItem, SelectedModifierOption } from "../../../models/cart";
import { useState } from "react";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { addItemToCart } from "../../../store/reducers/cartReducer";

export type AddToCartModalProps = {
    open: boolean;
    onOpenChange: () => void;
    itemDetails: MenuItem;
}

export const AddToCartModal = ({ open, onOpenChange, itemDetails }: AddToCartModalProps) => {
    const [options, setOptions] = useState<CartItem>(() => ({
        id: itemDetails.id,
        itemId: itemDetails.id,
        name: itemDetails.name,
        unitPrice: itemDetails.price ?? 0,
        quantity: 1,
        modifiers: {}
    }));
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const dispatch = useAppDispatch();
    const hasImageToDisplay = !!itemDetails.images?.length;
    const allRequiredModifiersMinChoices = itemDetails?.modifiers && itemDetails?.modifiers?.reduce<Record<string, number>>((requiredMinChoices, modifier) => {
        if (modifier?.minChoices && modifier?.minChoices > 0) {
            requiredMinChoices[modifier.id] = modifier.minChoices;
        }
        return requiredMinChoices;
    }, {});
    const areAllRequiredModifiersSelected = allRequiredModifiersMinChoices ? Object.entries(allRequiredModifiersMinChoices).every(([modifierId, minChoices]) => {
        return options.modifiers?.[modifierId]?.length >= minChoices;
    }) : true;

    const modifiersTotalPrice = Object.values(options.modifiers).flat().reduce((acc, cur) => {
        acc += cur.price;
        return acc;
    }, 0)
    const totalPrice = (options.unitPrice + modifiersTotalPrice) * options.quantity;

    function handleOnModifierOptionSelect(modifierId: number, selectedOptions: SelectedModifierOption[]) {
        setOptions(prevState => ({
            ...prevState,
            modifiers: {
                ...prevState.modifiers,
                [modifierId]: selectedOptions,
            }
        }))
    }

    function handleAddToOrder() {
        dispatch(addItemToCart({
            ...options,
            id: new Date().getTime(),
            unitPrice: totalPrice
        }))
        onOpenChange();
    }

    return (
        <Dialog open={open} onOpenChange={onOpenChange} modal>
            <DialogContent className="w-full h-full overflow-auto max-w-full flex flex-col bg-white p-0 border-none gap-0 md: md:h-auto md:overflow-hidden md:w-[480px]">
                {hasImageToDisplay && (
                    <DialogHeader className="space-y-0">
                        <DialogTitle className="hidden">{itemDetails?.name ?? 'No name provided'}</DialogTitle>
                        <DialogDescription className="hidden">{itemDetails?.description ?? 'No description provided'}</DialogDescription>
                        <img className="w-full h-[265px] md:h-[320px]" src={itemDetails.images?.[0]?.image} alt={`${itemDetails.name} Image`} />
                    </DialogHeader>
                )}

                <div className="flex flex-col gap-2 p-4">
                    <h1 className="font-bold text-[#121212] text-2xl leading-7">{itemDetails.name}</h1>
                    <p className="font-normal text-[#464646] text-base leading-[18px]">{itemDetails.description}</p>
                </div>

                {itemDetails.modifiers && itemDetails?.modifiers?.length > 0 && (
                    <div className={twMerge("h-auto custom-scrollbar md:overflow-auto", hasImageToDisplay ? "md:h-[140px]" : "md:h-[320px]")}>
                        {itemDetails?.modifiers?.map((modifier) => {
                            return (
                                <ModifierBlock
                                    key={modifier?.id}
                                    modifier={modifier}
                                    handleOnSelectOption={handleOnModifierOptionSelect}
                                    optionsSelected={options.modifiers?.[modifier?.id] ?? []}
                                />
                            )
                        })}
                    </div>
                )}

                <DialogFooter className="flex !flex-col bg-[#F8F9FA] gap-2.5 items-center justify-center mt-auto p-6 md:pt-2 md:bg-white md:mt-0">
                    <Counter
                        count={options.quantity}
                        onDecrement={() => setOptions(prevState => ({ ...prevState, quantity: prevState.quantity - 1 }))}
                        onIncrement={() => setOptions(prevState => ({ ...prevState, quantity: prevState.quantity + 1 }))}
                        isDecrementDisabled={options.quantity === 1}
                    />

                    <Button
                        fullSize
                        type="button"
                        onClick={handleAddToOrder}
                        disabled={!areAllRequiredModifiersSelected}
                        data-testid="add-to-order-button"
                    >
                        Add to Order • {currentVenue?.ccySymbol}{totalPrice.toFixed(2)}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
