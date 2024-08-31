import { MenuSection } from "../../../models/menu";
import { useAppDispatch, useAppSelector } from "../../../store/hooks";
import { updateAccordionsState } from "../../../store/reducers/menuReducer";

export const NavContent = () => {
    const menuItems = useAppSelector((state) => state.menu.menuItems);
    const accordionsState = useAppSelector((state) => state.menu.accordionsState);
    const dispatch = useAppDispatch();

    function handleOpenAccordion(section: MenuSection) {
        const isSelectedCategoryOpen = accordionsState?.[section?.name];
        if (isSelectedCategoryOpen) return;

        dispatch(updateAccordionsState({ key: section?.name, isOpen: true }))
    }

    return (
        <nav className="custom-scrollbar overflow-x-auto pb-2">
            <div className="flex gap-3 w-fit md:w-full">
                {menuItems?.sections?.map((section) => {
                    return (
                        <a href={`#${section?.name}`} key={section?.id} onClick={() => handleOpenAccordion(section)}>
                            <div className="flex flex-col gap-4 px-3 min-w-[106px] pb-2 group border-b-2 border-transparent transition hover:border-[#4F372F]">
                                <img draggable={false} className="w-[82px] h-[82px] p-1 border-2 border-transparent rounded-full object-cover transition group-hover:border-[#4F372F]" src={section?.images?.[0]?.image} alt={section?.name} />
                                <span className="text-[#121212] leading-[18px] font-normal text-center transition group-hover:font-semibold">{section?.name}</span>
                            </div>
                        </a>
                    )
                })}
            </div>
        </nav>
    )
}