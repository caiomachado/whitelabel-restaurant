import { ChevronUp } from "lucide-react";
import { MenuItem, MenuSection } from "../../../models/menu";
import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateAccordionsState } from "../../../store/reducers/menuReducer";
import { AddToCartModal } from "./AddToCartModal";
import { useState } from "react";

type Props = {
    sectionContent: MenuSection;
    filteredValue: string;
}

export const CategoryAccordion = ({ sectionContent, filteredValue }: Props) => {
    const [isAddToCartModalOpen, setIsAddToCartModalOpen] = useState(false);
    const [selectedItem, setSelectedItem] = useState<MenuItem | null>(null);
    const accordionsState = useAppSelector((state) => state.menu.accordionsState);
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const cart = useAppSelector((state) => state.cart.cart);
    const dispatch = useAppDispatch();
    const isCurrentAccordionOpen = accordionsState?.[sectionContent?.name];
    const filteredItems = sectionContent.items.filter((item) => item.name.toLowerCase().includes(filteredValue.toLowerCase()));

    const selectedItemsCount = cart.reduce<Record<number, number>>((itemsCountObj, cartItem) => {
        if (!itemsCountObj[cartItem.itemId]) {
            itemsCountObj[cartItem.itemId] = cartItem.quantity
        } else {
            itemsCountObj[cartItem.itemId] += cartItem.quantity
        }

        return itemsCountObj
    }, {})

    function handleOpenModal() {
        setIsAddToCartModalOpen(false)
        setSelectedItem(null)
    }

    function handleViewItemDetails(menuItem: MenuItem) {
        setIsAddToCartModalOpen(true);
        setSelectedItem(menuItem)
    }

    return (
        <>
            <section className="flex flex-col gap-4" id={sectionContent?.name}>
                <div className="flex items-center justify-between">
                    <h1 className="text-[#121212] font-medium text-2xl leading-8">{sectionContent?.name}</h1>
                    <button onClick={() => dispatch(updateAccordionsState({ key: sectionContent.name, isOpen: !isCurrentAccordionOpen }))}>
                        <ChevronUp size={24} color="#4F372F" className={twMerge("transition", !isCurrentAccordionOpen && 'rotate-180')} />
                    </button>
                </div>

                {isCurrentAccordionOpen && (
                    <>
                        {filteredItems?.length > 0 ? filteredItems?.map((sectionItem) => {
                            return (
                                <div className="flex gap-4" key={sectionItem.id} onClick={() => handleViewItemDetails(sectionItem)}>
                                    <div className="flex flex-col gap-1 flex-1">
                                        <h2 className="text-[#121212] font-medium leading-[18px] inline-flex gap-2.5 items-center">
                                            {selectedItemsCount?.[sectionItem?.id] && (
                                                <div className="w-[18px] h-[18px] bg-[#4F372F] text-center rounded-md">
                                                    <span className="text-sm text-white leading-4">{selectedItemsCount[sectionItem?.id]}</span>
                                                </div>
                                            )}
                                            {sectionItem?.name}
                                        </h2>
                                        <p className="text-[#464646] font-light leading-[18px] max-w-[85%] text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">{sectionItem?.description}</p>
                                        <span className="text-[#464646] font-medium leading-[18px]">{currentVenue?.ccySymbol}{sectionItem?.price?.toFixed(2)}</span>
                                    </div>

                                    {sectionItem?.images?.length && sectionItem?.images?.length > 0 && (
                                        <img className="h-[85px] w-[128px] rounded-md object-cover" src={sectionItem?.images?.[0]?.image} alt={`${sectionItem?.name} image`} />
                                    )}
                                </div>
                            );
                        }) : (
                            <p>No items found in this section with that filter value.</p>
                        )}
                    </>
                )}
            </section>

            {isAddToCartModalOpen && selectedItem && (
                <AddToCartModal open={isAddToCartModalOpen} onOpenChange={handleOpenModal} itemDetails={selectedItem} />
            )}
        </>
    )
}