import { useAppSelector } from "../../../store/hooks";
import { CategoryAccordion } from "./CategoryAccordion";
import { NavContent } from "./NavContent";

type Props = {
    filteredValue: string;
}

export const MenuContent = ({ filteredValue }: Props) => {
    const menuItems = useAppSelector((state) => state.menu.menuItems);

    return (
        <div className="flex flex-col gap-8 w-full">
            <NavContent />

            {menuItems?.sections?.map((section) => {
                return <CategoryAccordion key={section.id} sectionContent={section} filteredValue={filteredValue} />
            })}
        </div>
    )
}