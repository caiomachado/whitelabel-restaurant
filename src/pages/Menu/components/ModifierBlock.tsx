import { ChangeEvent } from "react";
import { ItemModifier } from "../../../models/menu"
import { SelectedModifierOption } from "../../../models/cart";
import { useAppSelector } from "../../../store/hooks";
import { useTranslation } from "react-i18next";

export type ModifierProps = {
    modifier?: ItemModifier;
    handleOnSelectOption: (modifierId: number, selectedOptions: SelectedModifierOption[]) => void;
    optionsSelected: SelectedModifierOption[];
}

export const ModifierBlock = ({ modifier, handleOnSelectOption, optionsSelected }: ModifierProps) => {
    const { t } = useTranslation();
    const currentVenue = useAppSelector((state) => state.venue.venue);
    const hasReachedMaxSelection = optionsSelected.length === modifier?.maxChoices;
    const allowMultipleSelections = Boolean(modifier?.maxChoices && modifier?.maxChoices > 1);

    function handleOptionSelection(event: ChangeEvent<HTMLInputElement>, modifierId: number, optionPrice: number) {
        if (!allowMultipleSelections) {
            handleOnSelectOption(modifierId, [{ name: event.target.value, price: optionPrice }]);
            return;
        }

        if (event.target.checked) {
            const updatedOptions = [...optionsSelected, { name: event.target.value, price: optionPrice }];
            handleOnSelectOption(modifierId, updatedOptions);
        } else {
            const filteredOptions = optionsSelected.filter((option) => option.name !== event.target.value);
            handleOnSelectOption(modifierId, filteredOptions);
        }
    }

    return (
        <>
            <div className="flex flex-col py-4 px-6 bg-[#F8F9FA]">
                <h2 className="font-bold text-[#464646] text-base leading-[18px]">{modifier?.name}</h2>
                <p className="font-normal text-[#5F5F5F] text-base leading-[18px]">
                    {t('menu.add-to-cart-modal.select-options', {
                        conditionText: modifier?.minChoices === 0 && (modifier?.maxChoices && modifier?.maxChoices > 1) ? 'up to' : '',
                        maxNumberOfChoices: modifier?.maxChoices,
                        optionsText: modifier?.maxChoices && modifier?.maxChoices !== 1 ? 'options' : 'option'
                    })}
                </p>
            </div>

            {modifier?.items && modifier?.items?.length > 0 && modifier?.items?.map((modifierOption) => {
                return (
                    <div key={modifierOption?.id} className="flex justify-between items-center gap-4 py-4 px-6">
                        <div className="flex flex-col">
                            <h3 className="font-bold text-[#464646] text-base leading-[18px]">{modifierOption?.name}</h3>
                            <span className="font-normal text-[#5F5F5F] text-base leading-[18px]">
                                {currentVenue?.ccySymbol}{modifierOption?.price?.toFixed(2)}
                            </span>
                        </div>

                        <input
                            type={allowMultipleSelections ? "checkbox" : "radio"}
                            className="w-6 h-6"
                            id={modifierOption?.id?.toString()}
                            disabled={!optionsSelected.find((option) => option.name === modifierOption?.name) && hasReachedMaxSelection && allowMultipleSelections}
                            name={`${modifier?.id}-option`}
                            value={modifierOption?.name}
                            onChange={(event) => handleOptionSelection(event, modifier?.id, modifierOption?.price ?? 0)}
                        />
                    </div>
                )
            })}
        </>
    )
}