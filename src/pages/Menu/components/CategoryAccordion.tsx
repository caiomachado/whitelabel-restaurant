import { ChevronUp } from "lucide-react";
import { MenuSection } from "../../../models/menu";
import { twMerge } from "tailwind-merge";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateAccordionsState } from "../../../store/reducers/menuReducer";

type Props = {
    sectionContent: MenuSection;
}

export const CategoryAccordion = ({ sectionContent }: Props) => {
    const accordionsState = useAppSelector((state) => state.menu.accordionsState);
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const dispatch = useAppDispatch();
    const isCurrentAccordionOpen = accordionsState?.[sectionContent?.name];

    return (
        <section className="flex flex-col gap-4" id={sectionContent?.name}>
            <div className="flex items-center justify-between">
                <h1 className="text-[#121212] font-medium text-2xl leading-8">{sectionContent?.name}</h1>
                <button onClick={() => dispatch(updateAccordionsState({ key: sectionContent.name, isOpen: !isCurrentAccordionOpen }))}>
                    <ChevronUp size={24} color="#4F372F" className={twMerge("transition", !isCurrentAccordionOpen && 'rotate-180')} />
                </button>
            </div>

            {isCurrentAccordionOpen && sectionContent?.items?.length > 0 && sectionContent?.items?.map((sectionItem) => {
                return (
                    <div className="flex gap-4" key={sectionItem.id}>
                        <div className="flex flex-col gap-1 flex-1">
                            <h2 className="text-[#121212] font-medium leading-[18px]">{sectionItem?.name}</h2>
                            <p className="text-[#464646] font-light leading-[18px] max-w-[85%] text-ellipsis text-nowrap whitespace-nowrap overflow-hidden">{sectionItem?.description}</p>
                            <span className="text-[#464646] font-medium leading-[18px]">{currentVenue?.ccySymbol}{sectionItem?.price?.toFixed(2)}</span>
                        </div>

                        {sectionItem?.images?.length && sectionItem?.images?.length > 0 && (
                            <img className="h-[85px] w-[128px] rounded-md object-cover" src={sectionItem?.images?.[0]?.image} alt={`${sectionItem?.name} image`} />
                        )}
                    </div>
                );
            })}
        </section>
    )
}